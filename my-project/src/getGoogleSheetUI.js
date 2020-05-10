export function getGoogleSheetMenuUI() {
    return onOpenMenuFunction;
}


function onOpenMenuFunction() {
    var menuName = "Venture Validator";
    var ui =  SpreadsheetApp.getUi();
    var menu = ui.createMenu(menuName);
    var item = menu.addItem("Calculate Cumulative Total",  "testApi");
    menu.addToUi();
}