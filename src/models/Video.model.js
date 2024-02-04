import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: { type: String, required: true },
  video_name: { type: String, required: true },
  file_url: { type: String, required: true },
  comment_count: { type: Number, default: 0 },
  like_count: { type: Number, default: 0 },
  dislike_count: { type: Number, default: 0 },

  privacy: {
    type: String,
    enum: ["private", "public"],
    default: "Public",
    required: true,
  },
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
      created_at: {
        type: Date,
        default: Date.now(),
      },
    },
  ],

  colaborators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Video", VideoSchema);
