export interface DepartmentPostDto {
     DepartmentName: string;
     Remark: string;
     CreatedById: string
}

export interface DepartmentGetDto {
     id: string
     departmentName: string
     remark: string
}