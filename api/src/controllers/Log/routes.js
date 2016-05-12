import controller from './controller';

const routes = [

    {

        path: '/',
        method: 'POST',
        handler: controller.log,

    }

];

export default routes;
