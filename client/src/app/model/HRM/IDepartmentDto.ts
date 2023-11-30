export interface DepartmentPostDto {
     DepartmentName: string;
     AmharicName: string;
     Remark: string;
     CreatedById: string
}

export interface DepartmentGetDto {
     id: string,
     departmentName: string,
     amharicName: string,
     remark: string
}