using PA_521.Model;

namespace HomeW.Abstract
{
    public interface ICity
    {
        IEnumerable<CityDTO> CityGetAll();
        CityDTO CityGetById(int id);
        string CityAdd(CityDTO city);
        string CityEdit(CityDTO city, int id);
        string CityDelete(int id);

    }
}
