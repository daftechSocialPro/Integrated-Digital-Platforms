
export class MeasurementUnitDto {
    id: string;
    measurementType: number;
    name: string;
    amharicName: string;
    toSIUnit: number;
}

export class MeasurementListDto{
    id: string;
    measurementType: string;
    name: string;
    amharicName: string;
    toSIUnit: number
}