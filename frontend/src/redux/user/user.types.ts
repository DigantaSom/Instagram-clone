// --------- User Redux Types ---------

export interface UserState {
  reqUser: User | null;
}

export const REQ_USER = 'REQ_USER';

export interface ReqUserDispatchType {
  type: typeof REQ_USER;
  payload: User;
}

export type UserActionTypes = ReqUserDispatchType;

// --------- User Other Types ---------

export interface User {
  id: number;
  email: string;
  username: string;
  name: string;
  image: string;
  mobile: string;
  website: string;
  bio: string;
  gender: string;
  followers: UserDTO[];
  following: UserDTO[];
  story: any[]; // TODO: create a Story interface
  savedPosts: any[]; // TODO: create a Post interface
}

interface UserDTO {
  id: number;
  email: string;
  username: string;
  name: string;
  userImage: string;
}
