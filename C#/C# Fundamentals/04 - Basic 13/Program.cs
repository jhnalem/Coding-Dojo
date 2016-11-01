using System;

namespace ConsoleApplication
{
    public class Program
    {
        public static void print1To255()
        {
            for (int i = 1; i <= 255; i++)
            {
                Console.WriteLine(i);
            }
        }

        public static void print1To255Odds()
        {
            for (int i = 1; i <= 255; i+=2)
            {
                Console.WriteLine(i);
            }
        }

        public static void print1To255Sum()
        {
            int sum = 0;

            for (int i = 0; i <= 255; i++)
            {
                sum += i;
                Console.WriteLine("New Number: {0}, Sum: {1}", i, sum);
            }
        }

        public static void iterateOverArray(int[] arr = null)
        {
            try
            {
                for (int i = 0; i < arr.Length; i++)
                {
                    Console.WriteLine(i);
                }
            }

            catch
            {
                Console.WriteLine("Unable to iterate over input.");
            }
        }

        public static void findMax(int[] arr = null)
        {
            try
            {
                int max = arr[0];

                for (int i = 0; i < arr.Length; i++)
                {
                    if (arr[i] > max)
                    {
                        max = arr[i];
                    }
                }

                Console.WriteLine(max);
            }

            catch
            {
                Console.WriteLine("Error finding max.");
            }
        }

        public static void getAverage(int[] arr = null)
        {
            try
            {
                int sum = 0;
                
                for (int i = 0; i < arr.Length; i++)
                {
                    sum += arr[i];
                }

                Console.WriteLine((double)sum / arr.Length);
            }

            catch
            {
                Console.WriteLine("Can't find average of input.");
            }
        }

        public static void arrWithOdds()
        {
            int[] y = new int[256/2];

            for (int i = 1; i <= y.Length; i++ )
            {
                y[i-1] = i*2 - 1;
                Console.WriteLine(y[i-1]);
            }
        }

        public static void greaterThanY(int[] arr = null, int? y = null)
        {vis
            try
            {
                int counter = 0;

                for (int i = 0; i < arr.Length; i++) {
                    if (arr[i] > y)
                    {
                        counter++;
                    }
                }

                Console.WriteLine(counter);
            }

            catch {
                Console.WriteLine("Couldn't compare the inputs");
            }
        }

        public static void squareTheValues(int[] x = null)
        {
            try
            {
                for (int i = 0; i < x.Length; i++) {
                    x[i] = x[i] * x[i];
                }

                Console.WriteLine(string.Join(",", x));
            }

            catch
            {
                Console.WriteLine("Could not square the input.");
            }
        }

        public static void eliminateNegatives(int[] arr = null)
        {
            try
            {
                for (int i = 0; i < arr.Length; i++)
                {
                    if (arr[i] < 0)
                    {
                        arr[i] = 0;
                    }
                }

                Console.WriteLine(string.Join(",", arr));
            }

            catch
            {
                Console.WriteLine("Could not remove negatives from input.");
            }
        }

        public static void minMaxAvg(int[] arr = null)
        {
            try
            {
                int min = arr[0];
                int max = arr[0];
                int sum = arr[0];

                for (int i = 1; i < arr.Length; i++)
                {
                    if (arr[i] > max)
                    {
                        max = arr[i];
                    }

                    if (arr[i] < min)
                    {
                        min = arr[i];
                    }

                    sum += arr[i];
                }

                Console.WriteLine("Max: {0}, Min: {1}, Average: {2}", max, min, (double)sum / arr.Length);
            }

            catch
            {
                Console.WriteLine("Could not compute min, max, or average.");
            }
        }

        public static void arrayShift(int[] arr = null) {
            try
            {
                for (int i = 0; i < arr.Length-1; i++) {
                    arr[i] = arr[i+1];
                }
                arr[arr.Length-1] = 0;

                Console.WriteLine(string.Join(",", arr));
            }

            catch
            {
                Console.WriteLine("Could not shift array");
            }
        }

        public static void numToStr(object[] arr = null) {
            try
            {
                for (int i = 0; i < arr.Length; i++)
                {
                    if ((int)arr[i] < 0)
                    {
                        arr[i] = "Dojo";
                    }
                }

                Console.WriteLine(string.Join(",", arr));
            }

            catch
            {
                Console.WriteLine("Could not change number to string");
            }
        }

        public static void Main(string[] args)
        {
            print1To255();
            print1To255Odds();
            print1To255Sum();
            iterateOverArray(new int[] {1,2,3,4,5});
            findMax();
            getAverage(new int[] {1,2,3,4});
            arrWithOdds();
            greaterThanY(new int[] {1,2,3,4,5,6,7}, 5);
            squareTheValues(new int[] {1,2,3,4,5,6});
            eliminateNegatives(new int[] {-2,-1,0,1,2,3});
            minMaxAvg(new int[] {1,3,4,6,-2,4,-4,0});
            arrayShift(new int[] {1,2,3,4,5,6});
            numToStr(new object[] {1,2,3,-1,-2,-3});
        }
    }
}
