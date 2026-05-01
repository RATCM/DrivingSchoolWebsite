class CoordinatePointModel {
    order: number;
    latitude: number;
    longitude: number;

    constructor(order: number, latitude: number, longitude: number) {
        this.order = order;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

export default CoordinatePointModel;