import { useState } from "react";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Modal from "../components/Modal/Modal";

const defaultProfile = {
  name: "Test User",
  email: "test@example.com",
  about:
    "Это страница профиля. Здесь можно редактировать данные пользователя, менять пароль и смотреть историю заказов.",
};

function Profile() {
  const [profile, setProfile] = useState(defaultProfile);
  const [editOpen, setEditOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: profile,
  });

  const openEdit = () => {
    reset(profile);
    setEditOpen(true);
  };

  const onSave = (data) => {
    setProfile({ ...profile, ...data });
    setEditOpen(false);
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Профиль
      </Typography>

      <Paper variant="outlined" sx={{ p: 3, maxWidth: 560 }}>
        <Typography paragraph>
          <strong>Имя:</strong> {profile.name}
        </Typography>
        <Typography paragraph>
          <strong>Email:</strong> {profile.email}
        </Typography>
        <Typography variant="h6" gutterBottom>
          О себе
        </Typography>
        <Typography color="text.secondary" paragraph>
          {profile.about}
        </Typography>
        <Button variant="contained" onClick={openEdit}>
          Редактировать профиль
        </Button>
      </Paper>

      <Modal
        title="Редактировать профиль"
        open={editOpen}
        onClose={() => setEditOpen(false)}
      >
        <form onSubmit={handleSubmit(onSave)}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Имя"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              {...register("name", {
                required: "Введите имя",
                minLength: {
                  value: 2,
                  message: "Минимум 2 символа",
                },
              })}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
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
              label="О себе"
              multiline
              rows={3}
              error={Boolean(errors.about)}
              helperText={errors.about?.message}
              {...register("about", {
                required: "Заполните поле «О себе»",
                maxLength: {
                  value: 500,
                  message: "Не более 500 символов",
                },
              })}
            />
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button onClick={() => setEditOpen(false)}>Отмена</Button>
              <Button type="submit" variant="contained">
                Сохранить
              </Button>
            </Stack>
          </Stack>
        </form>
      </Modal>
    </>
  );
}

export default Profile;
