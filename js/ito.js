function findObj(theObj, theDoc) {
    var p, i, foundObj;
    if (!theDoc) theDoc = document;
    if ((p = theObj.indexOf("?")) > 0 && parent.frames.length) {
        theDoc = parent.frames[theObj.substring(p + 1)].document;
        theObj = theObj.substring(0, p);
    }
    if (!(foundObj = theDoc[theObj]) && theDoc.all) foundObj = theDoc.all[theObj];
    for (i = 0; !foundObj && i < theDoc.forms.length; i++) foundObj = theDoc.forms[i][theObj];
    for (i = 0; !foundObj && theDoc.layers && i < theDoc.layers.length; i++) foundObj = findObj(theObj, theDoc.layers[i].document);
    if (!foundObj && document.getElementById) foundObj = document.getElementById(theObj);
    return foundObj;
}
function addRow() {
    var trLastIndex = findObj("trLastIndex", document);
    var rowID = parseInt(trLastIndex.value);
    var ito_table = findObj("ito_table", document);
    var newTR = ito_table.insertRow(ito_table.rows.length);
    newTR.id = "row" + rowID;
    var newAllele = newTR.insertCell(0);
    newAllele.innerHTML = "<select id='locus" + rowID + "'class='span2'><option value=\"volvo\">Volvo</option><option value=\"saab\">Saab</option><option value=\"fiat\">Fiat</option><option value=\"audi\">Audi</option></select>";
    var newF1 = newTR.insertCell(1);
    newF1.innerHTML = "<input  class='input-small'  id='F1_" + rowID + "' type='text'/><i class='' id='F1_Icon" + rowID + " ></i>";
    var newF2 = newTR.insertCell(2);
    newF2.innerHTML = "<input class='input-small'  id='F2_" + rowID + "' type='text'/><i class='' id='F2_Icon" + rowID + " ></i>";
    var newC1 = newTR.insertCell(3);
    newC1.innerHTML = "<input class='input-small'  id='C1_" + rowID + "' type='text'/><i class='' id='C1_Icon" + rowID + " ></i>";
    var newC2 = newTR.insertCell(4);
    newC2.innerHTML = "<input  class='input-small'  id='C2_" + rowID + "' type='text'/><i class='' id='C2_Icon" + rowID + " ></i>";
    var newPi = newTR.insertCell(5);
    newPi.innerHTML = "<input  class='input-small uneditable-input'   id='PI_" + rowID + "' type='text'  />";
    var newDeleteTD = newTR.insertCell(6);
    newDeleteTD.innerHTML = "<input type='button' class='btn  btn-small  btn-danger' onclick=\"deleteRow('row" + rowID + "')\" value='delete'></div>";
    trLastIndex.value = (rowID + 1).toString();
    var linesCount = document.getElementById("row_count");
    linesCount.innerHTML = (ito_table.rows.length - 1);

}

function deleteRow(rowid) {
    var ito_table = findObj("ito_table", document);
    var row = findObj(rowid, document);
    var rowIndex = row.rowIndex;
    ito_table.deleteRow(rowIndex);
    var linesCount = document.getElementById("row_count");
    linesCount.innerHTML = (ito_table.rows.length - 1);
}
function clearAllRows() {
    if (confirm('你想清楚所有的数据吗 ?')) {
        var ito_table = findObj("ito_table", document);
        var row_count = ito_table.rows.length;
        for (i = row_count - 1; i > 0; i--) {
            ito_table.deleteRow(i);
        }
        var trLastIndex = findObj("trLastIndex", document);
        trLastIndex.value = "1";
        var linesCount = document.getElementById("row_count");
        linesCount.innerHTML = (ito_table.rows.length - 1);
    }
}