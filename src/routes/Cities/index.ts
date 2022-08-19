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

const http = require('http');
http
	.createServer(function (req, res) {
		res.write('hello, world!');
		``;
		res.end();
	})
	.listen(8080);
console.log('server started ! listening on port 8080');
