function trackNavigationClick(location, name) {
	 console.log("Event trackNavigationClick");
    window.pageDataTracker.trackEvent('navigationClick', {
        link: {
			location: location,
            name: name
        }
    });
}
function openNavigationClick(location, name) {
	 console.log("Event openNavigationClick");
    window.pageDataTracker.trackEvent('navigationClick', {
        link: {
			location: location,
            name: name

        }
    });
}
function closeNavigationClick(location, name) {
	 console.log("Event closeNavigationClick");
    window.pageDataTracker.trackEvent('navigationClick', {
        link: {
			location: location,
            name: name
        }
    });
}
function accountAssociationStart() {
	var doTrackAssocStart = document.getElementById('associationStart').value === "true";
	console.log("Event checkAssociation " + doTrackAssocStart);
	if (doTrackAssocStart) {
		console.log("Event accountAssociationStart");
	 	window.pageDataTracker.trackEvent('associationStart', {
	       visitor: {
	          "accountId": document.getElementById('accountId').value,
	          "accountName": document.getElementById('accountName').value,
	          "accessType": document.getElementById('accessType').value,
	          "secondaryProductName": document.getElementById('platSite').value
	        }
	  	});
	}
	 
}
 function autoSuggestTermClickedInstitute( index, resultList) {
	console.log("Event autoSuggestTermClicked for index "+index);
	var selectedId='selectedInst'+index;
	window.pageDataTracker.trackEvent('autoSuggestTermClicked', {
        search: {
            suggestedClickPosition: index.toString(),
            suggestedLetterCount: document.getElementById('searchTerm').value.length.toString(),
            suggestedResultCount: document.getElementById('totalResults').value,
            typedTerm: document.getElementById('bdd-email').value,
            selectedTerm: document.getElementById(selectedId).value
          }
       });
 }
 function autoSuggestTermClickedEmail() {
	console.log("Event autoSuggestTermClickedEmail");
    		var accessMethod = "account";
    		var trackEventName = "autoSuggestTermClicked";
        	if(document.getElementById('bdd-email').value.includes('@')) {
            	 accessMethod = "email";
            	 trackEventName = "autoSuggestTermClickedEmail";
            }
        	window.pageDataTracker.trackEvent(trackEventName, {
       			 search: {
       			 suggestedClickPosition: '0', // the position in the list clicked, suggestion to put 0 as users enter their emails
                 typedTerm: accessMethod,  // the term the user typed before clicking on enter or continue
        		 autoSuggestCategory: accessMethod, // if applicable, the category that the selected term is from (stored in AA dimension: v162), could we use this field to differenatiate between email and account list?
        		 secondaryProductName: document.getElementById('platSite').value
        }
    });
 }
 
