
angular.module('cs591', ['ngCookies'])
    .directive('nameDisplay', function() {
        return {
            scope: true,
            restrict: 'EA',
            template: "<b>This can be anything {{name}}</b>"}
    })
    .controller('cs591ctrl', function($scope, $http, $cookies){

        //READ (GET). Get the data I get from Yelp API
        $scope.getRate1 = function() {
            $http.get('http://localhost:3000/api/rate1update')
                .then(function(response){
                    $scope.rate1 = response.data;

                })
        };

        //READ (GET). Get the data I get from Zomato API
        $scope.getRate2 = function() {
            $http.get('http://localhost:3000/api/rate2update')
                .then(function(response){
                    $scope.rate2 = response.data;

                })
        };
        //Log out
        $scope.logout = function () {
            $http.get('http://localhost:3000/auth/logout')
                .then(function (response) {
                    $scope.authorized = false
                })
        };
        //Log in
        $scope.login = function () {
            const request = {
                method: 'post',
                url: 'http://localhost:3000/auth/login',
                data: {
                    username: $scope.username,
                    password: $scope.password
                }
            }
            $http(request)
                .then(function (response) {
                        $scope.authorized = true
                        $scope.showLogin = false
                    },
                    function (err) {
                        $scope.authorized = false
                    }
                )
        }
        //The Initial Function
        $scope.initApp = function () {
            $scope.buttonState = "create"
            $scope.h2message = "Add user"
            $scope.buttonMessage = "Add User"
            $scope.authorized = false
            $scope.showLogin = false
            //Grab cookies if present
            let authCookie = $cookies.get('authStatus')
            $scope.authorized = !!authCookie
        }
        $scope.showLogin = function () {
            $scope.showLogin = true
        }

        //The Twitter Authorization
        $scope.doTwitterAuth = function () {
            var openUrl = 'http://localhost:3000/auth/twitter/'
            //Total hack, this:
            $scope.authorized = true
            window.location.replace(openUrl)

        }
    })

