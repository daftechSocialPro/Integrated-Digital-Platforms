export interface BankListDto
    {
        id: string;
        bankName: string;
        amharicName: string;
        address: string;
        amharicAddress: string;
        branch: string;
        amharicBranch: string;
        accountNumber: string;
        bankDigitNumber: number;
    }

    export interface AddBankDto
    {
        id?: string;
        createdById?: string;
        bankName: string;
        amharicName: string;
        address: string;
        amharicAddress: string;
        branch: string;
        amharicBranch: string;
        accountNumber: string;
        bankDigitNumber: number;
    }

  