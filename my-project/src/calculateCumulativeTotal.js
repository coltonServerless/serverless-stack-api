const { google } = require('googleapis');
// const { google } from 'googleapis';
const keys = require('../keys');
const _ = require('lodash');

export async function calculateCumulativeTotal(event, context) {
    console.log('<--------------------------- marker 333 --------------------------->');
    try {
        const spreadsheetId = _.get(event, 'spreadsheetId');
        console.log('spreadsheetId', spreadsheetId);
        const client = new google.auth.JWT(
            keys.client_email,
            null,
            keys.private_key,
            [
                'https://www.googleapis.com/auth/spreadsheets',
                'https://www.googleapis.com/auth/script.external_request'
            ]
        );
        console.log('<--------------------------- marker 4444 --------------------------->');

        await client.authorize().catch((err) => {
            console.log('<--------------------------- FREAKING ERROR --------------------------->');
            console.error(err);
            throw err;
        });
        return await gsrun(event, client);
    } catch(err) {
        console.error(err);
        return  Promise.reject({
            error: true,
            message: err
        });
    }
}

async function gsrun(event, client) {
    console.log('<--------------------------- marker 55555 --------------------------->');
    const spreadsheetId = _.get(event, 'spreadsheetId');
    console.log('spreadsheetId', spreadsheetId);
    const inputRange = _.get(event, 'inputRange');
    console.log('inputRange', inputRange);
    const outputRange = _.get(event, 'outputRange');
    console.log('outputRange', outputRange);
    const gsApi = await google.sheets({
        version: 'v4', auth: client
    });
    console.log('<--------------------------- HERE --------------------------->');
    console.log('gsApi', gsApi);

    const options = {
        spreadsheetId,
        range: inputRange,
        auth: client
    };
    console.log('options', options);
    console.log('<--------------------------- Still kicking --------------------------->');
    console.log('gsApi.spreadsheets.values', gsApi.spreadsheets.values);

    const spreadsheet = await gsApi.spreadsheets.values.get(options).catch((err) => {
        console.log('<--------------------------- AH hA! --------------------------->');
        console.log('err', err);
    });
    console.log('<--------------------------- marker 666666 --------------------------->');
    const data = spreadsheet.data;
    const cumulativeTotal = totalCalc(data);
    console.log('<--------------------------- marker 7777777 --------------------------->');
    const updateOptions = {
        spreadsheetId,
        range: outputRange,
        valueInputOption: 'USER_ENTERED',
        resource: { values: cumulativeTotal }
    };
    console.log('<--------------------------- marker 88888888 --------------------------->');
    const response = await gsApi.spreadsheets.values.update(updateOptions);
    const responseData = _.get(response, 'data');
    console.log('cumulativeTotal', cumulativeTotal);
    console.log('response', response);
    return Promise.resolve(responseData);
}

function totalCalc (data) {
    const valueObj = {};
    _.forEach(data.values, (val) => {
        const cleanValue = _.head(val);
        let currVal = valueObj[cleanValue];
        if (_.isNil(currVal)) {
            currVal = 0;
        }
        valueObj[cleanValue] = ++currVal;
    });
    const valArray = Object.entries(valueObj);
    let prevValue = 0;
    _.forEachRight(valArray, (o) => {
        o[1]+= prevValue;
        prevValue =o[1];
    });
    return _.reverse(valArray);
}