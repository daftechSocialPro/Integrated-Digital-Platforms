export class AddVendorDto {
    id: string;
    createdById: string;
    name: string;
    countryId: string;
    phoneNumber: string;
    email: string;
    tinNumber: string;
    address: string;
}

export class VendorListDto {
    id: string;
    createdById: string;
    name: string;
    countryName: string;
    supplierCode: string;
    phoneNumber: string;
    email: string;
    tinNumber: string;
    address: string; 
    vendorBankAccounts: VendorBankAccountDto[];
}


export class VendorBankAccountDto
{
    id?: string;
    bankName: string;
    accountNumber: string;
}

export class AddVendorBankAccountDto
{
    id?: string;
    vendorId: string;
    bankName: string;
    accountNumber: string;
    createdById: string;
}


