import { Schema, model } from "mongoose";

const NewsSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const News = model("News", NewsSchema);
export default News;
