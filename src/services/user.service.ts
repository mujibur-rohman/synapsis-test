import axiosConfig from "@/config/axios";
import { RequestBodyUser, RequestParamsGetUsers, ResponseMockup, UserType } from "@/types";

const UserService = {
  getAll: async (params: RequestParamsGetUsers) => {
    const response = await axiosConfig.get<ResponseMockup<UserType[]>>("/users", {
      params,
    });
    return response.data;
  },
  getOne: async (id: number) => {
    const response = await axiosConfig.get<ResponseMockup<UserType>>(`/users/${id}`);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await axiosConfig.delete<ResponseMockup<UserType>>(`/users/${id}`);
    return response.data;
  },
  add: async (payload: RequestBodyUser) => {
    const response = await axiosConfig.post<ResponseMockup<UserType>>("/users", payload);
    return response.data;
  },
  update: async (id: number, payload: RequestBodyUser) => {
    const response = await axiosConfig.put<ResponseMockup<UserType>>(`/users/${id}`, payload);
    return response.data;
  },
};

export default UserService;
