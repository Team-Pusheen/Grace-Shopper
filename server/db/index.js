const client = require('./client');
const {
  getUserByToken,
  createUser,
  authenticate
} = require('./User');

const syncTables = async()=> {
  const SQL = `
  DROP TABLE IF EXISTS cart_products;
  DROP TABLE IF EXISTS carts;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS products;
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
     description VARCHAR(250) NOT NULL,
     price INTEGER NOT NULL,
     stock INTEGER NOT NULL,
     rarity INTEGER NOT NULL,
     "imageURL" VARCHAR(250)  
    );

    CREATE TABLE carts(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id)
    );

    CREATE TABLE carts_products(
      id SERIAL PRIMARY KEY,
      "productsId" INTEGER REFERENCES products(id),
      "cartId" INTEGER REFERENCES carts(id),
      quantity INTEGER NOT NULL
    );

  `;
  await client.query(SQL);
};

const syncAndSeed = async()=> {
  await syncTables();
  const [moe, lucy]  = await Promise.all([
    createUser({
      username: 'moe',
      password: 'moe_password'
    }),
    createUser({
      username: 'lucy',
      password: 'lucy_password'
    })
  ]);
  console.log('--- seeded users ---');
  console.log(moe);
  console.log(lucy);
};


module.exports = {
  syncAndSeed,
  createUser,
  authenticate,
  getUserByToken,
  client
};
