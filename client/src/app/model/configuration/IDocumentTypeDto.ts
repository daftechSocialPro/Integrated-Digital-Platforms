export class DocumentTypePostDTO {
    fileName: string     
    // Use enum types for FileExtentions and DocumentCategory (assume these are already defined)
    fileExtentions: number
    documentCategory: number
    createdById: string
    // Default value for Rowstatus (assume RowStatus enum is defined)
    rowstatus: number
}

export class DocumentTypeGetDTO extends DocumentTypePostDTO {
    id: string// Guid equivalent in TypeScript is typically a string
    fileExtentionsName?: string; // Nullable properties, using '?' 
    documentCategoryName?: string;
}
