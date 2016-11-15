using System.Collections.Generic;
using System.Data;
using System.Linq;
using Microsoft.Extensions.Options;
using MySql.Data.MySqlClient;
using Dapper;
using TheWall.Models;

namespace TheWall.Factories
{
    public class UserFactory : IFactory<User>
    {
        private readonly IOptions<MySqlOptions> MySqlConfig;

        public UserFactory(IOptions<MySqlOptions> Conf)
        {
            MySqlConfig = Conf;
        }

        internal IDbConnection Connection
        {
            get {
                return new MySqlConnection(MySqlConfig.Value.ConnectionString);
            }
        }

        public int Add(User user)
        {
            // string query =  "INSERT INTO users (first_name, last_name, email, password, created_at, updated_at) VALUES (@FirstName, @LastName, @Email, @Password, NOW(), NOW()); SELECT LAST_INSERT_ID();";
            string query =  @"
                INSERT INTO users (firstName, lastName, email, password, createdAt, updatedAt)
                           VALUES (@FirstName, @LastName, @Email, @Password, NOW(), NOW());
                SELECT LAST_INSERT_ID();";

            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<int>(query, user).Single();
            }
        }

        public User FindByID(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                var query = @"
                    SELECT * FROM users WHERE id = @Id;
                    SELECT * FROM messages WHERE userId = @Id;
                    SELECT * FROM comments WHERE userId = @Id";

                using (var multi = dbConnection.QueryMultiple(query, new {Id = id})) {
                    var user = multi.Read<User>().Single();
                    user.Messages = multi.Read<Message>().ToList();
                    user.Comments = multi.Read<Comment>().ToList();
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