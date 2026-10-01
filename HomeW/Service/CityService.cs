using Dapper;
using HomeW.Abstract;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using PA_521.Model;
using System;
using System.Collections.Generic;
using System.Data;

namespace HomeW.Service
{
    public class CityService : ICity
    {
        private readonly IConfiguration config;

        public CityService(IConfiguration config)
        {
            this.config = config;
        }

        public string CityAdd(CityDTO city)
        {
            using (SqlConnection db = new SqlConnection(config["db"]))
            {
                int rows = db.Execute("CityInsert", new { p_name = city.name, p_id = city.id }, commandType: CommandType.StoredProcedure);
                return rows.ToString();
            }
        }

        public string CityDelete(int id)
        {
            using (SqlConnection db = new SqlConnection(config["db"]))
            {
                int rows = db.Execute("CityDelete", new { id }, commandType: CommandType.StoredProcedure);
                return rows.ToString();
            }
        }

        public string CityEdit(CityDTO city, int id)
        {
            using (SqlConnection db = new SqlConnection(config["db"]))
            {
                int rows = db.Execute("CityUpdate", new { id, p_name = city.name }, commandType: CommandType.StoredProcedure);
                return rows.ToString();
            }
        }

        public IEnumerable<CityDTO> CityGetAll()
        {
            using (SqlConnection db = new SqlConnection(config["db"]))
            {
                return db.Query<CityDTO>("select id, name, [year], population from city order by name");
            }
        }

        public CityDTO CityGetById(int id)
        {
            using (SqlConnection db = new SqlConnection(config["db"]))
            {
                return db.QueryFirstOrDefault<CityDTO>("select id, name, [year], population from city where id = @id", new { id });
            }
        }
    }
}
