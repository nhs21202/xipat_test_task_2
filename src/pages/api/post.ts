import axiosClient from "@/lib/axios";
import { PaginationParams } from "@/types/common.type";

export const  getPostsList = async (params?: PaginationParams) => {
  const existingParams = Object.fromEntries(
    Object.entries(params || {}).filter(([, param]) => param !== undefined)
  );
  const response = await axiosClient.get("/posts", { params: existingParams });
  return response.data;
};

export const getPostById = async (id: number) => {
  const response = await axiosClient.get(`/posts/${id}`);
  return response.data;
};
