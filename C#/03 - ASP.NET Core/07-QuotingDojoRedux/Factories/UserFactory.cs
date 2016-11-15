using System.Collections.Generic;
using System.Linq;
using System.Data;
using Microsoft.Extensions.Options;
using MySql.Data.MySqlClient;
using Dapper;
using QuotingDojoRedux.Models;

namespace QuotingDojoRedux.Factory
{
    public class UserFactory : IFactory<User>
    {
        private readonly IOptions<MySqlOptions> mySqlConfig;

        public UserFactory(IOptions<MySqlOptions> conf)
        {
            mySqlConfig = conf;
        }

        internal IDbConnection Connection
        {
            get {
                return new MySqlConnection(mySqlConfig.Value.ConnectionString);
            }
        }

        public void Add(User user)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string query =  "INSERT INTO users (firstName, lastName, email, password, createdAt, updatedAt) VALUES (@FirstName, @LastName, @Email, @Password, NOW(), NOW())";
                dbConnection.Open();
                dbConnection.Execute(query, user);
            }
        }

        public IEnumerable<User> FindAll()
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<User>("SELECT * FROM users");
            }
        }

        public User FindByID(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                var query = @"
                    SELECT * FROM users WHERE id = @Id;
                    SELECT * FROM quotes WHERE user_id = @Id;";

                using (var multi = dbConnection.QueryMultiple(query, new {Id = id})) {
                    var user = multi.Read<User>().Single();
                    user.Quotes = multi.Read<Quote>().ToList();
                    return user;
                }
            }
        }

        public User FindByEmail(string email)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<User>("SELECT * FROM users WHERE email = @Email", new { Email = email }).FirstOrDefault();
            }
        }
    }
}