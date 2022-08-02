import { connectToDatabase } from '$lib/mongodb/db';
import { ObjectId } from 'mongodb';

export async function get() {
	try {
		const dbConnection = await connectToDatabase();
		const db = dbConnection.db;
		const collection = await db.collection('Places');
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

export async function post({request}:any) {
	try {
		const dbConnection = await connectToDatabase();
		const db = dbConnection.db;
		const collection = db.collection('Places');
        const data = await request.json()
		// const place = JSON.parse(request.body);
		await collection.insertOne(data);

		return {
			status: 200,
			body: {
				status: 'Success'
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
