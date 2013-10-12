function piSingleParentFindObj(theObj, theDoc) {
    var p, i, foundObj;
    if (!theDoc) theDoc = document;
    if ((p = theObj.indexOf("?")) > 0 && parent.frames.length) {
        theDoc = parent.frames[theObj.substring(p + 1)].document;
        theObj = theObj.substring(0, p);
    }
    if (!(foundObj = theDoc[theObj]) && theDoc.all) foundObj = theDoc.all[theObj];
    for (i = 0; !foundObj && i < theDoc.forms.length; i++) foundObj = theDoc.forms[i][theObj];
    for (i = 0; !foundObj && theDoc.layers && i < theDoc.layers.length; i++) foundObj = piSingleParentFindObj(theObj, theDoc.layers[i].document);
    if (!foundObj && document.getElementById) foundObj = document.getElementById(theObj);
    return foundObj;
}

function loadTableFromCookie() {
    var linesCount = getCookie("piSingleParentLinesCount");
    for (var i = 1; i <= Number(linesCount); i++) {
        var locus = getCookie("piSingleParentLocus_" + i);
        var AF1 = getCookie("piSingleParentAF1_" + i);
        var AF2 = getCookie("piSingleParentAF2_" + i);
        var C1 = getCookie("piSingleParentC1_" + i);
        var C2 = getCookie("piSingleParentC2_" + i);
        if (!(AF1 == null && AF2 == null && C1 == null && C2 == null)) {
            piSingleParentLoadRow(i, locus, AF1, AF2, C1, C2);
        }
    }
}

function generateSelectCode(rowID) {
    var code = "<select id='locus_" + rowID + "' onclick='saveDataIntoCookie(" + rowID + ", 1)' class='span2'>" +
        "<option value=\"D1GATA113\">D1GATA113</option>" +
        "<option value=\"D1S1627\">D1S1627</option>" +
        "<option value=\"D1S1677\">D1S1677</option>" +
        "<option value=\"D2S441\">D2S441</option>" +
        "<option value=\"D2S1776\">D2S1776</option>" +
        "<option value=\"D3S4529\">D3S4529</option>" +
        "<option value=\"D4S2408\">D4S2408</option>" +
        "<option value=\"D5S2500\">D5S2500</option>" +
        "<option value=\"D6S474\">D6S474</option>" +
        "<option value=\"D6S1017\">D6S1017</option>" +
        "<option value=\"D9S1122\">D9S1122</option>" +
        "<option value=\"D10S1248\">D10S1248</option>" +
        "<option value=\"D10S1435\">D10S1435</option>" +
        "<option value=\"D11S4463\">D11S4463</option>" +
        "<option value=\"D12ATA63\">D12ATA63</option>" +
        "<option value=\"D14S1434\">D14S1434</option>" +
        "<option value=\"D17S1301\">D17S1301</option>" +
        "<option value=\"D18S853\">D18S853</option>" +
        "<option value=\"D19S433\">D19S433</option>" +
        "<option value=\"D20S482\">D20S482</option>" +
        "<option value=\"D22S1045\">D22S1045</option>" +
        "</select>";
    return(code);
}

function piSingleParentLoadRow(rowID, locus, AF1, AF2, C1, C2) {
    var regularExpression = "^[0-9]+(\\.[0-9]+)?$";
    var piSingleParentTrLastIndex = piSingleParentFindObj("piSingleParentTrLastIndex", document);
    var piSingleParentCurrentCount = piSingleParentFindObj("piSingleParentCurrentCount", document);
    var piSingleParentTable = piSingleParentFindObj("piSingleParentTable", document);
    var newTR = piSingleParentTable.insertRow(piSingleParentTable.rows.length);

    newTR.id = "row" + rowID;
    var newAllele = newTR.insertCell(0);
    newAllele.innerHTML = generateSelectCode(rowID);
    var newAF1 = newTR.insertCell(1);
    newAF1.innerHTML = "<div class='control-group input-append'><input class='input-small' id='AF1_" + rowID + "'  type='text' onBlur='saveDataIntoCookie(" + rowID + ", 1)'  value='" + AF1 + "' data-required data-pattern='" + regularExpression + "'/></div>";
    var newAF2 = newTR.insertCell(2);
    newAF2.innerHTML = "<div class='control-group input-append'><input class='input-small' id='AF2_" + rowID + "'  type='text' onBlur='saveDataIntoCookie(" + rowID + ", 1)' value='" + AF2 + "' data-required data-pattern='" + regularExpression + "'/></div>";
    var newC1 = newTR.insertCell(3);
    newC1.innerHTML = "<div class='control-group input-append'><input class='input-small' id='C1_" + rowID + "'  type='text' onBlur='saveDataIntoCookie(" + rowID + ", 1)' value='" + C1 + "' data-required data-pattern='" + regularExpression + "'/></div>";
    var newC2 = newTR.insertCell(4);
    newC2.innerHTML = "<div class='control-group input-append'><input class='input-small' id='C2_" + rowID + "'  type='text' onBlur='saveDataIntoCookie(" + rowID + ", 1)' value='" + C2 + "' data-required data-pattern='" + regularExpression + "'/></div>";
    var newPi = newTR.insertCell(5);
    newPi.innerHTML = "<span class='input-small uneditable-input' id='PI_" + rowID + "'></span>";
    var newDeleteTD = newTR.insertCell(6);
    newDeleteTD.innerHTML = "<button type='button' class='btn  btn-small  btn-danger' onclick=\"piSingleParentDeleteRow('row" + rowID + "','" + rowID + "')\"><i class='icon-remove icon-white'></i> 删除</button>";

    var selectLocus = piSingleParentFindObj("locus_" + rowID);
    selectLocus.selectedIndex = locus;

    piSingleParentTrLastIndex.value = (rowID + 1).toString();
    piSingleParentCurrentCount.value = (rowID).toString();

    var linesCount = document.getElementById("piSingleParentRowCount");
    linesCount.innerHTML = (piSingleParentTable.rows.length - 1);

    reloadValidate();
}

function piSingleParentAddRow() {
    var regularExpression = "^[0-9]+(\\.[0-9]+)?$";
    var piSingleParentTrLastIndex = piSingleParentFindObj("piSingleParentTrLastIndex", document);
    var piSingleParentCurrentCount = piSingleParentFindObj("piSingleParentCurrentCount", document);
    var rowID = parseInt(piSingleParentTrLastIndex.value);
    var piSingleParentTable = piSingleParentFindObj("piSingleParentTable", document);
    var newTR = piSingleParentTable.insertRow(piSingleParentTable.rows.length);

    newTR.id = "row" + rowID;
    var newAllele = newTR.insertCell(0);
    newAllele.innerHTML = generateSelectCode(rowID);
    var newAF1 = newTR.insertCell(1);
    newAF1.innerHTML = "<div class='control-group input-append'><input class='input-small' onBlur='saveDataIntoCookie(" + rowID + ", 1)'  id='AF1_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newAF2 = newTR.insertCell(2);
    newAF2.innerHTML = "<div class='control-group input-append'><input class='input-small' onBlur='saveDataIntoCookie(" + rowID + ", 1)' id='AF2_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newC1 = newTR.insertCell(3);
    newC1.innerHTML = "<div class='control-group input-append'><input class='input-small' onBlur='saveDataIntoCookie(" + rowID + ", 1)' id='C1_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newC2 = newTR.insertCell(4);
    newC2.innerHTML = "<div class='control-group input-append'><input class='input-small' onBlur='saveDataIntoCookie(" + rowID + ", 1)' id='C2_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newPi = newTR.insertCell(5);
    newPi.innerHTML = "<span class='input-small uneditable-input' id='PI_" + rowID + "'></span>";
    var newDeleteTD = newTR.insertCell(6);
    newDeleteTD.innerHTML = "<button type='button' class='btn  btn-small  btn-danger' onclick=\"piSingleParentDeleteRow('row" + rowID + "','" + rowID + "')\"><i class='icon-remove icon-white'></i> 删除</button>";

    piSingleParentTrLastIndex.value = (rowID + 1).toString();
    piSingleParentCurrentCount.value = (rowID).toString();

    var linesCount = document.getElementById("piSingleParentRowCount");
    linesCount.innerHTML = (piSingleParentTable.rows.length - 1);

    reloadValidate();

    addCookie("piSingleParentLinesCount", Number(piSingleParentCurrentCount.value), 1);
}

function reloadValidate() {
    $('form').validate({
        onBlur: true,
        eachValidField: function () {
            $(this).closest('div').removeClass('error').addClass('success');
        },
        eachInvalidField: function () {
            $(this).closest('div').removeClass('success').addClass('error');
        }
    });
}

function condition_qq_qq(C1, C2, AF1, AF2) {
    return AF1 == AF2 && C1 == C2 && AF1 == C1;
}

function condition_pq_qq(C1, C2, AF1, AF2) {
    return C1 != C2 && AF1 == AF2 && (AF1 == C1 || AF1 == C2);
}

function condition_qq_qr(C1, C2, AF1, AF2) {
    return AF1 != AF2 && C1 == C2 && (C1 == AF1 || C1 == AF2);
}

function condition_pq_pq(C1, C2, AF1, AF2) {
    return C1 != C2 && AF1 != AF2 && (C1 == AF1 || C1 == AF2) && (C2 == AF1 || C2 == AF2);
}

function condition_pq_qr(C1, C2, AF1, AF2) {
    return (C1 != C2 && AF1 != AF2) && (((AF1 == C1 || AF1 == C2) && (AF2 != C1 && AF2 != C2)) || ((AF2 == C1 || AF2 == C2) && (AF1 != C1 && AF1 != C2)));
}

function calculatePi(rowID) {
    var locus = piSingleParentFindObj("locus_" + (rowID), document).value;
    var AF1 = piSingleParentFindObj("AF1_" + (rowID), document).value;
    var AF2 = piSingleParentFindObj("AF2_" + (rowID), document).value;
    var C1 = piSingleParentFindObj("C1_" + (rowID), document).value;
    var C2 = piSingleParentFindObj("C2_" + (rowID), document).value;
    var AF1value = getAllete("http://localhost:8080/relations/xml/AGCU211/" + locus + ".xml", "a" + AF1);
    var AF2value = getAllete("http://localhost:8080/relations/xml/AGCU211/" + locus + ".xml", "a" + AF2);
    var C1value = getAllete("http://localhost:8080/relations/xml/AGCU211/" + locus + ".xml", "a" + C1);
    var C2value = getAllete("http://localhost:8080/relations/xml/AGCU211/" + locus + ".xml", "a" + C2);
    var pi = 0;

    if (condition_qq_qq(C1, C2, AF1, AF2)) {
        pi = 1 / Number(C1value);
    } else if (condition_pq_qq(C1, C2, AF1, AF2)) {
        pi = 1 / (Number(AF1value) * 2);
    } else if (condition_qq_qr(C1, C2, AF1, AF2)) {
        pi = 1 / (Number(C1value) * 2);
    } else if (condition_pq_pq(C1, C2, AF1, AF2)) {
        pi = (Number(C1value) + Number(C2value)) / (4 * Number(C1value) * Number(C2value));
    } else if (condition_pq_qr(C1, C2, AF1, AF2)) {
        if (C1 == AF1 || C1 == AF2) {
            pi = 1 / (4 * Number(C1value));
        } else if (C2 == AF1 || C2 == AF2) {
            pi = 1 / (4 * Number(C2value));
        }
    }

    var PI = piSingleParentFindObj("PI_" + rowID, document);
    PI.innerHTML = pi.toFixed(6);

    addCookie("piSingleParentPI_" + rowID, pi.toFixed(6), 1);

    return(pi);
}

function calculate() {
    var cpi = 1;
    var rcp;
    var linesCount = getCookie("piSingleParentLinesCount");

    for (var i = 1; i <= Number(linesCount); i++) {
        var AF1 = getCookie("piSingleParentAF1_" + i);
        var AF2 = getCookie("piSingleParentAF2_" + i);
        var C1 = getCookie("piSingleParentC1_" + i);
        var C2 = getCookie("piSingleParentC2_" + i);
        if (!(AF1 == null && AF2 == null && C1 == null && C2 == null)) {
            cpi = cpi * Number(calculatePi(i));
        }
    }

    rcp = cpi / (1 + cpi);

    var CPI = document.getElementById("CPI");
    CPI.innerHTML = cpi.toFixed(6);
    var RCP = document.getElementById("RCP");
    RCP.innerHTML = rcp.toFixed(6);

    var piSingleParentRowCount = document.getElementById("piSingleParentRowCount");

    addCookie("piSingleParentCPI", cpi.toFixed(6), 1);
    addCookie("piSingleParentRCP", rcp.toFixed(6), 1);
    addCookie("piSingleParentRowCount", piSingleParentRowCount.innerHTML, 1);
}

function saveDataIntoCookie(rowID, hours) {
    var locus = piSingleParentFindObj("locus_" + rowID, document).selectedIndex;
    var locusValue = piSingleParentFindObj("locus_" + rowID, document).value;
    var AF1 = piSingleParentFindObj("AF1_" + rowID, document).value;
    var AF2 = piSingleParentFindObj("AF2_" + rowID, document).value;
    var C1 = piSingleParentFindObj("C1_" + rowID, document).value;
    var C2 = piSingleParentFindObj("C2_" + rowID, document).value;

    addCookie("piSingleParentLocus_" + rowID, locus, hours);
    addCookie("piSingleParentlocusValue_" + rowID, locusValue, hours);
    addCookie("piSingleParentAF1_" + rowID, AF1, hours);
    addCookie("piSingleParentAF2_" + rowID, AF2, hours);
    addCookie("piSingleParentC1_" + rowID, C1, hours);
    addCookie("piSingleParentC2_" + rowID, C2, hours);
}

function piSingleParentDeleteRow(rowID, id) {
    var piSingleParentTable = piSingleParentFindObj("piSingleParentTable", document);
    var row = piSingleParentFindObj(rowID, document);
    var rowIndex = row.rowIndex;
    piSingleParentTable.deleteRow(rowIndex);
    var linesCount = document.getElementById("piSingleParentRowCount");
    linesCount.innerHTML = (piSingleParentTable.rows.length - 1);
    deleteRowCookie(Number(id));
}

function deleteRowCookie(rowID) {
    delCookie("piSingleParentLocus_" + rowID);
    delCookie("piSingleParentAF1_" + rowID);
    delCookie("piSingleParentAF2_" + rowID);
    delCookie("piSingleParentC1_" + rowID);
    delCookie("piSingleParentC2_" + rowID);
    delCookie("piSingleParentCPI");
    delCookie("piSingleParentRCP");
    delCookie("piSingleParentRowCount");
}

function piSingleParentClearAllRows() {
    var piSingleParentTable = piSingleParentFindObj("piSingleParentTable", document);
    var piSingleParentRowCount = piSingleParentTable.rows.length;
    for (var i = piSingleParentRowCount - 1; i > 0; i--) {
        piSingleParentTable.deleteRow(i);
    }
    var piSingleParentTrLastIndex = piSingleParentFindObj("piSingleParentTrLastIndex", document);
    piSingleParentTrLastIndex.value = "1";
    var linesCount = document.getElementById("piSingleParentRowCount");
    linesCount.innerHTML = (piSingleParentTable.rows.length - 1);
    clearAllCookies();
    var CPI = document.getElementById("CPI");
    CPI.innerHTML = 0;
    var RCP = document.getElementById("RCP");
    RCP.innerHTML = 0;
}

function clearAllCookies() {
    var linesCount = getCookie("piSingleParentLinesCount");
    for (var i = 1; i <= Number(linesCount); i++) {
        deleteRowCookie(i);
    }
    delCookie("piSingleParentLinesCount");
}

function getAllete(xmlfile, allete) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", xmlfile, false);
    xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
    var alleteValue;
    if (allete == "a999") {
        alleteValue = Number(1 / 611);
    } else {
        try {
            alleteValue = xmlDoc.getElementsByTagName(allete)[0].childNodes[0].nodeValue;
        } catch (e) {
            alert("等位基因 [" + allete.replace("a", "") + "] 不存在");
        }
    }
    return (alleteValue);
}