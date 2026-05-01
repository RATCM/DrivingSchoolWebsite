import { useEffect, useRef } from "react";
import { GOOGLE_MAPS_API_KEY } from "../../Api/config";
import DrivingLessonModel from "../../model/DrivingLessonModel";


type DrivingLessonRouteMapProps = {
    drivingLesson: DrivingLessonModel;
};

function DrivingLessonRouteMap({ drivingLesson }: DrivingLessonRouteMapProps) {
    const mapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let routeLine: google.maps.Polyline | null = null;
        let startMarker: google.maps.Marker | null = null;
        let endMarker: google.maps.Marker | null = null;

        const initMap = async () => {
            if (!mapRef.current) return;

            const coordinatePoints = drivingLesson.route.routeCoordinates

            const path: google.maps.LatLngLiteral[] = coordinatePoints
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((point) => ({
                    lat: point.latitude,
                    lng: point.longitude,
                }))
                .filter((point) => isValidCoordinate(point.lat, point.lng));

            if (path.length === 0) {
                console.warn("No valid coordinates found.");
                return;
            }

            const { setOptions, importLibrary } = await import("@googlemaps/js-api-loader");

            setOptions({
                key: GOOGLE_MAPS_API_KEY,
                v: "weekly",
            });

            const { Map } = await importLibrary("maps") as google.maps.MapsLibrary;

            if (!mapRef.current) return;

            const map = new Map(mapRef.current, {
                center: path[0],
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
            });

            routeLine = new google.maps.Polyline({
                path,
                geodesic: true,
                strokeOpacity: 1.0,
                strokeWeight: 4,
            });

            routeLine.setMap(map);

            startMarker = new google.maps.Marker({
                position: path[0],
                map,
                label: "A",
                title: "Start",
            });

            endMarker = new google.maps.Marker({
                position: path[path.length - 1],
                map,
                label: "B",
                title: "End",
            });

            const bounds = new google.maps.LatLngBounds();

            path.forEach((point) => {
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

    return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
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