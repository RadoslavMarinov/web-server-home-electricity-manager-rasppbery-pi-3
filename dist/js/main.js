
/* app.js ********************************************************************/
var app = angular.module('app', ['ui.router']);

/* controller-home.js ********************************************************/
app.controller("homeController", function($scope, $http, $state, $compile) {
	$scope.heading = "SWITCHES";

	$scope.imageSrc = {
		button1: "LitLamp.png", 
		button2: "LitLamp.png", 
		button3: "LitLamp.png", 
		button4: "LitLamp.png", 
	}

	$scope.buttName = {
		button1: "Хол", 
		button2: "Кухня", 
		button3: "Гараж", 
		button4: "Балкон", 	
	}

	loadHomeStatus();

	$scope.addInput = function(id) {
		var divEl = angular.element(document.querySelector('#' + id));

		//== Input field to change the button text.
		var inputElStr = "<div id='" + id + "inputDiv'><br><input ng-model='buttName." + id + "' placeholder='Text'></input><br><br></div>"
		var inputEl = $compile(inputElStr)($scope)
		divEl.prepend(inputEl)

		//== Paragraph with text "change"
		var parEl = angular.element(document.querySelector('#' + id + ' ' + 'p'))
		parEl.remove();
		
		//== Save button
		var butElStr = "<button id='" + id + "SaveButt' ng-click='postButtName(\"" + id + "\")'>{{'Sa' + 've'}}</button>"
		var butEl = $compile(butElStr)($scope)
		divEl.prepend(butEl)
	}

	$scope.postButtName = function(id) {
		console.log(id)
		//== Remove Save Button
		var saveButt = angular.element(document.querySelector("#" + id + "SaveButt"));
		saveButt.remove();
		//== Romove the DIV container of the Input Field along with the new libe tags <br><br>
		var divInputEl = angular.element(document.querySelector("#" + id + 'inputDiv'));
		divInputEl.remove();
		//== Get/Prepare the div element to which we shall prepend the paragrap
		var divEl = angular.element(document.querySelector("#" + id));
		//== The paragraph "Change" was removed upon clicking it, now we have to recreate it.
		var parChangeElStr = "<p id=\""+ id + "ParChange\" ng-click=\"addInput('" + id + "')\">Change</p>"
		var parChangeEl = $compile(parChangeElStr)($scope);
		divEl.prepend(parChangeEl);
		//== Post the button name
		postChange(id, $scope.buttName[id], undefined)
	}

	$scope.onOf = function(button) {
		var buttState;

		if ($scope.imageSrc[button] === "LitLamp.png") {
			$scope.imageSrc[button] = "NotLit.png";
			buttState = "off";
		}
		else if($scope.imageSrc[button] === "NotLit.png") {
			$scope.imageSrc[button] = 	"LitLamp.png";
			buttState = "on";
		}
		else {
			alert("Wrong image soruce")
		}
		postChange(button, undefined, buttState);
	}

	//== POST changes to the server
	/* button <string> {button1 ... button4}
	   name <string>
	   switchState {"on","off"}
	*/
	function postChange(button, name, switchState) {
		var data = {};

		data[button] = {};

		if(name !== undefined) {
			data[button].name = name;
		}

		if( switchState !== undefined) {
			data[button].switchState = switchState;
		}

		var config = {
			headers: {
					'Content-Type': 'application/json'
				}
		}

		$http.post('home-status', data, config)
			.then(function(res) { // ON SUCCESS
					console.log("Post successful! Status: " + res.status + ' ' + res.statusText + '\n Res Data: ' + res.data);
					if(res.data === "true") {
					}
					else {
						alert("Wrong data - see console!");
						console.log("See file 'button-state.js' for valud arguments for the function setButton()")
					}
				},
				function(res) { // ON FAILURE
					console.log("Post failed! Status: " + res.status + ' ' + res.statusText)	
				}
			);
	}

	function loadHomeStatus() {
		console.log("Get home status!")
		$http.get("home-status")
			.then(function(res) { // Successful respobse handler
				var resData = res.data;
				console.log(JSON.stringify(resData) + " has type of " + typeof(resData))


				for( button in resData) {
					// Update button names
					$scope.buttName[button] = resData[button].name;

					// Update swtich state
					$scope.imageSrc[button] = resData[button].switchState === "on" ? "LitLamp.png" : "NotLit.png";
				}

			}, function(res) { // Error handler
				alert("Somethhing  whent wrong with the request " + res.status + ' ' + res.statusText)
			})
	}
})

/* controller-login.js ********************************************************/
app.controller("loginController", function($scope, $http, $state) {
	$scope.ButtonStatus = "Login";

	//== Initializations

	$scope.logIn = function() {
		var data = {
			username: $scope.inputUserName,
			password: $scope.inputPassword 		
		}

		var config = {
			headers: {
					'Content-Type': 'application/json'
				}
		}

		$http.post('credentials.js', data, config)
			.then(function(res) { // ON SUCCESS
					console.log("Post successful! Status: " + res.status + ' ' + res.statusText + '\n Res Data: ' + res.data);
					if(res.data === "true") {
						$state.go('home');
					}
					else {
						alert("Wrong Username or Password!");
					}
				},
				function(res) { // ON FAILURE
					console.log("Post failed! Status: " + res.status + ' ' + res.statusText)	
				}
			);
	}
})

/* controlller-change-credentials.js *****************************************/
app.controller("chCredController", function($scope, $http, $state) {

	var receivedCredentials;

	var postCredentials = function(username, password) {
		var data = {
			username: username,
			password: password 		
		}
		var config = {
			headers: {
					'Content-Type': 'application/json'
				}
		}
		$http.post('change-credentials', data, config)
			.then(function(res) { // ON SUCCESS
					console.log("Post successful! Status: " + res.status + ' ' + res.statusText + '\n Res Data: ' + res.data);
					$state.go('login');
				},
				function(res) { // ON FAILURE
					console.log("Post failed! Status: " + res.status + ' ' + res.statusText)	
				}
			);
	}

	$scope.submit = function() {
		
		$http.get("/get-credentials")
	    .then(function(response) {
	        receivedCredentials = response.data;

	        //== Dispatch and validate inputs
	        if(receivedCredentials.password != $scope.oldPassword) {
	        	alert("Old password doesnt match");
	        }
	        else if($scope.newUsername === undefined) {
	        	alert("New username must not be empty!")
	        }
	        else if($scope.newPassword === undefined) {
	        	alert("New password field must not be empty!")
	        }
	        else if( $scope.newPassword !== $scope.repeatedNewPassword) {
	        	alert("The new passwords doesnt match!")
	        }
	        // All inputs are valid, now post the new credentials to the server
	        else {
	        	console.log("Password Match")
	        	console.log("new username: " + $scope.newUsername)
	        	postCredentials($scope.newUsername, $scope.newPassword)
	        }
	    });
	}	
})

/* state-change-credentials.js ***********************************************/
app.config(['$stateProvider', function($stateProvider) {
	
	var stChangeCredentials = {
		name: "changeCredentials",
		templateUrl: "/change-credentials.html"
	}

  	$stateProvider.state(stChangeCredentials);
}]);


/* state-home.js *************************************************************/
app.config(['$stateProvider', function($stateProvider) {
	var stHome = {
		name: "home",
		templateUrl: "/home.html" 
	}

	$stateProvider.state(stHome);
}]);

/* state-login.js ******************************************************************/
app.config(['$stateProvider', function($stateProvider) {
	
	var stRiko = {
		name: "login",
		templateUrl: "/login.html"
	}

  	$stateProvider.state(stRiko);
}]);
//== confugure the default state to be triggered at start
app.config(function($urlRouterProvider){
    	$urlRouterProvider.otherwise(function($injector) {
    	var $state = $injector.get('$state');
    	$state.go('login');
	});
})