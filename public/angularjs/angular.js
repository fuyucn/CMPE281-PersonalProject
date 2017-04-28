angular.module('ngRepeat', ['ngAnimate'])
  .controller('repeatController', ['$scope','$http', function ($scope, $http) {


    $scope.newgrade0=0;
    $scope.newgrade1=0;
    $scope.newgrade2=0;
    $scope.newgrade3=0;
    $http({
      method: 'GET',
      url: '/getAll'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response.data);
        var length =response.data.length;
        console.log(length);
        $scope.friends=response.data;
        $scope.newgrade0=$scope.friends[0].grade;
        $scope.newgrade1=$scope.friends[1].grade;
        $scope.newgrade2=$scope.friends[2].grade;
        $scope.newgrade3=$scope.friends[3].grade;
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

    $scope.submit = function(index,newgrade) {
        console.log("submit");
        //console.log($scope.friends[index].grade);
        var newGrade=  newgrade;
     
        console.log(newGrade);
        if (newGrade && newGrade!=$scope.friends[index].grade) {
          console.log(index);
          $scope.friends[index].grade=newGrade;
            $http({
              method: 'GET',
              url: '/grade/'+$scope.friends[index].sjsuid+"/"+newgrade
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.friends[index].grade=newGrade;
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