import { connectToDatabase } from '$lib/mongodb/db';

export async function get() {
	try {
		const dbConnection = await connectToDatabase();
		const db = dbConnection.db;
		const collection = await db.collection('Cities');
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
