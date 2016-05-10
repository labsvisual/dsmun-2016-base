angular.module( 'app' )
       .config( [ '$urlRouterProvider', '$stateProvider', ( $urlRouterProvider, $stateProvider ) => {

           $urlRouterProvider.otherwise( '/' );

           $stateProvider
               .state( 'home', {

                   url: '/',
                   templateUrl: 'app/templates/homepage.html',
                   controller: 'HomePageController'

               })
               .state( 'dashboard', {

                   url: '/dashboard',
                   templateUrl: 'app/templates/dashboard.html',
                   controller: 'DashboardController'

               })
               .state( 'newConference', {

                   url: '/conferences/new',
                   templateUrl: 'app/templates/new-conference.html',
                   controller: 'NewConferenceController'

               })
               .state( 'editConference', {

                   url: '/conferences/:guid',
                   templateUrl: 'app/templates/edit-conference.html',
                   controller: 'EditConferenceController'

               })
               .state( 'registrationForm', {

                   url: '/conferences/:guid/registration',
                   templateUrl: 'app/templates/forms/registration.html',
                   controller: 'RegistrationFormController'

               })
               .state( 'delegateInformationForm', {

                   url: '/conferences/:guid/delegates',
                   templateUrl: 'app/templates/forms/delegate-information.html',
                   controller: 'DelegateInformationFormController'

               })
               .state( 'travelArrangementsForm', {

                   url: '/conferences/:guid/travel',
                   templateUrl: 'app/templates/forms/travel-arrangements.html',
                   controller: 'TravelArrangementsFormController'

               })
               .state( 'gaCrisisForm', {

                   url: '/conferences/:guid/ga',
                   templateUrl: 'app/templates/forms/ga-crisis.html',
                   controller: 'GaCrisisFormController'

               });

       }]);
