class DrivingObjectiveModel {
    rightOfWay: boolean;
    highway: boolean;
    night: boolean;
    threePointTurn: boolean;
    reverseAroundCorner: boolean;
    parallelParking: boolean;

    constructor(
        rightOfWay: boolean,
        highway: boolean,
        night: boolean,
        threePointTurn: boolean,
        reverseAroundCorner: boolean,
        parallelParking: boolean
    ) {
        this.rightOfWay = rightOfWay;
        this.highway = highway;
        this.night = night;
        this.threePointTurn = threePointTurn;
        this.reverseAroundCorner = reverseAroundCorner;
        this.parallelParking = parallelParking;
    }
}

export default DrivingObjectiveModel;