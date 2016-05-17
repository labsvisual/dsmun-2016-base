import controller from './controller';
import Joi from 'joi';

const routes = [

    {

        path: '/',
        method: 'POST',
        handler: controller.initiatePasswordForgot,
        config: {

            validate: {

                payload: {

                    username: Joi.string().min( 4 ).max( 50 ).required()

                }

            }

        }

    },

    {

        path: '/{resetToken}',
        method: 'GET',
        handler: controller.renderClientSide

    },

    {

        path: '/{resetToken}',
        method: 'POST',
        handler: controller.resetPassword,
        config: {

            validate: {

                payload: {

                    password: Joi.string().min( 9 ).max( 128 ).required(),
                    username: Joi.string().min( 4 ).max( 32 ).required()

                }

            }

        }

    }

];

export default routes;
