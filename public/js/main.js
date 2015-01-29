 var app = angular.module('MyApp', []);

angular.module("mainModule", [])
  .controller("InputController", function ($scope, $http)
  {
    $scope.fields = [{name:"loading datas..."}];

    $scope.data = {
        name: "education",
    };

    $scope.init = function () {
        // get the list of all available input fields in the db.
        $.get( "/getList", function( data ) {
          $scope.fields = JSON.parse(data);
           $scope.$apply();
        });
    }

    $scope.onChange = function ()
    {
      var lData = angular.copy($scope.data);
      // get the table datas.
      $http.post("/getData", lData)
        .success(function (data, status, headers, config)
        {
          $scope.names = data;
        })
        .error(function (data, status, headers, config)
        {
          console.log("something else error");
        });
      }
});


jQuery(function($) {
    $('#tableMainBody').bind('scroll', function() {
        if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
            
        }
    })
});