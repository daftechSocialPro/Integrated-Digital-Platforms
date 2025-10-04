export interface PaginationRequest {
  pageNumber: number;
  pageSize: number;
  searchTerm?: string;
  regionId?: string;
  gender?: string;
  paymentStatus?: string;
  membershipTypeId?: string;
  fromDate?: Date;
  toDate?: Date;
  sortBy?: string;
  sortDirection?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
