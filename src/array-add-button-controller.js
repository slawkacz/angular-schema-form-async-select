angular.module('schemaForm').controller('addButtonController', ['$scope', '$http', function ($scope, $http) {
    $scope.addButtonFlag = false;
    $scope.$on('arrayAddButtonReferesh', function (event, flag, key) {
        if (key !== undefined) {
            if (_.isEqual($scope.form.key[1], key)) {
                $scope.addButtonFlag = flag;
            }
        } else {
            $scope.addButtonFlag = flag;
        }
    });
}]);