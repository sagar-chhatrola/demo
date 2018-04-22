
app.controller('profileCtrl', function($http, $location, $timeout, User, $scope,Contact) {

    
    $scope.contactNo='';
    $scope.contactId='';
    $scope.userId='';
    $scope.setContactNo = function(userId,contactId,contactNo){
         $scope.contactNo=contactNo;
         $scope.contactId=contactId;
         $scope.userId=userId;
    }
    $scope.resetContact = function(){
        $scope.contactNo='';
         $scope.contactId='';
         $scope.userId='';
    }
    $scope.addContact = function(contact){
        console.log(contact);
        var json={userId:localStorage.getItem('token'),'contactNo':contact};
        Contact.create(json).then(function(res){
            $scope.contact='';
            $scope.contactList['contact'].push(res.data.contact);
            console.log($scope.contactList);
        },function(error){

        });
    }
      Contact.read({userId:localStorage.getItem('token')}).then(function(res){
           
            $scope.contactList=res.data.contact;
            
        },function(error){

        });
      $scope.editContact = function(){
        var json={userId:$scope.userId,contactId:$scope.contactId,contactNo:$scope.contactNo};
        console.log(json);
        Contact.update(json).then(function(res){
            var contactIndex = $scope.contactList.contact.findIndex((obj => obj._id == $scope.contactId));
            console.log($scope.contactNo);
            console.log(contactIndex);
            $scope.contactList.contact[contactIndex].contactNo=$scope.contactNo;
            $('#myModal').modal('hide');
        },function(error){

        });
      }

      $scope.removeContact = function(userId,contactId){
        console.log(userId,contactId);
        var json={userId:userId,contactId:contactId};
        Contact.delete(json).then(function(res){
            console.log(res);
            $scope.contactList.contact.splice($scope.contactList.contact.findIndex(function(i){
                return i._id == contactId;
            }), 1);
        },function(error){

        });
      }


})
