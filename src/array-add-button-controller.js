angular.module('schemaForm').controller('addButtonController', ['$scope', '$http', function ($scope, $http) {
    $scope.addButtonFlag = false;
    $scope.$on('arrayAddButtonReferesh', function (event, flag, key) {
        if (_.isEqual($scope.form.key, key) || !key) {
            $scope.addButtonFlag = flag;
        }
    });
}]);