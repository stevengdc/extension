function sendEmail (emailUrl) {
	chrome.tabs.create({ url: emailUrl }, function(tab) {
        setTimeout(function() {
            chrome.tabs.remove(tab.id);
        }, 500);
    });
}

// This function is called onload in the popup code
function getPageDetails(callback) { 
    // Inject the content script into the current page 
    chrome.tabs.executeScript(null, { file: 'content.js' }); 
    // Perform the callback when a message is received from the content script, chrome.runtime.sendMessage
    chrome.runtime.onMessage.addListener(function(message)  { 
        // Call the callback function onPageDetailsReceived
        if (message.secondMessage == "secondMessage") {
        	//window.alert("I'm loaded for the secondMessage!");
        	var emailUrl = message.emailUrlMessage;
        	sendEmail(message.emailUrlMessage);
        } else {
        	callback(message);
    	}
    }); 
};

