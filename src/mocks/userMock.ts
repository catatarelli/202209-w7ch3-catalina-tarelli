import type { User, UserCredentials } from "../types/types";

export const userMock: User = {
  username: "paquito",
  password: "paquito123",
};

export const userMockWithId: UserCredentials = {
  username: "paquito",
  password: "paquito123",
  _id: "ñlaksdjfl",
};
