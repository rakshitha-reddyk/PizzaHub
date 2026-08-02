import margherita from "@/assets/pizza-margherita.jpg";
import bbq from "@/assets/pizza-bbq.jpg";
import cheese from "@/assets/pizza-cheese.jpg";
import veggie from "@/assets/pizza-veggie.jpg";
import pepperoni from "@/assets/pizza-pepperoni.jpg";
import garlic from "@/assets/garlic-bread.jpg";
import pasta from "@/assets/pasta.jpg";
import dessert from "@/assets/dessert.jpg";
import drink from "@/assets/drink.jpg";

export type Category = "Pizza" | "Garlic Bread" | "Pasta" | "Desserts" | "Drinks";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  veg: boolean;
  rating: number;
  tags?: string[];
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Classic Margherita",
    description: "San Marzano tomato, fior di latte, basil, extra virgin olive oil.",
    price: 12.9,
    image: margherita,
    category: "Pizza",
    veg: true,
    rating: 4.8,
    tags: ["Bestseller"],
  },
  {
    id: "p2",
    name: "Smokehouse BBQ Chicken",
    description: "Slow-cooked chicken, red onion, cilantro, house BBQ glaze.",
    price: 15.5,
    image: bbq,
    category: "Pizza",
    veg: false,
    rating: 4.7,
    tags: ["Chef's pick"],
  },
  {
    id: "p3",
    name: "Quattro Formaggi",
    description: "Mozzarella, parmesan, gorgonzola, ricotta on white base.",
    price: 14.9,
    image: cheese,
    category: "Pizza",
    veg: true,
    rating: 4.6,
  },
  {
    id: "p4",
    name: "Garden Veggie Supreme",
    description: "Bell peppers, olives, mushrooms, onions, roasted tomato.",
    price: 13.9,
    image: veggie,
    category: "Pizza",
    veg: true,
    rating: 4.5,
  },
  {
    id: "p5",
    name: "Double Pepperoni",
    description: "Two layers of cured pepperoni with molten mozzarella.",
    price: 14.5,
    image: pepperoni,
    category: "Pizza",
    veg: false,
    rating: 4.9,
    tags: ["Bestseller"],
  },
  {
    id: "p6",
    name: "Herb Garlic Breadsticks",
    description: "Golden breadsticks brushed with garlic butter & herbs.",
    price: 5.9,
    image: garlic,
    category: "Garlic Bread",
    veg: true,
    rating: 4.6,
  },
  {
    id: "p7",
    name: "Creamy Penne Alfredo",
    description: "Al dente penne in silky parmesan cream sauce.",
    price: 9.9,
    image: pasta,
    category: "Pasta",
    veg: true,
    rating: 4.4,
  },
  {
    id: "p8",
    name: "Molten Chocolate Cake",
    description: "Warm chocolate cake with a flowing molten center.",
    price: 6.5,
    image: dessert,
    category: "Desserts",
    veg: true,
    rating: 4.9,
  },
  {
    id: "p9",
    name: "Iced Cola 500ml",
    description: "Chilled classic cola, ice-cold, perfect pairing.",
    price: 2.9,
    image: drink,
    category: "Drinks",
    veg: true,
    rating: 4.3,
  },
];

export const categories: { name: Category; icon: string }[] = [
  { name: "Pizza", icon: "🍕" },
  { name: "Garlic Bread", icon: "🥖" },
  { name: "Pasta", icon: "🍝" },
  { name: "Desserts", icon: "🍰" },
  { name: "Drinks", icon: "🥤" },
];

export const deals = [
  {
    id: "d1",
    title: "Buy 1 Get 1 Free",
    subtitle: "On all Medium pizzas, every Tuesday.",
    code: "BOGO",
    badge: "Popular",
    accent: "brand",
  },
  {
    id: "d2",
    title: "Family Feast",
    subtitle: "2 Large pizzas + 2 sides + 4 drinks — save 30%.",
    code: "FAMILY30",
    badge: "Best value",
    accent: "ink",
  },
  {
    id: "d3",
    title: "Weekend Special",
    subtitle: "Flat 25% off orders above $30 all weekend.",
    code: "WKND25",
    badge: "Limited",
    accent: "blue",
  },
  {
    id: "d4",
    title: "Late Night Bites",
    subtitle: "Free garlic bread with pizzas after 9 PM.",
    code: "NIGHTOWL",
    badge: "Free item",
    accent: "brand",
  },
];

export const reviews = [
  {
    id: 1,
    name: "Priya S.",
    quote: "The crust is unreal — crispy edge, pillowy inside. My new default order.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus T.",
    quote: "Order to doorstep in 22 minutes and still steaming. Insane.",
    rating: 5,
  },
  { id: 3, name: "Ana R.", quote: "The Quattro Formaggi is dangerous. In a good way.", rating: 5 },
];
