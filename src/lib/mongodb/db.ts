import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
	throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!MONGODB_DB) {
	throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

const url = MONGODB_URI;
const client = new MongoClient(url);

async function connectToDatabase(coll: string) {
	await client.connect();
	console.log('Succesfully connnected to the server');
	const db = client.db(MONGODB_DB);
	const collection = db.collection(coll);
	return collection;
}

export async function getCities() {
	const collection = await connectToDatabase('Cities');
	const query = await collection.find({}).toArray();
	return query;
}

export async function getCountries() {
	const collection = await connectToDatabase('Countries');
	const querry = await collection.find({}).toArray();
	return querry;
}

export async function findPlace(xid: string | null) {
	const collection = await connectToDatabase('Places');
	const query = await collection.findOne({ xid });
	return query;
}

export async function addPlace({ request }: any) {
	const collection = await connectToDatabase('Places');
	const data = await request.json();
	await collection.insertOne(data);
}

export async function getCountryCities(country: any) {
	const collection = await connectToDatabase('Cities');
	const query = await collection.find({ country }).toArray();
	return query;
}
