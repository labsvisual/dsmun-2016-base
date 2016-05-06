import controller from './controller';

const routes = [

    {

        path: '/{committeeName}',
        method: 'GET',
        handler: controller.showPage

    }

];

export default routes;
