import controller from './controller';
import Joi from 'joi';

const routes = [

    {

        path: '/states/{countryCode}',
        method: 'GET',
        handler: controller.getStates,

    }

];

export default routes;
