
const client = require('./client');
const {
  getUserByToken,
  createUser,
  authenticate,
  getUserByEmail
} = require('./User');
const {createProduct, deleteProduct} = require('./Products')
const {createCategory, getAllCategories} = require('./Categories')
const {addProduct, emptyCart, removeItem, changeQuantity} = require ('./CartProducts')
const {createReview, getReviewsByProductId, getReviewsByUserId} = require('./Reviews');

const { getAllProducts, getProductsByCategory, getProductById} = require('./Products')




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
    "imageURL" VARCHAR(1500)  
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
    createUser({
      username: "Admin_Tyler",
      password: "AdminT",
      name: "Tyler",
      email:"tyler.admin@pusheen.com",
      isAdministrator: true,
    })
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
      category: "Weapon"
    }),
    createProduct({
      name: "Staff",
      description:
        "A simple wooden staff for novices. Also works as a walking stick",
      price: 20,
      stock: 200,
      rarity: 1,
      imageURL: "https://oldschool.runescape.wiki/images/thumb/Bryophyta%27s_staff_%28uncharged%29_detail.png/1200px-Bryophyta%27s_staff_%28uncharged%29_detail.png?7ef7e",
      category: "Weapon"
    }),
    createProduct({
      name: "Bag of Holding",
      description:"A bag that is bigger on the inside. Holds up to 500lbs and has a volume of 64 cubic feet. Warning: do not put inside of another bag of holding or a portable hole.",
      price: 500,
      stock: 150,
      rarity: 3,
      imageURL: "https://www.dndbeyond.com/avatars/thumbnails/7/120/1000/1000/636284708068284913.jpeg",
      category: "Tool"
    }),
    createProduct({
      name:"Immovable Rod",
      description: "A rod that when activated will not move from the spot it was placed.",
      price:650,
      stock:230,
      rarity:3,
      imageURL:"https://www.dndbeyond.com/avatars/thumbnails/7/261/1000/1000/636284741670235041.jpeg",
      category:"Tool"
    }),
    createProduct({
      name:"Vorpal Sword",
      description:"A powerful magic sword that can snicker-snack a head off a monster with ease.",
      price: 2000000,
      stock:2,
      rarity:5,
      imageURL: "https://www.dndbeyond.com/avatars/thumbnails/7/462/1000/1000/636284780691337497.jpeg",
      category: "Weapon"
    }),
    createProduct({
      name:"Rebellion Replica",
      description: "A replica of a sword weilded by a demon hunter. While not as powerful as the origional it still packs a punch.",
      price:560,
      stock:602,
      rarity:3,
      imageURL: "https://i.pinimg.com/originals/fe/97/90/fe9790423a874695d4773aec40289bf5.jpg",
      category: "Weapon"
    }),
    createProduct({
      name:"Master Sword Replica",
      description:"A replica of the blade of evil's bane. While it don't have it's evil stopping properties it works very well as an enchanted sword.",
      price:600,
      stock:520,
      rarity:3,
      imageURL:"https://upload.wikimedia.org/wikipedia/en/f/f9/Master_Sword_Lead.png",
      category: "Weapon"
    }),
    createProduct({
      name:"Cloak of the Manta Ray",
      description: "A cloak in the likness of a manta ray. When the hood is pulled up it will let you swim faster and breath underwater. A must for underwater adventuring.",
      price: 450,
      stock: 352,
      rarity:2,
      imageURL:"https://www.dndbeyond.com/avatars/thumbnails/7/170/1000/1000/636284723816150463.jpeg",
      category: "Clothing"
    }),
    createProduct({
      name:"Armor of Invulnerability",
      description:"A armor that makes you invulnerable to mundate attacks for a short time.",
      price: 6965000,
      stock: 2,
      rarity:5,
      imageURL:"https://www.dndbeyond.com/avatars/thumbnails/7/110/1000/1000/636284703543037516.jpeg",
      category: "Armor"
    }),
    createProduct({
      name: "Enchanted Armor",
      description: "Armor that has been enchanted to make it more durable and more protective",
      price: 1950,
      stock: 653,
      rarity:3,
      imageURL:"https://www.aidedd.org/dnd/images-om/plate-armor-of-resistance.jpg",
      category: "Armor"
    }),
    createProduct({
      name: "Cloak of Billowing",
      description:"A cloak that will billow dramatically behind you on your comand.",
      price: 70,
      stock: 300,
      rarity:1,
      imageURL: "https://www.gmbinder.com/images/OGl31Kh.jpg",
      category: "Clothing"
    })
  ])

  console.log("--seeded products--");
  console.log(wand);
  console.log(staff);
  console.log(bagOfHolding);

const [item1, item2, item3] = await Promise.all([
  addProduct({
    productsId: 4,
    cartId: 1,
    quantity: 1
  }),
  addProduct({
    productsId: 2,
    cartId: 2,
    quantity: 3
  }),
  addProduct({
    productsId:3,
    cartId:1,
    quantity:1
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

console.log("--get product by Id--");
console.log(await getProductById({id:2}));

console.log("--get all categories--");
console.log(await getAllCategories());

console.log("--Get user by email--");
console.log(await getUserByEmail({email:"moe.pro@email.com"}))

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
  client,
  
};
