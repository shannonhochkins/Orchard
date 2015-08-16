Orchard Template
===============

This is a full template setup using Express.JS, Node.js, Grunt.JS, Angular.js, BootstrapIU, Compass & Sass! Created by [shannon hochkins].
[shannon hochkins]: http://www.shannonhochkins.com/

The website/app does the following:

- Automatic redirects and routing
- ExpressJS Server which handles file requests & routing
- All display in the view is a single view where it's content's change depending on the data pulled from the auto-routing requests.
- The data is obtained through a custom service which cache's data as it collects it, it then uses the above view as a template to draw the above markup with this data.
- Sidebar is a recursive directive and all toggles, selections etc are all handled from the directive & broadcast to the scope.
- Sidebar & breadcrumbs are completely automated from an object defined in the $rootScope.
- Breadcrumbs directive are re-drawn based on the selection
- 404 - Any unknown requests return as a 404 page.

The Bad:
- Unfortunately, I didn't have time to complete the deeper level menu items and debug these correctly, but it's quite simple, I just didn't have enough time on my weekend to do this unfortunately.

This all depends that you have grunt installed, all other dependencies will be automatically installed when you run grun install.

Running Grunt
--------------

```
cd /project/path
// npm install may take some time, once completed just run grunt and the service will be up and running.
npm install
grunt
// The console should tell you which port the server is running under (server.js file contains this port if you need to change this)
```

Note: If you see the error: *Fatal error: listen EADDRINUSE* you may need to change the port inside server.js

That's it! Once grunt is running it will automatically perform the following:

- Server will restart when it detects changes to files.
- Start watching all javascript, css & scss files.
- When a scss file is changed, it will automatically create the css compressed version inside the css/main folder.
- When a css file is created/modified it will automatically create a minified version of that file inside the css/min/filename.min.css
- When a javascript file is changed it will automatically grab all files inside the lib directory, files inside the angularjs modules directories and concat them and minify them and save it inside the js/dest/ folder.
- Any plugins in the merged_plugins folder will all concat into a single file in the js/dest/plugins.min.js folder.


Dependancies:
--------------
- NodeJS
- GruntJS
- ExpressJS
- Matchdep - ```npm install matchdep --save```
