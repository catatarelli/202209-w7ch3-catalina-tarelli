import "../../../loadEnvironments.js";
import request from "supertest";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../app.js";
import connectDatabase from "../../../database/index.js";
import User from "../../../database/models/User.js";
import { secretWord } from "../../../loadEnvironments.js";
import type { ItemStructure } from "../../../database/models/Item.js";
import Item from "../../../database/models/Item.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given a GET /items/list endpoint", () => {
  describe("When it receives a request from a logged in user that is in the database with id 'abc123'", () => {
    test("Then it should call the response method status with a 200, and a list of items owned by that user", async () => {
      const expectedStatus = 200;

      const registerData = {
        username: "panchito",
        password: "panchito123",
        email: "panchito@gmail.com",
      };

      const hashedPassword = await bcrypt.hash(registerData.password, 10);

      const newUser = await User.create({
        username: registerData.username,
        password: hashedPassword,
        email: registerData.email,
      });

      const token = jwt.sign(
        { username: registerData.username, id: newUser._id },
        secretWord
      );

      const userItem: ItemStructure = {
        name: "gameboy",
        owner: newUser._id.toString(),
        picture: "gameboy.jpg",
      };

      await Item.create(userItem);

      const response = await request(app)
        .get("/items/list")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("items");
      expect(response.body.items[0]).toHaveProperty("name", "gameboy");
    });
  });
});
