
// function clickIE4() { if (event.button == 2) { return false; } }
// function clickNS4(e) { if (document.layers || document.getElementById && !document.all) { if (e.which == 2 || e.which == 3) { return false; } } }
// function noRC() { if (document.layers) { document.captureEvents(Event.MOUSEDOWN); document.onmousedown = clickNS4; } else if (document.all && !document.getElementById) { document.onmousedown = clickIE4; } document.oncontextmenu = new Function("return false"); }
// function enableButtons(mb) {
//     if (typeof (Page_IsValid) != "undefined") {
//         if (Page_IsValid) {
//             if (mb != null)
//             { mb.disabled = false; return true; }
//         }
//         else
//         { return false; }
//     }
//     else {
//         if (mb != null)
//         { mb.disabled = false; return true; }
//     }
// }
// //JSD/NAT 06.21.2011 Created this method to enable buttons when disabled by RH_ShowMeHow or launching help page. Does not return a value since we are not submitting.
// //NOTE: this method requires a JQuery object to be passed so pass in the result of JQuery Selector query.
// function enableButtonsNonSubmit(mb) {
//     if (typeof (Page_IsValid) != "undefined") {
//         if (Page_IsValid) {
//             if (mb != null)
//             { mb.removeAttr('disabled'); }
//         }
//         else
//         { return false; }
//     }
//     else {
//         if (mb != null)
//         { mb.removeAttr('disabled'); }
//     }
// }
// function disableButtons(mb) {

//     if (typeof (Page_IsValid) != "undefined") {
//         if (Page_IsValid) {
//             if (mb != null) {
//                 mb.disabled = true;

//                 return true;
//             }
//         }
//         else
//         { return false; }
//     }
//     else {
//         if (mb != null) {
//             mb.disabled = true;

//         return true; }
//     }
// }
// function enableButtonsArray(mbs) {
//     if (typeof (Page_IsValid) != "undefined") {
//         if (Page_IsValid) {
//             for (i = 0; i < mbs.length; i++) {
//                 if (mbs[i] != null)
//                 { mbs[i].disabled = false; }
//             }
//         }
//         else
//         { return false; }
//     }
//     else {
//         for (i = 0; i < mbs.length; i++) {
//             if (mbs[i] != null)
//             { mbs[i].disabled = false; }
//         }
//     }
// }
// function disableButtonsArray(mbs) {
//     if (typeof (Page_IsValid) != "undefined") {
//         if (Page_IsValid) {
//             for (i = 0; i < mbs.length; i++) {
//                 if (mbs[i] != null)
//                 { mbs[i].disabled = true; }
//             }
//         }
//         else
//         { return false; }
//     }
//     else {
//         for (i = 0; i < mbs.length; i++) {
//             if (mbs[i] != null)
//             { mbs[i].disabled = true; }
//         }
//     }
// }
// var dStartTime; var tStartMils; var bFirstPass; var tTimeOutMils; var tThresholdMils; var wWarnWindow; var idSessionTimeout = 0; function initSessionTimeout() {
//     dStartTime = new Date(); tStartMils = Date.parse(dStartTime.toLocaleString()); bFirstPass = true; tTimeOutMils = tStartMils + (60000 * tTimeoutMinutes); tThresholdMils = (60000 * tWarningThresholdMinutes); if (idSessionTimeout == 0)
//         idSessionTimeout = setInterval('monitorSessionTimeout()', 10000);
// }
// function monitorSessionTimeout() {
//     var dCurrentTime = new Date(); var tCurrentMils = Date.parse(dCurrentTime.toLocaleString()); var tRemainingMils = tTimeOutMils - tCurrentMils; if ((tRemainingMils < tThresholdMils) && (bFirstPass == true)) {
//         wWarnWindow = window.open(sOpenURL, "warning", "toolbar=no,status=no,menubar=no,scrollbars=no,resize=no,width=380,height=225"); if (!wWarnWindow) {
//             var confirmed = window.confirm('Your session will timeout in ' + tWarningThresholdMinutes + ' minutes. Press OK to continue your session or Cancel to log out.\nIf you do not respond to this message within that time, you will be automatically logged out when you respond to this message.'); if (confirmed)
//                 initSessionTimeout(); else
//                 document.location.href = sLogoutURL;
//         }
//         bFirstPass = false;
//     }
//     else {
//         if ((tRemainingMils <= 0) && (bFirstPass == false)) {
//             if ((wWarnWindow) && (!wWarnWindow.closed))
//                 wWarnWindow.close(); document.location.href = sLogoutURL;
//         }
//     }
// }
// function af(event) { if (event.srcElement && event.srcElement.accessKey && event.altKey) event.srcElement.click(); }

// // ** BEGIN RoboHelp
// var gbNav6 = false; var gbNav61 = false; var gbNav4 = false; var gbIE4 = false; var gbIE = false; var gbIE5 = false; var gbIE55 = false; var gAgent = navigator.userAgent.toLowerCase(); var gbMac = (gAgent.indexOf("mac") != -1); var gbSunOS = (gAgent.indexOf("sunos") != -1); var gbOpera = (gAgent.indexOf("opera") != -1); var HH_DISPLAY_TOPIC = 0; var HH_DISPLAY_TOC = 1; var HH_DISPLAY_INDEX = 2; var HH_DISPLAY_SEARCH = 3; var HH_HELP_CONTEXT = 15; var gVersion = navigator.appVersion.toLowerCase(); var gnVerMajor = parseInt(gVersion); var gnVerMinor = parseFloat(gVersion); gbIE = (navigator.appName.indexOf("Microsoft") != -1); if (gnVerMajor >= 4) {
//     if (navigator.appName == "Netscape") {
//         gbNav4 = true; if (gnVerMajor >= 5)
//             gbNav6 = true;
//     }
//     gbIE4 = (navigator.appName.indexOf("Microsoft") != -1);
// }
// if (gbNav6) {
//     document.gnPageWidth = innerWidth; document.gnPageHeight = innerHeight; var nPos = gAgent.indexOf("netscape"); if (nPos != -1) {
//         var nVersion = parseFloat(gAgent.substring(nPos + 10)); if (nVersion >= 6.1)
//             gbNav61 = true;
//     }
// }
// else if (gbIE4) {
//     var nPos = gAgent.indexOf("msie"); if (nPos != -1) {
//         var nVersion = parseFloat(gAgent.substring(nPos + 5)); if (nVersion >= 5)
//         { gbIE5 = true; gbIE4 = false; }
//         if (nVersion >= 5.5)
//         { gbIE55 = true; gbIE4 = false; }
//     }
// }
// function RH_ShowMeHow(hParent, a_pszHelpFile, uCommand, dwData)
// { RH_ShowHelp(hParent, a_pszHelpFile, uCommand, dwData); }
// function RH_ShowHelp(hParent, a_pszHelpFile, uCommand, dwData) {
//     var strHelpPath = a_pszHelpFile; var strWnd = ""; var nPos = a_pszHelpFile.indexOf(">"); if (nPos != -1)
//     { strHelpPath = a_pszHelpFile.substring(0, nPos); strWnd = a_pszHelpFile.substring(nPos + 1); }
//     if (isServerBased(strHelpPath))
//         RH_ShowWebHelp_Server(hParent, strHelpPath, strWnd, uCommand, dwData); else
//         RH_ShowWebHelp(hParent, strHelpPath, strWnd, uCommand, dwData);
// }
// function RH_ShowWebHelp_Server(hParent, strHelpPath, strWnd, uCommand, dwData)
// { ShowWebHelp_Server(strHelpPath, strWnd, uCommand, dwData); }
// function RH_ShowWebHelp(hParent, strHelpPath, strWnd, uCommand, dwData)
// { ShowWebHelp(strHelpPath, strWnd, uCommand, dwData); }
// function ShowWebHelp_Server(strHelpPath, strWnd, uCommand, nMapId) {
//     var a_pszHelpFile = ""; if (uCommand == HH_HELP_CONTEXT) {
//         if (strHelpPath.indexOf("?") == -1)
//             a_pszHelpFile = strHelpPath + "?ctxid=" + nMapId; else
//             a_pszHelpFile = strHelpPath + "&ctxid=" + nMapId;
//     }
//     else {
//         if (strHelpPath.indexOf("?") == -1)
//             a_pszHelpFile = strHelpPath + "?ctxid=0"; else
//             a_pszHelpFile = strHelpPath + "&ctxid=0";
//     }
//     if (strWnd)
//         a_pszHelpFile += ">" + strWnd; if (gbIE4 || gbIE5 || gbIE55)
//     { a_pszHelpFile += "&cmd=newwnd&rtype=iefrm"; loadData(a_pszHelpFile); }
//     else if (gbNav4 || gbNav6)
//     { a_pszHelpFile += "&cmd=newwnd&rtype=nswnd"; var sParam = "left=" + screen.width + ",top=" + screen.height + ",width=100,height=100"; window.open(a_pszHelpFile, "__webCshStub", sParam); }
//     else {
//         var sParam = "left=" + screen.width + ",top=" + screen.height + ",width=100,height=100";
//             window.open(a_pszHelpFile, "__webCshStub", sParam);
//     }
// }
// function ShowWebHelp(strHelpPath, strWnd, uCommand, nMapId) {
//     var a_pszHelpFile = ""; if (uCommand == HH_DISPLAY_TOPIC)
//     { a_pszHelpFile = strHelpPath + "#<id=0"; }
//     if (uCommand == HH_HELP_CONTEXT)
//     { a_pszHelpFile = strHelpPath + "#<id=" + nMapId; }
//     else if (uCommand == HH_DISPLAY_INDEX)
//     { a_pszHelpFile = strHelpPath + "#<cmd=idx"; }
//     else if (uCommand == HH_DISPLAY_SEARCH)
//     { a_pszHelpFile = strHelpPath + "#<cmd=fts"; }
//     else if (uCommand == HH_DISPLAY_TOC)
//     { a_pszHelpFile = strHelpPath + "#<cmd=toc"; }
//     if (strWnd)
//         a_pszHelpFile += ">>wnd=" + strWnd; if (a_pszHelpFile) {
//         if (gbIE4 || gbIE55)
//         { loadData(a_pszHelpFile); }
//         else if (gbNav4)
//         { var sParam = "left=" + screen.width + ",top=" + screen.height + ",width=100,height=100"; window.open(a_pszHelpFile, "__webCshStub", sParam); }
//         else {
//             var sParam = "left=" + screen.width + ",top=" + screen.height + ",width=100,height=100"; if (gbIE5)
//                 window.open("about:blank", "__webCshStub", sParam); window.open(a_pszHelpFile, "__webCshStub");
//         }
//     }
// }
// function isServerBased(a_pszHelpFile) {
//     if (a_pszHelpFile.length > 0) {
//         var nPos = a_pszHelpFile.lastIndexOf('.'); if (nPos != -1 && a_pszHelpFile.length >= nPos + 4) {
//             var sExt = a_pszHelpFile.substring(nPos, nPos + 4); if (sExt.toLowerCase() == ".htm")
//             { return false; }
//         }
//     }
//     return true;
// }
// function getElement(sID) {
//     if (document.getElementById)
//         return document.getElementById(sID); else if (document.all)
//         return document.all(sID); return null;
// }
// function loadData(sFileName) {
//     if (!getElement("dataDiv")) {
//         if (!insertDataDiv())
//         { gsFileName = sFileName; return; }
//     }
//     var sHTML = ""; if (gbMac)
//         sHTML += "<iframe name=\"__WebHelpCshStub\" src=\"" + sFileName + "\"></iframe>"; else
//         sHTML += "<iframe name=\"__WebHelpCshStub\" style=\"visibility:hidden;width:0;height:0\" src=\"" + sFileName + "\"></iframe>"; var oDivCon = getElement("dataDiv"); if (oDivCon) {
//         if (gbNav6) {
//             if (oDivCon.getElementsByTagName && oDivCon.getElementsByTagName("iFrame").length > 0)
//             { oDivCon.getElementsByTagName("iFrame")[0].src = sFileName; }
//             else
//                 oDivCon.innerHTML = sHTML;
//         }
//         else
//             oDivCon.innerHTML = sHTML;
//     }
// }
// function insertDataDiv() {
//     var sHTML = ""; if (gbMac)
//         sHTML += "<div id=dataDiv style=\"display:none;\"></div>"; else
//         sHTML += "<div id=dataDiv style=\"visibility:hidden\"></div>"; document.body.insertAdjacentHTML("beforeEnd", sHTML); return true;
// }
// // ** End RoboHelp

// var hstm = new function () {
//     var mHasFormInputChanged = false;
//     this.getHasFormInputChanged = function () {
//         return mHasFormInputChanged;
//     };
//     this.setHasFormInputChanged = function (value) {
//         mHasFormInputChanged = value;
//     };
// }