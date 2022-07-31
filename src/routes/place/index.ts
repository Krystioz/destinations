import { connectToDatabase } from '$lib/mongodb/db';

export async function get(request) {
	const dbConnection = await connectToDatabase();
	const db = dbConnection.db;
	const collection = db.collection('Countries');
	console.log(collection);

	return {
		status: 200,
		body: {
			result: db
		}
	};
}
