app.controller('AuthCtrl', function ($scope, $firebaseAuth, FIREBASE_URI) {

    $scope.loginService = $firebaseAuth(new Firebase(FIREBASE_URI));
    $scope.newUser = { email: '', password: '' };
    $scope.currentUser = null;

    var authData = $scope.loginService.$getAuth();

    if (authData) {
        $scope.currentUser = authData.password.email;
    } else {
        console.log('Logged out');
    }

    $scope.login = function (email, password) {
        $scope.loginService.$authWithPassword({
            email: email,
            password: password

        }).then(function(user) {
            $scope.currentUser = user.password.email;
            $scope.resetForm();

        });
    };


    $scope.register = function (email, password) {
        $scope.loginService.$createUser({
            email: email,
            password: password

        }).then(function() {
            $scope.login(email, password);

        });
    };

    $scope.logout = function () {
        $scope.loginService.$unauth();
        $scope.currentUser = null;
    };

    $scope.resetForm = function () {
        $scope.newUser = { email: '', password: '' };
    };


});
