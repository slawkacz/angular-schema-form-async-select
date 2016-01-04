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

testApp.controller("appController",  function ($scope, $q, $timeout) {
    $scope.callBackMSDAsync = function (options) {
        // Note that we got the url from the options. Not necessary, but then the same callback function can be used
        // by different selects with different parameters.

        // The asynchronous function must always return a httpPromise
        return $http.get(options.urlOrWhateverOptionIWant);
    };
    $scope.schema ={
        type: "object",
        title: "Rows",
        properties: {
            rows: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        country: {
                            title: "Country",
                            type: "string",
                        },
                        cities: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    city: {
                                        title: "City",
                                        type: "string",
                                    },
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    $scope.options = {
      sortableOptions: {
        items: "li:not(.not-sortable)"
      }  
    };
    $scope.form = [
        {
            key: "rows",
            add: "Add Country",
            style: {
                add: "btn-success"
            },
            items: [
                {
                    key: "rows[].country",
                    "type": 'strapselectasync',
                    "options": {
                        "asyncCallback": function fetchCountries(){
                             var deffered = $q.defer();
                                    $timeout(function(){
                                        deffered.resolve({data:[
                                                {"value": "poland", "text": "Poland"},
                                                {"value": "russia", "name": "Russia"}
                                        ]});
                                    },2000)
                                    return deffered.promise;
                        }
                    },
                },
                {
                    key: 'rows[].cities',
                    add: "Add City",
                    style: {
                        add: "btn-success"
                    },
                    condition:"model.rows[arrayIndex].country",
                    fieldHtmlClass: "not-sortable col-md-3",
                    items: [
                         {
                            key: "rows[].cities[].city",
                            type: 'strapselectasync', 
                            options: {
                                "asyncCallback": function fetchCity(form) {
                                    var deffered = $q.defer();
                                    $timeout(function(){
                                        deffered.resolve({data:[
                                                {"value": "warsaw", "text": "Warsaw"},
                                                {"value": "wroclaw", "name": "Wroclaw"}
                                        ]});
                                    },2000)
                                    return deffered.promise;     
                                },
                            }, 
                        },
                    ]
                },
            ]
        }
    ];
    $scope.model = {};
    $scope.submitted = function (form) {
        $scope.$broadcast("schemaFormValidate");
        console.log($scope.model);
    };
})
;

