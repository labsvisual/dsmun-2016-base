import controller from './controller';

const routes = [

    {

        path: '/',
        method: 'POST',
        handler: controller.postContact

    }

];

export default routes;
