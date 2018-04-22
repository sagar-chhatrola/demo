
app.factory('User', function($http) {
    var userFactory = {}; 

    userFactory.create = function(regData) {
        return $http.post('/api/user/users', regData);
    };

    // Check if username is available at registration
    userFactory.checkUsername = function(regData) {
        return $http.post('/api/user/checkusername', regData);
    };

    // Check if e-mail is available at registration
    userFactory.checkEmail = function(regData) {
        return $http.post('/api/user/checkemail', regData);
    };


    return userFactory; // Return userFactory object
});
