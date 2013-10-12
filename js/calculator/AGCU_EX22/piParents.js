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

function condition_qq_qq_qq(C1, C2, M1, M2, AF1, AF2) {
    return C1 == C2 && M1 == M2 && AF1 == AF2 && C1 == M1 && M1 == AF1;
}

function condition_qq_qq_qr(C1, C2, M1, M2, AF1, AF2) {
    return C1 == C2 && M1 == M2 && AF1 != AF2 && C1 == M1 && ((M1 == AF1 && M1 != AF2) || (M1 != AF1 && M1 == AF2));
}

function condition_qq_pq_qq(C1, C2, M1, M2, AF1, AF2) {
    return C1 == C2 && AF1 == AF2 && C1 == AF1 && M1 != M2 && (M1 == C1 || M2 == C1);
}

function condition_qq_pq_qr(C1, C2, M1, M2, AF1, AF2) {
    return C1 == C2 && M1 != M2 && AF1 != AF2 &&
        ((C1 == M1 && C1 != M2) || (C1 != M1 && C1 == M2)) &&
        ((C1 == AF1 && C1 != AF2) || (C1 != AF1 && C1 == AF2));
}

function condition_pq_pp_qq(C1, C2, M1, M2, AF1, AF2) {
    return C1 != C2 && M1 == M2 && AF1 == AF2 && M1 != AF1 &&
        ((M1 == C1 && M1 != C2) || (M1 != C1 && M1 == C2)) &&
        ((AF1 == C1 && AF1 != C2) || (AF1 != C1 && AF2 == C2));
}

function condition_pq_pr_qq(C1, C2, M1, M2, AF1, AF2) {
    return C1 != C2 && M1 != M2 && AF1 == AF2 &&
        (((M1 == C1 || M1 == C2) && (M2 != C1 && M2 != C2)) ||
            ((M2 == C1 || M2 == C2) && (M1 != C1 && M1 != C2))) &&
        (AF1 == C1 || AF1 == C2);
}

function condition_pq_pp_pq(C1, C2, M1, M2, AF1, AF2) {
    return C1 != C2 && M1 == M2 && AF1 != AF2 && (M1 == C1 || M1 == C2) && (C1 == AF1 || C1 == AF2) && (C2 == AF1 || C2 == AF2);
}

function condition_pq_pr_or_ps_pq(C1, C2, M1, M2, AF1, AF2) {
    return C1 != C2 && M1 != M2 && AF1 != AF2 &&
        (((M1 == C1 || M1 == C2) && (M2 != C1 && M2 != C2)) || ((M2 == C1 || M2 == C2) && (M1 != C1 && M1 != C2))) &&
        (C1 == AF1 || C1 == AF2) && (C2 == AF1 || C2 == AF2);
}

function condition_pq_pp_qr(C1, C2, M1, M2, AF1, AF2) {
    return C1 != C2 && M1 == M2 && AF1 != AF2 && (M1 == C1 || M1 == C2) &&
        (((AF1 == C1 || AF1 == C2) && (AF2 != C1 && AF2 != C2)) || ((AF2 == C1 || AF2 == C2) && (AF1 != C1 && AF1 != C2)));
}

function condition_pq_pr_or_ps_qr(C1, C2, M1, M2, AF1, AF2) {
    return C1 != C2 && M1 != M2 && AF1 != AF2 &&
        (((M1 == C1 || M1 == C2) && (M2 != C1 && M2 != C2)) || ((M2 == C1 || M2 == C2) && (M1 != C1 && M1 != C2))) &&
        (((AF1 == C1 || AF1 == C2) && (AF2 != C1 && AF2 != C2)) || ((AF2 == C1 || AF2 == C2) && (AF1 != C1 && AF1 != C2)));
}
function condition_pq_pq_pq(C1, C2, M1, M2, AF1, AF2) {
    return C1 != C2 && M1 != M2 && AF1 != AF2 &&
        (C1 == AF1 || C1 == AF2) && (C2 == AF1 || C2 == AF2) &&
        (C1 == M1 || C1 == M2) && (C2 == M1 || C2 == M2) &&
        (M1 == AF1 || M1 == AF2) && (M2 == AF1 || M2 == AF2);
}
function condition_pq_pq_qq(C1, C2, M1, M2, AF1, AF2) {
    return C1 != C2 && M1 != M2 && AF1 == AF2 &&
        (C1 == M1 || C1 == M2) && (C2 == M1 || C2 == M2) &&
        (AF1 == C1 || AF1 == C2);
}
function condition_pq_pq_qr(C1, C2, M1, M2, AF1, AF2) {
    return C1 != C2 && M1 != M2 && AF1 != AF2 &&
        (C1 == M1 || C1 == M2) && (C2 == M1 || C2 == M2) &&
        (((AF1 == C1 || AF1 == C2) && (AF2 != C1 && AF2 != C2)) || ((AF2 == C1 || AF2 == C2) && (AF1 != C1 && AF1 != C2)));
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

    if (condition_qq_pq_qq(C1, C2, M1, M2, AF1, AF2)) {
        pi = 1 / Number(C1value);
    }

    if (condition_qq_qq_qq(C1, C2, M1, M2, AF1, AF2)) {
        pi = 1 / Number(C1value);
    }

    if (condition_qq_pq_qr(C1, C2, M1, M2, AF1, AF2)) {
        pi = 1 / (2 * Number(C1value));
    }

    if (condition_qq_qq_qr(C1, C2, M1, M2, AF1, AF2)) {
        pi = 1 / (2 * Number(C1value));
    }

    if (condition_pq_pp_qq(C1, C2, M1, M2, AF1, AF2)) {
        pi = 1 / Number(AF1value);
    }

    if (condition_pq_pr_qq(C1, C2, M1, M2, AF1, AF2)) {
        pi = 1 / Number(AF1value);
    }

    if (condition_pq_pp_pq(C1, C2, M1, M2, AF1, AF2)) {
        if (C1 == M1) {
            pi = 1 / Number(C2value);
        } else {
            pi = 1 / Number(C1value);
        }
    }

    if (condition_pq_pr_or_ps_pq(C1, C2, M1, M2, AF1, AF2)) {
        if (M1 == C1 || M1 == C2) {
            pi = 1 / Number(M1value);
        } else {
            pi = 1 / Number(M2value);
        }
    }

    if (condition_pq_pp_qr(C1, C2, M1, M2, AF1, AF2)) {
        if (C1 == M1) {
            pi = 1 / Number(C2value);
        } else {
            pi = 1 / Number(C1value);
        }
    }

    if (condition_pq_pr_or_ps_qr(C1, C2, M1, M2, AF1, AF2)) {
        if (C1 == M1) {
            pi = 1 / Number(C2value);
        } else {
            pi = 1 / Number(C1value);
        }
    }

    if (condition_pq_pq_pq(C1, C2, M1, M2, AF1, AF2)) {
        pi = 1 / (Number(C1value) + Number(C2value));
    }

    if (condition_pq_pq_qq(C1, C2, M1, M2, AF1, AF2)) {
        pi = 1 / (Number(C1value) + Number(C2value));
    }

    if (condition_pq_pq_qr(C1, C2, M1, M2, AF1, AF2)) {
        pi = 1 / 2 * (Number(C1value) + Number(C2value));
    }

    var PI = piParentsFindObj("PI_" + rowID, document);
    PI.innerHTML = pi.toFixed(6);

    addCookie("piParentsPI_" + rowID, pi.toFixed(6), 1);

    return(pi);
}

function calculate() {
    var cpi = 1;
    var rcp;
    var linesCount = getCookie("piParentsLinesCount");
    for (var i = 1; i <= Number(linesCount); i++) {
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
    addCookie("piParentsLocusValue_" + rowID, locusValue, hours);
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