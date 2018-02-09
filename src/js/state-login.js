
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