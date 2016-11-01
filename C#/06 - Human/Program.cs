using System;

namespace ConsoleApplication
{
    public class Human
    {
        public string name { get; set; }
        public int strength = 3;
        public int intelligence = 3;
        public int dexterity = 3;
        public int health = 100;

        public Human(string n) {
            name = n;
        }

        public Human(string n, int s = 3, int i = 3, int d = 3, int h = 10) {
            name = n;
            strength = s;
            intelligence = i;
            dexterity = d;
            health = h;
        }

        public int Attack(Human h) {
            if( h is Human ) {
                int damage = strength * 5;

                if( h.health > damage )
                {
                    Console.WriteLine("Human {0} has taken {1} damage!", h.name, damage);
                    h.health = h.health - damage;
                }

                else
                {
                    Console.WriteLine("Human {0} has died!", h.name);
                    h.health = 0;
                }

                return damage;

            } else {
                return 0;
            }
        }
    }

    public class Program
    {
        public static void Main(string[] args)
        {
            Human A = new Human("A", 15, 1, 1, 1);
            Human B = new Human("B");

            Console.WriteLine(A.Attack(B));
            Console.WriteLine(B.health);

            Console.WriteLine(B.Attack(A));
            Console.WriteLine(A.health);
        }
    }
}
