
const client = require('./client');
const {
  getUserByToken,
  createUser,
  authenticate
} = require('./User');
const {createProduct, deleteProduct} = require('./Products')
const {createCategory} = require('./Categories')
const {addProduct, emptyCart, removeItem, changeQuantity} = require ('./CartProducts')
const {createReview, getReviewsByProductId, getReviewsByUserId} = require('./Reviews');
const {attachReviews, getAllProducts, getProductsByCategory} = require('./Products')
const {getUserCart} = require("./Carts")

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
    quantity INTEGER NOT NULL,
    UNIQUE ("productsId", "cartId")
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

  const [wand, staff, bagOfHolding] = await Promise.all([
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
    }),
    createProduct({
      name: "Bag of Holding",
      description:"A bag that is bigger on the inside. Holds up to 500lbs and has a volume of 64 cubic feet. Warning: do not put inside of another bag of holding or a portable hole.",
      price: 500,
      stock: 150,
      rarity: 3,
      imageURL: "https://www.dndbeyond.com/avatars/thumbnails/7/120/1000/1000/636284708068284913.jpeg",
      category: "tool"
    }),
    createProduct({
      name:"Immovable Rod",
      description: "A rod that when activated will not move from the spot it was placed.",
      price:650,
      stock:230,
      rarity:3,
      imageURL:"https://www.dndbeyond.com/avatars/thumbnails/7/261/1000/1000/636284741670235041.jpeg",
      category:"tool"
    }),
    createProduct({
      name:"Vorpal Sword",
      description:"A powerful magic sword that can snicker-snack a head off a monster with ease.",
      price: 2000000,
      stock:2,
      rarity:5,
      imageURL: "https://www.dndbeyond.com/avatars/thumbnails/7/462/1000/1000/636284780691337497.jpeg",
      category: "weapon"
    }),
    createProduct({
      name:"Rebellion Replica",
      description: "A replica of a sword weilded by a demon hunter. While not as powerful as the origional it still packs a punch.",
      price:560,
      stock:602,
      rarity:2,
      imageURL: "https://static.wikia.nocookie.net/devilmaycry/images/9/91/Rebellion_DMC5.png/revision/latest?cb=20181028035650",
      category: "weapon"
    })
  ])

  console.log("--seeded products--");
  console.log(wand);
  console.log(staff);
  console.log(bagOfHolding);

const [item1, item2, item3] = await Promise.all([
  addProduct({
    productsId: 1,
    cartId: 1,
    quantity: 4
  }),
  addProduct({
    productsId: 2,
    cartId: 2,
    quantity: 3
  }),
  addProduct({
    productsId:2,
    cartId:2,
    quantity:4
  })
])
console.log("--seeded cart products--");
console.log(item1);
console.log(item2);
console.log(item3);

  const [review1, review2] = await Promise.all([
    createReview({
      productsId:1,
      userId:2,
      review: "Very well made. Doesn't feel flimsy in my hand. While not powerfull gets the job done."
    }),
    createReview({
      productsId:1,
      userId:1,
      review: "Simple but effective."
    })
  ])
  console.log("--Seed Reviews--");
  console.log(review1);
  console.log(review2);

 const newAmount = await changeQuantity({cartId:1, productsId:1, quantity:8});
 console.log("--New Amount--");
 console.log(newAmount);

  
 const deleteIt = await deleteProduct({id: 1})
 console.log('--Delete Product--');
 console.log(deleteIt);


 const allProducts = await getAllProducts()
 console.log("-- all products --")
 console.log(allProducts)
 
 console.log("---all categories---");
 console.log(await getProductsByCategory({category:"tool"}))


  const getCart = await getUserCart({userId:1});
  console.log("--user cart by id--");
  console.log(getCart);


};


module.exports = {
  syncAndSeed,
  createUser,
  authenticate,
  getUserByToken,
  createProduct,
  createReview,
  deleteProduct,
  createCategory,
  addProduct,
  emptyCart,
  removeItem,
  changeQuantity,
  getReviewsByProductId,
  getProductsByCategory,
  getReviewsByUserId,
  getAllProducts,
  client
};
