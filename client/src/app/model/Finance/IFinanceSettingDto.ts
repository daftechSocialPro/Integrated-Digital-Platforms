export class ClientsListDto
{
    id: string;
    typeOfCustomer: string;
    name: string;
    phoneNumber: string;
    emailAddress: string;
    tinNumber: string;
    countryId: string;
    countryName: string;
    address: string;
}

export class AddClientDto
{
    id?:string;
    typeOfCustomer: number;
    name: string;
    phoneNumber: string;
    emailAddress: string;
    tinNumber: string;
    pcountryId: string;
    address: string;
    createdById: string;
}
