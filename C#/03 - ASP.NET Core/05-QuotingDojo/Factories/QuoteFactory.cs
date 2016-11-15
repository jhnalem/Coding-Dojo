using System.Collections.Generic;
using System.Linq;
using Dapper;
using System.Data;
using MySql.Data.MySqlClient;
using QuotingDojo.Models;

namespace DapperApp.Factory
{
    public class QuoteFactory : IFactory<Quote>
    {
        private string connectionString;

        internal IDbConnection Connection
        {
            get {
                return new MySqlConnection(connectionString);
            }
        }

        public QuoteFactory()
        {
            connectionString = "server=localhost;userid=root;password=root;port=3306;database=quotingdojo;SslMode=None";
        }

        public void Add(Quote q)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string query =  "INSERT INTO quotes (name, text, likes, createdAt) VALUES (@Name, @Text, 0, NOW())";
                dbConnection.Open();
                dbConnection.Execute(query, q);
            }
        }

        public void Like(int q)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string query = string.Format("UPDATE quotes SET likes = likes + 1 WHERE id = {0}", q);
                dbConnection.Open();
                dbConnection.Execute(query);
            }
        }

        public IEnumerable<Quote> FindAll()
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<Quote>("SELECT * FROM quotes ORDER BY likes DESC");
            }
        }

        public Quote FindByID(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<Quote>("SELECT * FROM quotes WHERE id = @Id", new { Id = id }).FirstOrDefault();
            }
        }
    }
}