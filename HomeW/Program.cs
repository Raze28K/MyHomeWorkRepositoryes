namespace HomeW
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container. 
            builder.Services.AddControllers();

            // 1. НАСТРОЙКА SWAGGER: Регистрируем генератор Swagger
            builder.Services.AddEndpointsApiExplorer(); // Необходим для корректного поиска эндпоинтов
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // 2. НАСТРОЙКА SWAGGER: Включаем UI только в режиме разработки (Development)
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    // Настройка, чтобы Swagger UI открывался по корневому адресу (localhost:XXXX/)
                    // Если хотите открывать по адресу /swagger, удалите следующую строку:
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                    c.RoutePrefix = string.Empty;
                });
            }

            // Configure the HTTP request pipeline. 
            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
