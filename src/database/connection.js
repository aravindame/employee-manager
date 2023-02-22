import mongoose from 'mongoose';
import EmployeeModel from './Models/employee';
import * as data from '@/data/employees.json';

const MONGODB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PWD}@cluster0.jwrama9.mongodb.net/test`;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the DB_USERNAME and DB_PWD environment variable inside .env.local',
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

// Check the cached before initializing a new instance.
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 *
 * This function establishes a connection with the MongoDB database using Mongoose.
 * If a connection is already established, it returns the existing connection from the cache.
 * If a connection is not already established, it creates a new connection using the provided MongoDB URI
 * and caches the connection for future use.
 * @returns {Promise<mongoose.Connection>} Returns a promise that resolves to a mongoose.Connection object.
 */

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  initDb();
  return cached.conn;
}

/**
 *
 * This function initializes the database by checking if there are any employees in the EmployeeModel collection.
 * If there are no employees, it inserts the employees data from an external source.
 * @returns {Promise<void>} Returns a promise that resolves to void.
 */

async function initDb() {
  const employees = await EmployeeModel.find({});
  if (employees?.length === 0) await EmployeeModel.insertMany(Array.from(data));
}

export default dbConnect;
