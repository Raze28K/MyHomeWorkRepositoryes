using HomeW.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Text;

public class CityService : ICityService
{
    private readonly AppDbContext _context; // Ваша контекст-база данных

    public CityService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<int> UploadCitiesFromTxtAsync(IFormFile file)
    {
        if (file == null || file.Length == 0)
            throw new ArgumentException("Файл не выбран или пуст.");

        var newCities = new List<City>();

        // Читаем файл построчно
        using (var reader = new StreamReader(file.OpenReadStream(), Encoding.UTF8))
        {
            string? line;
            while ((line = await reader.ReadLineAsync()) != null)
            {
                if (string.IsNullOrWhiteSpace(line)) continue;

                // Парсим строку по разделителю ';'
                var parts = line.Split(';');
                if (parts.Length == 2 && int.TryParse(parts[1], out int population))
                {
                    newCities.Add(new City
                    {
                        Name = parts[0].Trim(),
                        Population = population
                    });
                }
            }
        }

        if (newCities.Any())
        {
            await _context.Cities.AddRangeAsync(newCities);
            await _context.SaveChangesAsync();
        }

        return newCities.Count; // Возвращаем количество добавленных городов
    }

    public async Task<(byte[] FileContents, string ContentType, string FileName)> DownloadCitiesToTxtAsync()
    {
        // Получаем все города из БД
        var cities = await _context.Cities.ToListAsync();

        var sb = new StringBuilder();
        foreach (var city in cities)
        {
            // Формируем строки в том же формате: Имя;Население
            sb.AppendLine($"{city.Name};{city.Population}");
        }

        // Преобразуем строку в массив байт
        byte[] fileContents = Encoding.UTF8.GetBytes(sb.ToString());
        string contentType = "text/plain";
        string fileName = $"cities_{DateTime.Now:yyyyMMdd_HHmmss}.txt";

        return (fileContents, contentType, fileName);
    }
}