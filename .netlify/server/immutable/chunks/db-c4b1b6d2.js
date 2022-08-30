var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  a: () => addPlace,
  b: () => getCountryCities,
  f: () => findPlace,
  g: () => getCountries
});
module.exports = __toCommonJS(stdin_exports);
var import_dotenv = __toESM(require("dotenv"));
var import_mongodb = require("mongodb");
import_dotenv.default.config();
const { MONGODB_URI, MONGODB_DB } = process.env;
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}
if (!MONGODB_DB) {
  throw new Error("Please define the MONGODB_DB environment variable inside .env.local");
}
const url = MONGODB_URI;
const client = new import_mongodb.MongoClient(url);
async function connectToDatabase(coll) {
  await client.connect();
  console.log("Succesfully connnected to the server");
  const db = client.db(MONGODB_DB);
  const collection = db.collection(coll);
  return collection;
}
async function getCountries() {
  const collection = await connectToDatabase("Countries");
  const querry = await collection.find({}).toArray();
  return querry;
}
async function findPlace(xid) {
  const collection = await connectToDatabase("Places");
  const query = await collection.findOne({ xid });
  return query;
}
async function addPlace({ request }) {
  const collection = await connectToDatabase("Places");
  const data = await request.json();
  await collection.insertOne(data);
}
async function getCountryCities(country) {
  const collection = await connectToDatabase("Cities");
  const query = await collection.find({ country }).toArray();
  return query;
}
