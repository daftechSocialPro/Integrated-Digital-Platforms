export interface HrmDashboardGetDto{
    activeEmployees: number
    terminatedEmployees: number
    resignedEmployees: number
    maleEmployees: number
    femaleEmployees: number
    activeVacancies: number
    applicants: number
    soonTerminate: SoonTerminateDto[]

}

export interface SoonTerminateDto{
    employeeName: string
    remainingDays: number
    employmentType: string
    employmentDate: string
}



