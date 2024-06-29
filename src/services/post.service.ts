import axiosConfig from "@/config/axios";
import { CommentType, PostType, RequestParamsGetPost, ResponseMockup } from "@/types";

const PostService = {
  getAll: async (params: RequestParamsGetPost) => {
    const response = await axiosConfig.get<ResponseMockup<PostType[]>>("/posts", {
      params,
    });
    return response.data;
  },
  getOne: async (id: number) => {
    const response = await axiosConfig.get<ResponseMockup<PostType>>(`/posts/${id}`);
    return response.data;
  },
  getComments: async (postId: number) => {
    const response = await axiosConfig.get<ResponseMockup<CommentType[]>>(`/posts/${postId}/comments`);
    return response.data;
  },
};

export default PostService;
