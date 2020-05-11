const methodItems = "CumulativeTotal OtherFunction";

export function getGoogleSheetMenuUI() {
    return onOpenMenuFunction();
}

export function getItems() {
    return JSON.stringify(methodItems);
}
export function getCumulativeTotalFunction() {
    return `
  var activeSheet = SpreadsheetApp.getActiveSpreadsheet();
  var lastRow = activeSheet.getLastRow();
  var str = activeSheet.getUrl();
  var regex = new RegExp("\\/d\\/(.+)\\/edit");
  var res = regex.exec(str);
  var spreadsheetId =  res[1];
  Logger.log(spreadsheetId);
  var baseRange = "A1:A";
  var inputRange = baseRange.concat(lastRow.toString());
  var url = "https://a5mf8lsu8b.execute-api.us-east-1.amazonaws.com/dev/modSpreadsheet";
  var postBody = JSON.stringify({
      "inputRange": inputRange,
      "outputRange": "G1",
      "spreadsheetId": spreadsheetId
  });
  var options = {
  "method": "post",
  "payload": postBody,
   "muteHttpExceptions": true,
   "validateHttpsCertificates": false
  };
  var test = UrlFetchApp.getRequest(url, options);
  var response = UrlFetchApp.fetch("http://a5mf8lsu8b.execute-api.us-east-1.amazonaws.com/dev/modSpreadsheet", options);
  var clean = response.getContentText("UTF-8");`;
}


function onOpenMenuFunction() {
    return`
    var menuName = "Venture Validator";
    var ui =  SpreadsheetApp.getUi();
    var menu = ui.createMenu(menuName);
    var item = menu.addItem("Calculate Cumulative Total",  "cumulativeTotal");
    var item2 = menu.addItem("Example function", "exampleFunction");
    menu.addToUi();`;
}


export function getOtherFunc() {
    return`SpreadsheetApp.getUi().alert('This is a test of another dynamically created function');`;
}