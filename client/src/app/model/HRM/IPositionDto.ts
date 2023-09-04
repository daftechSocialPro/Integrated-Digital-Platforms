export interface PositionPostDto {
    positionName: string
    jobTitle: string
    createdById: string
}

export interface PositionGetDto {
    id: string
    positionName: string
    jobTitle: string
}