
import { SelectList } from "../common"
import { ActivityView } from "./ActivityViewDto"


export interface Task {
    Id?: String, 
    TaskDescription: String,
    HasActvity: Boolean,
    PlannedBudget: Number,
    PlanId: String,
    startDate: Date,
    endDate: Date
}

export interface TaskView {
    id?: String
    taskName?: String
    taskWeight?: number
    remianingWeight?: number
    numberofActivities?: number
    finishedActivitiesNo?: number
    terminatedActivitiesNo?: number
    startDate?: Date
    endDate?: Date
    numberOfMembers?: number
    hasActivity?: Boolean
    plannedBudget?: number
    remainingBudget?: number
    numberOfFinalized?: number
    numberOfTerminated?: number
    taskMembers?: SelectList[]
    taskMemos?: TaskMemoView[]
    activityViewDtos?: ActivityView[],
   
}

export interface TaskMembers {
    employee: SelectList[];
    taskId: String;
    requestFrom: String;
}


export interface TaskMemoView {
    employee: SelectList
    description: String
    dateTime: string
}
export interface TaskMemo {
    employeeId: String,
    description: String,
    taskId: String
}