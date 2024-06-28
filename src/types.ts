export type PostType = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

export type RequestParamsGetPost = {
  page: number;
  per_page: number;
};

export interface ResponseMockupPaginate<T> {
  totalPages: number;
  totalData: number;
  data: T[];
}
