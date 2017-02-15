var requestNumber = "";
var contact_telephone = "";
var spokeTo_name = "";
var location_selectedText = "";
var service_selectedText = "";
var description = "";
var assignee_selectedText = "";
var tracker_selectedText = "";
var preferredNotificationAddress = "";
var solution_value = "";
var fullDescription = "";

var emailSubject = "";
var emailGreeting = "";
var escalationText = new Array (
	"      Customer called to chase this call and wants to escalate it, can anyone take a look at this please, thanks.",
	"      Message 2",
	"      Message 3"
);
var callDetails = "";
var emailBody = "";

var referenceNumber = "";


function timeGreeting() {
    var n = new Date().getHours();
    var greeting = (n > 12) ? 'good afternoon' : 'good morning';
    return greeting
}

// This callback function is called when the content script has been injected and returned its results
function onPageDetailsReceived(pageDetails)  {
	//pageDetails.title
    document.getElementById('title').value = pageDetails.assignee_selectedText;
    document.getElementById('url').value = pageDetails.url; 
    document.getElementById('summary').innerText = pageDetails.summary;
	requestNumber = pageDetails.requestNumber;
    contact_telephone = pageDetails.contact_telephone;
    spokeTo_name = pageDetails.spokeTo_name;
    location_selectedText = pageDetails.location_selectedText;
    service_selectedText = pageDetails.service_selectedText;
    description = pageDetails.description;
    assignee_selectedText = pageDetails.assignee_selectedText;
    tracker_selectedText = pageDetails.tracker_selectedText;
    preferredNotificationAddress = pageDetails.preferredNotificationAddress;
    solution_value = pageDetails.solution_value;
	fullDescription = pageDetails.summary;

	emailSubject = "Marval Call " + requestNumber + " Escalation";
	emailGreeting = "Hello, " + timeGreeting() + " dear " + assignee_selectedText + ",\n\n\t";
	callDetails = "\n\nCall details:\n      Customer name: " + spokeTo_name + "\n      Contact Telephone: " + contact_telephone + "\n      Address: " + location_selectedText + "\n      Service: " + service_selectedText + "\n      Short Description: "
        + description + "\n      Assignee: " + assignee_selectedText + "\n      Customer Email: " + preferredNotificationAddress;

    if (fullDescription != "") {
		callDetails = callDetails + "\n\nFull Description:\n\n" + fullDescription;
	}
	
	var greeting = timeGreeting();
    emailBody = "Hello, " + greeting + " dear " + assignee_selectedText + ",\n\n\tCustomer called to chase this call and wants to escalate it, can anyone take a look at this please, thanks.\n\nCall details:\n\tCustomer name: "
        + spokeTo_name + "\n\tContact Telephone: " + contact_telephone + "\n\tAddress: " + location_selectedText + "\n\tService: " + service_selectedText + "\n\tShort Description: "
        + description + "\n\tAssignee: " + assignee_selectedText + "\n\tCustomer Email: " + preferredNotificationAddress;
    if (fullDescription != "") {
		emailBody = emailBody + "\n\nFull Description:\n\n\t" + fullDescription;
	}
	document.getElementById('email').innerText = emailBody;
}

// Global reference to the status display SPAN
var statusDisplay = null;

// URL the data via mailto to default email client
function addBookmark() {
    // Cancel the form submit
    event.preventDefault();

    var sel = document.getElementById('escalationOptions').value;

    var emailUrl = 'mailto:?subject=' + emailSubject + '&body=' + emailGreeting.replace(/\n/g, "%0D%0A") + escalationText[sel] + callDetails.replace(/\n/g, "%0D%0A");

    chrome.runtime.sendMessage({
        'secondMessage': "secondMessage",
        'emailUrlMessage' : emailUrl
    });
}

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Cache a reference to the status display SPAN, no in use, only for AJAX SMTP send email.
    statusDisplay = document.getElementById('status-display');
    // Handle the bookmark form submit event with our addBookmark function
    document.getElementById('addbookmark').addEventListener('submit', addBookmark);
	document.getElementById('escalationOptions').addEventListener('change', function() {
		//window.alert('Here');
		var sel = document.getElementById('escalationOptions').value;
		var greeting = timeGreeting();
		var emailBodySel = "Hello, " + greeting + " dear " + assignee_selectedText + ",\n\n" + escalationText[sel] + "\n\nCall details:\n\tCustomer name: "
        + spokeTo_name + "\n\tContact Telephone: " + contact_telephone + "\n\tAddress: " + location_selectedText + "\n\tService: " + service_selectedText + "\n\tShort Description: "
        + description + "\n\tAssignee: " + assignee_selectedText + "\n\tCustomer Email: " + preferredNotificationAddress;
		if (fullDescription != "") {
			emailBodySel = emailBodySel + "\n\nFull Description:\n\n\t" + fullDescription;
		}
		document.getElementById('email').innerText = emailBodySel;
	});
    // Get the event page
    chrome.runtime.getBackgroundPage(function(eventPage) {
        // Call the getPageInfo function in the event page, passing in 
        // our onPageDetailsReceived function as the callback. This injects 
        // content.js into the current tab's HTML
        eventPage.getPageDetails(onPageDetailsReceived);
    });
});