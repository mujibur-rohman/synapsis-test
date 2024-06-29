import { StatusUser } from "./enum";

export type PostType = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

export type CommentType = {
  id: number;
  post_id: number;
  title: string;
  body: string;
  name: string;
  email: string;
};

export type UserType = {
  id: number;
  gender: string;
  status: StatusUser;
  name: string;
  email: string;
};

export type RequestParamsGetPost = {
  page: number;
  per_page: number;
};

export type RequestParamsGetUsers = {
  page: number;
  per_page: number;
  name?: string;
};

export interface ResponseMockup<T> {
  meta: {
    pagination: {
      total: number;
      pages: number;
      page: number;
      limit: number;
      links: {
        previous: null | string;
        current: null | string;
        next: null | string;
      };
    };
  } | null;
  data: T;
}
export type RequestBodyUser = {
  gender: string;
  status: string;
  name: string;
  email: string;
};
