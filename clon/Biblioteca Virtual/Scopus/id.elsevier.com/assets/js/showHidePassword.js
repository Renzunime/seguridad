
window.onload = function(){ 

	var DEFAULT_COLOR = "rgba(220, 220, 221, 1)";
    var WEAK_COLOR = "rgba(169, 43, 29, 1)";
    var FAIR_COLOR = "rgba(253, 211, 0, 1)";
    var STRONG_COLOR = "rgba(73, 110, 1, 1)";
    var FAIR_FONT_COLOR="#2e2e2e";
	var REGISTRATION_BTN_COLOR="#007398";
	var showHideElm = document.getElementsByClassName("showHide");
	var browser= get_browser();		
	var registerBtn = document.getElementById("bdd-elsPrimaryBtn");
	enableDisableRegisterButton(registerBtn);	
	var passwordEvent = document.getElementById("bdd-password");
	var pwdWeakElement = document.getElementById("passwordMeterWeak");
	var pwdFairElement = document.getElementById("passwordMeterFair");
	var pwdStrongElement = document.getElementById("passwordMeterStrong");		
	var passwordInputFlag;	
	var passwordConfirmEvent = document.getElementById("bdd-confirm-password");
	if(showHideElm && passwordConfirmEvent){
	passwordConfirmEvent.oninput = function() {			
			for(i=0;i<showHideElm.length;i++){	
				if(passwordConfirmEvent.value=="" && passwordConfirmEvent.value.length<1){
				if(showHideElm[i].getAttribute("id")== "showHide-bdd-confirm-password")
				{
				showHideElm[i].style.display="none";
				resetToHidePwd(document.getElementById(showHideElm[i].getAttribute("id")),"bdd-confirm-password");
				
				}
				}else if(showHideElm[i].getAttribute("id")== "showHide-bdd-confirm-password")
				{
					
				showHideElm[i].style.display="block";
				}
			}					
		}
	}	
	if(pwdStrongElement && pwdWeakElement && pwdFairElement){			
		passwordInputFlag= true;		
		var WEAK_TEXT_LABEL =  document.getElementsByClassName('passwordMeterLabel')[0].value;;
		var FAIR_TEXT_LABEL =  document.getElementsByClassName('passwordMeterLabel')[1].value;
		var STRONG_TEXT_LABEL =  document.getElementsByClassName('passwordMeterLabel')[2].value;
	 }
		
	if(passwordEvent){
		passwordEvent.oninput = function() {	
		
		if(showHideElm){
			for(i=0;i<showHideElm.length;i++){
				if(passwordEvent.value=="" && passwordEvent.value.length<1){
				if(showHideElm[i].getAttribute("id")== "showHide-bdd-password")
				{	
				showHideElm[i].style.display="none";
				resetToHidePwd(document.getElementById(showHideElm[i].getAttribute("id")),"bdd-password");
				}
				}else if(showHideElm[i].getAttribute("id")== "showHide-bdd-password")
				{					
				showHideElm[i].style.display="block";
				}
			}	
			
			}
		if(passwordInputFlag){			
			var strength;
			var color;
			var password= passwordEvent.value;	
			var score=scorePassword(password);
			var color = "";
			var strength = "";		
		if(score === 0 || score<1){
			
			pwdWeakElement.innerHTML="";
			pwdWeakElement.style.backgroundColor = DEFAULT_COLOR;			
			pwdFairElement.innerHTML="";
			pwdFairElement.style.backgroundColor = DEFAULT_COLOR;				
			pwdStrongElement.innerHTML="";
			pwdStrongElement.style.backgroundColor = DEFAULT_COLOR;	
			if(browser.name=="Safari"){
				pwdFairElement.style.overflowY="auto";
				pwdStrongElement.style.overflowY="auto";
				pwdWeakElement.style.overflowY="auto";
			}			
			enableDisableRegisterButton(registerBtn);
		
		return ;
		}	
				
		if(score == 25){	
		
			pwdFairElement.innerHTML = "";
			pwdStrongElement.innerHTML = "";
			pwdFairElement.style.backgroundColor = DEFAULT_COLOR;
			pwdStrongElement.style.backgroundColor = DEFAULT_COLOR;
			pwdWeakElement.style.backgroundColor = WEAK_COLOR;
			pwdWeakElement.innerHTML=WEAK_TEXT_LABEL;	
			if(browser.name=="Safari"){
				pwdWeakElement.style.overflowY="scroll";
				pwdFairElement.style.overflowY="auto";
				pwdStrongElement.style.overflowY="auto";
			}
			enableDisableRegisterButton(registerBtn);		
		
		} else if(score==50){	
		
			registerBtn.disabled = false;
			registerBtn.style.backgroundColor = REGISTRATION_BTN_COLOR;
			registerBtn.style.color="#fff";				
			pwdWeakElement.innerHTML ="" ;
			pwdWeakElement.style.backgroundColor = FAIR_COLOR;
			if(browser.name=="Safari"){
				pwdFairElement.style.overflowY="scroll";
				pwdStrongElement.style.overflowY="auto";
				pwdWeakElement.style.overflowY="auto";
			}
			pwdFairElement.innerHTML =FAIR_TEXT_LABEL;
			pwdStrongElement.innerHTML = "";
			pwdFairElement.style.backgroundColor = FAIR_COLOR;
			pwdStrongElement.style.backgroundColor = DEFAULT_COLOR;
		
		}else if(score==100){
			
			registerBtn.disabled = false;
			registerBtn.style.backgroundColor = REGISTRATION_BTN_COLOR;
			registerBtn.style.color="#fff";					
			pwdWeakElement.innerHTML = "";
			pwdWeakElement.style.backgroundColor = STRONG_COLOR;
			pwdFairElement.innerHTML ="" ;
			pwdFairElement.style.backgroundColor = STRONG_COLOR;
			if(browser.name=="Safari"){
				pwdStrongElement.style.overflowY="scroll";
				pwdFairElement.style.overflowY="auto";
				pwdWeakElement.style.overflowY="auto";
			}
			pwdStrongElement.innerHTML = STRONG_TEXT_LABEL;
			pwdStrongElement.style.backgroundColor = STRONG_COLOR;
		}		
		}
		}
}
	
	function scorePassword(pass) {
		
		var score = 0;
		var digitsPattern=/\d/.test(pass);
		var lowerPattern=/[a-z]/.test(pass);
		var upperPattern=/[A-Z]/.test(pass);
		var nonWords=/\W/.test(pass);
		
		if (!pass){
			return score;
		}		
		if( pass.length < 8){
			score= 25;
			return score;
		}				
		if(digitsPattern && lowerPattern && upperPattern && nonWords ){			
			score = 100;			
		} else if(digitsPattern || lowerPattern || upperPattern || nonWords ){			
			score = 50;			
		}

    return parseInt(score);
}


if(document.getElementsByClassName("showHide").length == 2){	
	
	for(i=0;i<2;i++){
		
		showHidePassword(document.getElementsByClassName("showHide")[i]);	
	}	
}else{	
		showHidePassword(document.getElementsByClassName("showHide")[0]);	
}

function showHidePassword(showHideEvent){

if(showHideEvent)	{
showHideEvent.onclick = function() {
		
		var selectedID =showHideEvent.getAttribute('id');
        var SHOWHIDE_STRING = "showHide-";		
		var lengthTOignore = SHOWHIDE_STRING.length;
        selectedID = selectedID.substring(selectedID.indexOf(SHOWHIDE_STRING) + lengthTOignore, selectedID.length);
		var showHide =document.getElementById(SHOWHIDE_STRING+selectedID);		
		var style = showHide.currentStyle || window.getComputedStyle(showHide, false),
		backgroundUrl = style.backgroundImage.slice(4, -1).replace(/"/g, "");
			
		var inputElement = document.getElementById(selectedID);
		var showHideElement = document.getElementById("showHide-bdd-password");

		  if (inputElement.type === "password") {
			backgroundUrl = backgroundUrl.replace("Unmask", "Mask");
			showHide.style.backgroundImage = 'url('+backgroundUrl+')';
			inputElement.type = "text";
			showHideElement.setAttribute('aria-label', "Hide password");
		  } else {
			backgroundUrl = backgroundUrl.replace("Mask", "Unmask");
			showHide.style.backgroundImage = 'url('+backgroundUrl+')';
			inputElement.type = "password";
			showHideElement.setAttribute('aria-label', "Show password");
		  }	
	};
showHideEvent.onkeydown = function() {
		
		var selectedID =showHideEvent.getAttribute('id');
        var SHOWHIDE_STRING = "showHide-";		
		var lengthTOignore = SHOWHIDE_STRING.length;
        selectedID = selectedID.substring(selectedID.indexOf(SHOWHIDE_STRING) + lengthTOignore, selectedID.length);
		var showHide =document.getElementById(SHOWHIDE_STRING+selectedID);		
		var style = showHide.currentStyle || window.getComputedStyle(showHide, false),
		backgroundUrl = style.backgroundImage.slice(4, -1).replace(/"/g, "");
			
		var inputElement = document.getElementById(selectedID);
		var showHideElement = document.getElementById("showHide-bdd-password");
  
		  if (inputElement.type === "password") {
			backgroundUrl = backgroundUrl.replace("Unmask", "Mask");
			showHide.style.backgroundImage = 'url('+backgroundUrl+')';
			inputElement.type = "text";
			showHideElement.setAttribute('aria-label', "Hide password");
		  } else {
			backgroundUrl = backgroundUrl.replace("Mask", "Unmask");
			showHide.style.backgroundImage = 'url('+backgroundUrl+')';
			inputElement.type = "password";
			showHideElement.setAttribute('aria-label', "Show password");
		  }	
	};
}
}
function resetToHidePwd(resetElement,inputId){
	var style = resetElement.currentStyle || window.getComputedStyle(resetElement, false),
	backgroundUrl = style.backgroundImage.slice(4, -1).replace(/"/g, "");
	backgroundUrl = backgroundUrl.replace("Mask", "Unmask");
	resetElement.style.backgroundImage = 'url('+backgroundUrl+')';
	var inputElement = document.getElementById(inputId);
	inputElement.type = "password";
	inputElement.setAttribute('aria-label', "Hide password");
}	

function enableDisableRegisterButton(registerBtn){	
	var addDeatils=false;
	if(registerBtn && registerBtn.getAttribute("value")=="addDetailsContinue" && document.getElementById("bdd-password")){
		addDeatils= true;
	}
	if(registerBtn && (registerBtn.getAttribute("name")=="registerId" || registerBtn.getAttribute("name")=="passwordreset" || addDeatils)){
	registerBtn.disabled = true;
	registerBtn.style.backgroundColor = DEFAULT_COLOR;
	registerBtn.style.color="gray";		
}	
}

function get_browser() {
			var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
			if(/trident/i.test(M[1])){
				tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
				return {name:'IE',version:(tem[1]||'')};
				}   
			if(M[1]==='Chrome'){
				tem=ua.match(/\bOPR|Edge\/(\d+)/)
				if(tem!=null)   {return {name:'Opera', version:tem[1]};}
				}   
			M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
			if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
			return {
			  name: M[0],
			  version: M[1]
			};
		 }
}
