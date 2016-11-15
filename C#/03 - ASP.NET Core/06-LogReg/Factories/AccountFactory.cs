using System.Collections.Generic;
using System.Linq;
using System.Data;
using Microsoft.Extensions.Options;
using MySql.Data.MySqlClient;
using Dapper;
using LogReg.Models;

namespace LogReg.Factory
{
    public class AccountFactory : IFactory<Account>
    {
        private readonly IOptions<MySqlOptions> mySqlConfig;

        public AccountFactory(IOptions<MySqlOptions> conf)
        {
            mySqlConfig = conf;
        }

        internal IDbConnection Connection
        {
            get {
                return new MySqlConnection(mySqlConfig.Value.ConnectionString);
            }
        }

        public void Add(Account user)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string query =  "INSERT INTO users (firstName, lastName, email, password, createdAt, updatedAt) VALUES (@FirstName, @LastName, @Email, @Password, NOW(), NOW())";
                dbConnection.Open();
                dbConnection.Execute(query, user);
            }
        }

        public IEnumerable<Account> FindAll()
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<Account>("SELECT * FROM users");
            }
        }

        public Account FindByID(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<Account>("SELECT * FROM users WHERE id = @Id", new { Id = id }).FirstOrDefault();
            }
        }

        public Account FindByEmail(string email)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<Account>("SELECT * FROM users WHERE email = @Email", new { Email = email }).FirstOrDefault();
            }
        }
    }
}