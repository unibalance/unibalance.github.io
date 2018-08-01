var config = {
  apiKey: "AIzaSyDUXlNmmL9u6y3SDC3tWh7kOCZfLVEqgoQ",
  authDomain: "unibalance-india.firebaseapp.com",
  databaseURL: "https://unibalance-india.firebaseio.com",
  projectId: "unibalance-india",
  storageBucket: "",
  messagingSenderId: "593280371889"
};

firebase.initializeApp(config);

$(".enquiry-form form").submit(function(event) {
	console.log('submitted');
	event.preventDefault();

	$("#submit-btn").css("background-color", "#ff1600");
	$("#submit-btn").html('Sending...');

	var form_data = {
		name: $("#user-name").val(),
		email: $("#user-email").val(),
		subject: $("#user-tel").val(),
		message: $("#user-message").val()
	};

	console.log(form_data);

	var b = firebase.database().ref("messages");
	console.log(b);
	return b.push(form_data).then(function(a) { 
		$("#submit-btn").css("background-color", "#f31500");
		$("#submit-btn").html('Submit');
		$(".enquiry-form form")[0].reset();
	});
});