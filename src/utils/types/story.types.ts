import { UserType } from "../providers/UserContextProvider"

export type StoryBaseType = {
  id: Number
  title: string
  creationDate: Date
  lastModifiedDate: Date
  user: UserType
}
export type StoryDisplayType = StoryBaseType & { description: string }
export type StoryContentType = StoryBaseType & { content: string }

export const stories: (StoryDisplayType & StoryContentType)[] = [
  {
    id: 1,
    title: "Exploring the Enchanted Forest",
    description: "Embark on a magical journey through the mystical Enchanted Forest.",
    content: `Once upon a time, in a land far, far away, there existed a mesmerizing Enchanted Forest. The trees whispered ancient secrets, and the air was filled with the sweet scent of blooming flowers. As the sun dipped below the horizon, casting a warm glow, a brave adventurer set forth to explore the wonders hidden within.
  
    The journey began at the edge of the forest, where a sparkling stream meandered through lush greenery. Birds sang melodious tunes, and colorful butterflies danced in the sunlight. Each step led deeper into the heart of nature's enchantment, revealing a tapestry of sights and sounds that captivated the senses.
  
    Amidst the foliage, the adventurer stumbled upon a forgotten ruin, its crumbling walls telling tales of a bygone era. The discovery ignited a thirst for knowledge about the history and mysteries surrounding this magical realm.
  
    As night fell, the forest transformed into a mystical wonderland illuminated by the soft glow of fireflies. The adventurer marveled at the celestial display overhead, feeling a profound connection to the universe. With a heart full of gratitude, they decided to make camp under the ancient trees, eager to continue the exploration at the break of dawn.`,
    creationDate: new Date("2024-02-10"),
    lastModifiedDate: new Date("2024-02-10"),
    user: { id: 101, email: "test@gmail.com", penName: "Arthur Himmoty" }
  },
  {
    id: 2,
    title: "A Culinary Expedition: Flavors of the World",
    description: "Embark on a global gastronomic adventure, savoring the diverse flavors of the world.",
    content: `In a world where borders blur and cultures intertwine, culinary exploration becomes a passport to a myriad of flavors. This gastronomic expedition takes you on a journey across continents, indulging in the rich tapestry of tastes that define our global palate.
  
    The adventure begins in the bustling markets of Marrakech, where the air is infused with the aroma of exotic spices. Savor the intricacies of a traditional tagine, a symphony of flavors that transports you to the vibrant streets of Morocco. Each bite is a celebration of the region's culinary artistry.
  
    As the expedition moves eastward, the streets of Tokyo beckon with the promise of umami delights. Sushi masters craft delicate creations that are both visually stunning and gastronomically satisfying. The interplay of fresh fish, rice, and soy creates a harmony that transcends cultural boundaries.
  
    Crossing the Atlantic, the journey pauses in the heart of Italy, where pasta and passion intertwine. A plate of handmade ravioli, kissed by the essence of sun-ripened tomatoes, embodies the spirit of Italian culinary mastery. Every bite is a love letter to the art of pasta-making passed down through generations.
  
    The expedition concludes on the shores of Peru, where ceviche reigns supreme. The marriage of citrus, spice, and fresh seafood creates a sensory symphony that lingers on the palate. The culinary globe-trotter, enriched by this flavorful odyssey, returns home with memories of a world united by the love of good food.`,
    creationDate: new Date("2024-02-10"),
    lastModifiedDate: new Date("2024-02-10"),
    user: { id: 102, email: "test2@gmail.com", penName: "Benjamin Timmoty" }
  },
  {
    id: 3,
    title: "Stargazing Nights: A Cosmic Adventure",
    description: "Embark on a celestial journey, exploring the wonders of the night sky.",
    content: `Beneath the vast canvas of the night sky, the cosmos unveils its secrets to those who dare to look up. This celestial adventure invites you to embrace the stillness of the night, gazing at the stars that have witnessed the eons unfold.
  
    The journey begins on a moonlit night, where constellations come alive, weaving stories in the velvety darkness. The Milky Way, a luminous river of stars, guides the way through the cosmic expanse. As the observer lays on a blanket of grass, a sense of awe envelops them, connecting them to the grandeur of the universe.
  
    Telescopes unveil the intricate details of distant planets, each one a unique world with its own mysteries. Jupiter, adorned with swirling storms, dances in the night, while Saturn proudly displays its majestic rings. The observer becomes a cosmic explorer, navigating the celestial wonders with curiosity and wonder.
  
    Meteor showers become celestial fireworks, painting streaks of light across the canvas of the cosmos. Each shooting star carries wishes and dreams, leaving a trail of ephemeral magic in its wake. The observer finds solace in the vastness, pondering the infinite possibilities that exist beyond the confines of our earthly existence.
  
    As dawn approaches, the stars gracefully yield to the gentle glow of the sunrise. The cosmic adventurer, enriched by the beauty of the night sky, carries the memories of this celestial journey into the new day, forever connected to the cosmos.`,
    creationDate: new Date("2024-02-10"),
    lastModifiedDate: new Date("2024-02-10"),
    user: { id: 103, email: "test3@gmail.com", penName: "Roger Bimmoty" }
  },
];