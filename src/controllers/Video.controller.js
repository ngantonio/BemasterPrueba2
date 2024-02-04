import Video from "../models/Video.model.js";

export const createVideo = async (req, res) => {
  try {
    let videoDTO = req.body;
    const newVideo = new Video(videoDTO);
    const T = await newVideo.save();
    return res.status(201).json({ videoData: T });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getVideoById = async (req, res) => {
  // public: 65bf1a338030d99b96d47775
  // private: 65bf1b7ef0ac14ee77bb7d69
  try {
    const videoId = req?.params?.id;
    const video = await Video.findOne({ _id: videoId });

    if (video) {
      if (
        (video.privacy === "private" && req.user) ||
        video.privacy === "public"
      ) {
        return res.status(201).json({ videoData: video });
      } else if (video.privacy === "private" && !req.user) {
        return res
          .status(401)
          .json({ msg: "Only registered users can view this video" });
      }
    } else return res.status(400).json({ msg: "Video not found" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getTop10 = async (req, res) => {
  try {
    let videos = [];

    if (!req?.user) {
      videos = await Video.find({ privacy: "public" })
        .sort({ like_count: -1 })
        .limit(10);
    } else {
      videos = await Video.find({}).sort({ like_count: -1 }).limit(10);
    }

    return res.status(201).json({ videoData: videos });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getVideosByUserId = async (req, res) => {
  try {
    const userId = req?.params?.id;
    const videos = await Video.find({ owner: userId });
    return res.status(201).json({ videoData: videos });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const likeVideo = async (req, res) => {
  try {
    // search related video
    const videoId = req?.body?.videoId;
    let video = await Video.findOne({ _id: videoId });

    if (video) {
      video.like_count = video.like_count + 1;

      const videoUpdated = await Video.updateOne({ _id: video._id }, video);

      if (videoUpdated.modifiedCount > 0) {
        return res
          .status(201)
          .json({ msg: "Like added successfully", videoData: video });
      } else return res.status(400).json({ msg: "Like could not be saved" });
    } else {
      return res.status(400).json({ msg: "Video not found" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const dislikeVideo = async (req, res) => {
  try {
    // search related video
    const videoId = req?.body?.videoId;
    let video = await Video.findOne({ _id: videoId });
    video.dislike_count = video.dislike_count + 1;

    if (video) {
      const videoUpdated = await Video.updateOne({ _id: video._id }, video);

      if (videoUpdated.modifiedCount > 0) {
        return res
          .status(201)
          .json({ msg: "Dislike added successfully", videoData: video });
      } else return res.status(400).json({ msg: "Dislike could not be saved" });
    } else {
      return res.status(400).json({ msg: "Video not found" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const commentVideo = async (req, res) => {
  try {
    // search related video
    const videoId = req?.body?.videoId;
    delete req?.body?.videoId;
    let video = await Video.findOne({ _id: videoId });

    if (video) {
      // increment the comment count number and push new comment
      video.comment_count = video.comment_count + 1;
      video.comments.push(req?.body);

      const videoUpdated = await Video.updateOne({ _id: video._id }, video);

      if (videoUpdated.modifiedCount > 0) {
        return res
          .status(201)
          .json({ msg: "Comment added successfully", videoData: video });
      } else return res.status(400).json({ msg: "Comment could not be saved" });
    } else {
      return res.status(400).json({ msg: "Video not found" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const addColaborator = async (req, res) => {
  // search related video
  const videoId = req?.body?.videoId;
  const userId = req?.body?.userId;

  try {
    let video = await Video.findOne({ _id: videoId });

    if (video) {
      //If the user who performs the action is the owner of the video, it is allowed
      if (video?.owner.toString() === req?.user?._id.toString()) {
        // It is verified that the user being added as a collaborator has not been previously included
        if (!video?.colaborators?.includes(userId, 0)) {
          video.colaborators.push(userId);
          const videoUpdated = await Video.updateOne({ _id: video._id }, video);
          if (videoUpdated.modifiedCount > 0) {
            return res.status(201).json({
              msg: "Collaborator user added successfully",
              videoData: video,
            });
          } else
            return res
              .status(400)
              .json({ msg: "Collaborator user cannot be saved" });
        } else {
          return res
            .status(400)
            .json({ msg: "User is already a contributor to the video." });
        }
      } else {
        return res.status(401).json({
          msg: "Only the video's owner can perform this action not found",
        });
      }
    } else {
      return res.status(400).json({ msg: "Video not found" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateVideo = async (req, res) => {
  try {
    let body = req?.body;

    // Do not allow auto-generated information to be modified
    delete body?.comment_count;
    delete body?.like_count;
    delete body?.dislike_count;
    delete body?.comments;
    delete body?.colaborators;

    if (body?.owner === req?.user?._id.toString()) {
      const videoUpdated = await Video.updateOne({ _id: body?.videoId }, body);

      if (videoUpdated.modifiedCount > 0) {
        return res
          .status(201)
          .json({ msg: "Video updated successfully", videoData: videoUpdated });
      } else
        return res.status(400).json({ msg: "Video could not be modified" });
    } else {
      return res.status(401).json({
        msg: "Only the video's owner can perform this action not found",
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const videoId = req?.body?.videoId;
    const deleted = await Video.deleteOne({ _id: videoId });

    if (deleted)
      return res
        .status(201)
        .json({ ok: true, msg: "Video deleted successfully" });
    else return res.status(401).json({ msg: "Video not found" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
