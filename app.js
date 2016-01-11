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
        console.log(options.scope.model);
        //debugger;
        
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
                title: "Product",
                type: "string",
                placeholder: 'Select product'
            },
            drilldown: {
                type: "array",
                title: "Filters",
                items: {
                    type: "object",
                    properties: {
                        variable: {
                            title: "Variable",
                            type: "string",
                            placeholder: 'Select variable'
                        },
                        variable_value: {
                            title: "Variable Value",
                            type: "string",
                            placeholder: 'Select variable value'
                        }
                    }
                }
            },
            variable: {
                title: "Variable",
                type: "string",
                placeholder: 'Select variable'
            },
            metric: {
                type: 'string',
                title: 'Metric',
                placeholder: 'Select metric'

            },
            total: {
                type: 'string',
                title: 'Show Total',
                placeholder: 'Total on graph'
            },
            topX: {
                type: 'integer',
                title: 'TopX',
                placeholder: 'Select number of variable values on graph',
                enum: [5, 10, 15]
            }
        },
        "required": [
            "timeperiod",
            "metric",
            "variable"
        ]
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
                        //$scope.$
                       // scope.model.drilldown = scope.model.drilldown.slice(0, 1);
                       // delete scope.model.metrics;
                        $scope.$broadcast('refreshSelect');
                    },
                    // htmlClass: "col-md-4",
                },
                {
                    key: "product_id",
                    "type": 'strapselectasync',
                    "options": {
                        "asyncCallback":  $scope.callBackMSDAsync,
                    },
                    onChange: function () {
                        //scope.$broadcast('schemaFormRedraw')
                    },
                    // htmlClass: "col-md-4",
                },
                {
                    key: 'topX',
                    type: "strapselect",
                    condition: "model.timeperiod && model.product_id",
                    // htmlClass: "col-md-4",
                },
                
                {
                    key: 'drilldown',
                    add: "Add Filter",
                    style: {
                        add: "btn-flat"
                    },
                    condition: "model.timeperiod && model.product_id && model.metric",
                    htmlClass: 'row',
                    fieldHtmlClass: "col-md-12 not-sortable",
                    decoratorClass: "row",
                    items: [
                        {
                            key: "drilldown[].variable",
                            type: 'strapselectasync',
                            options: {
                                asyncCallback:  $scope.callBackMSDAsync,
                            },
                            onChange: function () {
                                //scope.$broadcast('schemaFormRedraw');
                            },
                            params: {
                                product_id: 'model.product_id',
                                drilldown: 'model.drilldown',
                                current: 'model.drilldown[{{=drilldown}}]',
                                timeperiod: 'model.timeperiod',
                            },
                            // htmlClass: "col-md-6",
                            fieldHtmlClass: "not-sortable",
                        },
                        {
                            key: "drilldown[].variable_value",
                            type: 'strapselectasync',
                            options: {
                                asyncCallback:  $scope.callBackMSDAsync,
                            },
                            onChange: function () {
                                //scope.$broadcast('schemaFormRedraw')
                            },
                            params: {
                                product_id: 'model.product_id',
                                timeperiod: 'model.timeperiod',
                                drilldown: 'model.drilldown',
                                current: 'model.drilldown[{{=drilldown}}]',
                                variable: 'model.drilldown[{{=drilldown}}].variable',
                                metric_names: 'model.metric',
                                records_per_page: 10,
                                sort_metric: 'model.metric',
                                sort_order: 'DESC',
                                page: 1,
                            },
                            // htmlClass: "col-md-6",
                            // fieldHtmlClass: "not-sortable",
                        }
                    ]
                },
                {
                    key: "variable",
                    type: 'strapselectasync',
                    condition: "model.timeperiod && model.product_id",
                    options: {
                        asyncCallback:  $scope.callBackMSDAsync,
                    },
                    onChange: function () {
                        //scope.$broadcast('schemaFormRedraw');
                    },
                    params: {
                        product_id: 'model.product_id',
                        drilldown: 'model.drilldown',
                        timeperiod: 'model.timeperiod',
                    },
                    // htmlClass: "col-md-6",
                    // fieldHtmlClass: "not-sortable",
                },
                {
                    key: 'metric',
                    type: "strapselectasync",
                    condition: "model.timeperiod && model.product_id && model.variable",
                    "options": {
                        "asyncCallback":  $scope.callBackMSDAsync
                    },
                    params: {
                        product_id: 'model.product_id',
                        timeperiod: 'model.timeperiod',
                        variable: 'model.variable',
                    },
                    onChange: function (modelValue) {
                        //scope.model.drilldown = scope.model.drilldown.slice(0, 1);
                        //delete scope.model.drilldown[0].variable_value;
                        //scope.$broadcast('schemaFormRedraw');
                    },
                    // htmlClass: "col-md-4",
                },
                
                
            ];
    $scope.model = {};
    $scope.submitted = function (form) {
        $scope.$broadcast("schemaFormValidate");
        console.log($scope.model);
    };
})
;

