/*global angular */
"use strict";

/**
 * The main app module
 * @name testApp
 * @type {angular.Module}
 */

var testApp = angular.module("testApp", ["ui.sortable","schemaForm", "mgcrea.ngStrap", "mgcrea.ngStrap.modal",
    "pascalprecht.translate", "ui.select", "mgcrea.ngStrap.select"

]);

testApp.controller("appController",  function ($scope, $q, $timeout,$http) {
    $scope.callBackMSDAsync = function (options) {
        // Note that we got the url from the options. Not necessary, but then the same callback function can be used
        // by different selects with different parameters.

        // The asynchronous function must always return a httpPromise
        return $http.get('http://demo4479344.mockable.io/city?country=poland');
    };
    $scope.schema = {
        subtitle: {
            type: 'string',
            title: 'Subtitle'
        },
        type: "object",
        title: "Rows",
        properties: {
            timeperiod: {
                type: 'string',
                title: 'Timeperiod',
                placeholder: 'Select time period'
            },
            product_id: {
                title: "City",
                type: "string",
                placeholder: 'Select city'
            }
        }
    };

    $scope.optionsFX = {
      sortableOptions: {
        items: "li:not(.not-sortable)"
      }  
    };
    $scope.form = [
                {
                    key: "subtitle",
                    type: "text",
                },
                {
                    key: 'timeperiod',
                    type: "strapselect",
                    titleMap: [
                        { value: "{{=CURRENT_MONTH}}", name: "Monthly" },
                        { value: "{{=CURRENT_WEEK}}", name: "Weekly" },
                        { value: "{{=CURRENT_DAY}}", name: "Daily" }
                    ],
                    onChange: function (modelValue) {
                        $scope.$broadcast('refreshSelect');
                    },
                },
                {
                    key: "city",
                    "type": 'strapselectasync',
                    "options": {
                        "asyncCallback":  $scope.callBackMSDAsync,
                    },
                    onChange: function () { 
                    },
                },
            ];
    $scope.model = {};
    $scope.submitted = function (form) {
        $scope.$broadcast("schemaFormValidate");
        console.log($scope.model);
    };
})
;

