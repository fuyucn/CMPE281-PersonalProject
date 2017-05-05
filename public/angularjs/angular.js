angular.module('ngRepeat', ['ngAnimate'])
  .controller('repeatController', ['$scope','$http', function ($scope, $http) {


    $scope.newgrade0=0;
    $scope.newgrade1=0;
    $scope.newgrade2=0;
    $scope.newgrade3=0;
    $scope.newcom0="";
    $scope.newcom1="";
    $scope.newcom2="";
    $scope.newcom3="";

    $http({
      method: 'GET',
      url: '/getAll'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response.data);
        var length =response.data.length;
        console.log(length);
        $scope.users=response.data;
        $scope.newgrade0=$scope.users[0].grade;
        $scope.newgrade1=$scope.users[1].grade;
        $scope.newgrade2=$scope.users[2].grade;
        $scope.newgrade3=$scope.users[3].grade;
        $scope.newcom0=$scope.users[0].comment;
        $scope.newcom1=$scope.users[1].comment;
        $scope.newcom2=$scope.users[2].comment;
        $scope.newcom3=$scope.users[3].comment;
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

    $scope.submit = function(index,newgrade) {
        console.log("submit");
        //console.log($scope.users[index].grade);
        var newGrade=  newgrade;
     
        console.log(newGrade);
        if (newGrade && newGrade!=$scope.users[index].grade) {
          console.log(index);
          $scope.users[index].grade=newGrade;
            $http({
              method: 'GET',
              url: '/grade/'+$scope.users[index].sjsuid+"/"+newgrade
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.users[index].grade=newGrade;
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
          
         
      }
    };

      $scope.submitcom = function(index,newcom) {
        console.log("submit com");
        //console.log($scope.users[index].grade);
        var newCom=  newcom;
     
        console.log(newCom);
        if (newCom && newCom!=$scope.users[index].grade) {
          console.log(index);
          $scope.users[index].comment=newCom;
            $http({
              method: 'GET',
              url: '/grade/comment/'+$scope.users[index].sjsuid+"/"+newCom
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.users[index].comment=newCom;
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
          
         
      }
    };
}]);

  
/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/