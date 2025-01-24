export interface DataResult<T = any> {
  code: number;
  message: string;
  data?: T;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  keyword?: string;
  sortField?: string;
  sortOrder?: "ascend" | "descend";
}

export interface PaginationResult<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  code: number;
  message: string;
  details?: any;
}
