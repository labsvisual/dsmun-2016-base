import controller from './controller';
import Joi from 'joi';

const routes = [

    {

        path: '/',
        method: 'POST',
        handler: controller.deauthUser,
        config: {

            validate: {

                payload: {

                    guid: Joi.string().min( 36 ).max( 36 ).required(),
                    token: Joi.string().min( 32 ).max( 32 ).required(),

                }

            }

        }

    }

];

export default routes;
