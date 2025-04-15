import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Link,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Sidebar() {
  const [searchTerm, setSearchTerm] = useState("");

  const contacts = [
    {
      name: "ngoc vien",
      username: "@forlan77",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "ngoc vien2",
      username: "@jane123",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "John Doe2",
      username: "@john_doe",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "John Doe3",
      username: "@john_doe",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "John Doe4",
      username: "@john_doe",
      avatar: "https://via.placeholder.com/40",
    },
  ];

  // Lọc theo tên hoặc username
  const filteredContacts = contacts.filter((contact) =>
    `${contact.name} ${contact.username}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          width: "360px",
        }}
      >
        {/* Thanh tìm kiếm */}
        <TextField
          placeholder="Tìm kiếm"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#808080" }} />
              </InputAdornment>
            ),
            style: {
              color: "#f5f5f5",
              backgroundColor: "#16181c",
              borderRadius: "25px",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { border: "none" },
            },
          }}
        />

        <Box sx={{ height: "20px" }} />

        <Box
          sx={{
            backgroundColor: "#16181c",
            borderRadius: "25px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            padding: "16px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            marginBottom: "150px",
          }}
        >
          {/* Danh sách người liên hệ gần đây */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#f5f5f5",
            }}
          >
            Người liên hệ gần đây
          </Typography>

          <List>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact, index) => (
                <ListItem key={index} sx={{ padding: "8px 0" }}>
                  <ListItemAvatar>
                    <Avatar alt={contact.name} src={contact.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      "& .MuiTypography-root": {
                        color: "#f5f5f5",
                      },
                    }}
                    primary={contact.name}
                    secondary={contact.username}
                  />
                </ListItem>
              ))
            ) : (
              <Typography sx={{ color: "#ccc", fontStyle: "italic" }}>
                Không tìm thấy người dùng.
              </Typography>
            )}
          </List>

          {/* Xem thêm */}
          <Box sx={{ marginTop: "8px" }}>
            <Link
              href="#"
              sx={{
                color: "#6ec207",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              <Typography>Xem thêm</Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Sidebar;
