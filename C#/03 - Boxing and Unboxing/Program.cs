using System;
using System.Collections.Generic;

namespace ConsoleApplication
{
    public class Program
    {
        public static void Main(string[] args)
        {
            List<object> list = new List<object>();
            list.Add(7);
            list.Add(28);
            list.Add(-1);
            list.Add(true);

            int sum = 0;

            foreach( var item in list )
            {
                if (item is int)
                {
                    sum += (int)item;
                }

                Console.WriteLine(item);
            }

            Console.WriteLine("Sum is: {0}", sum);
        }
    }
}
