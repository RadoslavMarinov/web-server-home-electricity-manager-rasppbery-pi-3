
/* state-home.js *************************************************************/
app.config(['$stateProvider', function($stateProvider) {
	var stHome = {
		name: "home",
		templateUrl: "/home.html" 
	}

	$stateProvider.state(stHome);
}]);