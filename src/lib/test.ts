import
// import { MongoClient, ServerApiVersion } from 'mongodb';
// // const { MongoClient, ServerApiVersion } = require('mongodb');
// import dotenv from 'dotenv';
// dotenv.config();


// const { MONGODB_URI, MONGODB_DB } = process.env;

// if (!MONGODB_URI) {
// 	throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
// }

// if (!MONGODB_DB) {
// 	throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
// }

// /**
//  * Global is used here to maintain a cached connection across hot reloads
//  * in development. This prevents connections growing exponentiatlly
//  * during API Route usage.
//  */

// let cached = global.mongo;

// if (!cached) {
// 	cached = global.mongo = { conn: null, promise: null };
// }

// export const connectToDatabase = async () => {
// 	if (cached.conn) {
// 		return cached.conn;
// 	}

// 	if (!cached.promise) {
// 		const opts = {
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true
// 		};

// 		cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
// 			return {
// 				client,
// 				db: client.db(MONGODB_DB)
// 			};
// 		});
// 	}
// 	cached.conn = await cached.promise;
// 	return cached.conn;
// };
// // export async function connectToDatabase() {
// // 	let promise;
// // 	let col;
// // 	const uri = MONGODB_URI;
// // 	const client = new MongoClient(uri, {
// // 		useNewUrlParser: true,
// // 		useUnifiedTopology: true,
// // 		serverApi: ServerApiVersion.v1
// // 	});
// // 	promise = (await client.connect()).db('places');
// // 	return promise;
// // }
