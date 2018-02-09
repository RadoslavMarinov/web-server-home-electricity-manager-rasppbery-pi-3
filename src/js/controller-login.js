
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