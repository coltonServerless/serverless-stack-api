function sheetId(text) {
    var str = SpreadsheetApp.getActiveSpreadsheet().getUrl();
    var regex = new RegExp("\/d\/(.+)\/edit");
    var res = regex.exec(str);
    var toReturn =  res[1];
    return toReturn;
}

function onOpen() {
    var menuName = "Venture Validator";
    var ui =  SpreadsheetApp.getUi();
    var menu = ui.createMenu(menuName);
    var item = menu.addItem("Calculate Cumulative Total",  "testApi");
    menu.addToUi();
}

function onOpen2() {
    var menuFunctionString = getVentureValidator();
    var menuFunction = new Function(menuFunctionString);
    menuFunction();
}

function getVentureValidator() {
    var url = "https://a5mf8lsu8b.execute-api.us-east-1.amazonaws.com/dev/getMenu";
    var postBody = JSON.stringify({
        "inputRange":"A1:A5",
        "outputRange": "G1",
        "spreadsheetId": "1N5VoeQckahFedP2wlCuBzCHVDPdx9WePkDwcUvDvTYI"
    });
    var options = {
        "method": "post",
        "payload": postBody,
        "muteHttpExceptions": true,
        "validateHttpsCertificates": false
    };
    var test = UrlFetchApp.getRequest(url, options);
    Logger.log(test);
    Logger.log('change');
    var response = UrlFetchApp.fetch("http://a5mf8lsu8b.execute-api.us-east-1.amazonaws.com/dev/getUI", options);
    var clean = response.getContentText("UTF-8");
}


function testApi() {
    var activeSheet = SpreadsheetApp.getActiveSpreadsheet();
    var lastRow = activeSheet.getLastRow();
    Logger.log('Last row incoming');
    Logger.log(lastRow);
    var str = activeSheet.getUrl();
    var regex = new RegExp("\/d\/(.+)\/edit");
    var res = regex.exec(str);
    var spreadsheetId =  res[1];
    var url = "https://a5mf8lsu8b.execute-api.us-east-1.amazonaws.com/dev/modSpreadsheet";
    var postBody = JSON.stringify({
        "inputRange":"A1:A5",
        "outputRange": "G1",
        "spreadsheetId": "1N5VoeQckahFedP2wlCuBzCHVDPdx9WePkDwcUvDvTYI"
    });
    var options = {
        "method": "post",
        "payload": postBody,
        "muteHttpExceptions": true,
        "validateHttpsCertificates": false
    };
    var test = UrlFetchApp.getRequest(url, options);
    Logger.log(test);
    Logger.log('change');
    var response = UrlFetchApp.fetch("http://a5mf8lsu8b.execute-api.us-east-1.amazonaws.com/dev/modSpreadsheet", options);
    var clean = response.getContentText("UTF-8");
    Logger.log(response);
}