import type { UserCredentials } from "../types/types";

export const itemsMock = {
  name: "banana",
};

export const userMock: UserCredentials = {
  username: "paquito",
  password: "paquito123",
};

export const userMockWithId = {
  username: "paquito",
  password: "paquito123",
  _id: "ñlaksdjfl",
};

export const userMockCredentials = {
  username: "paquito",
  password: "paquito123",
  email: "paquito@gmail.com",
  id: "ñasokdfjdsñlk",
};

export const itemsListMock = [
  {
    name: "Teddy Bear",
    picture: "TeddyBear.jpg",
    owner: "abc123",
    id: "636d2f5fbb30713a7c2122f1",
  },
  {
    name: "Bubble gum",
    picture: "Bubble gum.jpg",
    owner: "abc123",
    id: "636d2f5fbb30713a7c32111f1",
  },
];
