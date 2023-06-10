import {
  randCity,
  randCountry,
  randEmail,
  randFood,
  randImg,
  randLastName,
  randNumber,
  randPhoneNumber,
  randStreetName,
  randText,
  randZipCode,
} from "@ngneat/falso";
import { connectToDB } from "./src/database/mongodb.js";
import Restaurant from "./src/models/restaurant.model.js";
import { IRestaurant, IRestaurantData } from "./src/interfaces/IRestaurant.js";
import Product from "./src/models/product.model.js";

async function seedData() {
  await connectToDB();

  for (let i = 0; i < 20; i++) {
    const restaurant = await createRestaurant();
    await createProducts(restaurant, 20);
  }

  console.log("Fake data generated!");
}

async function createRestaurant() {
  const address = {
    state: randCountry(),
    city: randCity(),
    street: randStreetName(),
    zip: randZipCode(),
  };
  const restaurant: IRestaurantData = {
    name: randLastName() + " retaurant",
    email: randEmail(),
    address: address,
    phone: randPhoneNumber(),
  };
  const createdRestaurant = await Restaurant.create(restaurant);
  return createdRestaurant;
}

async function createProducts(restaurant: IRestaurant, amount: number) {
  for (let i = 0; i < amount; i++) {
    const food = randFood();
    const product = {
      name: food,
      description: randText(),
      category: food,
      image: randImg(),
      price: randNumber({ min: 1500, max: 10000 }),
      restaurant_id: restaurant._id,
    };
    await Product.create(product);
  }
}

seedData();
