import { useEffect, useRef } from "react";
import { GOOGLE_MAPS_API_KEY } from "../../Api/config";
import DrivingLessonModel from "../../model/DrivingLessonModel";

type DrivingLessonRouteMapProps = {
    drivingLesson: DrivingLessonModel;
};

type SnappedPoint = {
    location: {
        latitude: number;
        longitude: number;
    };
    originalIndex?: number;
    placeId?: string;
};

function DrivingLessonRouteMap({ drivingLesson }: DrivingLessonRouteMapProps) {
    const mapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let routeLine: google.maps.Polyline | null = null;
        let startMarker: google.maps.Marker | null = null;
        let endMarker: google.maps.Marker | null = null;

        const initMap = async () => {
            if (!mapRef.current) return;

            const coordinatePoints = drivingLesson.route.routeCoordinates;

            const rawPath: google.maps.LatLngLiteral[] = coordinatePoints
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((point) => ({
                    lat: point.latitude,
                    lng: point.longitude,
                }))
                .filter((point) => isValidCoordinate(point.lat, point.lng));

            if (rawPath.length === 0) {
                console.warn("No valid coordinates found.");
                return;
            }

            const snappedPath = await snapPathToRoads(rawPath);

            const pathToDraw = snappedPath.length > 0 ? snappedPath : rawPath;

            const { setOptions, importLibrary } = await import("@googlemaps/js-api-loader");

            setOptions({
                key: GOOGLE_MAPS_API_KEY,
                v: "weekly",
            });

            const { Map } = await importLibrary("maps") as google.maps.MapsLibrary;

            if (!mapRef.current) return;

            const map = new Map(mapRef.current, {
                center: pathToDraw[0],
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
            });

            routeLine = new google.maps.Polyline({
                path: pathToDraw,
                geodesic: true,
                strokeOpacity: 1.0,
                strokeWeight: 4,
            });

            routeLine.setMap(map);

            startMarker = new google.maps.Marker({
                position: pathToDraw[0],
                map,
                label: "A",
                title: "Start",
            });

            endMarker = new google.maps.Marker({
                position: pathToDraw[pathToDraw.length - 1],
                map,
                label: "B",
                title: "End",
            });

            const bounds = new google.maps.LatLngBounds();

            pathToDraw.forEach((point) => {
                bounds.extend(point);
            });

            map.fitBounds(bounds);
        };

        initMap().catch((error) => {
            console.error("Could not load Google Maps:", error);
        });

        return () => {
            if (routeLine) routeLine.setMap(null);
            if (startMarker) startMarker.setMap(null);
            if (endMarker) endMarker.setMap(null);
        };
    }, [drivingLesson]);

    return <div ref={mapRef} style={{ width: "100%", height: "96vh" }} />;
}

async function snapPathToRoads(
    path: google.maps.LatLngLiteral[]
): Promise<google.maps.LatLngLiteral[]> {
    if (!GOOGLE_MAPS_API_KEY) {
        console.warn("Google Maps API key is missing.");
        return [];
    }

    const chunks = chunkArray(path, 100);
    const snappedFullPath: google.maps.LatLngLiteral[] = [];

    for (const chunk of chunks) {
        const pathParameter = chunk
            .map((point) => `${point.lat},${point.lng}`)
            .join("|");

        const url =
            `https://roads.googleapis.com/v1/snapToRoads` +
            `?path=${encodeURIComponent(pathParameter)}` +
            `&interpolate=true` +
            `&key=${GOOGLE_MAPS_API_KEY}`;

        const response = await fetch(url);

        if (!response.ok) {
            console.error("Snap to Roads failed:", await response.text());
            continue;
        }

        const data: { snappedPoints?: SnappedPoint[] } = await response.json();

        const snappedPoints =
            data.snappedPoints?.map((point) => ({
                lat: point.location.latitude,
                lng: point.location.longitude,
            })) ?? [];

        snappedFullPath.push(...snappedPoints);
    }

    return snappedFullPath;
}

function chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];

    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }

    return chunks;
}

function isValidCoordinate(latitude: number, longitude: number): boolean {
    return (
        latitude >= -90 &&
        latitude <= 90 &&
        longitude >= -180 &&
        longitude <= 180
    );
}

export default DrivingLessonRouteMap;