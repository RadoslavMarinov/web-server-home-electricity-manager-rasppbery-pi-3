const fs = require('fs');


function setCredentials(username, password) {
	var credFileObj = JSON.parse(fs.readFileSync("./src/node/txt/credentials.json", "utf8"));
	console.log(credFileObj);
	credFileObj.username = username;
	credFileObj.password = password;
	console.log(credFileObj);
	fs.writeFileSync("./src/node/txt/credentials.json", JSON.stringify(credFileObj));	
}

function getCredentials() {
 	var credFileObj = JSON.parse(fs.readFileSync("./src/node/txt/credentials.json", "utf8"));
 	return credFileObj;
}

//== Returns TRUE if credential match
function checkCredentials(username, password) {
	var fileCred = getCredentials();
	if(username === fileCred.username && password === fileCred.password) {
		return true;
	}
	return false;
}

function sayHello() {
	console.log("Hello");
}

module.exports = {
	sayHello: sayHello,
	getCredentials: getCredentials,
	setCredentials: setCredentials,
	checkCredentials: checkCredentials
}