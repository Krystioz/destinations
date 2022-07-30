import { connectToDatabase } from '$lib/mongodb';
import { ObjectId } from 'mongodb';

export async function get(request: any) {
	try {
		const dbConnection = await connectToDatabase();
		const db = dbConnection.db;
		const collection = db.collection('Countries');
		const Country = await collection.findOne();
		console.log(
			await collection
				.findOne()
		)

		return {
			status: 200,
			body: {
				db: Country
			}
		};
	} catch (err) {
		return {
			status: 500,
			body: {
				error: `Error occured : ${err}`
			}
		};
	}
}
