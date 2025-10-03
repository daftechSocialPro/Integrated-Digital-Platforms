  export class TaskNewDto
  {
      activityId: string;
      description: string;
      taskNumber: string;
      startDate: Date;
      endDate: Date;
      plannedBudget: number;
      baseLine: number;
      target: number;
      createdById: string;
      employees: string[];
  }