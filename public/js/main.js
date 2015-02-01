var app = angular.module('MyApp', []);

/*
 *  Angular.
 *  Manage requests and tables.
 */
angular.module("mainModule", [])
  .controller("InputController", function ($scope, $http)
  {
    $scope.fields = [{name:"loading datas..."}];

    $scope.data = {
        name: "select field"
    };

    $scope.names = [];
    $scope.totalLength = 0;

    $scope.loading = false;

    $scope.init = function () {
        // get the list of all available input fields in the db.
        $.get( "/getList", function( data ) {
          $scope.fields = JSON.parse(data);
           $scope.$apply();
        });
    }

    $scope.onChange = function (aName)
    {
      if(aName == $scope.data.name)
      {
        return;
      } 

      $scope.data.name = aName;

      $scope.tableStyle = {opacity:'0.4'};

      $scope.loading = true;
      DisableInput(true);

      var lData = angular.copy($scope.data);

      // get the table datas.
      $http.post("/getData", lData)
        .success(function (data, status, headers, config)
        {
          DisableInput(false);
          $scope.tableStyle = {opacity:'1'};
          $scope.loading = false;
          $scope.totalLength = data.totalLength;
          $scope.names = data.array;
        })
        .error(function (data, status, headers, config)
        {
          $scope.loading = false;
          console.log("something else error");
        });
      }
});

function DisableInput(aValue)
{
  if(aValue)
  {
    $(".inputListElement").addClass("disabled");
  }
  else
  {
    $(".inputListElement").removeClass("disabled");
  }
}