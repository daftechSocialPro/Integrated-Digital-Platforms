export interface PositionPostDto {
    positionName: string
    amharicName: string
    hasSeverance: boolean
    severancePercentage: number
    createdById: string
}

export interface PositionGetDto {
    id: string
    positionName: string
    amharicName: string
    hasSeverance: boolean
    severancePercentage: number
}