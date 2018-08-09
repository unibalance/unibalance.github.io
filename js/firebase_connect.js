var config = {
  apiKey: "AIzaSyD5tFXcEXVgXPU5XT0Bqq3rip3kNfory74",
  authDomain: "unibalance-india-enquiries.firebaseapp.com",
  databaseURL: "https://unibalance-india-enquiries.firebaseio.com",
  projectId: "unibalance-india-enquiries",
  storageBucket: "unibalance-india-enquiries.appspot.com",
  messagingSenderId: "666626166571"
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
	},function(error) {
  	        $("#submit-btn").html('Try Again');
		setTimeout(function() {
			$("#submit-btn").html('Submit');
		},2000);
	});
});
