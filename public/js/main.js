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
        name: "",
    };
    $scope.loading = false;

    $scope.init = function () {
        // get the list of all available input fields in the db.
        $.get( "/getList", function( data ) {
          $scope.fields = JSON.parse(data);
           $scope.$apply();
        });
    }

    $scope.onChange = function ()
    {
      loadingSpinner.spin($('body')[0]);
      $scope.tableStyle = {opacity:'0.4'};
      $scope.loading = true;
      var lData = angular.copy($scope.data);

      // get the table datas.
      $http.post("/getData", lData)
        .success(function (data, status, headers, config)
        {
          $scope.loading = false;
          $scope.tableStyle = {opacity:'1'};
          loadingSpinner.stop();
          $scope.names = data;
        })
        .error(function (data, status, headers, config)
        {
          $scope.loading = false;
          console.log("something else error");
        });
      }
});


jQuery(function($) {
    SetupRowCountDisplay();
    SetupSpinner();
});

/*
 *  Will display the number of row not shown when reach the end of the scrolling table.
 */
function SetupRowCountDisplay()
{
    $('#tableMainBody').bind('scroll', function() {
        if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
            
        }
        else
        {

        }
    })
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
