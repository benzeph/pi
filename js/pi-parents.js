function piParentsFindObj(theObj, theDoc) {
    var p, i, foundObj;
    if (!theDoc) theDoc = document;
    if ((p = theObj.indexOf("?")) > 0 && parent.frames.length) {
        theDoc = parent.frames[theObj.substring(p + 1)].document;
        theObj = theObj.substring(0, p);
    }
    if (!(foundObj = theDoc[theObj]) && theDoc.all) foundObj = theDoc.all[theObj];
    for (i = 0; !foundObj && i < theDoc.forms.length; i++) foundObj = theDoc.forms[i][theObj];
    for (i = 0; !foundObj && theDoc.layers && i < theDoc.layers.length; i++) foundObj = piParentsFindObj(theObj, theDoc.layers[i].document);
    if (!foundObj && document.getElementById) foundObj = document.getElementById(theObj);
    return foundObj;
}

function piParentsAddRow() {
    var regularExpression = "^[0-9]+(.[0-9]+)?$";
    var piParentsTrLastIndex = piParentsFindObj("piParentsTrLastIndex", document);
    var piParentsCurrentCount = piParentsFindObj("piParentsCurrentCount", document);
    var rowID = parseInt(piParentsTrLastIndex.value);
    var piParentsTable = piParentsFindObj("piParentsTable", document);
    var newTR = piParentsTable.insertRow(piParentsTable.rows.length);
    newTR.id = "row" + rowID;
    var newAllele = newTR.insertCell(0);
    newAllele.innerHTML = "<select id='locus_" + rowID + "'class='span2'><option value=\"D3S1358\">D3S1358</option><option value=\"saab\">Saab</option><option value=\"fiat\">Fiat</option><option value=\"audi\">Audi</option></select>";
    var newF1 = newTR.insertCell(1);
    newF1.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='F1_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newF2 = newTR.insertCell(2);
    newF2.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='F2_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newM1 = newTR.insertCell(3);
    newM1.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='M1_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newM2 = newTR.insertCell(4);
    newM2.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='M2_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newC1 = newTR.insertCell(5);
    newC1.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='C1_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newC2 = newTR.insertCell(6);
    newC2.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='C2_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newPi = newTR.insertCell(7);
    newPi.innerHTML = "<input  class='input-mini uneditable-input' id='PI_" + rowID + "' type='text'  />";
    var newDeleteTD = newTR.insertCell(8);
    newDeleteTD.innerHTML = "<input type='button' class='btn  btn-small  btn-danger' onclick=\"piParentsDeleteRow('row" + rowID + "')\" value='delete'></div>";
    piParentsTrLastIndex.value = (rowID + 1).toString();
    piParentsCurrentCount.value = (rowID).toString();
    var linesCount = document.getElementById("piParentsRowCount");
    linesCount.innerHTML = (piParentsTable.rows.length - 1);
    reloadValidate();
    calculatePi(Number(piParentsCurrentCount.value));
}

function reloadValidate(){
    $('form').validate({
        onBlur : true,
        eachValidField : function() {
            $(this).closest('div').removeClass('error').addClass('success');
        },
        eachInvalidField : function() {
            $(this).closest('div').removeClass('success').addClass('error');
        }
    });
}

function calculatePi(rowID){
    if(rowID > 0){
        var locus = piParentsFindObj("locus_" + (rowID - 1),document).value;
        var F1 = piParentsFindObj("F1_" + (rowID - 1),document).value;
        var F2 = piParentsFindObj("F2_" + (rowID - 1),document).value;
        var M1 = piParentsFindObj("M1_" + (rowID - 1),document).value;
        var M2 = piParentsFindObj("M2_" + (rowID - 1),document).value;
        var C1 = piParentsFindObj("C1_" + (rowID - 1),document).value;
        var C2 = piParentsFindObj("C2_" + (rowID - 1),document).value;
        var F1value = getAllete("http://localhost:8080/pi/xml/" + locus + ".xml","a" + F1);
        var F2value = getAllete("http://localhost:8080/pi/xml/" + locus + ".xml","a" + F2);
        var M1value = getAllete("http://localhost:8080/pi/xml/" + locus + ".xml","a" + M1);
        var M2value = getAllete("http://localhost:8080/pi/xml/" + locus + ".xml","a" + M2);
        var C1value = getAllete("http://localhost:8080/pi/xml/" + locus + ".xml","a" + C1);
        var C2value = getAllete("http://localhost:8080/pi/xml/" + locus + ".xml","a" + C2);
        var pi = 0;
        if(C1==C2){
            if(F1==F2&&F1==C1&&(M1==F1||M2==F1)){
                pi = 1/C1value;
            }
            if(F1!=F2&&(F1==C1||F2==C1)&&(M1==F1||M2==F1)){
                pi = 1/(2*C1value);
            }
        }
        var PI = piParentsFindObj("PI_" + (rowID - 1),document);
        PI.value = pi;
    }
}

function piParentsDeleteRow(rowid) {
    var piParentsTable = piParentsFindObj("piParentsTable", document);
    var row = piParentsFindObj(rowid, document);
    var rowIndex = row.rowIndex;
    piParentsTable.deleteRow(rowIndex);
    var linesCount = document.getElementById("piParentsRowCount");
    linesCount.innerHTML = (piParentsTable.rows.length - 1);
}

function piParentsClearAllRows() {
    if (confirm('你想清楚所有的数据吗 ?')) {
        var piParentsTable = piParentsFindObj("piParentsTable", document);
        var piParentsRowCount = piParentsTable.rows.length;
        for (i = piParentsRowCount - 1; i > 0; i--) {
            piParentsTable.deleteRow(i);
        }
        var piParentsTrLastIndex = piParentsFindObj("piParentsTrLastIndex", document);
        piParentsTrLastIndex.value = "1";
        var linesCount = document.getElementById("piParentsRowCount");
        linesCount.innerHTML = (piParentsTable.rows.length - 1);
    }
}

function getAllete(xmlfile,allete){
    if (window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET",xmlfile,false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;
    return(xmlDoc.getElementsByTagName(allete)[0].childNodes[0].nodeValue);
}