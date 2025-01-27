export interface Category {
  id: number;
  name: string;
  code: string;
  parentId?: number | null;
  sort: number;
  description?: string | null;
  seoTitle?: string | null;
  seoKeywords?: string | null;
  seoDesc?: string | null;
  children?: Category[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryCreateInput {
  name: string;
  code: string;
  parentId?: number;
  sort?: number;
  description?: string;
  seoTitle?: string;
  seoKeywords?: string;
  seoDesc?: string;
}

export interface CategoryUpdateInput extends Partial<CategoryCreateInput> {
  id: number;
}

export interface CategoryListParams {
  keyword?: string;
}

export interface APIResponse<T> {
  code: number;
  msg: string;
  data: T;
}

export interface APIListResponse<T> {
  code: number;
  msg: string;
  data: {
    list: T[];
    pagination: {
      current: number;
      pageSize: number;
      total: number;
    };
  };
}

export type CategoryResponse = APIResponse<Category>;
export type CategoryListResponse = APIListResponse<Category>;
