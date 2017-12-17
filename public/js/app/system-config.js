SystemJS.config({
    transpiler: 'plugin-babel',
    map: {
        'plugin-babel': '../libs/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': '../libs/systemjs-plugin-babel/systemjs-babel-browser.js',

        'main': '/js/app/app.js', // app was
        'requester': '/js/app/requester.js',
        'templates': '/js/utils/templates.js',
        'data': './js/app/data.js',
        'searchController': '/js/controllers/search.js',
        'userController': '/js/controllers/user.js',
        'homeController': '/js/controllers/home.js',
        'trackController': '/js/controllers/track.js',
        'helpers': '/js/utils/helpers.js',
        'eventlisteners': '/js/utils/eventlisteners.js',

        'router': '/libs/navigo/lib/navigo.js',
        'encryptor': '/js/utils/encryptor.js',
        'jquery': '../libs/jquery/dist/jquery.js',
        'bootstrap': '../libs/bootstrap/dist/js/bootstrap.min.js',
        'alerts': '../libs/sweetalert/dist/sweetalert.min.js'
        // 'handlebars': '../libs/handlebars/dist/',
        
    }
})

System.import('main');
