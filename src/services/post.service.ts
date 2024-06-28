import axiosConfig from "@/config/axios";
import { PostType, RequestParamsGetPost, ResponseMockupPaginate } from "@/types";

const PostService = {
  getAll: async (params: RequestParamsGetPost): Promise<ResponseMockupPaginate<PostType>> => {
    const response = await axiosConfig.get<PostType[]>("/posts", {
      params,
    });
    return {
      totalPages: response.headers["x-pagination-pages"],
      totalData: response.headers["x-pagination-page-total"],
      data: response.data,
    };
  },
};

export default PostService;
