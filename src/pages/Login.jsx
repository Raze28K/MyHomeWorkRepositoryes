import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function Login({ onLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    onLogin();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Вход
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2.5}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              autoComplete="email"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              {...register("email", {
                required: "Введите email",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Некорректный email",
                },
              })}
            />
            <TextField
              fullWidth
              label="Пароль"
              type="password"
              autoComplete="current-password"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              {...register("password", {
                required: "Введите пароль",
                minLength: {
                  value: 4,
                  message: "Минимум 4 символа",
                },
              })}
            />
            <Button type="submit" variant="contained" size="large" fullWidth>
              Войти
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;
