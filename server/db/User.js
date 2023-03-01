
const client = require('./client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SALT_COUNT = 11;
const {createCart} = require('./Carts');

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
  const cartId = await createCart(userId);
  response.rows[0].cartId = cartId
  return response.rows[0];
};

const getUserByToken = async (token) => {
  const payload = await jwt.verify(token, JWT);
  const SQL = `
    SELECT users.*
    FROM users
    WHERE id = $1 
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
    SELECT id
    FROM users
    WHERE username = $1 and password = $2
  `;

  const hashedPassword = bcrypt.hashSync(password, SALT_COUNT);


  const response = await client.query(SQL, [username, hashedPassword]);
  console.log(response);
  if (!response.rows.length) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  return jwt.sign({ id: response.rows[0].id }, JWT);
};

module.exports = {
  createUser,
  authenticate,
  getUserByToken,
};
