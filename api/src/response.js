const buildResponse = ( code, message, data, reply ) => {

    const dat = {
        statusCode: code,
        message,
        data,
    };

    const res = reply( dat );
    res.statusCode = code;

};

export default buildResponse;
