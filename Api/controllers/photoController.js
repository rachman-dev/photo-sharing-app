const Photo = require("../models/Photo");

exports.getAllPhotos = async (req, res) => {
  try {
    var photos = await Photo.find({});

    res.status(200).json({
      status: "success",
      photos,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

exports.getPhotosByCategoryId = async (req, res) => {
  try {
    var photos = await Photo.find({ category: req.params.id });

    res.status(200).json({
      status: "success",
      photos,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

exports.getPhotosByPublisherId = async (req, res) => {
  try {
    var photos = await Photo.find({ publisher: req.params.id });

    res.status(200).json({
      status: "success",
      photos,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

exports.getPhotoById = async (req, res) => {
  try {
    var photo = await Photo.findById(req.params.id);

    res.status(200).json({
      status: "success",
      photo,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

exports.addPhoto = async (req, res) => {
  try {
    var photo = await Photo.create(req.body);

    res.status(201).json({
      status: "success",
      photo,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

exports.updatePhoto = async (req, res) => {
  try {
    var photo = await Photo.findByIdAndUpdate(
      req.params.id,
      {
        imageUrl: req.body.imageUrl,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        publisher: req.body.publisher,
        publisherName: req.body.name,
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      photo,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    var photo = await Photo.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      photo,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

// LIKE SYSTEM

exports.addLike = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.photoId);
    var isLiked = false;
    const likersArray = [];

    photo.likers.forEach((f) => {
      likersArray.push(f);
      if (f !== null && f.id === req.params.likerId) {
        isLiked = true;
      }
    });

    if (!isLiked) {
      likersArray.push({ id: req.params.likerId });
      photo.likers = likersArray;
      photo.likes += 1;
      photo.save();

      res.status(200).json({
        status: "success",
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "You already liked",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

exports.deleteLike = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.photoId);

    photo.likers.forEach((f, index) => {
      if (f !== null && f.id === req.params.likerId) {
        photo.likers[index] = null;
        photo.likes -= 1;
        photo.save();
      }
    });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.photoId);
    if (!photo) {
      return res.status(404).json({
        status: "failed",
        error: "Photo not found",
      });
    }
    const newComment = {
      userId: req.body.userId,
      username: req.body.username,
      text: req.body.text,
    };
    photo.comments.push(newComment);
    await photo.save();

    res.status(201).json({
      status: "success",
      comments: photo.comments,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

exports.getComments = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.photoId).populate(
      "comments.userId",
      "username"
    );
    if (!photo) {
      return res.status(404).json({
        status: "failed",
        error: "Photo not found",
      });
    }

    res.status(200).json({
      status: "success",
      comments: photo.comments,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.photoId);
    if (!photo) {
      return res.status(404).json({
        status: "failed",
        error: "Photo not found",
      });
    }
    const commentIndex = photo.comments.findIndex(
      (comment) => comment._id.toString() === req.params.commentId
    );

    if (commentIndex > -1) {
      photo.comments.splice(commentIndex, 1);
      await photo.save();

      res.status(200).json({
        status: "success",
        comments: photo.comments,
      });
    } else {
      res.status(404).json({
        status: "failed",
        error: "Comment not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
