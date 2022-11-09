import { model, Schema } from "mongoose";

// eslint-disable-next-line @typescript-eslint/naming-convention
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const Item = model("Item", ItemSchema, "items");

export default Item;
