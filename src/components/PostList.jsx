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
} from "@mui/material";
import React, { useState } from "react";
import Post from "./Post";

export const PostList = () => {
  // Danh sách bài viết
  const [posts, setPosts] = useState([]);
  
  // Các state cho bài đăng mới
  const [open, setOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState(""); // Nội dung bài viết mới
  const [image, setImage] = useState(null); // Hình ảnh bài đăng
  const [caption, setCaption] = useState(""); // Tiểu sử hoặc caption của bài đăng

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Xử lý thay đổi ảnh khi người dùng chọn ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file); // Tạo URL tạm thời cho ảnh
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
    };
    setPosts([newPost, ...posts]); // Thêm bài viết mới vào đầu danh sách
    setOpen(false);
    setNewPostContent(""); // Reset nội dung bài viết
    setImage(null); // Reset ảnh đã chọn
    setCaption(""); // Reset tiểu sử
  };

  return (
    <Box
      maxWidth={"600px"}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          bgcolor: "#16181C",
          borderRadius: "50px",
          padding: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Avatar
              src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="User Avatar"
            />
            <Typography
              variant="body1"
              color="#808080"
              fontWeight={"600"}
              onClick={handleClickOpen}
            >
              Bắt đầu nimbus...
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6EC207",
              color: "#f5f5f5",
              borderRadius: "25px",
            }}
            onClick={handleClickOpen}
          >
            Đăng
          </Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <Box
          sx={{ backgroundColor: "#16181c", width: "400px" }}
          component="form"
          onSubmit={handlePost} // Khi người dùng submit
        >
          <DialogTitle color="#f5f5f5">Create new</DialogTitle>
          <DialogContent>
            <TextField
              label="Tiểu sử"
              name="content"
              fullWidth
              multiline
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)} // Cập nhật tiểu sử
              sx={{
                marginTop: "16px",
                "& .MuiInputBase-root": {
                  color: "#f5f5f5", // Text color
                },
                "& .MuiInputLabel-root": {
                  color: "#808080", // Label color
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#808080", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#f5f5f5", // Hover border color
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#f5f5f5", // Focused border color
                  },
                },
              }}
            />
            <Box sx={{ marginTop: "16px" }}>
              <Typography color="#808080">Chọn hình ảnh:</Typography>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                sx={{
                  marginTop: "8px",
                  color: "#f5f5f5", // Text color
                }}
              />
              {image && (
                <Box sx={{ marginTop: "8px", textAlign: "center" }}>
                  <img
                    src={image}
                    alt="Selected"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
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
          comment={item.comment} // Đảm bảo mỗi bài đăng có số comment riêng biệt
          view={item.view}
          share={item.share}
        />
      ))}
    </Box>
  );
};
