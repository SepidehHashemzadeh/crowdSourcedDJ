export async function getUserInfo(id) {
	var url = 'https://djque.herokuapp.com/?query=';
	var query = "SELECT * FROM Users WHERE id='"+id+"';";
	let response = await fetch(encodeURI(url + query));
	let data = await response.json();
	return data;
};
export async function getEventInfo(id) {
	var url = 'https://djque.herokuapp.com/?query=';
	var query = "SELECT * FROM Events WHERE id='"+id+"';";
	let response = await fetch(encodeURI(url + query));
	let data = await response.json();
	return data;
};
export default async function runQuery(query) {
	var url = 'https://djque.herokuapp.com/?query=';
	let response = await fetch(encodeURI(url + query));
	let data = await response.json();
	return data;
};