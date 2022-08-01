export async function load() {
	const res = await fetch('/place')
		.then((res) => res.json())
		.then((data) => data);
	return res.querry;
}
