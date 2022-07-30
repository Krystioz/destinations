export async function get(request) {
	const completed = request.query.get('completed') === 'true' ? true : false;
	return {
		status: 200,
		body: {
			completed: completed
		}
	};
	// } catch (err) {
	// 	return {
	// 		status: 500,
	// 		body: {
	// 			error: 'Server error'
	// 		}
	// 	};
	// }
}

export async function post(request) {}

export async function put(request) {}

export async function del(request) {}
