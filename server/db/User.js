
const client = require('./client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {createCart, getUserCart} = require('./Carts');
//require("dotenv").config();
const SALT_COUNT = 11;//process.env.SALT_COUNT;
const JWT = process.env.JWT;

const createUser = async ({
  username,
  password,
  name,
  email,
  isAdministrator,
}) => {
  const SQL = `
    INSERT INTO users(username, password, name, email, "isAdministrator")
    VALUES($1, $2, $3, $4, $5) RETURNING *
  `;

  const hashedPassword = bcrypt.hashSync(password, SALT_COUNT);

  const response = await client.query(SQL, [ username, hashedPassword, name, email, isAdministrator ]);
  delete response.rows[0].password;
  const userId = response.rows[0].id
  const cartId = await createCart({userId:userId});
  response.rows[0].cartId = cartId
  return response.rows[0];
};

const getUserByToken = async (token) => {
  const payload = await jwt.verify(token, JWT);
  const SQL = `
    SELECT users.*, carts.id AS "cartId"
    FROM users
    LEFT JOIN carts
    ON users.id = carts."userId"
    WHERE users.id = $1
  `;
  const response = await client.query(SQL, [payload.id]);
  if (!response.rows.length) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  const user = response.rows[0];
  
  delete user.password;
  return user;
};

const authenticate = async ({ username, password }) => {
  const SQL = `
    SELECT *
    FROM users
    WHERE username = $1
  `;


  const response = await client.query(SQL, [username]);
  if (!response.rows.length || !(await bcrypt.compare(password,response.rows[0].password))) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  return jwt.sign({ id: response.rows[0].id }, JWT);
};

async function getUser({ username, password }) {
  try{
    const user = await getUserByUsername(username)
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword)
  if(isValid){
  delete user.password;
  return user;
  }
}
catch(error){
  throw error;
}
}

async function getUserById({userId}) {
 try {
  const {rows} = await client.query(
    `
   SELECT id, username 
   FROM users
   WHERE id = $1
  `,[userId] );
  
  const cart = await getUserCart({userId});
  console.log(cart);
  rows[0].cart = cart;
  delete rows[0].password;
  return rows[0];

 }catch(error){
  throw error;
 }
}

const getUserByUsername = async({username})=>
{
  
  try{
    const SQL =`
    SELECt *
    FROM users
    WHERE username =$1
    ;`

    const {rows} = await client.query(SQL,[username]);
    return rows[0];
  }catch(error)
 {
    throw error;
 }
}

const getAllUsers = async() =>
{
  try{
    const SQL =`
      SELECT *
      FROM users
    ;`

    const {rows} = await client.query(SQL);

    const finsihedList = rows.map((user) =>
      {
        delete user.password;
        return user;
      })
      return finsihedList;
  }catch(error)
  {
    throw error;
  }
}


module.exports = {
  createUser,
  authenticate,
  getUserByToken,
  getUser,
  getUserById,
  getUserByUsername,
  getAllUsers
};
