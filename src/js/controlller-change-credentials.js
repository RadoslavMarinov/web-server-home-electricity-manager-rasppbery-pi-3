
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