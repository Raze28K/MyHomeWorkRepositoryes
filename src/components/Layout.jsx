import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

const navItems = [
  { to: "/feed", label: "Лента" },
  { to: "/shop", label: "Магазин" },
  { to: "/profile", label: "Профиль" },
];

function Layout({ onLogout }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = (to) => {
    navigate(to);
    if (isMobile) setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="меню"
              edge="start"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 1, fontSize: "1.5rem" }}
            >
              ☰
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "primary.main", fontWeight: 700 }}
          >
            Проект
          </Typography>
          {!isMobile &&
            navItems.map(({ to, label }) => (
              <Button
                key={to}
                color="inherit"
                onClick={() => navigate(to)}
                sx={{
                  mx: 0.5,
                  ...(location.pathname === to && {
                    bgcolor: "rgba(255,255,255,0.12)",
                  }),
                }}
              >
                {label}
              </Button>
            ))}
          <IconButton color="inherit" onClick={onLogout} aria-label="выйти" sx={{ fontSize: "1.25rem" }}>
            ⎋
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 260 },
        }}
      >
        <Toolbar />
        <List>
          {navItems.map(({ to, label }) => (
            <ListItemButton
              key={to}
              selected={location.pathname === to}
              onClick={() => handleNav(to)}
            >
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Container component="main" sx={{ flex: 1, py: 3, maxWidth: "lg" }}>
        <Outlet />
      </Container>

      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: "auto",
          backgroundColor: (t) =>
            t.palette.mode === "dark" ? "background.paper" : "grey.200",
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © Учебный проект. UI: Material UI.
        </Typography>
      </Box>
    </Box>
  );
}

export default Layout;
