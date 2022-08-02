import { connectToDatabase } from '$lib/mongodb/db';

export async function get(request: any) {
	try {
		const dbConnection = await connectToDatabase();
		const db = dbConnection.db;
		const collection = await db.collection('Countries');
		const querry = await collection.find({}).toArray();
		return {
			status: 200,
			body: {
				querry
			}
		};
	} catch (err: any) {
		return {
			status: 500,
			body: {
				error: err.message
			}
		};
	}
}

// export async function post(request: any) {
// 	try {
// 		const dbConnection = await connectToDatabase();
// 		const db = dbConnection.db;
// 		const collection = db.collection('Places');
// 		const place = JSON.parse(request.body);
// 		const placeIns = await collection.insertOne(place);
// 		return {
// 			status: 200,
// 			body: {
// 				status: 'Success'
// 			}
// 		};
// 	} catch (err) {
// 		return {
// 			status: 500,
// 			body: {
// 				error: 'err.message'
// 			}
// 		};
// 	}
// }
