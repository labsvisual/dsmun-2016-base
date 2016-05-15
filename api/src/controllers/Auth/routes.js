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

                    username: Joi.string().min( 4 ).max( 50 ).required(),
                    password: Joi.string().min( 128 ).max( 128 ).required()

                }

            }

        }

    },

    {

        path: '/token/valid/{token}',
        method: 'GET',
        handler: controller.isTokenValid,
        config: {

            validate: {

                params: {

                    token: Joi.string().min( 32 ).max( 32 ).required(),

                }

            }

        }

    }

];

export default routes;
