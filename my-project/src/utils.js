const _ = require('lodash');

export function getEventBody(event) {
    console.log('<--------------------------- RAW --------------------------->');
    console.log(event);
    console.log('<--------------------------- END RAW --------------------------->');
    const rawBody =_.get(event, 'body');
    const cleanBody = JSON.parse(rawBody);
    console.log('<--------------------------- EVENT --------------------------->');
    console.log(cleanBody);
    console.log('<--------------------------- END EVENT --------------------------->');
    return cleanBody;
}

export async function handleError(err) {
    const headers = {
        'content-type': 'application/x-www-form-urlencoded'
    };
    console.log('<--------------------------- begin failure --------------------------->');
    console.log('err', err);
    const message = _.get(err, 'message');
    const cleanMessage = message.toString();
    console.log('cleanMessage', cleanMessage);
    const body = JSON.stringify({
        error: true,
        message: cleanMessage
    });
    const toReturn = {
        statusCode: 400,
        body,
        headers
    };
    console.log('<--------------------------- error response --------------------------->');
    console.log(toReturn);
    console.log('<--------------------------- end error response --------------------------->');
    return toReturn;
}

export async function handleSuccess (response){
    const headers = {
        'content-type': 'application/x-www-form-urlencoded'
    };
    console.log('<--------------------------- BEGIN success --------------------------->');
    const error = _.get(response, 'error');
    if (error) {
        return handleError(response);
    }
    if (_.isFunction(response)) {
        return {
            statusCode: 200,
            body: response.toString()
        };
    }

    const body = JSON.stringify({
        ...response,
    });
    const toReturn = {
        statusCode: 200,
        body,
        headers
    };
    console.log('<--------------------------- success response --------------------------->');
    console.log(toReturn);
    console.log('<--------------------------- end success response --------------------------->');
    return toReturn;
}