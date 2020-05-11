import { helloSecond } from './src/helloSecond';
import { calculateCumulativeTotal } from './src/calculateCumulativeTotal';
import { getEventBody, handleError, handleRawRequest, handleSuccess } from './src/utils';
import { getGoogleSheetMenuUI, getItems, getCumulativeTotalFunction, getOtherFunc } from './src/getGoogleSheetUI';

export const hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Go Serverless v1.0! ${(await message({ time: 1, copy: 'Your function executed successfully!'}))}`,
    }),
  };
};

const message = ({ time, ...rest }) => new Promise((resolve, reject) =>
  setTimeout(() => {
    resolve(`${rest.copy} (with a delay)`);
  }, time * 1000)
);

export const hello2 = async (event, context) => {
  console.log('event', event);
  console.log('context', context);
  const hello2Response = await helloSecond(event, context);
  console.log('hello2Response', hello2Response);
  const body = JSON.stringify({
    message: hello2Response,
    secondParam: 123
  });
  return {
    statusCode: 200,
    body
  };
};

export const modSpreadsheet = async (event, context) => {
  try {
    console.log('<--------------------------- marker 1 --------------------------->');
    const eventBody = getEventBody(event);
    console.log('<--------------------------- marker 22 --------------------------->');
    const totalResponse = await calculateCumulativeTotal(eventBody, context);
    console.log('totalResponse', totalResponse);

    return handleSuccess(totalResponse);
  } catch(err) {
    console.log('<--------------------------- the hell did you do --------------------------->');
    console.error(err);
    return handleError(err);
  }
};

export const getGoogleSheetMenu = async (event, context) => {
  try {
    const menuResponse = getGoogleSheetMenuUI();
    console.log('menuResponse', menuResponse);

    return handleRawRequest(menuResponse);
  } catch(err) {
    console.error(err);
    return handleError(err);
  }
};

export const getMenuItems = async (event, context) => {
  try {
    const menuItems = getItems();

    return handleRawRequest(menuItems);
  } catch(err) {
    console.error(err);
    return handleError(err);
  }
};


export const getCumulativeTotal = async (event, context) => {
  try {
    const cumulativeTotalFunc = getCumulativeTotalFunction();

    return handleRawRequest(cumulativeTotalFunc);
  } catch(err) {
    console.error(err);
    return handleError(err);
  }
};

export const getOtherFunction = async (event, context) => {
  try {
    const otherFunc = getOtherFunc();

    return handleRawRequest(otherFunc);
  } catch(err) {
    console.error(err);
    return handleError(err);
  }
};
