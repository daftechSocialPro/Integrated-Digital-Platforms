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
    remark: string
}

export interface GetJournalVoucherDto {
    id: string;
    date: Date;
    description: string;
    typeofJVName: string;
    getJournalVoucherDetails: GetJournalVoucherDetailDto[];
}

export interface GetJournalVoucherDetailDto {
    chartOfAccountDescription: string;
    subsidiaryAccountDescription: string;
    debit: number;
    credit: number;
    remark: string;
}
