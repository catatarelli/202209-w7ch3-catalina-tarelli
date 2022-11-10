import type { InferSchemaType } from "mongoose";
import { model, Schema } from "mongoose";

// eslint-disable-next-line @typescript-eslint/naming-convention
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const Item = model("Item", ItemSchema, "items");

export type ItemStructure = InferSchemaType<typeof ItemSchema>;

export default Item;
