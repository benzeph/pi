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

function loadTableFromCookie(){
    var linesCount = getCookie("linesCount");
    alert(linesCount);
    for (var i = 1; i <= Number(linesCount); i++) {
        var locus = getCookie("locus_"+i);
        var AF1 = getCookie("AF1_"+i);
        var AF2 = getCookie("AF2_"+i);
        var M1 = getCookie("M1_"+i);
        var M2 = getCookie("M2_"+i);
        var C1 = getCookie("C1_"+i);
        var C2 = getCookie("C2_"+i);
        if(AF1 == null && AF2 == null && M1 == null && M2 == null && C1 == null && C2 == null){

        }else{
             piParentsLoadRow(i,locus,AF1,AF2,M1,M2,C1,C2);   
        }
    };
}

function generateSelectCode(rowID){
    var code ="<select id='locus_" + rowID + "' onclick='saveDataIntoCookie(" + rowID + ", 1)' class='span2'>"+
    "<option value=\"D3S1358\">D3S1358</option>"+
    "<option value=\"saab\">Saab</option>"+
    "<option value=\"fiat\">Fiat</option>"+
    "<option value=\"audi\">Audi</option>"+
    "</select>";
    return(code);
}

function piParentsLoadRow(rowID,locus,AF1,AF2,M1,M2,C1,C2) {
    var regularExpression = "^[0-9]+(\\.[0-9]+)?$";
    var piParentsTrLastIndex = piParentsFindObj("piParentsTrLastIndex", document);
    var piParentsCurrentCount = piParentsFindObj("piParentsCurrentCount", document);
    var piParentsTable = piParentsFindObj("piParentsTable", document);
    var newTR = piParentsTable.insertRow(piParentsTable.rows.length);
    newTR.id = "row" + rowID;
    var newAllele = newTR.insertCell(0);
    newAllele.innerHTML =  generateSelectCode(rowID);
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
    newDeleteTD.innerHTML = "<input type='button' class='btn  btn-small  btn-danger' onclick=\"piParentsDeleteRow('row" + rowID + "','" + rowID + "')\" value='delete'></div>";
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
    newAllele.innerHTML =  generateSelectCode(rowID);
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
    newDeleteTD.innerHTML = "<input type='button' class='btn  btn-small  btn-danger' onclick=\"piParentsDeleteRow('row" + rowID + "','" + rowID + "')\" value='delete'></div>";
    piParentsTrLastIndex.value = (rowID + 1).toString();
    piParentsCurrentCount.value = (rowID).toString();
    var linesCount = document.getElementById("piParentsRowCount");
    linesCount.innerHTML = (piParentsTable.rows.length - 1);
    reloadValidate();
    addCookie("linesCount",Number(piParentsCurrentCount.value),1);
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
    var locus = piParentsFindObj("locus_" + (rowID),document).value;
    var AF1 = piParentsFindObj("AF1_" + (rowID),document).value;
    var AF2 = piParentsFindObj("AF2_" + (rowID),document).value;
    var M1 = piParentsFindObj("M1_" + (rowID),document).value;
    var M2 = piParentsFindObj("M2_" + (rowID),document).value;
    var C1 = piParentsFindObj("C1_" + (rowID),document).value;
    var C2 = piParentsFindObj("C2_" + (rowID),document).value;
    var AF1value = getAllete("http://localhost:8080/pi/xml/" + locus + ".xml","a" + AF1);
    var AF2value = getAllete("http://localhost:8080/pi/xml/" + locus + ".xml","a" + AF2);
    var M1value = getAllete("http://localhost:8080/pi/xml/" + locus + ".xml","a" + M1);
    var M2value = getAllete("http://localhost:8080/pi/xml/" + locus + ".xml","a" + M2);
    var C1value = getAllete("http://localhost:8080/pi/xml/" + locus + ".xml","a" + C1);
    var C2value = getAllete("http://localhost:8080/pi/xml/" + locus + ".xml","a" + C2);
    var pi = 0;
    if(C1==C2){
        if(AF1==AF2&&AF1==C1&&(M1==AF1||M2==AF1)){
            pi = 1/Number(C1value);
        }
        if(AF1!=AF2&&(AF1==C1||AF2==C1)&&(M1==AF1||M2==AF1)){
            pi = 1/(2*Number(C1value));
        }
    }else if(C1!=C2){
        if(AF1==AF2&&(AF1==C1||AF1==C2)){
            if(M1!=M2&&(M1==C1||M1==C2)&&(M2==C1||M2==C2)){
                pi=1/(Number(C1value)+Number(C2value));
            }else if(M1==M2&&(M1==C1||M1==C2)){
                pi=1/Number(AF1value);
            }else if(M1!=M2&&(M1==C1||M1==C2||M2==C1||M2==C2)){
                pi=1/Number(AF1value);
            }
        }else if(M1!=M2&&(M1==C1||M1==C2)&&(M2==C1||M2==C2)){
            if(AF1!=AF2&&(AF1==C1||AF1==C2)&&(AF2==C1||AF2==C2)){
                pi=1/(Number(C1value)+Number(C2value));
            }else if(AF1!=AF2&&(C1==AF1||C1==AF2||C2==AF1||C2==AF2)&&((AF1!=C1&&AF1!=C2)||(AF2!=C1&&AF2!=C2))){
                pi=1/(2*Number(C1value)+2*Number(C2value));
            }
        }else if(((C1==M1||C1==M2)&&(C2!=M1&&C2!=M2))||((C2==M1||C2==M2)&&(C1!=M1&&C1!=M2))){
            if(AF1!=AF2&&(AF1==C1||AF1==C2||AF2==C1||AF2==C2)){
                if(C1==M1||C1==M2){
                    pi=1/(2*Number(C2value));
                }else if(C2==M1||C2==M2){
                    pi=1/(2*Number(C1value));
                }
            }
        }
    }
    var PI = piParentsFindObj("PI_" + rowID,document);
    PI.innerHTML = pi;
    addCookie("PI_"+rowID , pi , 1);
    return(pi);
}

function calculate(){
    var cpi = 1;
    var rcp = 0;
    var linesCount = getCookie("linesCount");
    for (var i = 1; i <= Number(linesCount); i++) {
        var locus = getCookie("locus_"+i);
        var AF1 = getCookie("AF1_"+i);
        var AF2 = getCookie("AF2_"+i);
        var M1 = getCookie("M1_"+i);
        var M2 = getCookie("M2_"+i);
        var C1 = getCookie("C1_"+i);
        var C2 = getCookie("C2_"+i);
        if(AF1 == null && AF2 == null && M1 == null && M2 == null && C1 == null && C2 == null){

        }else{
             cpi = cpi * Number(calculatePi(i));
        }
    };
    rcp = cpi/(1+cpi);
    var CPI = document.getElementById("CPI");
    CPI.innerHTML = cpi;
    var RCP = document.getElementById("RCP");
    RCP.innerHTML = rcp
    alert("计算完毕");
}

function saveDataIntoCookie(rowID,hours){
    var locus = piParentsFindObj("locus_" + rowID,document).selectedIndex;
    var AF1 = piParentsFindObj("AF1_" + rowID,document).value;
    var AF2 = piParentsFindObj("AF2_" + rowID,document).value;
    var M1 = piParentsFindObj("M1_" + rowID,document).value;
    var M2 = piParentsFindObj("M2_" + rowID,document).value;
    var C1 = piParentsFindObj("C1_" + rowID,document).value;
    var C2 = piParentsFindObj("C2_" + rowID,document).value;
    addCookie("locus_" + rowID,locus,hours);
    addCookie("AF1_" + rowID,AF1,hours);
    addCookie("AF2_" + rowID,AF2,hours);
    addCookie("M1_" + rowID,M1,hours);
    addCookie("M2_" + rowID,M2,hours);
    addCookie("C1_" + rowID,C1,hours);
    addCookie("C2_" + rowID,C2,hours);
}

function piParentsDeleteRow(rowID,id) {
    var piParentsTable = piParentsFindObj("piParentsTable", document);
    var row = piParentsFindObj(rowID, document);
    var rowIndex = row.rowIndex;
    piParentsTable.deleteRow(rowIndex);
    var linesCount = document.getElementById("piParentsRowCount");
    linesCount.innerHTML = (piParentsTable.rows.length - 1);
    deleteRowCookie(Number(id));
}

function deleteRowCookie(rowID){
    delCookie("locus_"+rowID);
    delCookie("AF1_"+rowID);
    delCookie("AF2_"+rowID);
    delCookie("M1_"+rowID);
    delCookie("M2_"+rowID);
    delCookie("C1_"+rowID);
    delCookie("C2_"+rowID);
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
        clearAllCookies();
        var CPI = document.getElementById("CPI");
        CPI.innerHTML = 0;
        var RCP = document.getElementById("RCP");
        RCP.innerHTML = 0
    }
}

function clearAllCookies(){
    var linesCount = getCookie("linesCount");
    for (var i = 1; i <= Number(linesCount); i++) {
        deleteRowCookie(i);
    };
    delCookie("linesCount");
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

function cookie(name){    
   var cookieArray=document.cookie.split("; "); //得到分割的cookie名值对    
   var cookie=new Object();    
   for (var i=0;i<cookieArray.length;i++){    
      var arr=cookieArray[i].split("=");       //将名和值分开    
      if(arr[0]==name)return unescape(arr[1]); //如果是指定的cookie，则返回它的值    
   } 
   return ""; 
} 

function getCookie(objName){//获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for(var i = 0;i < arrStr.length;i ++){
        var temp = arrStr[i].split("=");
        if(temp[0] == objName) return unescape(temp[1]);
   } 
}

function addCookie(objName,objValue,objHours){      //添加cookie
    var str = objName + "=" + escape(objValue);
    if(objHours > 0){                               //为时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours*3600*1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
   }
   document.cookie = str;
}

function SetCookie(name,value){
    var Days = 30; //此 cookie 将被保存 30 天
    var exp = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name){
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]); return null;
}

function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
