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

function loadTableFromCookie() {
    var linesCount = getCookie("piParentsLinesCount");
    for (var i = 1; i <= Number(linesCount); i++) {
        var locus = getCookie("piParentsLocus_" + i);
        var AF1 = getCookie("piParentsAF1_" + i);
        var AF2 = getCookie("piParentsAF2_" + i);
        var M1 = getCookie("piParentsM1_" + i);
        var M2 = getCookie("piParentsM2_" + i);
        var C1 = getCookie("piParentsC1_" + i);
        var C2 = getCookie("piParentsC2_" + i);
        if (!(AF1 == null && AF2 == null && M1 == null && M2 == null && C1 == null && C2 == null)) {
            piParentsLoadRow(i, locus, AF1, AF2, M1, M2, C1, C2);
        }
    }
    ;
}

function generateSelectCode(rowID) {
    var code = "<select id='locus_" + rowID + "' onclick='saveDataIntoCookie(" + rowID + ", 1)' class='span2'>" +
        "<option value=\"D3S1358\">D3S1358</option>" +
        "<option value=\"D13S317\">D13S317</option>" +
        "<option value=\"D7S820\">D7S820</option>" +
        "<option value=\"D16S539\">D16S539</option>" +
        "<option value=\"PentaE\">Penta E</option>" +
        "<option value=\"D2S441\">D2S441</option>" +
        "<option value=\"TPOX\">TPOX</option>" +
        "<option value=\"TH01\">TH01</option>" +
        "<option value=\"D2S1338\">D2S1338</option>" +
        "<option value=\"CSF1PO\">CSF1PO</option>" +
        "<option value=\"PentaD\">Penta D</option>" +
        "<option value=\"D10S1248\">D10S1248</option>" +
        "<option value=\"D19S433\">D19S433</option>" +
        "<option value=\"vWA\">vWA</option>" +
        "<option value=\"D21S11\">D21S11</option>" +
        "<option value=\"D18S51\">D18S51</option>" +
        "<option value=\"D6S1043\">D6S1043</option>" +
        "<option value=\"D8S1179\">D8S1179</option>" +
        "<option value=\"D5S818\">D5S818</option>" +
        "<option value=\"D12S391\">D12S391</option>" +
        "<option value=\"FGA\">FGA</option>" +
        "</select>";
    return(code);
}

function piParentsLoadRow(rowID, locus, AF1, AF2, M1, M2, C1, C2) {
    var regularExpression = "^[0-9]+(\\.[0-9]+)?$";
    var piParentsTrLastIndex = piParentsFindObj("piParentsTrLastIndex", document);
    var piParentsCurrentCount = piParentsFindObj("piParentsCurrentCount", document);
    var piParentsTable = piParentsFindObj("piParentsTable", document);
    var newTR = piParentsTable.insertRow(piParentsTable.rows.length);
    newTR.id = "row" + rowID;
    var newAllele = newTR.insertCell(0);
    newAllele.innerHTML = generateSelectCode(rowID);
    var newAF1 = newTR.insertCell(1);
    newAF1.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='AF1_" + rowID + "'  type='text' onBlur='saveDataIntoCookie(" + rowID + ", 1)'  value='" + AF1 + "' data-required data-pattern='" + regularExpression + "'/></div>";
    var newAF2 = newTR.insertCell(2);
    newAF2.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='AF2_" + rowID + "'  type='text' onBlur='saveDataIntoCookie(" + rowID + ", 1)' value='" + AF2 + "' data-required data-pattern='" + regularExpression + "'/></div>";
    var newM1 = newTR.insertCell(3);
    newM1.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='M1_" + rowID + "'  type='text' onBlur='saveDataIntoCookie(" + rowID + ", 1)' value='" + M1 + "' data-required data-pattern='" + regularExpression + "'/></div>";
    var newM2 = newTR.insertCell(4);
    newM2.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='M2_" + rowID + "'  type='text' onBlur='saveDataIntoCookie(" + rowID + ", 1)' value='" + M2 + "' data-required data-pattern='" + regularExpression + "'/></div>";
    var newC1 = newTR.insertCell(5);
    newC1.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='C1_" + rowID + "'  type='text' onBlur='saveDataIntoCookie(" + rowID + ", 1)' value='" + C1 + "' data-required data-pattern='" + regularExpression + "'/></div>";
    var newC2 = newTR.insertCell(6);
    newC2.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='C2_" + rowID + "'  type='text' onBlur='saveDataIntoCookie(" + rowID + ", 1)' value='" + C2 + "' data-required data-pattern='" + regularExpression + "'/></div>";
    var newPi = newTR.insertCell(7);
    newPi.innerHTML = "<span class='input-mini uneditable-input' id='PI_" + rowID + "'></span>";
    var newDeleteTD = newTR.insertCell(8);
    newDeleteTD.innerHTML = "<button type='button' class='btn  btn-small  btn-danger' onclick=\"piParentsDeleteRow('row" + rowID + "','" + rowID + "')\"><i class='icon-remove icon-white'></i> 删除</button>";
    var selectLocas = piParentsFindObj("locus_" + rowID);
    selectLocas.selectedIndex = locus;
    piParentsTrLastIndex.value = (rowID + 1).toString();
    piParentsCurrentCount.value = (rowID).toString();
    var linesCount = document.getElementById("piParentsRowCount");
    linesCount.innerHTML = (piParentsTable.rows.length - 1);
    reloadValidate();
}


function piParentsAddRow() {
    var regularExpression = "^[0-9]+(\\.[0-9]+)?$";
    var piParentsTrLastIndex = piParentsFindObj("piParentsTrLastIndex", document);
    var piParentsCurrentCount = piParentsFindObj("piParentsCurrentCount", document);
    var rowID = parseInt(piParentsTrLastIndex.value);
    var piParentsTable = piParentsFindObj("piParentsTable", document);
    var newTR = piParentsTable.insertRow(piParentsTable.rows.length);
    newTR.id = "row" + rowID;
    var newAllele = newTR.insertCell(0);
    newAllele.innerHTML = generateSelectCode(rowID);
    var newAF1 = newTR.insertCell(1);
    newAF1.innerHTML = "<div class='control-group input-append'><input class='input-mini' onBlur='saveDataIntoCookie(" + rowID + ", 1)'  id='AF1_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newAF2 = newTR.insertCell(2);
    newAF2.innerHTML = "<div class='control-group input-append'><input class='input-mini' onBlur='saveDataIntoCookie(" + rowID + ", 1)' id='AF2_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newM1 = newTR.insertCell(3);
    newM1.innerHTML = "<div class='control-group input-append'><input class='input-mini' onBlur='saveDataIntoCookie(" + rowID + ", 1)' id='M1_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newM2 = newTR.insertCell(4);
    newM2.innerHTML = "<div class='control-group input-append'><input class='input-mini' onBlur='saveDataIntoCookie(" + rowID + ", 1)' id='M2_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newC1 = newTR.insertCell(5);
    newC1.innerHTML = "<div class='control-group input-append'><input class='input-mini' onBlur='saveDataIntoCookie(" + rowID + ", 1)' id='C1_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newC2 = newTR.insertCell(6);
    newC2.innerHTML = "<div class='control-group input-append'><input class='input-mini' onBlur='saveDataIntoCookie(" + rowID + ", 1)' id='C2_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newPi = newTR.insertCell(7);
    newPi.innerHTML = "<span class='input-mini uneditable-input' id='PI_" + rowID + "'></span>";
    var newDeleteTD = newTR.insertCell(8);
    newDeleteTD.innerHTML = "<button type='button' class='btn  btn-small  btn-danger' onclick=\"piParentsDeleteRow('row" + rowID + "','" + rowID + "')\"><i class='icon-remove icon-white'></i> 删除</button>";
    piParentsTrLastIndex.value = (rowID + 1).toString();
    piParentsCurrentCount.value = (rowID).toString();
    var linesCount = document.getElementById("piParentsRowCount");
    linesCount.innerHTML = (piParentsTable.rows.length - 1);
    reloadValidate();
    addCookie("piParentsLinesCount", Number(piParentsCurrentCount.value), 1);
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

function calculatePi(rowID) {
    var locus = piParentsFindObj("locus_" + (rowID), document).value;
    var AF1 = piParentsFindObj("AF1_" + (rowID), document).value;
    var AF2 = piParentsFindObj("AF2_" + (rowID), document).value;
    var M1 = piParentsFindObj("M1_" + (rowID), document).value;
    var M2 = piParentsFindObj("M2_" + (rowID), document).value;
    var C1 = piParentsFindObj("C1_" + (rowID), document).value;
    var C2 = piParentsFindObj("C2_" + (rowID), document).value;
    var AF1value = getAllete("http://localhost:8080/relations/xml/AGCU_EX22/" + locus + ".xml", "a" + AF1);
    var AF2value = getAllete("http://localhost:8080/relations/xml/AGCU_EX22/" + locus + ".xml", "a" + AF2);
    var M1value = getAllete("http://localhost:8080/relations/xml/AGCU_EX22/" + locus + ".xml", "a" + M1);
    var M2value = getAllete("http://localhost:8080/relations/xml/AGCU_EX22/" + locus + ".xml", "a" + M2);
    var C1value = getAllete("http://localhost:8080/relations/xml/AGCU_EX22/" + locus + ".xml", "a" + C1);
    var C2value = getAllete("http://localhost:8080/relations/xml/AGCU_EX22/" + locus + ".xml", "a" + C2);
    var pi = 0;
    if (C1 == C2) {
        if (AF1 == AF2 && AF1 == C1 && (M1 == AF1 || M2 == AF1)) {
            pi = 1 / Number(C1value);
        }
        if (AF1 != AF2 && (AF1 == C1 || AF2 == C1) && (M1 == AF1 || M2 == AF1)) {
            pi = 1 / (2 * Number(C1value));
        }
    } else if (C1 != C2) {
        if (AF1 == AF2 && (AF1 == C1 || AF1 == C2)) {
            if (M1 != M2 && (M1 == C1 || M1 == C2) && (M2 == C1 || M2 == C2)) {
                pi = 1 / (Number(C1value) + Number(C2value));
            } else if (M1 == M2 && (M1 == C1 || M1 == C2)) {
                pi = 1 / Number(AF1value);
            } else if (M1 != M2 && (M1 == C1 || M1 == C2 || M2 == C1 || M2 == C2)) {
                pi = 1 / Number(AF1value);
            }
        } else if (M1 != M2 && (M1 == C1 || M1 == C2) && (M2 == C1 || M2 == C2)) {
            if (AF1 != AF2 && (AF1 == C1 || AF1 == C2) && (AF2 == C1 || AF2 == C2)) {
                pi = 1 / (Number(C1value) + Number(C2value));
            } else if (AF1 != AF2 && (C1 == AF1 || C1 == AF2 || C2 == AF1 || C2 == AF2) && ((AF1 != C1 && AF1 != C2) || (AF2 != C1 && AF2 != C2))) {
                pi = 1 / (2 * Number(C1value) + 2 * Number(C2value));
            }
        } else if (((C1 == M1 || C1 == M2) && (C2 != M1 && C2 != M2)) || ((C2 == M1 || C2 == M2) && (C1 != M1 && C1 != M2))) {
            if (AF1 != AF2 && (AF1 == C1 || AF1 == C2 || AF2 == C1 || AF2 == C2)) {
                if (C1 == M1 || C1 == M2) {
                    pi = 1 / (2 * Number(C2value));
                } else if (C2 == M1 || C2 == M2) {
                    pi = 1 / (2 * Number(C1value));
                }
            }
        }
    }
    var PI = piParentsFindObj("PI_" + rowID, document);
    PI.innerHTML = pi.toFixed(6);
    addCookie("piParentsPI_" + rowID, pi.toFixed(6), 1);
    return(pi);
}

function calculate() {
    var cpi = 1;
    var rcp = 0;
    var linesCount = getCookie("piParentsLinesCount");
    for (var i = 1; i <= Number(linesCount); i++) {
        var locus = getCookie("piParentsLocus_" + i);
        var AF1 = getCookie("piParentsAF1_" + i);
        var AF2 = getCookie("piParentsAF2_" + i);
        var M1 = getCookie("piParentsM1_" + i);
        var M2 = getCookie("piParentsM2_" + i);
        var C1 = getCookie("piParentsC1_" + i);
        var C2 = getCookie("piParentsC2_" + i);
        if (!(AF1 == null && AF2 == null && M1 == null && M2 == null && C1 == null && C2 == null)) {
            cpi = cpi * Number(calculatePi(i));
        }
    }
    rcp = cpi / (1 + cpi);
    var CPI = document.getElementById("CPI");
    CPI.innerHTML = cpi.toFixed(6);
    var RCP = document.getElementById("RCP");
    RCP.innerHTML = rcp.toFixed(6);
    addCookie("piParentsCPI", cpi.toFixed(6), 1);
    addCookie("piParentsRCP", rcp.toFixed(6), 1);
    var piParentsRowCount = document.getElementById("piParentsRowCount");
    addCookie("piParentsRowCount", piParentsRowCount.innerHTML, 1);
}

function saveDataIntoCookie(rowID, hours) {
    var locus = piParentsFindObj("locus_" + rowID, document).selectedIndex;
    var locusValue = piParentsFindObj("locus_" + rowID, document).value;
    var AF1 = piParentsFindObj("AF1_" + rowID, document).value;
    var AF2 = piParentsFindObj("AF2_" + rowID, document).value;
    var M1 = piParentsFindObj("M1_" + rowID, document).value;
    var M2 = piParentsFindObj("M2_" + rowID, document).value;
    var C1 = piParentsFindObj("C1_" + rowID, document).value;
    var C2 = piParentsFindObj("C2_" + rowID, document).value;
    addCookie("piParentsLocus_" + rowID, locus, hours);
    addCookie("piParentslocusValue_" + rowID, locusValue, hours);
    addCookie("piParentsAF1_" + rowID, AF1, hours);
    addCookie("piParentsAF2_" + rowID, AF2, hours);
    addCookie("piParentsM1_" + rowID, M1, hours);
    addCookie("piParentsM2_" + rowID, M2, hours);
    addCookie("piParentsC1_" + rowID, C1, hours);
    addCookie("piParentsC2_" + rowID, C2, hours);
}

function piParentsDeleteRow(rowID, id) {
    var piParentsTable = piParentsFindObj("piParentsTable", document);
    var row = piParentsFindObj(rowID, document);
    var rowIndex = row.rowIndex;
    piParentsTable.deleteRow(rowIndex);
    var linesCount = document.getElementById("piParentsRowCount");
    linesCount.innerHTML = (piParentsTable.rows.length - 1);
    deleteRowCookie(Number(id));
}

function deleteRowCookie(rowID) {
    delCookie("piParentsLocus_" + rowID);
    delCookie("piParentsAF1_" + rowID);
    delCookie("piParentsAF2_" + rowID);
    delCookie("piParentsM1_" + rowID);
    delCookie("piParentsM2_" + rowID);
    delCookie("piParentsC1_" + rowID);
    delCookie("piParentsC2_" + rowID);
    delCookie("piParentsCPI");
    delCookie("piParentsRCP");
    delCookie("piParentsRowCount");
}

function piParentsClearAllRows() {
    var piParentsTable = piParentsFindObj("piParentsTable", document);
    var piParentsRowCount = piParentsTable.rows.length;
    for (var i = piParentsRowCount - 1; i > 0; i--) {
        piParentsTable.deleteRow(i);
    }
    var piParentsTrLastIndex = piParentsFindObj("piParentsTrLastIndex", document);
    piParentsTrLastIndex.value = "1";
    var linesCount = document.getElementById("piParentsRowCount");
    linesCount.innerHTML = (piParentsTable.rows.length - 1);
    clearAllCookies();
    var CPI = document.getElementById("CPI");
    CPI.innerHTML = 0;
    var RCP = document.getElementById("RCP");
    RCP.innerHTML = 0;
}

function clearAllCookies() {
    var linesCount = getCookie("piParentsLinesCount");
    for (var i = 1; i <= Number(linesCount); i++) {
        deleteRowCookie(i);
    }
    delCookie("piParentsLinesCount");
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
    allete = allete.replace(".", "_");
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

function addCookie(objName, objValue, objHours) {      //添加cookie
    var str = objName + "=" + escape(objValue);
    if (objHours > 0) {                               //为时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    document.cookie = str;
}

function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}