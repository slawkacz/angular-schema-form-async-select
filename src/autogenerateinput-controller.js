angular.module('schemaForm').controller('autoGenerateInputController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    $timeout(function () {
        $scope.keyEntered = false;
        $scope.inputFieldCallback = $scope.form.options ? $scope.form.options.inputCallback : undefined;
        if ($scope.ngModel) {
            $scope.initVal = $scope.ngModel.$modelValue;
        }
        $scope.$on('schemaFormValidate', function () {
            if (!$scope.keyEntered && !$scope.initVal && $scope.inputFieldCallback) {
                $scope.inputFieldCallback($scope.$parent.form).then(function (inputValue) {
                    $scope.onKeyUp(inputValue);
                });
            }
        });
        $scope.keyupcallback = function (event) {
            $scope.keyEntered = true;
        }
        $scope.onKeyUp = function (value) {
            var evalObj = $scope.getFormKeyEval($scope.form.key);
            evalObj.parentObj[evalObj.property] = value;
        }
        $scope.getFormKeyEval = function (key) {
            var keyString = "";
            key.forEach(function (keyStr, index) {
                if (index < (key.length - 1)) {
                    keyString = "['" + keyStr + "']";
                }
            })
            var parobj = $scope.model;
            if (keyString) {
                parobj = eval("$scope.model" + keyString);
            }
            return {
                parentObj: parobj,
                property: key[key.length - 1]
            }
        }
    });
}]);