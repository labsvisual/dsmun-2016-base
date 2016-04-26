import configProvider from './config/config';

export default configProvider( 'development' ).knexInstance;
