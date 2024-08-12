export class AddJournalVochureDto {
    date: Date;
    description: string;
    typeofJV: number;
    createdById: string;
    addJournalVoucherDetailDtos: AddJournalVoucherDetailDto[];
}


export class AddJournalVoucherDetailDto {
    chartOfAccountId: string = "";
    subsidiaryAccountId: string = "";
    chartOfAccount?: string = "";
    subsidaryAccount?: string = "";
    debit: number = 0;
    credit: number = 0;
}