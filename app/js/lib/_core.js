'use strict';
var app = angular.module('app', ['angular-loading-bar', 'ngRoute']).run(['$rootScope', '$location',  function($rootScope, $location) {

	// Setup our menu.
    $rootScope.menuItems = [
        {name : "AMC"},
        {name : "Beiersdorf"},
        {name : "DST",  "children" : [
            {name : "Item"},
        ]},
        {name : "Electrolux",  "children" : [
            {name : "Item"},
        ]},
        {name : "Fox"},
        {name : "Galderma"},
        {name : "Investa"},
        {name : "MCN"},
        {name : "Merisant",  "children" : [
            {name : "Equal - APAC", "children" : [
                {name : "Design"},
                {name : "Stage"}
            ]},            
        ]},
        {name : "Orchard",  "children" : [
            {name : "Are Awesome"},
        ]},
        {name : "Pfizer",  "children" : [
            {name : "Item"},
        ]},
        {name : "Variety",  "children" : [
            {name : "Item"},
        ]},
        {name : "Video Ezy"}
    ];
    // System menu
    $rootScope.systemMenu = [
        {name : 'Intranet', 'href' : '/'},
        {name : 'Projects Admin', 'href' : '/'},
        {name : 'Logout', 'href' : '/'},
    ];
    // Grab the initial path
    var path = $location.path();
    // Simple redirect so that we always land on amc not the index.
    if (path == '/') $location.path('/page/amc');
    
    // Catch the route change and broadcast a listener.
    $rootScope.$on('$routeChangeSuccess', function(event, next, current) {
        $rootScope.$broadcast('routeChangeSuccess', {next : next, current : current});
    });
}]);


