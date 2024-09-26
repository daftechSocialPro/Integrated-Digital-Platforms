export interface DeviceSettingDto {
    id?: string;
    createdById?: string;
    name: string;
    model: string;
    ip: string;
    port: number;
    com: number;
}


export interface DeviceLitsDto {
    id: string;
    ip: string;
    port: number;
}