
const client = require('./client');
const {
  getUserByToken,
  createUser,
  authenticate
} = require('./User');
const {createProduct} = require('./Products')
const {createCategory} = require('./Categories')
const {addProduct} = require ('./CartProducts')
const {createReview} = require('./Reviews');


const syncTables = async () => {
  const SQL = `
  DROP TABLE IF EXISTS cart_products;
  DROP TABLE IF EXISTS reviews;
  DROP TABLE IF EXISTS categories;
  DROP TABLE IF EXISTS carts;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS users;
  
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    "isAdministrator" BOOLEAN DEFAULT false
  );

  CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    stock INTEGER NOT NULL,
    rarity INTEGER NOT NULL,
    "imageURL" VARCHAR(250)  
  );

  CREATE TABLE carts(
    id SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES users(id)
  );

  CREATE TABLE cart_products(
    id SERIAL PRIMARY KEY,
    "productsId" INTEGER REFERENCES products(id),
    "cartId" INTEGER REFERENCES carts(id),
    quantity INTEGER NOT NULL
  );

  CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    "productsId" INTEGER REFERENCES products(id),
    category VARCHAR(100) NOT NULL 
  );

  CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    "productsId" INTEGER REFERENCES products(id),
    "userId" INTEGER REFERENCES users(id),
    review TEXT NOT NULL
  );

  `;
  await client.query(SQL);
};

const syncAndSeed = async () => {
  await syncTables();
  const [moe, lucy] = await Promise.all([
    createUser({
      username: "moe",
      password: "moe_password",
      name: "Moe Problems",
      email: "moe.pro@email.com",
      isAdministrator: false,
    }),
    createUser({
      username: "lucy",
      password: "lucy_password",
      name: "Lucy Lucky",
      email: "lucy.lucky@email.com",
      isAdministrator: true,
    }),
  ]);
  console.log("--- seeded users ---");
  console.log(moe);
  console.log(lucy);

  const [wand, staff] = await Promise.all([
    createProduct({
      name: "wand",
      description: "A wooden practice wand for novices.",
      price: 15,
      stock: 200,
      rarity: 1,
      category: "weapon"
    }),
    createProduct({
      name: "staff",
      description:
        "A simple wooden staff for novices. Also works as a walking stick",
      price: 20,
      stock: 200,
      rarity: 1,

      category: "weapon"
    })
  ])

  console.log("--seeded products--");
  console.log(wand);
  console.log(staff);

const [item1, item2] = await Promise.all([
  addProduct({
    productId: 1,
    cartId: 1,
    quantity: 4
  }),
  addProduct({
    productId: 2,
    cartId: 2,
    quantity: 3
  })
])
console.log("--seeded cart products--");
console.log(item1);
console.log(item2);

  const [review1, review2] = await Promise.all([
    createReview({
      productsId:1,
      userId:2,
      review: "Very well made. Doesn't feel flimsy in my hand. While not powerfull gets the job done."
    }),
    createReview({
      productsId:1,
      userId:1,
      review: "Simple but efective."
    })
  ])
  console.log("--Seed Reviews--");
  console.log(review1);
  console.log(review2);

};

module.exports = {
  syncAndSeed,
  createUser,
  authenticate,
  getUserByToken,
  createProduct,
  createReview,
  createCategory,
  addProduct,
  client
};
