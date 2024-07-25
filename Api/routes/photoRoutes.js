const express = require("express");
const router = express.Router();

const {
  getAllPhotos,
  getPhotosByCategoryId,
  getPhotoById,
  getPhotosByPublisherId,
  addPhoto,
  updatePhoto,
  deletePhoto,
  addLike,
  deleteLike,
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/photoController");

router.route("/").get(getAllPhotos);

router.route("/:id").get(getPhotoById);

router.route("/category/:id").get(getPhotosByCategoryId);

router.route("/publisher/:id").get(getPhotosByPublisherId);

router.route("/").post(addPhoto);

router.route("/:id").put(updatePhoto);

router.route("/:id").delete(deletePhoto);

router.route("/:photoId/likes/:likerId").put(addLike);

router.route("/:photoId/likes/:likerId").delete(deleteLike);

router.route("/:photoId/comments").post(addComment);

router.route("/:photoId/comments").get(getComments);

router.route("/:photoId/comments/:commentId").delete(deleteComment);

module.exports = router;
