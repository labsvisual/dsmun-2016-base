import controller from './controller';

const routes = [

    {

        path: '/view/{committeeName}',
        method: 'GET',
        handler: controller.showPage

    }

];

export default routes;
