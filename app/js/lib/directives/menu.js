app.directive("tree", ['RecursionHelper', 'menu', function(RecursionHelper, menu) {
    return {
        restrict: "E",
        scope: {
            root: '=',
            selected : '='
        },
        replace : true,
        templateUrl: 'static-templates/tree.html',
        compile: function(element, scope, attrs) {
            return RecursionHelper.compile(element, function(scope, Ielement, attrs){
                scope.methods = {
                    toggleRoot : function(item) {
                        if (attrs.notRoot) return;
                        menu.update({rootMenu : item});
                    },
                    toggle : function(item) {
                        item.collapsed = !item.collapsed;
                    },
                    changeData: function(item) {
                        if (attrs.notRoot) {
                            item.customHREF = attrs.parent + '/';
                        }
                    },
                    bindStuffToChild: function(item) {
                        scope.parent = item;
                    },
                    select : function(item) {
                        if (angular.isUndefined(item.name)) return;
                        menu.update({selected : item.name});
                    }
                }
                if (attrs.notRoot) {
                    scope.notRoot = true;
                }
            });
        }
    };
}]);

app.directive("breadcrumbs", ['menu', function(menu) {
    return {
        restrict: "E",
        scope: {
            root: '=',
            selected : '='
        },
        replace : true,
        templateUrl: 'static-templates/breadcrumbs.html',
        link: function(scope, element, attrs) {
            menu.update({
                rootMenu : scope.root
            });
        }
    };
}]);



