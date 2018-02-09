var express = require('express');
var bodyParser = require('body-parser');
var file = require('./src/node/js/file-r-w.js');
var buttState = require('./src/node/js/button-state') 


// buttState.setButton(4, "Капалдъ", "on");

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use( bodyParser.json() );  

app.use(express.static(__dirname + "/dist/js/"))
app.use(express.static(__dirname + "/src/html/"))
app.use(express.static(__dirname + "/src/css/"))
app.use(express.static(__dirname + "/src/images/lamps/"))


app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get('/home.html', function(req, res){
	console.log("Req URL: " + req.url)
  	res.sendFile(__dirname + '/src/html/home.html');
});


app.get('/get-credentials', function(req, res){
	console.log("Req URL: " + req.url);
	res.send(JSON.stringify(file.getCredentials()))
});

app.get('/change-credentials.html', function(req, res){
	console.log("Req URL: " + req.url)
  	res.sendFile(__dirname + '/src/html/change-credentials.html');
});


/*
 *Credentials are received from the login page of the client. If they match the user is navigated to the home page
 *if they don't match the user get text reponse "Wrong credentials". 
 */
app.post('/credentials.js', function(req, res){ //At login
	var data = req.body;
 	console.log("Post Credentials: " + req.url);
 	console.log("Data: " + data.password);
 	var credMatch = file.checkCredentials(data.username, data.password);
 	console.log(credMatch);
 	if(credMatch === true) {
 		res.send('true');
 	}
 	else {
 		res.send("Wrong credentials")
 	}
});

//== Receive new credentials to be saved into the file. The verification is made on the client side.
app.post('/change-credentials', function(req, res){
	var data = req.body;
 	console.log("Post Credentials: " + req.url);
 	console.log("Data: " + JSON.stringify(data));
 	file.setCredentials(data.username, data.password)
 	res.send("Credentials Saved!");
});


app.get("/home-status", function(req, res) {
	console.log("Get url: " + req.url);
	res.sendFile(__dirname + "/src/node/txt/switch-state.json")
})

/*
	Handles objects that are to be chage button and/or name of the home page
	When new object arrives, it chnages the object into the file "swtich-state.json"
	These stattes need to be saved into a file or energy independednt memory.
*/
app.post("/home-status", function(req, res) {
	var data = req.body;
	console.log("Post url: " + req.url);
 	console.log("Data: " + JSON.stringify(data) + ",  Typeof data: " + typeof(data));
 	var buttonKey = Object.keys(data)[0];
 	console.log(buttonKey)
 	buttState.setButton(buttonKey, data[buttonKey].name, data[buttonKey].switchState);
 	res.send("true")
})

app.get('*', function(req, res){
 console.log("Get ANY: " + req.url);
});

app.post("*", function(req, res) {
	var data = req.body;
	console.log("Post ANY - url: " + req.url);
 	console.log("Data: " + JSON.stringify(data));
})



app.listen(80);
console.log("App is listening on port 80")