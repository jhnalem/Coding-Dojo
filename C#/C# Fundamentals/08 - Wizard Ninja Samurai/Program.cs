using System;
using System.Threading;

namespace ConsoleApplication
{
    public class Human
    {
        public string Name;

        //The { get; set; } format creates accessor methods for the field specified
        //This is done to allow flexibility
        public int Health { get; set; }

        //These properties are all private
        protected int Strength { get; set; }
        protected int Intelligence { get; set; }
        protected int Dexterity { get; set; }

        public Human(string name)
        {
            Name = name;
            Strength = 3;
            Intelligence = 3;
            Dexterity = 3;
            Health = 100;
        }

        public Human(string name, int str, int intel, int dex, int hp)
        {
            Name = name;
            Strength = str;
            Intelligence = intel;
            Dexterity = dex;
            Health = hp;
        }

        public void Attack(object obj)
        {
            Human enemy = obj as Human;
            if(enemy == null)
            {
                Console.WriteLine("Failed Attack");
            }
            else
            {
                enemy.Health -= Strength * 5;
            }
        }
    }

    public class Wizard : Human
    {
        public Wizard(string name) : base(name, 3, 25, 3, 50)
        {

        }

        public Wizard(string name, int str, int intel, int dex, int hp) : base(name, str, intel, dex, hp)
        {
            
        }

        public void Heal()
        {
            Health += Intelligence * 10; 
        }

        public void Fireball(Object obj)
        {
            Human enemy = obj as Human;
            if(enemy == null)
            {
                Console.WriteLine("Fireball failed!");
            }
            else
            {
                Random rng = new Random();
                enemy.Health -= rng.Next(20, 51);
            }
        }
    }

    public class Ninja : Human
    {
        public Ninja(string name) : base(name, 3, 3, 175, 100)
        {

        }

        public Ninja(string name, int str, int intel, int dex, int hp) : base(name, str, intel, dex, hp)
        {
            
        }

        public void Steal(Object obj)
        {
            Human enemy = obj as Human;
            if(enemy == null)
            {
                Console.WriteLine("Steal failed!");
            }
            else
            {
                enemy.Health -= 10;
                Health += 10;
            }
        }

        public void GetAway()
        {
            Health -= 15;
        }
    }

    public class Samuri : Human
    {
        static int Count;
        public Samuri(string name) : base(name, 3, 3, 3, 200)
        {
            Interlocked.Increment(ref Count);
        }

        public Samuri(string name, int str, int intel, int dex, int hp) : base(name, str, intel, dex, hp)
        {
            Interlocked.Increment(ref Count);
        }

        public void DeathBlow(Object obj)
        {
            Human enemy = obj as Human;
            if (enemy == null)
            {
                Console.WriteLine("Death blow failed!");
            }
            else
            {
                if (enemy.Health < 50)
                {
                    enemy.Health = 0;
                }
            }
        }

        public void Meditate()
        {
            Health = 200;
        }

        public void HowMany()
        {
            Console.WriteLine("There are {0} samuri.", Count);
        }
    }
    
    public class Program
    {
        public static void Main(string[] args)
        {
            var A = new Samuri("A");
            var B = new Samuri("B");
            var C = new Samuri("C");
            var D = new Samuri("D");
            D.HowMany();
        }
    }
}
