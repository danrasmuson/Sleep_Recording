// A program that records my sleeping results

//Steps in program
// 1. creates new row for todates date
// 2. get new sleep data
// 3. fills data into excel sheet
// 4. sends report on weekly fashion

function getNewSleepData() {
    // GETS NEW SLEEP DATA FROM GMAIL
    //category: "wokeup" | "toSleep" | "leftHosue"
    //date: "1-21-2013" Note - will match the row number in column A
    //emailTime: "11:45:12"
    var labelObject = GmailApp.getUserLabelByName("Sleep_Recording");
    var threads = labelObject.getThreads(); // note will fail if too large
    var sleepData = {category: [],date: [],emailTime: []};
    for (var i = threads.length-1; i >= 0; i--) {
        if (threads[i].isUnread()) {
            var messages = threads[i].getMessages();
            var message = messages[0]; // there is only going to ever be 1 value

            GmailApp.markMessageRead(message); // now you can mark it read

            // Values from Email
            subject = message.getSubject();
            dateObj = message.getDate();

            // Dictionary Values
            var categoryValue = subject.split(" ")[0];

            var yyyy = dateObj.getFullYear().toString();
            var mm = (dateObj.getMonth() + 1).toString();
            var dd = dateObj.getDate().toString();
            var dateValue = mm + "/" + dd + "/" + yyyy;

            var emailTimeValue = dateObj.getHours().toString() + ":" + dateObj.getMinutes().toString() + ":" + dateObj.getSeconds().toString();

            // Add Data
            sleepData.category.push(categoryValue);
            sleepData.date.push(dateValue);
            sleepData.emailTime.push(emailTimeValue);
        }
    }
    return sleepData;
}

// these are all sub functions of dataToExcel - maybe should be a class?
function getDateColumnValues(sheet){
    var sheetValues = sheet.getDataRange().getValues();
    var columnAValues = [];
    for (var y = 0; y < sheetValues.length; y++) {
        columnAValues.push(sheetValues[y][0]); // values[row][column]
    }
    return columnAValues;
}
function getDateRowNum(sheet, dateStr){
    // return -1 if no date yet,
    // is the date already in columnAValues?

    columnAValues = getDateColumnValues(sheet);
    var dateNum = -1;
    for (var z = 0; z < columnAValues.length; z++) {
        if (dateStr == columnAValues[z].toString()) {
            dateNum = z + 1;
        }
    }
    return dateNum;
}
function newRow(sheet,date){
    sheet.appendRow(["'" + date, "", "", "", "", "", ""]);
    var lastRow = sheet.getDataRange().getLastRow();
    var formula1 = "=(Time(23, 59, 59)-E" + (lastRow - 1) + ")+C" + lastRow;
    var formual2 = "=C" + lastRow + "-B" + lastRow;
    sheet.getRange(lastRow, 6).setFormula(formula1);
    sheet.getRange(lastRow, 7).setFormula(formual2);
}
function dataToExcel(data) {
    // Column headings -- date, alarm, wokeup, leftHosue, toSleep, sleep_hours, wakeup_time

    // open sheet sleep recording spreadsheet
    var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheet/ccc?key=0AvjRj36CwqrtdHhjVHJkR2xERmZ6S0JScDJOa1VNLXc&usp=drive_web#gid=0");
    var sheet = ss.getSheets()[0]; // get sheet

    // move through each new message
    // doesn't matter which value i index on just used emailTime
    for (var x = 0; x < data.emailTime.length; x++) {
        dateNum = getDateRowNum(sheet, data.date[x].toString())
        if (dateNum == -1) { // new date
            newRow(sheet,data.date[x])
            dateNum = getDateRowNum(sheet, data.date[x].toString()) // todo maybe not best to call again like this
        }
        // puts the time value in the sheet
        // NOTE: the mispelling of leftHosue too lazy to change in webpage
        var columnNum = ["alarm", "wokeup", "leftHosue", "toSleep"].indexOf(data.category[x])+2; // alarm should be column 2 wokup 3 etc
        sheet.getRange(dateNum, columnNum).setValue(data.emailTime[x]);
    }
}

function main() {
    var data = getNewSleepData();
    dataToExcel(data);
}
