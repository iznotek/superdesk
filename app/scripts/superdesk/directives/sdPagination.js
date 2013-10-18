define([
    'angular'
], function(angular) {
    'use strict';

    angular.module('superdesk.directives')
        /**
         * sdPagination inserts pagination controls for a given data set.
         *
         * Usage:
         * <div sd-pagination data-model="list"></div>
         * 
         * Params:
         * @param {Object} dataModel - model for data
         */
        .directive('sdPagination', ['locationParams', function(locationParams) {

            function getTotalPages(data) {
                if (data._links.last !== undefined) {
                    var parts = data._links.last.href.split('?')[1].split('&');
                    var parameters = {};
                    _.forEach(parts, function(part) {
                        var item = part.split('=');
                        parameters[item[0]] = item[1];
                    });
                    if (parameters.page !== undefined) {
                        return parameters.page;
                    }
                }
                return 1;
            }

            return {
                scope: {model: '='},
                templateUrl: 'scripts/superdesk/views/sdPagination.html',
                link: function(scope, element, attrs) {
                    scope.get = function(key) {
                        return locationParams.get(key);
                    };

                    scope.set = function(key, val) {
                        return locationParams.set(key, val);
                    };

                    scope.$watch('model', function(model) {
                        scope.totalPages = getTotalPages(scope.model);
                        scope.links = model._links;
                    });
                }
            };
        }]);
});
