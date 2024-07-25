import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  CardHeader,
  Avatar,
  Typography,
  CardActions,
  Snackbar,
  Alert,
  TextField,
  Button,
} from "@mui/material";
import { PersonAddAlt1, Favorite, Edit } from "@mui/icons-material";
import moment from "moment";

import {
  getPhotoById,
  addLike,
  removeLike,
  addComment,
  getComments,
} from "../../services/PhotoServices";
import { getUser, followUser, unfollowUser } from "../../services/UserServices";
import { useUserContext } from "../../contexts/UserContext";
import useFollowStatus from "../../hooks/useFollowStatus";
import useLikeStatus from "../../hooks/useLikeStatus";

function Photo() {
  const [photo, setPhoto] = useState("");
  const [publisher, setPublisher] = useState("");
  const [like, setLike] = useState(false);
  const [follow, setFollow] = useState(false);
  const [isOpenFollow, setIsOpenFollow] = useState(false);
  const [isOpenLike, setIsOpenLike] = useState(false);
  const [loginAlert, setLoginAlert] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const { user } = useUserContext();
  const { id } = useParams();
  const [status] = useFollowStatus(user, photo.publisher);
  const [likeStatus] = useLikeStatus(id, user);
  const navigate = useNavigate();

  useEffect(() => {
    getPhotoById(id).then((data) => {
      setPhoto(data.photo);
      getComments(id).then((commentsData) => setComments(commentsData));
    });
    getUser(photo.publisher).then((data) => setPublisher(data.user));
    if (
      user !== undefined &&
      user !== null &&
      photo.publisher !== undefined &&
      photo.publisher !== null
    ) {
      setFollow(status);
    }
    setLike(likeStatus);
  }, [id, photo.publisher, photo.likes, user, status, likeStatus]);

  const onClickAvatar = () => {
    navigate(`/profile/${photo.publisher}`);
  };

  const onClickLike = () => {
    if (user) {
      if (user !== photo.publisher) {
        if (like) {
          removeLike(id, user);
          setLike(false);
        } else {
          addLike(id, user);
          setLike(true);
        }
      } else {
        setIsOpenLike(true);
      }
    } else {
      setLoginAlert(true);
    }
  };

  const onClickFollow = () => {
    if (user) {
      if (user && user !== photo.publisher) {
        if (follow) {
          unfollowUser(user, photo.publisher);
          setFollow(false);
        } else {
          followUser(user, photo.publisher);
          setFollow(true);
        }
      } else {
        setIsOpenFollow(true);
      }
    } else {
      setLoginAlert(true);
    }
  };

  const onClickEdit = () => {
    navigate("/edit", { state: { photoId: id } });
  };

  const handleAddComment = async () => {
    if (commentText.trim() === "") return;
    try {
      const newComment = await addComment(id, {
        text: commentText,
        userId: user._id,
        username: user.username,
      });
      setComments([...comments, newComment.comment]);
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          boxShadow: { md: "rgba(0, 0, 0, 0.35) 0px 5px 15px" },
          p: 2,
          mt: "10vh",
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{ cursor: "pointer" }}
              onClick={onClickAvatar}
              src={publisher.imageUrl}
            />
          }
          title={photo.publisherName}
          subheader={moment(photo.publishedAt).format("DD/MM/YYYY -  hh:mm A")}
        />
        <CardMedia
          sx={{ maxHeight: { xs: 300, sm: 500 } }}
          component="img"
          height="auto"
          image={photo.imageUrl}
          alt={photo.title}
        />
        <CardContent>
          <Typography variant="h6">{photo.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {photo.description}
          </Typography>
          <Box mt={2}>
            <Typography variant="h6">Comments</Typography>
            {Array.isArray(comments) &&
              comments.map((comment) => (
                <Box key={comment._id} mt={1}>
                  <Typography variant="body2">
                    <strong>{comment.username}</strong>: {comment.text}
                  </Typography>
                </Box>
              ))}
          </Box>
          {user && (
            <Box mt={2}>
              <TextField
                fullWidth
                variant="outlined"
                label="Add a comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#D32F2F",
                    },
                    "&:hover fieldset": {
                      borderColor: "#D32F2F",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#D32F2F",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#D32F2F",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#D32F2F",
                  },
                }}
              />
              <Button
                className="PostComment"
                variant="contained"
                color="primary"
                onClick={handleAddComment}
                sx={{ mt: 1 }}
                style={{
                  backgroundColor: "#D32F2F",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Post Comment
              </Button>
            </Box>
          )}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            onClick={onClickLike}
            sx={{
              color: like ? "rgba(20, 20, 20, 1)" : "rgba(20, 20, 20, 0.4)",
            }}
          >
            <Favorite />
          </IconButton>
          <Typography color="text.secondary">{photo.likes}</Typography>
          <IconButton
            onClick={onClickFollow}
            sx={{
              ml: 3,
              color: follow ? "rgba(20, 20, 20, 1)" : "rgba(20, 20, 20, 0.4)",
            }}
          >
            <PersonAddAlt1 />
          </IconButton>
          <Typography color="text.secondary">{publisher.followers}</Typography>
          {user === publisher._id && (
            <IconButton
              onClick={onClickEdit}
              sx={{ ml: "auto", color: "rgba(20, 20, 20, 1)" }}
            >
              <Edit />
            </IconButton>
          )}
        </CardActions>
      </Card>

      {/* Alerts */}
      <Snackbar
        open={isOpenFollow}
        autoHideDuration={3000}
        onClose={() => setIsOpenFollow(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={"error"} onClose={() => setIsOpenFollow(false)}>
          You can't follow your own account !
        </Alert>
      </Snackbar>

      <Snackbar
        open={isOpenLike}
        autoHideDuration={3000}
        onClose={() => setIsOpenLike(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={"error"} onClose={() => setIsOpenLike(false)}>
          You can't like your own photos !
        </Alert>
      </Snackbar>

      <Snackbar
        open={loginAlert}
        autoHideDuration={3000}
        onClose={() => setLoginAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={"error"} onClose={() => setLoginAlert(false)}>
          You must be logged in to do this.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Photo;
