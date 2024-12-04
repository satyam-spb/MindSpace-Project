import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Quote from '../models/quoteModel.js';

dotenv.config();

const quotes = [
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "motivational"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "success"
  },
  {
    text: "Happiness is not something ready made. It comes from your own actions.",
    author: "Dalai Lama",
    category: "happiness"
  },
  {
    text: "Be present in all things and thankful for all things.",
    author: "Maya Angelou",
    category: "mindfulness"
  },
  {
    text: "Every moment is a fresh beginning.",
    author: "T.S. Eliot",
    category: "mindfulness"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "success"
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
    category: "motivational"
  },
  {
    text: "Happiness is when what you think, what you say, and what you do are in harmony.",
    author: "Mahatma Gandhi",
    category: "happiness"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "motivational"
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
    category: "motivational"
  },
  {
    text: "The only way to achieve the impossible is to believe it is possible.",
    author: "Charles Kingsleigh",
    category: "motivational"
  },
  {
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
    category: "motivational"
  },
  {
    text: "Act as if what you do makes a difference. It does.",
    author: "William James",
    category: "motivational"
  },
  {
    text: "Courage is resistance to fear, mastery of fear, not absence of fear.",
    author: "Mark Twain",
    category: "motivational"
  },
  {
    text: "Hardships often prepare ordinary people for an extraordinary destiny.",
    author: "C.S. Lewis",
    category: "motivational"
  },
  {
    text: "With the new day comes new strength and new thoughts.",
    author: "Eleanor Roosevelt",
    category: "motivational"
  },
  {
    text: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
    author: "Albert Schweitzer",
    category: "success"
  },
  {
    text: "I find that the harder I work, the more luck I seem to have.",
    author: "Thomas Jefferson",
    category: "success"
  },
  {
    text: "Don’t be afraid to give up the good to go for the great.",
    author: "John D. Rockefeller",
    category: "success"
  },
  {
    text: "Success is how high you bounce when you hit bottom.",
    author: "George S. Patton",
    category: "success"
  },
  {
    text: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
    category: "success"
  },
  {
    text: "Happiness depends upon ourselves.",
    author: "Aristotle",
    category: "happiness"
  },
  {
    text: "Happiness is not in the mere possession of money; it lies in the joy of achievement, in the thrill of creative effort.",
    author: "Franklin D. Roosevelt",
    category: "happiness"
  },
  {
    text: "True happiness arises, in the first place, from the enjoyment of oneself.",
    author: "Joseph Addison",
    category: "happiness"
  },
  {
    text: "Mindfulness is the key to a happy life.",
    author: "Thích Nhất Hạnh",
    category: "mindfulness"
  },
  {
    text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    author: "Buddha",
    category: "mindfulness"
  },
  {
    text: "Mindfulness means being awake. It means knowing what you are doing.",
    author: "Jon Kabat-Zinn",
    category: "mindfulness"
  },
  {
    text: "Every breath we take, every step we make, can be filled with peace, joy, and serenity.",
    author: "Thích Nhất Hạnh",
    category: "mindfulness"
  },
  {
    text: "Let go of the thoughts that don’t make you strong.",
    author: "Karen Salmansohn",
    category: "mindfulness"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "motivational"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "success"
  },
  {
    text: "Happiness is not something ready made. It comes from your own actions.",
    author: "Dalai Lama",
    category: "happiness"
  },
  {
    text: "Be present in all things and thankful for all things.",
    author: "Maya Angelou",
    category: "mindfulness"
  },
  {
    text: "Every moment is a fresh beginning.",
    author: "T.S. Eliot",
    category: "mindfulness"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "success"
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
    category: "motivational"
  },
  {
    text: "Happiness is when what you think, what you say, and what you do are in harmony.",
    author: "Mahatma Gandhi",
    category: "happiness"
  },
  {
    text: "Everything you can imagine is real.",
    author: "Pablo Picasso",
    category: "motivational"
  },
  {
    text: "Success is not measured by what you accomplish, but by the opposition you have encountered, and the courage with which you have maintained the struggle against overwhelming odds.",
    author: "Orison Swett Marden",
    category: "success"
  },
  {
    text: "If you want to live a happy life, tie it to a goal, not to people or things.",
    author: "Albert Einstein",
    category: "happiness"
  },
  {
    text: "True love is born from understanding.",
    author: "Buddha",
    category: "happiness"
  },
  {
    text: "Every day is a new beginning. Take a deep breath, smile, and start again.",
    author: "Anonymous",
    category: "mindfulness"
  },
  {
    text: "We are what we think. All that we are arises with our thoughts. With our thoughts, we make the world.",
    author: "Buddha",
    category: "mindfulness"
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    category: "motivational"
  },
  {
    text: "Success consists of going from failure to failure without loss of enthusiasm.",
    author: "Winston Churchill",
    category: "success"
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Abraham Lincoln",
    category: "motivational"
  },
  {
    text: "You define your own life. Don't let other people write your script.",
    author: "Oprah Winfrey",
    category: "motivational"
  },
  {
    text: "The secret to happiness is freedom... And the secret to freedom is courage.",
    author: "Thucydides",
    category: "happiness"
  },
  {
    text: "Everything has beauty, but not everyone can see it.",
    author: "Confucius",
    category: "mindfulness"
  },
  {
    text: "Life is really simple, but we insist on making it complicated.",
    author: "Confucius",
    category: "mindfulness"
  },
  {
    text: "Don’t watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
    category: "motivational"
  },
  {
    text: "In three words I can sum up everything I've learned about life: it goes on.",
    author: "Robert Frost",
    category: "motivational"
  },
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha",
    category: "mindfulness"
  },
  {
    text: "Keep your face always toward the sunshine—and shadows will fall behind you.",
    author: "Walt Whitman",
    category: "motivational"
  },
  {
    text: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier",
    category: "success"
  },
  {
    text: "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill",
    category: "success"
  },
  {
    text: "Happiness is not by chance, but by choice.",
    author: "Jim Rohn",
    category: "happiness"
  },
  {
    text: "Don’t wait for the perfect moment. Take the moment and make it perfect.",
    author: "Anonymous",
    category: "motivational"
  },
  {
    text: "Do not wait to strike till the iron is hot, but make it hot by striking.",
    author: "William Butler Yeats",
    category: "success"
  },
  {
    text: "Life is not measured by the number of breaths we take, but by the moments that take our breath away.",
    author: "Anonymous",
    category: "happiness"
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
    category: "mindfulness"
  },
  {
    text: "Difficulties in life are intended to make us better, not bitter.",
    author: "Dan Reeves",
    category: "motivational"
  },
  {
    text: "To live is the rarest thing in the world. Most people exist, that is all.",
    author: "Oscar Wilde",
    category: "mindfulness"
  },
  {
    text: "Life is 10% what happens to us and 90% how we react to it.",
    author: "Charles R. Swindoll",
    category: "motivational"
  },
  {
    text: "Happiness is the highest good.",
    author: "Aristotle",
    category: "happiness"
  },
  {
    text: "Success doesn’t come from what you do occasionally, it comes from what you do consistently.",
    author: "Marie Forleo",
    category: "success"
  },
  {
    text: "Success is not how high you have climbed, but how you make a positive difference to the world.",
    author: "Roy T. Bennett",
    category: "success"
  },
  {
    text: "If you want to be happy, be.",
    author: "Leo Tolstoy",
    category: "happiness"
  },
  {
    text: "Happiness is a choice, not a result. Nothing will make you happy until you choose to be happy.",
    author: "Ralph Marston",
    category: "happiness"
  },
  {
    text: "You have to do the best with what God gave you.",
    author: "Forest Gump",
    category: "motivational"
  },
  {
    text: "Nothing in the world can take the place of Persistence. Talent will not; nothing is more common than unsuccessful men with talent.",
    author: "Calvin Coolidge",
    category: "success"
  },
  {
    text: "Do what you love and you’ll never work a day in your life.",
    author: "Confucius",
    category: "success"
  },
  {
    text: "Success isn’t just about what you accomplish in your life; it’s about what you inspire others to do.",
    author: "Anonymous",
    category: "success"
  },
  {
    text: "A calm and modest life brings more happiness than the pursuit of success combined with constant restlessness.",
    author: "Albert Einstein",
    category: "happiness"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    category: "motivational"
  },
  {
    text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.",
    author: "Ralph Waldo Emerson",
    category: "mindfulness"
  },
  {
    text: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    author: "Ralph Waldo Emerson",
    category: "motivational"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    category: "motivational"
  },
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha",
    category: "mindfulness"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    category: "motivational"
  },
  {
    text: "You must be the change you wish to see in the world.",
    author: "Mahatma Gandhi",
    category: "motivational"
  },
  {
    text: "Our lives begin to end the day we become silent about things that matter.",
    author: "Martin Luther King Jr.",
    category: "motivational"
  },
  
  
  
];

const seedQuotes = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Quote.deleteMany();
    await Quote.insertMany(quotes);
    console.log('Quotes seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedQuotes();