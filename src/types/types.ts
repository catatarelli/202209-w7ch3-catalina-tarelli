import type { JwtPayload } from "jsonwebtoken";

export interface User {
  username: string;
  password: string;
}

export interface UserCredentials extends User {
  _id: string;
}

export interface UserTokenPayload extends JwtPayload {
  id: string;
  username: string;
}
