import controller from './controller';
import Joi from 'joi';

const routes = [

    {

        path: '/',
        method: 'POST',
        handler: controller.createUser,
        config: {

            validate: {

                payload: {

                    token: Joi.string().min( 32 ).max( 32 ).required(),
                    hash: Joi.string().min( 128 ).max( 128 ).required(),
                    data: Joi.object().required()

                }

            }

        }

    },

    {

        path: '/{guid}',
        method: 'PUT',
        handler: controller.updateUser,
        config: {

            validate: {

                payload: {

                    token: Joi.string().min( 32 ).max( 32 ).required(),
                    hash: Joi.string().min( 128 ).max( 128 ).required(),
                    data: Joi.object().required()

                }

            }

        }

    },


    {

        path: '/confirm/{guid}/{confirmationToken}',
        method: 'GET',
        handler: controller.confirmUser

    },

    {

        path: '/',
        method: 'GET',
        handler: controller.getAllUsers,
        config: {

            validate: {

                query: {

                    token: Joi.string().min( 32 ).max( 32 ).required()

                }

            }

        }

    },

    {

        path: '/{guid}',
        method: 'GET',
        handler: controller.getUser,
        config: {

            validate: {

                query: {

                    token: Joi.string().min( 32 ).max( 32 ).required()

                }

            }

        }

    }

];

export default routes;
