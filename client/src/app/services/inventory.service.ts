import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { AddCategoryDto, CategoryListDto } from '../model/Inventory/CategoryDto';
import { ResponseMessage } from '../model/ResponseMessage.Model';
import { AddVendorDto, VendorListDto } from '../model/Inventory/VendorDto';
import { AddItemDto, ItemListDto } from '../model/Inventory/ItemDto';
import { AddPerformaDto, AddPurchaseRequestDto, ApprovePerformaDto, ApprovePurchaseRequestDto, ApprovedPurchaseRequestsDto, PurchaseRequestListDto } from '../model/Inventory/PurchaseRequestDto';
import { AddProductDto, ProductListDto } from '../model/Inventory/ProductDto';
import { StoreReceivalListDto, StoreRequestIssueDto, ApprovedItemsDto, ReciveTransportableItems, ReceiveItems, EmployeeReceivedITemsDto, AdjustReceivedITemsDto } from '../model/Inventory/StoreReceivalListDto';
import { AddStoreRequestDto, StoreRequestItems, ApproveStoreRequest, RejectStoreRequest } from '../model/Inventory/StoreRequestDto';
import { SelectList } from '../model/common';
import { AdjustmentDetailDto, SaveAdjustmentDto } from '../model/Inventory/AdjustmentDetailDto';
import { MeasurementUnitDto } from '../model/Inventory/MeasurementUnit.Model';
import { InventoryDashboardGetDto } from '../model/Inventory/IInventoryDashboardDto';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient,private userService: UserService) { }
  readonly BaseURI = environment.baseUrl;

  getCategoryList(){
    return this.http.get<CategoryListDto[]>(this.BaseURI + '/Category/GetCategories');
  }

  addCategory(AddCategories: AddCategoryDto){
    AddCategories.createdById = this.userService.getCurrentUser().userId;
    return this.http.post<ResponseMessage>(this.BaseURI + '/Category/AddCategories', AddCategories);
  }

  updateCategory(UpdateCategories: AddCategoryDto){
    return this.http.put<ResponseMessage>(this.BaseURI + '/Category/UpdateCategories', UpdateCategories);
  }

  
  
  getMeasurementUnit(){
    return this.http.get<MeasurementUnitDto[]>(this.BaseURI + '/Measurement/GetMeasurementList');
  }

  addMeasurement(addMeasurement: MeasurementUnitDto){
    return this.http.post<ResponseMessage>(this.BaseURI + '/Measurement/AddMeasurement', addMeasurement);
  }

  updateMeasurement(updateMeasurement: MeasurementUnitDto){
    return this.http.put<ResponseMessage>(this.BaseURI + '/Measurement/UpdateMeasurement', updateMeasurement);
  }

  

  getVendors(){
    return this.http.get<VendorListDto[]>(this.BaseURI + '/Vendor/GetVendorList');
  }

  

  addVendor(addVendor: AddVendorDto){
    addVendor.createdById = this.userService.getCurrentUser().userId;
    return this.http.post<ResponseMessage>(this.BaseURI + '/Vendor/AddVendor', addVendor);
  }

  updateVendor(updateVendor: AddVendorDto){
    return this.http.put<ResponseMessage>(this.BaseURI + '/Vendor/UpdateVendor', updateVendor);
  }


  getItems(){
    return this.http.get<ItemListDto[]>(this.BaseURI + '/Items/GetItemList');
  }

  addItem(addItem: AddItemDto){
    addItem.createdById = this.userService.getCurrentUser().userId;
    return this.http.post<ResponseMessage>(this.BaseURI + '/Items/AddItem', addItem);
  }

  updateItem(updateItem: AddItemDto){
    return this.http.put<ResponseMessage>(this.BaseURI + '/Items/UpdateItem', updateItem);
  }


  getPurchasePendingRequests(){
    return this.http.get<PurchaseRequestListDto[]>(this.BaseURI + `/PurchaseRequest/GetPendingRequests`);
  }

  addPurchaseRequest(addpurchase: AddPurchaseRequestDto){
    addpurchase.createdById = this.userService.getCurrentUser().userId;
    addpurchase.requesterEmployeeId = this.userService.getCurrentUser().employeeId;
    return this.http.post<ResponseMessage>(this.BaseURI + '/PurchaseRequest/AddPurchaseRequest', addpurchase);
  }

  approvePurchaseRequest(approvedRequest: ApprovePurchaseRequestDto[]){
    return this.http.put<ResponseMessage>(this.BaseURI + '/PurchaseRequest/ApproveItems', approvedRequest);
  }

  getApproveItems(){
    return this.http.get<ApprovedPurchaseRequestsDto[]>(this.BaseURI + `/PurchaseRequest/GetApproveItems`);
  }

  AddPerforma(addPErforma: AddPerformaDto){
    addPErforma.createdById = this.userService.getCurrentUser().userId;
    return this.http.post<ResponseMessage>(this.BaseURI + '/PurchaseRequest/AddPerforma', addPErforma);
  }

  approveFinalRequest(approvePrfroma: ApprovePerformaDto){
    approvePrfroma.employeeId = this.userService.getCurrentUser().employeeId;
    return this.http.post<ResponseMessage>(this.BaseURI + '/PurchaseRequest/ApproveFinalRequest', approvePrfroma);
  }

  getProducts(){
    return this.http.get<ProductListDto[]>(this.BaseURI + `/Product/GetProductList`);
  }

  getAdjustmentDetail(){
    return this.http.get<AdjustmentDetailDto[]>(this.BaseURI + `/Product/GetAdjustmentDetail`);
  }

  adjustProducts(adjustments: SaveAdjustmentDto){
    adjustments.createdById = this.userService.getCurrentUser().userId;
    return this.http.put<ResponseMessage>(this.BaseURI + '/Product/AdjustProducts', adjustments);
  }


  addProduct(addProduct: AddProductDto){
    addProduct.createdById = this.userService.getCurrentUser().userId;
    return this.http.post<ResponseMessage>(this.BaseURI + '/Product/AddProduct', addProduct);
  }

  updateProduct(updateProduct: AddProductDto){
    return this.http.put<ResponseMessage>(this.BaseURI + '/Product/UpdateProduct', updateProduct);
  }

  getProductDetail(productId: string){
    return this.http.get<AddProductDto>(this.BaseURI + `/Product/GetProductDetail?productId=${productId}`);
  }



  addStoreRequest(addStore: AddStoreRequestDto){
    addStore.createdById = this.userService.getCurrentUser().userId;
    return this.http.post<ResponseMessage>(this.BaseURI + '/StoreRequest/AddStoreRequest', addStore);
  }

  getPendingStoreRequests(){
    return this.http.get<StoreRequestItems[]>(this.BaseURI + `/StoreRequest/GetPendingStoreRequests`);
  }
  
  approveStoreRequest(approveStore: ApproveStoreRequest){
    approveStore.approverEmployeeId = this.userService.getCurrentUser().employeeId;
    return this.http.put<ResponseMessage>(this.BaseURI + '/StoreRequest/ApproveStoreRequest', approveStore);
  }

  finalApproveStoreRequest(storerequestId: string) {
    let approverEmployeeId = this.userService.getCurrentUser().employeeId;
    return this.http.put<ResponseMessage>(this.BaseURI + `/StoreRequest/FinalApproveStoreRequest?requestId=${storerequestId}&approverEmployeeId=${approverEmployeeId}`, { requestId:storerequestId, approverEmployeeId: approverEmployeeId });
  }

  rejectStoreRequest(rejectRequest: RejectStoreRequest){
    return this.http.put<ResponseMessage>(this.BaseURI + '/StoreRequest/RejectStoreRequest', rejectRequest);
  }

  getStoreApprovedItems(){
    return this.http.get<StoreReceivalListDto[]>(this.BaseURI + `/StoreReceival/GetStoreApprovedItems`);
  }
  
  issueStoreApprovedItems(storeRequests: StoreRequestIssueDto) {
    storeRequests.userId = this.userService.getCurrentUser().userId;
    return this.http.post<ResponseMessage>(this.BaseURI + `/StoreReceival/IssueStoreApprovedItems`, storeRequests);
  }

  getEmployeesApprovedItems(){
    let employeeId = this.userService.getCurrentUser().employeeId;
    return this.http.get<ApprovedItemsDto[]>(this.BaseURI + `/StoreReceival/GetEmployeesApprovedItems?EmployeeId=${employeeId}`);
  }

  getTransportableItems(){
    return this.http.get<ApprovedItemsDto[]>(this.BaseURI + `/StoreReceival/GetTransportableItems`);
  }

  approveTransportableItems(reciveItems: ReciveTransportableItems){
    reciveItems.employeeId = this.userService.getCurrentUser().employeeId;
    return this.http.post<ResponseMessage>(this.BaseURI + '/StoreReceival/ReceiveTransportableItems', reciveItems);
  }

  reciveApprovedItems(reciveItems: ReceiveItems){
    reciveItems.employeeId = this.userService.getCurrentUser().employeeId;
    reciveItems.userId = this.userService.getCurrentUser().userId;
    return this.http.post<ResponseMessage>(this.BaseURI + '/StoreReceival/ReciveApprovedItems', reciveItems);
  }

  getEmployeeReceivedItems(){
    let employeeId = this.userService.getCurrentUser().employeeId;
    return this.http.get<EmployeeReceivedITemsDto[]>(this.BaseURI + `/StoreReceival/GetEmployeeReceivedItems?EmployeeId=${employeeId}`);
  }

  adjustReceivedItems(adjustITems: AdjustReceivedITemsDto){
    adjustITems.createdById = this.userService.getCurrentUser().userId;
    return this.http.post<ResponseMessage>(this.BaseURI + '/StoreReceival/adjustReceivedItems', adjustITems);
  }

  
  // getStockReport(stockReportDto: StockReportDto) {
  //   return this.http.post(this.BaseURI + `/InventoryReport/GetStockReport`, stockReportDto, { responseType: 'blob' });
  // }

  // getOutReport(stockReportDto: StockReportDto) {
  //   return this.http.post(this.BaseURI + `/InventoryReport/GetOutReport`, stockReportDto, { responseType: 'blob' });
  // }

  // getBalanceReport(balanceReport: BalanceReport){
  //   return  this.http.post(this.BaseURI + `/InventoryReport/GetBalanceReport`,balanceReport, { responseType: 'blob' })
  // }

  //Dashboard
  getInventoryDashboard(){
    let employeeId = this.userService.getCurrentUser().employeeId;
    return this.http.get<InventoryDashboardGetDto>(this.BaseURI + `/InventoryDashboard?employeeId=${employeeId}`);
  }
}
