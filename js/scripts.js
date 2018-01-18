/*
 Created on : Jul 4, 2017, 12:43:10 AM
 Author     : Atta-Ur-Rehman Shah (http://attacomsian.com)
 */
$(function () {
    //init
    init();
    //init wow effects
    new WOW().init();

    //scroll menu
    $(window).scroll(function () {
        init();
    });

    //page scroll
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 50
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    //init function
    function init() {
        var secondFeature = $('#features').offset().top;
        var scroll = $(window).scrollTop();
        if (scroll >= 150) {
            $('.sticky-navigation').css({"background-color": '#e95b1e'});
        } else {
            $('.sticky-navigation').css({"background-color": 'transparent'});
        }
        if (scroll >= secondFeature - 200) {
            $(".mobileScreen").css({'background-position': 'center top'});
        }
        return false;
    }

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBZ-RqEvuDbXZt0j8SegGEkctiT273Tqfk",
        authDomain: "unibalance-india-enquiry.firebaseapp.com",
        databaseURL: "https://unibalance-india-enquiry.firebaseio.com",
        projectId: "unibalance-india-enquiry",
        storageBucket: "unibalance-india-enquiry.appspot.com",
        messagingSenderId: "1073173740332"
    };
    firebase.initializeApp(config);

    // Reference Enquiries Collection
    var enquiriesRef = firebase.database().ref('enquiries');

    //Function Save enquiry details to firebase
    function saveMessage(name, email, phone, message) {
        var newEnquiryRef =  enquiriesRef.push();
        newEnquiryRef.set({
            name: name,
            email: email,
            phone: phone,
            message: message
        });
    }

    // Function to save the enquiry form data
    function submitEnquiry(e) {
        
        // Prevent the default action of the form
        e.preventDefault();

        // Get the form input values
        var name = $('#user-name').val();
        var email = $('#user-email').val();
        var phone = $('#user-tel').val();
        var message = $('#user-message').val();

        // Save enquiry details to firebase after collecting form input values
        saveMessage(name, email, phone, message);

        // Show Success/Failure Alert
        $(".form-status-alert").text("Your message has been sent");

        setTimeout(function() {
            $(".form-status-alert").text("");            
        }, 3000);

    }

    $(".enquiry-form form").on("submit", submitEnquiry);

});
