import { addPlace, findPlace } from '$lib/mongodb/db';

export async function get({ request }: any) {
	try {
		const url = new URL(request.url);
		const xid = url.searchParams.get('xid');

		const query = await findPlace(xid);

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

export async function post({ request }: any) {
	try {
		await addPlace({ request });

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
