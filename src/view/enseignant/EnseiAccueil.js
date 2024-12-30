import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Logout, AccountCircle } from "@mui/icons-material";
import logo from "../../assets/images/logos/bauman.png";

const EnseiAccueil = () => {
  const [menuAnchor, setMenuAnchor] = useState(null);

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Utilisateur",
    role: "Non défini",
    email: "inconnu@example.com",
  };

  const handleMenuOpen = (event) => setMenuAnchor(event.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/connexion";
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#E6F0F3" }}>
      {/* Menu Latéral */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 260,
          "& .MuiDrawer-paper": {
            width: 260,
            boxSizing: "border-box",
            bgcolor: "#5BA8B4",
            color: "#FFFFFF",
            padding: "10px 0",
          },
        }}
      >
        {/* Logo et Titre */}
        <Box
          sx={{
            textAlign: "center",
            py: 3,
            borderBottom: "1px solid #ffffff50",
          }}
        >
          <Avatar
            alt="Logo"
            src={logo}
            sx={{
              width: 70,
              height: 70,
              margin: "0 auto",
              boxShadow: "0 0 10px #00000033",
            }}
          />
          <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
            Menu
          </Typography>
        </Box>

        {/* Liens du Menu */}
        <List>
          <ListItem button component={NavLink} to="/teacher/dashboard/eleves" sx={linkStyle}>
            <ListItemText primary="Tous les élèves" />
          </ListItem>
          <ListItem button component={NavLink} to="/teacher/dashboard/historique" sx={linkStyle}>
            <ListItemText primary="Historique éducation" />
          </ListItem>
          <ListItem button component={NavLink} to="/teacher/dashboard/rapports" sx={linkStyle}>
            <ListItemText primary="Rapports d'exercices" />
          </ListItem>
          <ListItem button component={NavLink} to="/teacher/dashboard/amenagements" sx={linkStyle}>
            <ListItemText primary="Aménagements scolaires" />
          </ListItem>
        </List>
      </Drawer>

      {/* Contenu Principal */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Barre Supérieure */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            bgcolor: "#5BA8B4",
            color: "#FFFFFF",
            py: 2,
            px: 3,
            borderRadius: "10px",
            boxShadow: "0 2px 5px #00000033",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Tableau de bord de l'enseignant
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleMenuOpen} aria-label="Menu utilisateur">
              <AccountCircle sx={{ fontSize: 40, color: "#FFFFFF" }} />
            </IconButton>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
              sx={{ "& .MuiPaper-root": { minWidth: 200 } }}
            >
              <MenuItem disabled sx={{ color: "#555" }}>{user.name}</MenuItem>
              <MenuItem disabled sx={{ color: "#555" }}>{user.email}</MenuItem>
              <MenuItem disabled sx={{ color: "#555" }}>{user.role}</MenuItem>
              <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                <Logout fontSize="small" sx={{ mr: 1 }} /> Déconnexion
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Contenu Dynamique */}
        <Outlet />
      </Box>
    </Box>
  );
};

// Style des liens
const linkStyle = {
  "&.Mui-selected, &:hover": {
    bgcolor: "#5BA8B4",
    color: "#FFFFFF",
    fontWeight: "bold",
  },
};

export default EnseiAccueil;