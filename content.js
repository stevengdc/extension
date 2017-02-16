var ct100_cph = new Array (
	"contact_telephone",
	"requestNumber",
	"spokeTo_name",
	"location_selectedText",
	"service_selectedText",
	"description",
	"assignee_selectedText",
	"tracker_selectedText",
	"preferredNotificationAddress",
	"solution_value"
);

var valores = {};

for (i = 0; i < ct100_cph.length; i++) {
  var name = ct100_cph[i];
  var tag = document.getElementById('ctl00_cph_' + name);
  // Testing -- var tag = document.getElementById(name);
  if (tag == null) {
    //console.log("There's nothing in this element.");
    valores[ct100_cph[i]] = "";
  } else {
    tag = tag.value;
    // console.log(tag);
    valores[ct100_cph[i]] = tag;
  }
}

// Send a message containing the page details back to the event page
chrome.runtime.sendMessage({
    'title': document.title,
    'url': window.location.href,
    'summary': window.getSelection().toString(),
    'contact_telephone': valores.contact_telephone,
    'requestNumber': valores.requestNumber,
    'spokeTo_name': valores.spokeTo_name,
    'location_selectedText': valores.location_selectedText,
    'service_selectedText': valores.service_selectedText,
    'description': valores.description,
    'assignee_selectedText': valores.assignee_selectedText,
    'tracker_selectedText': valores.tracker_selectedText,
    'preferredNotificationAddress': valores.preferredNotificationAddress,
    'solution_value': valores.solution_value
});
