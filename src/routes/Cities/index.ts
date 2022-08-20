import { getCities, getCountryCities } from '$lib/mongodb/db';

export async function get({ request }: any) {
	try {
		const url = new URL(request.url);
		const xid = url.searchParams.get('country');

		const query = await getCountryCities(xid);

		return {
			status: 200,
			body: {
				query
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

// const http = require('http');
// http
// 	.createServer(function (req, res) {
// 		res.write('hello, world!');
// 		``;
// 		res.end();
// 	})
// 	.listen(8080);
// console.log('server started ! listening on port 8080');
