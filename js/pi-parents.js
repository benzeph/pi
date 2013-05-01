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
    for (var i = 1; i <= Number(linesCount); i++) {
        piParentsLoadRow();
    };
}

function piParentsLoadRow() {
    var regularExpression = "^[0-9]+(\\.[0-9]+)?$";
    var piParentsTrLastIndex = piParentsFindObj("piParentsTrLastIndex", document);
    var piParentsCurrentCount = piParentsFindObj("piParentsCurrentCount", document);
    var rowID = parseInt(piParentsTrLastIndex.value);
    var piParentsTable = piParentsFindObj("piParentsTable", document);
    var newTR = piParentsTable.insertRow(piParentsTable.rows.length);
    newTR.id = "row" + rowID;
    var newAllele = newTR.insertCell(0);
    newAllele.innerHTML = "<select id='locus_" + rowID + "'class='span2'><option value=\"D3S1358\">D3S1358</option><option value=\"saab\">Saab</option><option value=\"fiat\">Fiat</option><option value=\"audi\">Audi</option></select>";
    var newAF1 = newTR.insertCell(1);
    newAF1.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='AF1_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newAF2 = newTR.insertCell(2);
    newAF2.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='AF2_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newM1 = newTR.insertCell(3);
    newM1.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='M1_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newM2 = newTR.insertCell(4);
    newM2.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='M2_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newC1 = newTR.insertCell(5);
    newC1.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='C1_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newC2 = newTR.insertCell(6);
    newC2.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='C2_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newPi = newTR.insertCell(7);
    newPi.innerHTML = "<span class='input-mini uneditable-input' id='PI_" + rowID + "'></span>";
    var newDeleteTD = newTR.insertCell(8);
    newDeleteTD.innerHTML = "<input type='button' class='btn  btn-small  btn-danger' onclick=\"piParentsDeleteRow('row" + rowID + "')\" value='delete'></div>";
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
    newAllele.innerHTML = "<select id='locus_" + rowID + "'class='span2'><option value=\"D3S1358\">D3S1358</option><option value=\"saab\">Saab</option><option value=\"fiat\">Fiat</option><option value=\"audi\">Audi</option></select>";
    var newAF1 = newTR.insertCell(1);
    newAF1.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='AF1_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newAF2 = newTR.insertCell(2);
    newAF2.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='AF2_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newM1 = newTR.insertCell(3);
    newM1.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='M1_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newM2 = newTR.insertCell(4);
    newM2.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='M2_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newC1 = newTR.insertCell(5);
    newC1.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='C1_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newC2 = newTR.insertCell(6);
    newC2.innerHTML = "<div class='control-group input-append'><input class='input-mini'  id='C2_" + rowID + "'  type='text' data-required data-pattern='" + regularExpression + "'/></div>";
    var newPi = newTR.insertCell(7);
    newPi.innerHTML = "<span class='input-mini uneditable-input' id='PI_" + rowID + "'></span>";
    var newDeleteTD = newTR.insertCell(8);
    newDeleteTD.innerHTML = "<input type='button' class='btn  btn-small  btn-danger' onclick=\"piParentsDeleteRow('row" + rowID + "')\" value='delete'></div>";
    piParentsTrLastIndex.value = (rowID + 1).toString();
    piParentsCurrentCount.value = (rowID).toString();
    var linesCount = document.getElementById("piParentsRowCount");
    linesCount.innerHTML = (piParentsTable.rows.length - 1);
    reloadValidate();
    saveDataIntoCookie(rowID , 1);
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
    if(rowID > 0){
        var locus = piParentsFindObj("locus_" + (rowID - 1),document).value;
        var AF1 = piParentsFindObj("AF1_" + (rowID - 1),document).value;
        var AF2 = piParentsFindObj("AF2_" + (rowID - 1),document).value;
        var M1 = piParentsFindObj("M1_" + (rowID - 1),document).value;
        var M2 = piParentsFindObj("M2_" + (rowID - 1),document).value;
        var C1 = piParentsFindObj("C1_" + (rowID - 1),document).value;
        var C2 = piParentsFindObj("C2_" + (rowID - 1),document).value;
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
        var PI = document.getElementById("PI_" + (rowID - 1));
        PI.innerHTML = pi;
        return(pi);
    }
}

function calculate(){
    var piParentsCurrentCount = piParentsFindObj("piParentsCurrentCount", document);
    var cpi = 1;
    var rcp = 0;
    for (var i = 2; i <= Number(piParentsCurrentCount.value) + 1; i++) {
        cpi = cpi * Number(calculatePi(i));
    };
    rcp = cpi/(1+cpi);
    var CPI = document.getElementById("CPI");
    CPI.innerHTML = cpi;
    var RCP = document.getElementById("RCP");
    RCP.innerHTML = rcp
    alert("计算完毕");
}

function saveDataIntoCookie(rowID,hours){
    if(rowID>0){
        var id = rowID - 1;
        var locus = piParentsFindObj("locus_" + id,document).value;
        var AF1 = piParentsFindObj("AF1_" + id,document).value;
        var AF2 = piParentsFindObj("AF2_" + id,document).value;
        var M1 = piParentsFindObj("M1_" + id,document).value;
        var M2 = piParentsFindObj("M2_" + id,document).value;
        var C1 = piParentsFindObj("C1_" + id,document).value;
        var C2 = piParentsFindObj("C2_" + id,document).value;
        addCookie("locus_" + id,locus,hours);
        addCookie("AF1_" + id,AF1,hours);
        addCookie("AF2_" + id,AF2,hours);
        addCookie("M1_" + id,M1,hours);
        addCookie("M2_" + id,M2,hours);
        addCookie("C1_" + id,C1,hours);
        addCookie("C1_" + id,C2,hours);
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
