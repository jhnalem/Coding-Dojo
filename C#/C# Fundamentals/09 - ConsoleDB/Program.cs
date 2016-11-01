using System;
using System.Collections.Generic;
using ConsoleWithDb;

namespace ConsoleApplication
{
    public class Program
    {
        private static ConsoleWithDb.DbConnector Q = new ConsoleWithDb.DbConnector();

        public static List<Dictionary<string, object>> displayUsers() {
            var result = Q.ExecuteQuery("SELECT * FROM users");

            foreach( var user in result ) {
                Console.WriteLine("ID: {0}; Name: {1} {2}; Favorite Number: {3}", user["id"], user["firstName"], user["lastName"], user["favoriteNumber"]);
            }

            return result;
        }

        public static List<Dictionary<string, object>> insert(string fname, string lname, int favNum) {
            string query = String.Format(@"INSERT INTO users (firstName, lastName, favoriteNumber)
                                           VALUES ('{0}', '{1}', '{2}')", fname, lname, favNum);

            var result = Q.ExecuteQuery(query);

            displayUsers();

            return result;
        }

        public static List<Dictionary<string, object>> update(int id, string fname, string lname, int favNum) {
            string query = String.Format(@"UPDATE users
                                           SET firstName='{0}', lastName='{1}', favoriteNumber='{2}'
                                           WHERE id='{3}'", fname, lname, favNum, id);

            var result = Q.ExecuteQuery(query);

            displayUsers();

            return result;
        }

        public static void delete(int id) {
            string query = String.Format(@"DELETE FROM users
                                           WHERE id='{0}'", id);
            Q.ExecuteQuery(query);

            displayUsers();
        }

        public static void Main(string[] args)
        {
            Console.WriteLine("All Users *********************************");
            displayUsers();

            // Console.WriteLine("After Insert ******************************");
            // insert("First", "Last", 4);

            // Console.WriteLine("After Update ******************************");
            // update(4, "C", "D", 5);

            // Console.WriteLine("After Delete ******************************");
            // delete(4);
        }
    }
}
