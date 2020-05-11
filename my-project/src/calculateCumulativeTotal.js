const { google } = require('googleapis');
// const { google } from 'googleapis';
const keys = require('../keys');
const _ = require('lodash');

export async function calculateCumulativeTotal(event, context) {
    try {
        const client = new google.auth.JWT(
            keys.client_email,
            null,
            keys.private_key,
            [
                'https://www.googleapis.com/auth/spreadsheets',
                'https://www.googleapis.com/auth/script.external_request'
            ]
        );

        await client.authorize().catch((err) => {
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
    const spreadsheetId = _.get(event, 'spreadsheetId');
    console.log('<--------------------------- HERE --------------------------->');
    console.log('spreadsheetId', spreadsheetId);
    const inputRange = _.get(event, 'inputRange');
    const outputRange = _.get(event, 'outputRange');
    const gsApi = await google.sheets({
        version: 'v4', auth: client
    });

    const options = {
        spreadsheetId,
        range: inputRange,
        auth: client
    };
    const spreadsheet = await gsApi.spreadsheets.values.get(options).catch((err) => {
        console.log('err', err);
        throw err;
    });
    const data = spreadsheet.data;
    const cumulativeTotal = totalCalc(data);
    const updateOptions = {
        spreadsheetId,
        range: outputRange,
        valueInputOption: 'USER_ENTERED',
        resource: { values: cumulativeTotal }
    };
    const response = await gsApi.spreadsheets.values.update(updateOptions);
    const responseData = _.get(response, 'data');

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