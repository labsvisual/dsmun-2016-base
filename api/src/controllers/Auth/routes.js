import controller from './controller';
import Joi from 'joi';

const routes = [

    {

        path: '/',
        method: 'POST',
        handler: controller.authUser,
        config: {

            validate: {

                payload: {

                    username: Joi.string().min( 9 ).max( 50 ).required(),
                    password: Joi.string().min( 128 ).max( 128 ).required()

                }

            }

        }

    }

];

export default routes;
