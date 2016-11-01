using System;
using System.Collections.Generic;

namespace ConsoleApplication
{
    public class Program
    {
        public static Random rnd = new Random();

        public static int randomArray()
        {
            int[] rands = new int[10];
            int min;
            int max;
            int sum = 0;

            for (int i = 0; i < 10; i++)
            {
                rands[i] = rnd.Next(5, 26);
            }

            min = rands[0];
            max = rands[0];

            for (int i = 1; i < rands.Length; i++)
            {
                if(rands[i] > max)
                {
                    max = rands[i];
                }

                if( rands[i] < min)
                {
                    min = rands[i];
                }
            
                sum += rands[i];
            }

            Console.WriteLine("Min: {0}, Max: {1}", min, max);

            return sum;
        }

        public static string coinFlip()
        {
            string result = "";
            int random = rnd.Next(0,10);

            Console.WriteLine("Tossing a coin!");

            if (random < 5) {
                result = "Heads!";
            } else {
                result = "Tails!";
            }

            Console.WriteLine(result);
            return result;
        }

        public static double tossMultipleCoints(int num = 1)
        {
            int heads = 0;

            for (int i = 0; i < num; i++)
            {
                string flip = coinFlip();

                if( flip == "Heads!" ) {
                    heads++;
                }
            }
            
            return (double) heads / num;
        }

        public static string[] names()
        {
            string[] nameArr = {"Todd", "Tiffany", "Charlie", "Geneva", "Sydney"};
            var ns = new List<string>();

            // Shuffle array based on Fisher-Yates algorithm
            // http://stackoverflow.com/a/110570
            int n = nameArr.Length;
            while (n > 1) 
            {
                int k = rnd.Next(n--);
                string temp = nameArr[n];
                nameArr[n] = nameArr[k];
                nameArr[k] = temp;
            }

            for (int i = 0; i < nameArr.Length; i++)
            {
                if (nameArr[i].Length > 5)
                {
                    ns.Add(nameArr[i]);
                }
            }

            return ns.ToArray();
        }

        public static void Main(string[] args)
        {
            Console.WriteLine(randomArray());
            Console.WriteLine(tossMultipleCoints(10));
            Console.WriteLine(string.Join(", ", names()));
        }
    }
}
