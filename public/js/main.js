var app = angular.module('MyApp', []);
// loading icon.
var loadingSpinner;

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

      loadingSpinner.spin($('body')[0]);
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
          loadingSpinner.stop();
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


jQuery(function($) {
    SetupSpinner();
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

/*
 *  Setup the loading spinner.
 */
function SetupSpinner()
{
      var opts = {
      radius: 5,
      width: 2, // The line thickness
      color: '#777', // #rgb or #rrggbb or array of colors
  };

  loadingSpinner = new Spinner(opts).spin($('#tableMainBody')[0]);
  loadingSpinner.stop();
}
