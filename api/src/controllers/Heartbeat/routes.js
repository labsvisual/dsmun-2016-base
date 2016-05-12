import controller from './controller';

const routes = [

    {

        path: '/',
        method: 'GET',
        handler: controller.test,

    }

];

export default routes;
