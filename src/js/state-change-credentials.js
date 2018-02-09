
/* state-change-credentials.js ***********************************************/
app.config(['$stateProvider', function($stateProvider) {
	
	var stChangeCredentials = {
		name: "changeCredentials",
		templateUrl: "/change-credentials.html"
	}

  	$stateProvider.state(stChangeCredentials);
}]);
