import {
  Avatar,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Input,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import Post from "./Post";
import { formatDistanceToNow } from "date-fns";

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  const handlePost = (event) => {
    event.preventDefault();
    const newPost = {
      caption: caption,
      img: image,
      like: 0,
      comment: 0,
      view: 0,
      share: 0,
      postDate: new Date(),
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
    };
    setPosts([newPost, ...posts]);
    setOpen(false);
    setCaption("");
    setImage(null);
    setOpenSnackbar(true);
  };

  const handleLike = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].like += 1;
    setPosts(updatedPosts);
  };

  return (
    <Box
      maxWidth={"600px"}
      sx={{ display: "flex", flexDirection: "column", gap: "20px", mx: "auto" }}
    >
      <Box
        sx={{ width: "100%", bgcolor: "#16181C", borderRadius: "50px", p: 2 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar src="https://i.pravatar.cc/150?img=1" alt="User Avatar" />
            <Typography
              variant="body1"
              color="#808080"
              fontWeight={600}
              onClick={handleClickOpen}
              sx={{ cursor: "pointer" }}
            >
              Bắt đầu nimbus...
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#6EC207", color: "#f5f5f5", borderRadius: "25px" }}
            onClick={handleClickOpen}
          >
            Đăng
          </Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <Box component="form" onSubmit={handlePost} sx={{ bgcolor: "#16181c", width: "400px" }}>
          <DialogTitle sx={{ color: "#f5f5f5" }}>Create new</DialogTitle>
          <DialogContent>
            <TextField
              label="Tiểu sử"
              fullWidth
              multiline
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              sx={{ mt: 2, input: { color: "#f5f5f5" }, label: { color: "#808080" } }}
            />
            <Box sx={{ mt: 2 }}>
              <Typography color="#808080">Chọn hình ảnh:</Typography>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                sx={{ mt: 1, color: "#f5f5f5" }}
              />
              {image && (
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <img
                    src={image}
                    alt="Selected"
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Post</Button>
          </DialogActions>
        </Box>
      </Dialog>

      {posts.map((item, index) => (
        <Post
          key={index}
          caption={item.caption}
          img={item.img}
          like={item.like}
          comment={item.comment}
          view={item.view}
          share={item.share}
          postDate={item.postDate}
          avatar={item.avatar}
          onLike={() => handleLike(index)}
        />
      ))}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Bài viết đã được đăng!"
      />
    </Box>
  );
};
