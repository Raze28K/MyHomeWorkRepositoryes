import { useForm } from "react-hook-form";

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
    <>
      <h1>Вход</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("email", {
              required: "Введите email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Некорректный email",
              },
            })}
            type="email"
            placeholder="Email"
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <input
            {...register("password", { required: "Введите пароль" })}
            type="password"
            placeholder="Пароль"
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button type="submit">Войти</button>
      </form>
    </>
  );
}

export default Login;
