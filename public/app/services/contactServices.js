
app.factory('Contact', function($http) {
    var contactFactory = {}; 

    contactFactory.create = function(regData) {
        return $http.post('/api/contact/addContact', regData);
    };

    
    contactFactory.read = function(regData) {
        return $http.post('/api/contact/getContact', regData);
    };

    
    contactFactory.update = function(regData) {
        return $http.post('/api/contact/updateContact', regData);
    };

    contactFactory.delete = function(regData) {
        return $http.post('/api/contact/deleteContact', regData);
    };

    return contactFactory; 
});
