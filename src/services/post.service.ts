import axiosConfig from "@/config/axios";
import { CommentType, PostType, RequestParamsGetPost, ResponseMockupPaginate } from "@/types";

const PostService = {
  getAll: async (params: RequestParamsGetPost): Promise<ResponseMockupPaginate<PostType>> => {
    const response = await axiosConfig.get<PostType[]>("/posts", {
      params,
    });
    return {
      totalPages: response.headers["x-pagination-pages"],
      totalData: response.headers["x-pagination-total"],
      data: response.data,
    };
  },
  getOne: async (id: number) => {
    const response = await axiosConfig.get<PostType>(`/posts/${id}`);
    return response.data;
  },
  getComments: async (postId: number) => {
    const response = await axiosConfig.get<CommentType[]>(`/posts/${postId}/comments`);
    return response.data;
  },
};

export default PostService;
