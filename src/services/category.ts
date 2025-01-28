import request from "@/utils/request";
import { DataResult } from "@/types/api";
import {
  Category,
  CategoryCreateInput,
  CategoryListParams,
  CategoryUpdateInput,
} from "@/types/category";

export const getCategoryList = (params?: CategoryListParams) => {
  return request.get<DataResult<Category[]>>("/admin/categories", {
    params,
  });
};

export const getCategory = (id: number) => {
  return request.get<DataResult<Category>>(`/admin/categories/${id}`);
};

export const createCategory = (data: CategoryCreateInput) => {
  return request.post<DataResult<Category>>("/admin/categories", data);
};

export const updateCategory = (id: number, data: CategoryUpdateInput) => {
  return request.put<DataResult<Category>>(`/admin/categories/${id}`, data);
};

export const deleteCategory = (id: number) => {
  return request.delete<DataResult<void>>(`/admin/categories/${id}`);
};
