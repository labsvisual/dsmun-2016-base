angular.module( 'app' )
       .config( [ '$urlRouterProvider', '$stateProvider', ( $urlRouterProvider, $stateProvider ) => {

           $urlRouterProvider.otherwise( '/' );

           $stateProvider
               .state( 'home', {

                   url: '/',
                   templateUrl: 'app/templates/homepage.html',

               })
               .state( 'forgot', {

                   url: '/forgot',
                   templateUrl: 'app/templates/forgot-password.html',

               })
               .state( 'dashboard', {

                   url: '/dashboard',
                   templateUrl: 'app/templates/dashboard.html',

               })
               .state( 'newConference', {

                   url: '/conferences/new',
                   templateUrl: 'app/templates/new-conference.html',

               })
               .state( 'editConference', {

                   url: '/conferences/:guid',
                   templateUrl: 'app/templates/edit-conference.html',

               })
               .state( 'registrationForm', {

                   url: '/conferences/:guid/registration',
                   templateUrl: 'app/templates/forms/registration.html',

               })
               .state( 'delegateInformationForm', {

                   url: '/conferences/:guid/delegates',
                   templateUrl: 'app/templates/forms/delegate-information.html',

               })
               .state( 'travelArrangementsForm', {

                   url: '/conferences/:guid/travel',
                   templateUrl: 'app/templates/forms/travel-arrangements.html',

               })
               .state( 'gaCrisisForm', {

                   url: '/conferences/:guid/ga',
                   templateUrl: 'app/templates/forms/ga-crisis.html',

               })
               .state( 'dashboardAdmin', {

                   url: '/dashboard/admin',
                   templateUrl: 'app/templates/dashboard-admin.html',

               })
               .state( 'editConferenceAdmin', {

                   url: '/dashboard/edit/conferences/:schoolGuid/:guid',
                   templateUrl: 'app/templates/edit-conference-admin.html',

               })
               .state( 'addNewUser', {

                   url: '/dashboard/users/new',
                   templateUrl: 'app/templates/new-user.html',

               });

       }]);
