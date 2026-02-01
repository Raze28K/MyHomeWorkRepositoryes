import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

const items = [
  { icon: "🆕", text: "Новый товар добавлен" },
  { icon: "💬", text: "Пользователь оставил отзыв" },
  { icon: "🏷", text: "Скидка на популярные товары" },
];

function Feed() {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Лента
      </Typography>
      <Typography color="text.secondary" paragraph>
        Здесь будет список новостей, постов или активности.
      </Typography>
      <Paper variant="outlined" sx={{ maxWidth: 500 }}>
        <List>
          {items.map(({ icon, text }, i) => (
            <ListItem key={i}>
              <ListItemIcon sx={{ color: "primary.main" }}>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  );
}

export default Feed;
