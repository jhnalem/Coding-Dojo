using System;
using System.Collections.Generic;

namespace ConsoleApplication
{
    public class Card {
        public string Value;
        public string Suit;
        public int Numerical_value;

        public Card(string s, string v, int n) {
            Suit = s;
            Value = v;
            Numerical_value = n;
        }

        public override string ToString() {
            return String.Format("Suit: {0}, Value: {1}, Num: {2}", Suit, Value, Numerical_value);
        }
    }

    public class Deck {
        public List<Card> Cards = new List<Card>();

        public Card deal()
        {
            Card c = Cards[0];
            Cards.RemoveAt(0);

            return c;
        }

        public void reset()
        {
            string[] suits = {"Spades", "Clubs", "Diamonds", "Hearts"};
            string[] values = {"A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"};

            foreach (string suit in suits)
            {
                for (int i = 1; i <= 13; i++)
                {
                    Cards.Add(new Card(suit, values[i-1], i));
                }
            }
        }

        public void shuffle()
        {
            Random rnd = new Random();
            int n = Cards.Count;
            while (n > 1) 
            {
                int k = rnd.Next(n--);
                Card temp = Cards[n];
                Cards[n] = Cards[k];
                Cards[k] = temp;
            }
        }
    }

    public class Player {
        public string Name;
        public List<Card> Hand = new List<Card>();

        public Player(string n = "") {
            Name = n;
        }

        public Card draw(Deck deck)
        {
            Card card = deck.deal();
            Hand.Add(card);
            return card;
        }

        public Boolean discard(Card card)
        {
            return Hand.Remove(card);
        }
    }

    public class Program
    {
        public static void Main(string[] args)
        {
            Deck deck = new Deck();
            deck.reset();
            deck.shuffle();
            
            Player A = new Player();
            A.draw(deck);
            A.draw(deck);
            A.draw(deck);
            A.draw(deck);
            Card lastCard = A.draw(deck);
            A.discard(lastCard);
        }
    }
}
