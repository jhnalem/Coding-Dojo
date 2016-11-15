using System.Collections.Generic;
using System.Data;
using System.Linq;
using Microsoft.Extensions.Options;
using MySql.Data.MySqlClient;
using Dapper;
using QuotingDojoRedux.Models;
using System;

namespace QuotingDojoRedux.Factory
{
    public class QuoteFactory : IFactory<Quote>
    {
        private readonly IOptions<MySqlOptions> mySqlConfig;

        public QuoteFactory(IOptions<MySqlOptions> conf)
        {
            mySqlConfig = conf;
        }

        internal IDbConnection Connection
        {
            get {
                return new MySqlConnection(mySqlConfig.Value.ConnectionString);
            }
        }

        public void Add(Quote q)
        {
            using (IDbConnection dbConnection = Connection)
            {
                int userId = q.User.Id;
                string query =  $"INSERT INTO quotes (user_id, text, likes, createdAt, updatedAt) VALUES ({userId}, @Text, 0, NOW(), NOW())";
                dbConnection.Open();
                dbConnection.Execute(query, q);
            }
        }

        public void Like(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string query = "UPDATE quotes SET likes = likes + 1 WHERE id = @Id";
                dbConnection.Open();
                dbConnection.Execute(query, new {Id = id});
            }
        }

        public void Delete(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string query = "DELETE FROM quotes WHERE id = @Id";
                dbConnection.Open();
                dbConnection.Execute(query, new {Id = id});
            }
        }

        public IEnumerable<Quote> FindAll()
        {
            var query = @"
                SELECT * FROM quotes q
                JOIN users u ON u.id=q.user_id
                ORDER BY likes DESC";

            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                var UserQuotes = dbConnection.Query<Quote, User, Quote>(query, (quote, user) => { quote.User = user; return quote; });
                return UserQuotes;
            }
        }

        public Quote FindByID(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<Quote>("SELECT * FROM quotes WHERE id = @Id", new {Id = id}).FirstOrDefault();
            }
        }

        public IEnumerable<Quote> FindUserQuotes(int id)
        {
            var query = @"
                SELECT * FROM quotes q
                JOIN users u ON u.id=q.user_id
                WHERE u.id = {id}";

            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                var UserQuotes = dbConnection.Query<Quote, User, Quote>(query, (quote, user) => { quote.User = user; return quote; });
                return UserQuotes;
            }
        }
    }
}