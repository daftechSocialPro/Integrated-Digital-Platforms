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
}