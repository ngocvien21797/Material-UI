import React, { useState, useCallback } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import "../styles/Suggestions.css";

// Mock data for suggestions
const suggestedUsers = [
  {
    id: 1,
    name: "John Doe",
    username: "@johndoe",
    avatar: "https://mui.com/static/images/avatar/1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "@janesmith",
    avatar: "https://mui.com/static/images/avatar/2.jpg",
  },
  {
    id: 3,
    name: "Mike Johnson",
    username: "@mikejohnson",
    avatar: "https://mui.com/static/images/avatar/3.jpg",
  },
  {
    id: 4,
    name: "Sarah Lee",
    username: "@sarahlee",
    avatar: "https://mui.com/static/images/avatar/4.jpg",
  },
  {
    id: 5,
    name: "Robert Brown",
    username: "@robertbrown",
    avatar: "https://mui.com/static/images/avatar/5.jpg",
  },
];

const Suggestions = () => {
  const [following, setFollowing] = useState({});
  const [showAll, setShowAll] = useState(false); // Điều khiển việc xem tất cả người dùng

  // Hàm để thay đổi trạng thái theo dõi
  const handleFollow = useCallback((userId) => {
    setFollowing((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  }, []);

  // Danh sách người dùng để hiển thị (dựa trên showAll)
  const displayedUsers = showAll ? suggestedUsers : suggestedUsers.slice(0, 3);

  return (
    <Box
      maxWidth={"350px"}
      sx={{
        padding: "16px",
        backgroundColor: "#16181c",
        borderRadius: "25px",
        position: "fixed",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: "bold",
            fontSize: "1rem",
            color: "#f5f5f5",
          }}
        >
          Gợi ý cho bạn
        </Typography>
        <Typography
          sx={{
            fontWeight: "500",
            color: "#6ec207",
            cursor: "pointer",
          }}
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "Thu gọn" : "Xem tất cả"}
        </Typography>
      </Box>

      <List sx={{ width: "300px" }}>
        {displayedUsers.map((user) => (
          <ListItem
            key={user.id}
            sx={{
              px: 0,
              "&:hover": {
                backgroundColor: "#393939",
              },
            }}
          >
            <ListItemAvatar>
              <Avatar src={user.avatar} sx={{ width: 40, height: 40 }} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    color: "#f5f5f5",
                  }}
                >
                  {user.name}
                </Typography>
              }
              secondary={
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.8rem", color: "#808080" }}
                >
                  {user.username}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Button
                variant="contained"
                size="small"
                sx={{
                  color: following[user.id] ? "text.secondary" : "#0a0a0a",
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "25px",
                  "&:hover": {
                    backgroundColor: following[user.id] ? "#d3d3d3" : "#c1c1c1",
                  },
                }}
                onClick={() => handleFollow(user.id)}
              >
                {following[user.id] ? "Đã theo dõi" : "Theo dõi"}
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Suggestions;
