using System;
using System.Collections.Generic;

namespace ConsoleApplication
{
    public class Program
    {
        public static void Main(string[] args)
        {
            int[] integers = new int[10];
            string[] names = {"Tim", "Martin", "Nikki", "Sara"};
            bool[] boo = new bool[10];
            int[,] table = new int[10, 10];

            for( int i = 0; i < integers.Length; i++ ) {
                integers[i] = i;
            }

            for( int i = 0; i < boo.Length; i++ ) {
                if( i % 2 == 0 ) {
                    boo[i] = true;
                } else {
                    boo[i] = false;
                }
            }

            for( int i = 1; i <= 10; i++ ) {
                for( int j = 1; j <= 10; j++ ) {
                    table[i-1, j-1] = i * j;
                }
            }

            Dictionary<string, object> profile1 = new Dictionary<string, object>();
            profile1.Add("name", "Tim");
            profile1.Add("favSport", "Fishing");
            profile1.Add("numPets", 2);
            profile1.Add("likesIceCream", true);

            Dictionary<string, object> profile2 = new Dictionary<string, object>();
            profile2.Add("name", "Martin");
            profile2.Add("favSport", "Football");
            profile2.Add("numPets", 0);
            profile2.Add("likesIceCream", true);

            Dictionary<string, object> profile3 = new Dictionary<string, object>();
            profile3.Add("name", "Nikki");
            profile3.Add("favSport", "Fishing");
            profile3.Add("numPets", 1);
            profile3.Add("likesIceCream", false);

            Dictionary<string, object> profile4 = new Dictionary<string, object>();
            profile4.Add("name", "Sara");
            profile4.Add("favSport", "Baseball");
            profile4.Add("numPets", 5);
            profile4.Add("likesIceCream", true);

            List<Dictionary<string, object>> users = new List<Dictionary<string, object>>();
            users.Add(profile1);
            users.Add(profile2);
            users.Add(profile3);
            users.Add(profile4);

            foreach( var user in users ) {
                Console.WriteLine("{0} {1} {2} {3}", user["name"], user["favSport"], user["numPets"], user["likesIceCream"]);
            }
        }
    }
}
