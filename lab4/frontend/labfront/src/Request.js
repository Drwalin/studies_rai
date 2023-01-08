
Request = function(method, endpoint, dataObject, callback) {
	const req = new XMLHttpRequest();
	req.onload = (e) => {
		callback(JSON.parse(req.response));
	};
	req.open(method, "https://localhost:5001"+endpoint);
	if(method == "POST")
		req.setRequestHeader("Content-Type", "application/json");
	req.setRequestHeader("accept", "*/*");
	if(window.token !== undefined) {
		req.setRequestHeader("Access-Control-Allow-Origin", "true");
		req.setRequestHeader("Authorization", token);
    }
	if(dataObject !== undefined)
		req.send(JSON.stringify(dataObject));
	else
		req.send();
}