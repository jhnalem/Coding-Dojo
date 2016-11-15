using System.Collections.Generic;
using System.Data;
using System.Linq;
using Microsoft.Extensions.Options;
using MySql.Data.MySqlClient;
using Dapper;
using TheWall.Models;
using System;

namespace TheWall.Factories
{
    public class WallFactory : IFactory<User>
    {
        private readonly IOptions<MySqlOptions> MySqlConfig;

        public WallFactory(IOptions<MySqlOptions> Conf)
        {
            MySqlConfig = Conf;
        }

        internal IDbConnection Connection
        {
            get {
                return new MySqlConnection(MySqlConfig.Value.ConnectionString);
            }
        }

        public Message FindMessageById(int id)
        {
            var query = "SELECT * FROM messages WHERE id=@Id";

            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<Message>(query, new {Id = id}).FirstOrDefault();
            }
        }

        public IEnumerable<Message> FindAll()
        {
            var qMessages = @"
                SELECT * FROM messages m
                JOIN users u ON u.id=m.userId;";

            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                var messages = dbConnection.Query<Message, User, Message>(qMessages, (message, user) => { message.User = user; return message; });

                foreach (var message in messages)
                {
                    message.Comments = dbConnection.Query<Comment, User, Comment>(
                        $"SELECT * FROM comments c JOIN users u ON u.id=c.userId WHERE c.messageId={message.Id};",
                        (comment, user) => { comment.User = user; return comment; }
                    ).ToList();
                }

                return messages;
            }
        }

        public void AddMessage(Message msg)
        {
            using (IDbConnection dbConnection = Connection)
            {
                int user = msg.User.Id;
                string query = $"INSERT INTO messages (text, userId, createdAt, updatedAt) VALUES (@Text, {user}, NOW(), NOW())";
                dbConnection.Open();
                dbConnection.Execute(query, msg);
            }
        }

        public void AddComment(Comment comm)
        {
            using (IDbConnection dbConnection = Connection)
            {
                int user = comm.User.Id;
                int msg = comm.Message.Id;
                string query = $"INSERT INTO comments (text, userId, messageId, createdAt, updatedAt) VALUES (@Text, {user}, {msg}, NOW(), NOW())";
                dbConnection.Open();
                dbConnection.Execute(query, comm);
            }
        }
    }
}