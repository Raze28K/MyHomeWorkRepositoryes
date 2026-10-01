using Microsoft.AspNetCore.Http;

public interface ICityService
{
    
    Task<int> UploadCitiesFromTxtAsync(IFormFile file);

    
    Task<(byte[] FileContents, string ContentType, string FileName)> DownloadCitiesToTxtAsync();
}