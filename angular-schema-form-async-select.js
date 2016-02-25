;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['angular-schema-form'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('angular-schema-form'));
  } else {
    root.angularSchemaFormAsyncSelect = factory(root.schemaForm);
  }
}(this, function(schemaForm) {
angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/strap/straparray.html","<div sf-array=\"form\" class=\"schema-form-array {{form.htmlClass}}\" ng-class=\"{\'has-error\':hasError()}\" ng-model=\"$$value$$\"\nng-model-options=\"form.ngModelOptions\">\n    <label class=\"control-label\" ng-show=\"showTitle()\">{{ form.title }}</label>\n    <ul class=\"list-group\" ng-model=\"modelArray\" ui-sortable=\"options.sortableOptions\">\n        <li class=\"list-group-item {{form.fieldHtmlClass}}\" ng-init=\"form.onAdd && form.onAdd()\" ng-repeat=\"item in modelArray track by $index\">\n            <div class=\"action-buttons row\">\n                <div class=\"col-md-12\">\n                    <span ng-hide=\"form.readonly || form.remove === null\" ng-click=\"deleteFromArray($index);form.onRemove && form.onRemove()\"\n                    style=\"position: relative; z-index: 20;\" type=\"button\" class=\"close pull-right\">\n                    <span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span>\n                    </span>\n                    <span ng-hide=\"!form.onClone\" ng-click=\"form.onClone(item);\" style=\"position: relative; z-index: 20;\" class=\"clone pull-right\"\n                    title=\"Clone element\">\n                <i class=\"fa fa-clone\"></i>\n                </span>\n                </div>\n            </div>\n            <sf-decorator class=\"{{$parent.form.decoratorClass}}\" ng-init=\"arrayIndex = $index\" form=\"copyWithIndex($index)\"></sf-decorator>\n        </li>\n    </ul>\n    <div class=\"clearfix\" style=\"padding: 15px;\">\n        <button ng-hide=\"form.readonly || form.add === null\" ng-click=\"appendToArray()\" type=\"button\" class=\"btn {{ form.style.add || \'btn-default\' }} pull-right\">\n            <i class=\"glyphicon glyphicon-plus\"></i> {{ form.add || \'Add\'}}\n        </button>\n    </div>\n    <div class=\"help-block\" ng-show=\"(hasError() && errorMessage(schemaError())) || form.description\" ng-bind-html=\"(hasError() && errorMessage(schemaError())) || form.description\"></div>\n</div>");
$templateCache.put("directives/decorators/bootstrap/strap/strapcheckbox.html","<div class=\"form-group {{form.htmlClass}}\">\n    <label class=\"{{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label>\n    <div class=\"form-group {{form.fieldHtmlClass}}\">\n        <md-checkbox class=\"pull-left clearfix\" sf-changed=\"form\" ng-disabled=\"form.readonly\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\"\n        schema-validate=\"form\" aria-label=\"{{form.title}}\" class=\"{{form.fieldHtmlClass}}\" name=\"{{form.key.slice(-1)[0]}}\">\n        </md-checkbox>\n        <div class=\"help-block\" sf-message=\"form.description\"></div>\n    </div>\n</div>");
$templateCache.put("directives/decorators/bootstrap/strap/strapinput.html","<div class=\"form-group schema-form-{{form.type}} {{form.htmlClass}}\"\n     ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false }\">\n  <label class=\"control-label {{form.labelHtmlClass}}\" ng-class=\"{\'sr-only\': !showTitle()}\" for=\"{{form.key.slice(-1)[0]}}\">{{form.title}}</label>\n\n  <input ng-if=\"!form.fieldAddonLeft && !form.fieldAddonRight\"\n         ng-show=\"form.key\"\n         type=\"{{form.type}}\"\n         step=\"any\"\n         sf-changed=\"form\"\n         placeholder=\"{{form.placeholder}}\"\n         class=\"{{form.fieldHtmlClass}}\"\n         id=\"{{form.key.slice(-1)[0]}}\"\n         ng-model-options=\"form.ngModelOptions\"\n         ng-model=\"$$value$$\"\n         ng-disabled=\"form.readonly\"\n         schema-validate=\"form\"\n         name=\"{{form.key.slice(-1)[0]}}\"\n         aria-describedby=\"{{form.key.slice(-1)[0] + \'Status\'}}\">\n\n  <div ng-if=\"form.fieldAddonLeft || form.fieldAddonRight\"\n       ng-class=\"{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}\">\n    <span ng-if=\"form.fieldAddonLeft\"\n          class=\"input-group-addon\"\n          ng-bind-html=\"form.fieldAddonLeft\"></span>\n    <input ng-show=\"form.key\"\n           type=\"{{form.type}}\"\n           step=\"any\"\n           sf-changed=\"form\"\n           placeholder=\"{{form.placeholder}}\"\n           class=\"{{form.fieldHtmlClass}}\"\n           id=\"{{form.key.slice(-1)[0]}}\"\n           ng-model-options=\"form.ngModelOptions\"\n           ng-model=\"$$value$$\"\n           ng-disabled=\"form.readonly\"\n           schema-validate=\"form\"\n           name=\"{{form.key.slice(-1)[0]}}\"\n           aria-describedby=\"{{form.key.slice(-1)[0] + \'Status\'}}\">\n\n    <span ng-if=\"form.fieldAddonRight\"\n          class=\"input-group-addon\"\n          ng-bind-html=\"form.fieldAddonRight\"></span>\n  </div>\n  <span ng-if=\"hasError() || hasSuccess()\"\n        id=\"{{form.key.slice(-1)[0] + \'Status\'}}\"\n        class=\"sr-only\">{{ hasSuccess() ? \'(success)\' : \'(error)\' }}</span>\n\n  <div class=\"help-block\" ng-if=\"hasError()\" sf-message=\"(form.description || \'Required\')\"></div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/strap/strapmultiselect.html","<div ng-controller=\"asyncSelectController\" class=\"form-group {{form.htmlClass}}\"\n     ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\">\n    <label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label>\n\n    <div class=\"form-group {{form.fieldHtmlClass}}\" ng-init=\"populateTitleMap(form)\">\n        <button type=\"button\" class=\"btn btn-default\" sf-changed=\"form\" schema-validate=\"form\" ng-model=\"$$value$$\"\n                data-placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\')}}\"\n                data-html=\"1\"\n                data-multiple=\"1\"  data-multiple=\"1\" data-max-length=\"{{form.options.inlineMaxLength}}\"\n                data-max-length-html=\"{{form.options.inlineMaxLengthHtml}}\"\n                bs-options=\"item.value as item.name for item in form.titleMap | selectFilter:this:$$value$$:&quot;$$value$$&quot;\"\n                bs-select>\n        </button>\n        <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n    </div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/strap/strapselect.html","<div ng-controller=\"asyncSelectController\" class=\"form-group {{form.htmlClass}}\" ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\">\n    <label class=\"{{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label>\n    <div class=\"form-group {{form.fieldHtmlClass}}\" ng-init=\"populateTitleMap(form)\">\n        <button ng-if=\"!((form.options.multiple == \'true\') || (form.options.multiple == true))\" type=\"button\" class=\"grey lighten-5 black-text btn-sm btn\"\n        sf-changed=\"form\" ng-model=\"$$value$$\" schema-validate=\"form\" data-placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\')}}\"\n        data-html=\"1\" ng-disabled=\"!form.titleMap.length\" bs-options=\"item.value as item.name for item in form.titleMap | selectFilter:this:$$value$$:&quot;$$value$$&quot;\"\n        bs-select>\n        </button>\n        <md-progress-linear md-mode=\"indeterminate\" style=\"height:3px;overflow:hidden\" ng-if=\"form.loading\"></md-progress-linear>\n        <div class=\"help-block\" ng-if=\"hasError()\" sf-message=\"(form.description || \'Required\')\"></div>\n    </div>\n</div>");}]);
angular.module('schemaForm').config(
    ['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
        function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

            var select = function (name, schema, options) {
                if ((schema.type === 'string') && ("enum" in schema)) {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'strapselect';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(select);

            //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapselect',
                'directives/decorators/bootstrap/strap/strapselect.html')
            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapmultiselect',
                'directives/decorators/bootstrap/strap/strapmultiselect.html');


            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'array',
                'directives/decorators/bootstrap/strap/straparray.html');
                
            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'default',
                'directives/decorators/bootstrap/strap/strapinput.html');

            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapselectasync',
                'directives/decorators/bootstrap/strap/strapselect.html');
            
            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'checkbox',
                'directives/decorators/bootstrap/strap/strapcheckbox.html');

        }])
    .directive("toggleSingleModel", function () {
        // some how we get this to work ...
        return {
            require: 'ngModel',
            restrict: "A",
            scope: {},
            replace: true,
            controller: ['$scope', function ($scope) {
                $scope.$parent.$watch('select_model.selected', function () {
                    if ($scope.$parent.select_model.selected != undefined) {
                        $scope.$parent.insideModel = $scope.$parent.select_model.selected.value;
                        $scope.$parent.ngModel.$setViewValue($scope.$parent.select_model.selected.value);
                    }
                });
            }]
        };
    })

    .directive('multipleOn', function () {
        return {
            link: function ($scope, $element, $attrs) {
                $scope.$watch(
                    function () { return $element.attr('multiple-on'); },
                    function (newVal) {

                        if (newVal == "true") {
                            var select_scope = angular.element($element).scope().$$childTail;
                            select_scope.$isMultiple = true;
                            select_scope.options.multiple = true;
                            select_scope.$select.$element.addClass('select-multiple');
                        }
                        else {
                            angular.element($element).scope().$$childTail.$isMultiple = false;
                        }
                    }
                    );
            }
        };
    })
    .filter('whereMulti', function () {
        return function (items, key, values) {
            var out = [];

            if (angular.isArray(values) && items !== undefined) {
                values.forEach(function (value) {
                    for (var i = 0; i < items.length; i++) {
                        if (value == items[i][key]) {
                            out.push(items[i]);
                            break;
                        }
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    })
    .filter('propsFilter', function () {
        return function (items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function (item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        if (item.hasOwnProperty(prop)) {
                            //only match if this property is actually in the item to avoid
                            var text = props[prop].toLowerCase();
                            //search for either a space before the text or the textg at the start of the string so that the middle of words are not matched
                            if (item[prop].toString().toLowerCase().indexOf(text) === 0 || (item[prop].toString()).toLowerCase().indexOf(' ' + text) !== -1) {
                                itemMatches = true;
                                break;
                            }
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    });

angular.module('schemaForm').controller('asyncSelectController', ['$scope', '$http', '$timeout','schemaForm' ,function ($scope, $http, $timeout,schemaForm) {

    if (!$scope.form.options) {
        $scope.form.options = {};
    }

    $scope.select_model = {};

    //console.log("Setting options." + $scope.form.options.toString());
    $scope.form.options.scope = $scope;

    $scope.triggerTitleMap = function () {
        //console.log("listener triggered");
        // Ugly workaround to trigger titleMap expression re-evaluation so that the selectFilter it reapplied.
        $scope.form.titleMap.push({ "value": "345890u340598u3405u9", "name": "34095u3p4ouij" })
        $timeout(function () { $scope.form.titleMap.pop() })

    };
    $scope.$on('refreshSelect', function () {
        $scope.populateTitleMap($scope.form);
    });
    $scope.initFiltering = function (localModel) {
        if ($scope.form.options.filterTriggers) {
            $scope.form.options.filterTriggers.forEach(function (trigger) {
                $scope.$parent.$watch(trigger, $scope.triggerTitleMap)

            });
        }
        // This is set here, as the model value may become unitialized and typeless if validation fails.
        $scope.localModelType = Object.prototype.toString.call(localModel);
        $scope.filteringInitialized = true;
    };


    $scope.finalizeTitleMap = function (form, data, newOptions) {
        // Remap the data
        $scope.form.loading = false;
        form.titleMap = [];
        if (newOptions && "map" in newOptions && newOptions.map) {
            var current_row = null,
                final = newOptions.map.nameProperty.length - 1,
                separator = newOptions.map.separatorValue ? newOptions.map.separatorValue : ' - ';
            data.forEach(function (current_row) {
                current_row["value"] = current_row[newOptions.map.valueProperty];
                //check if the value passed is a string or not
                if (typeof newOptions.map.nameProperty != 'string') {
                    //loop through the object/array
                    var newName = "";
                    for (var i in newOptions.map.nameProperty) {
                        newName += current_row[newOptions.map.nameProperty[i]];
                        if (i != final) { newName += separator };
                    }
                    current_row["name"] = newName; //init the 'name' property
                }
                else {
                    //if it is a string
                    current_row["name"] = current_row[newOptions.map.nameProperty];
                }
                form.titleMap.push(current_row);
            });

        }
        else {
            data.forEach(function (item) {
                if ("text" in item) {
                    item.name = item.text
                }
            }
                );
            form.titleMap = data;
        }
        // removing selected value from model if notexisting in net titleMap
        console.log($scope);
        if(typeof $scope.ngModel.$modelValue === 'string' && !$scope.find_in_titleMap($scope.ngModel.$modelValue)) {
             form.key.reduce(function (previous, current, index) {
                if (index == form.key.length - 1)
                    delete previous[current];
                else
                    return previous[current];
            }, $scope.model);       
        }
        if ($scope.insideModel && $scope.select_model.selected === undefined) {
            $scope.select_model.selected = $scope.find_in_titleMap($scope.insideModel);
        }

        // The ui-selects needs to be reinitialized (UI select sets the internalModel and externalModel.
        if ($scope.internalModel) {
            //console.log("Call uiMultiSelectInitInternalModel");
            $scope.uiMultiSelectInitInternalModel($scope.externalModel);
        }
    };

    $scope.clone = function (obj) {
        // Clone an object (except references to this scope)
        if (null == obj || "object" != typeof (obj)) return obj;

        var copy = obj.constructor();
        for (var attr in obj) {
            // Do not clone if it is this scope
            if (obj[attr] != $scope) {
                if (obj.hasOwnProperty(attr)) copy[attr] = $scope.clone(obj[attr]);
            }
        }
        return copy;
    };


    $scope.getCallback = function (callback) {
        if (typeof (callback) == "string") {
            var _result = $scope.$parent.evalExpr(callback);
            if (typeof (_result) == "function") {
                return _result;
            }
            else {
                throw ("A callback string must match name of a function in the parent scope")
            }

        }
        else if (typeof (callback) == "function") {
            return callback;
        }
        else {
            throw ("A callback must either be a string matching the name of a function in the parent scope or a " +
                "direct function reference")

        }
    };

    $scope.getOptions = function (options, search) {
        // If defined, let the a callback function manipulate the options
        if (options.httpPost && options.httpPost.optionsCallback) {
            newOptionInstance = $scope.clone(options);
            return $scope.getCallback(options.httpPost.optionsCallback)(newOptionInstance, search);
        }
        if (options.httpGet && options.httpGet.optionsCallback) {
            newOptionInstance = $scope.clone(options);
            return $scope.getCallback(options.httpGet.optionsCallback)(newOptionInstance, search);
        }
        else {
            return options;
        }
    };

    $scope.test = function (form) {
        form.titleMap.pop();
    };
    
    $scope.populateTitleMap = function (form, search) {
        form.loading = true;
        if (form.schema && "enum" in form.schema) {
            form.titleMap = [];
            form.schema.enum.forEach(function (item) {
                form.titleMap.push({ "value": item, "name": item })
            }
                );
            form.loading = false;
        }
        else if (!form.options) {
            //console.log("dynamicSelectController.populateTitleMap(key:" + form.key + ") : No options set, needed for dynamic selects");
        }
        else if (form.options.callback) {
            form.titleMap = $scope.getCallback(form.options.callback)(form.options, search);
            $scope.finalizeTitleMap(form, form.titleMap, form.options);
            //console.log("callback items: ", form.titleMap);
        }
        else if (form.options.asyncCallback) {
            return $scope.getCallback(form.options.asyncCallback)(form.options, search).then(
                function (_data) {
                    $scope.finalizeTitleMap(form, _data.data, form.options);
                    //console.log('asyncCallback items', form.titleMap);
                },
                function (data, status) {
                    console.log("Loading select items failed(Options: '" + String(form.options) +
                        "\nError: " + status);
                    form.loading = false;
                });
        }
        else if (form.options.httpPost) {
            var finalOptions = $scope.getOptions(form.options, search);

            return $http.post(finalOptions.httpPost.url, finalOptions.httpPost.parameter).then(
                function (_data) {

                    $scope.finalizeTitleMap(form, _data.data, finalOptions);
                    //console.log('httpPost items', form.titleMap);
                },
                function (data, status) {
                    console.log("Loading select items failed (URL: '" + String(finalOptions.httpPost.url) +
                        "' Parameter: " + String(finalOptions.httpPost.parameter) + "\nError: " + status);
                    
                    form.loading = false;
                });
        }
        else if (form.options.httpGet) {
            var finalOptions = $scope.getOptions(form.options, search);
            return $http.get(finalOptions.httpGet.url, finalOptions.httpGet.parameter).then(
                function (data) {
                    $scope.finalizeTitleMap(form, data.data, finalOptions);
                    //console.log('httpGet items', form.titleMap);
                },
                function (data, status) {
                    console.log("Loading select items failed (URL: '" + String(finalOptions.httpGet.url) +
                        "\nError: " + status);
                    form.loading = false;
                });
        } else {
            form.loading = false;
        }
        
    };


    $scope.find_in_titleMap = function (value) {
        form.loading = false;
        for (i = 0; i < $scope.form.titleMap.length; i++) {
            if ($scope.form.titleMap[i].value == value) {
                return { "value": $scope.form.titleMap[i].value, "name": $scope.form.titleMap[i].name }
            }
        }
    };

    $scope.uiMultiSelectInitInternalModel = function (supplied_model) {


        //console.log("$scope.externalModel: Key: " +$scope.form.key.toString() + " Model: " + supplied_model.toString());
        $scope.externalModel = supplied_model;
        $scope.internalModel = [];
        if ($scope.form.titleMap) {
            if (supplied_model !== undefined && angular.isArray(supplied_model)) {
                supplied_model.forEach(function (value) {
                    $scope.internalModel.push($scope.find_in_titleMap(value));
                }
                    )
            }
        }
    };

}]);

angular.module('schemaForm').filter('selectFilter', [function ($filter) {
    return function (inputArray, controller, localModel, strLocalModel) {
        // As the controllers' .model is the global and its form is the local, we need to get the local model as well.
        // We also need tp be able to set it if is undefined after a validation failure,so for that we need
        // its string representation as well as we do not know its name. A typical value if strLocalModel is model['groups']
        // This is very ugly, though. TODO: Find out why the model is set to undefined after validation failure.

        if (!angular.isDefined(inputArray) || !angular.isDefined(controller.form.options) ||
            !angular.isDefined(controller.form.options.filter) || controller.form.options.filter == '') {
            return inputArray;
        }



        //console.log("----- In filtering for " + controller.form.key + "(" + controller.form.title +"), model value: " + JSON.stringify( localModel) + "----");
        //console.log("Filter:" + controller.form.options.filter);
        if (!controller.filteringInitialized) {
            //console.log("Initialize filter");
            controller.initFiltering(localModel);
        }


        var data = [];


        angular.forEach(inputArray, function (curr_item) {
            ////console.log("Compare: curr_item: " + JSON.stringify(curr_item) +
            //"with : " + JSON.stringify( controller.$eval(controller.form.options.filterTriggers[0])));
            if (controller.$eval(controller.form.options.filter, { item: curr_item })) {
                data.push(curr_item);
            }
            else if (localModel) {
                // If not in list, also remove the set value

                if (controller.localModelType == "[object Array]" && localModel.indexOf(curr_item.value) > -1) {
                    localModel.splice(localModel.indexOf(curr_item.value), 1);
                }
                else if (localModel == curr_item.value) {
                    //console.log("Setting model of type " + controller.localModelType  + "to null.");
                    localModel = null;
                }
            }
        });

        if (controller.localModelType == "[object Array]" && !localModel) {
            // An undefined local model seems to mess up bootstrap select's indicators
            //console.log("Resetting model of type " + controller.localModelType  + " to [].");

            controller.$eval(strLocalModel + "=[]");
        }

        ////console.log("Input: " + JSON.stringify(inputArray));
        ////console.log("Output: " + JSON.stringify(data));
        ////console.log("Model value out : " + JSON.stringify(localModel));
        //console.log("----- Exiting filter for " + controller.form.title + "-----");

        return data;
    };
}]);

return ;
}));
