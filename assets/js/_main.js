$(document).ready(function() {

  $("#g-recaptcha-response").attr("title", "captcha");
  $("#g-recaptcha-response").attr("aria-label", "captcha");

  $(document).on("click", ".ppc-offers-list .offer-item .show-details", function(){
    $(this).closest(".offer-item").find(".full-description").slideDown(300);
    $(this).closest(".offer-item").find(".btn-holder .show-details").slideUp(100);
  });

  $(document).on("click", ".offer-item .full-description .close", function(){
    $(this).closest(".offer-item").find(".full-description").slideUp(300);
    $(this).closest(".offer-item").find(".btn-holder .show-details").slideDown(100);
  });

  $('#map-side-bar li').on('click', function(e) {
    e.preventDefault();
    $('#map-side-bar').find('li').removeClass('active');
    $(this).addClass('active').siblings().removeClass('active');

  });

  $(".infocontainer a.closer").click(function(evt) {
    $(".infocontainer").stop().hide(500);
    $(".infocontainer").removeClass("boooyah");
    evt.preventDefault();
  });

  $(".map-link").click("click", function(e) {
    e.preventDefault();
    $(".infocontainer").stop().hide(500);
    $("#infocontainer" + $(this).attr("rel")).stop().show(500);
  });

  $("#arrival_date").datepicker({
    dateFormat: "yy-mm-dd",
    altField: '#arrival_date',
    altFormat: 'yy-mm-dd',
    minDate: 0,
    onSelect: function(date) {
      var date2 = $('#arrival_date').datepicker('getDate');
      date2.setDate(date2.getDate() + 1);
      $('#departure_date').datepicker('setDate', date2);
      //sets minDate to dt1 date + 1
      $('#departure_date').datepicker('option', 'minDate', date2);
    }
  });

  $('#departure_date').datepicker({
    dateFormat: "yy-mm-dd",
    altField: '#departure_dates',
    altFormat: 'yy-mm-dd',
    onClose: function() {
      var dt1 = $('#v').datepicker('getDate');
      console.log(dt1);
      var dt2 = $('#departure_date').datepicker('getDate');
      if (dt2 <= dt1) {
        var minDate = $('#departure_date').datepicker('option', 'minDate');
        $('#departure_date').datepicker('setDate', minDate);
      }
    }
  });

  // Room details calendar
  var new_date = new Date();
  var defaultformatteddate1 = $.datepicker.formatDate("yy-mm-dd", new_date);
  var defaultformatteddate2 = $.datepicker.formatDate("yy-mm-dd", new Date(new_date.setDate(new_date.getDate() + 1)));
  $("#arrival_dates, #arrival_date").val(defaultformatteddate1);
  $("#departure_dates, #departure_date").val(defaultformatteddate2);

  $('.merch-copy .button1').attr('href', 'https://westhousehotelnewyork.reztrip.com/search?arrival_date=' + defaultformatteddate1 + '&departure_date=' + defaultformatteddate2);

  $.datepicker._defaults.dateFormat = 'yy-mm-dd';

  $(".date-widget").datepicker({
    minDate: 0,
    numberOfMonths: [1, 1],
    beforeShowDay: function(date) {
      var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#arrival_dates").val());
      var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#departure_dates").val());
      return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
    },
    onSelect: function(dateText, inst) {
      var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#arrival_dates").val());
      var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#departure_dates").val());
      var selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);

      // if (!date1 || date2) {
      //   $("#arrival_dates").val(dateText);
      //   $("#departure_dates").val("");
      //   $("#departure_dates").trigger("input");
      //   $("#arrival_dates").trigger("input");
      //   $(this).datepicker();
      // } else if( selectedDate < date1 ) {
      //   $("#departure_dates").val($("#arrival_dates").val());
      //   $("#arrival_dates").val(dateText );
      //   $("#arrival_dates").trigger("input");
      //   $("#departure_dates").trigger("input");
      //   $(this).datepicker();
      // } else {
      //   $("#departure_dates").val(dateText);
      //   $("#departure_dates").trigger("input");
      //   $("#arrival_dates").trigger("input");
      //   $(this).datepicker();
      // }

      var minDate = $(this).datepicker('getDate');
      minDate.setDate(minDate.getDate() + 1);
      $(this).datepicker('option', 'defaultDate', minDate);
      var newMin = $(this).datepicker('option', 'defaultDate');
      var formattedDatee = $.datepicker.formatDate("yy-mm-dd", newMin);
      // console.log(newMin);

      if ((selectedDate < newMin && newMin < date2) || selectedDate <= date2) {
        $("#arrival_dates").val(dateText);
        $("#departure_dates").val(formattedDatee);
        $("#arrival_dates").trigger("input");
        $("#departure_dates").trigger("input");

        $("#arrival_datess").val(dateText);
        $("#departure_datess").val(formattedDatee);
        $("#arrival_datess").trigger("input");
        $("#departure_datess").trigger("input");
      } else {
        $("#departure_dates").val(dateText);
        $("#departure_dates").trigger("input");

        $("#departure_datess").val(dateText);
        $("#departure_datess").trigger("input");
        $(this).datepicker();
      }

    }
  });

  // Data gold form script
  $("#eclubCheck").submit(function(event) {
    var firstname = $("#firstname").val();
    var lastname = $("#lastname").val();
    var email_address = $("#email_address").val();
    var grecaptcharesponse = $("#g-recaptcha-response").val();
    var firstnameError = "";
    var emailError = "";
    var valid = "";

    if (firstname == "") {
      valid += "Please specify your first name";
      firstnameError = "Please specify your first name";
      $("#firstnameError").html(firstnameError);
    } else {
      firstnameError = "";
      $("#firstnameError").html("");
    }

    if (lastname == "") {
      valid += "Please specify your last name";
      lastnameError = "Please specify your last name";
      $("#lastnameError").html(lastnameError);
    } else {
      lastnameError = "";
      $("#lastnameError").html("");
    }

    if (email_address == "") {
      valid += "Please specify your first name";
      emailError = "Your email address must be in the format of name@domain.com";
      $("#emailError").html(emailError);
    } else {
      validEmail = /\S+@\S+\.\S+/;
      var emailPass = validEmail.test(email_address);
      if (!emailPass) {
        emailError = "Your email address must be in the format of name@domain.com";
        $("#emailError").html(emailError);
      } else {
        emailError = "";
        $("#emailError").html("");
      }
    }

    if (grecaptcharesponse == "") {
      valid += "Please check the captcha";
      grecaptcharesponseError = "Please check the captcha";
      $("#grecaptcharesponseError").html(grecaptcharesponseError);
    } else {
      firstnameError = "";
      $("#grecaptcharesponseError").html("");
    }

    if (valid == "") {
      $("#form_submit").attr("disabled", true);
      $("#form_submit").attr("value", "Submitting");
    } else {
      event.preventDefault();
    }
  });

  // Offers share dropdown
  //$('.offers-listing ').on('click','.share-btn', function(){
  //$('.share-items').hide('slow');
  //$(this).stop().find('.share-items').toggle();
  //});
  //$(".share-items").click(function(event){
  //event.preventDefault();
  //});

  $('#lightgallery').lightGallery({
    selector: '.item',
    counter: false,
    fullScreen: false
  });

  // Virtual tour popup on single rooms pages
  var scrolled = false;
  $(window).scroll(function() {
    if (!scrolled) {
      $('.merch-sec').addClass('slideup');
    }
    scrolled = true;
  });

  $('.close-popup').click(function(){
    $('.merch-sec').removeClass('slideup');
  });

  //Offer Promo Popup

  function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
   var nowTime = new Date().getTime();

   var exposedofferPopup = localStorage.getItem('exposedofferPopup');
   if (!exposedofferPopup) {
       $('.message').css('display', 'none');
       $('.promo-code-reminder').css('display', 'none');
       $('.signup').css('display', 'block');
   } else {
       $('.message').css('display', 'none');
       $('.promo-code-reminder').css('display', 'none');
       $('.unlock').css('display', 'none');
   }
   /*$('#mclose').click(function(){
       document.location.href = '/';
   });*/
  if($.cookie('signupTime')){
       if($.cookie('signupTime')){
           $('.promo-code-reminder').css('display', 'block');
       }
   }
   /*$('#mclose').click(function(){
       document.location.href = '/';
   });*/
   if (getParameterByName('submit')) {
       if (getParameterByName('submit') == 'success') {
           if(!$.cookie('signupTime')){
               $.cookie('signupDone', '1', { expires: 5, url:'/'});
               $.cookie('signupTime', '1', { expires: 3, url:'/'});
           }
           localStorage.setItem('exposedofferPopup', true);
           $('.message').css('display', 'block');
           $('.promo-code-reminder').css('display', 'block');
           $('.signup').css('display', 'none');
           $('#offer-promo-popup').modal('show');
           $('.unlock').css('display', 'none');
       }
   }

     setTimeout(function() {
       $(".brg-widget").show();
     }, 2500);
     $("#reserveNowSubmit").click(function(){
       $("#roomDetailBookingForm").submit();
     })
});

$(function() {
  // styles


 if($('#map').length){
   // map options
   // var mapOptions = {
   //   zoom: 15,
   //   minZoom: 2,
   //   scrollwheel: false,
   //   draggable: true,
   //   center: new google.maps.LatLng(40.667013, -123.438436),
   //   mapTypeId: google.maps.MapTypeId.ROADMAP,
   //   disableDefaultUI: false,
   //   styles: styles,
   //   scaleControl: true
   // };
   // $('#map').jMapping({
   //   force_zoom_level: 15,
   //   default_zoom_level: 15,
   //   category_icon_options: function(category) {
   //     if (category.charAt(0).match(/[a-c]/i)) {
   //       return new google.maps.MarkerImage($(this).attr('data-icon'));
   //     } else if (category.charAt(0).match(/c[d-z]/i)) {
   //       return new google.maps.MarkerImage($(this).attr('data-icon'));
   //     } else {
   //       return new google.maps.MarkerImage($(this).attr('data-icon'));
   //     }
   //   },
   //   map_config: mapOptions
   // });

 }


});

$(window).on('load resize', function() {
  var mheight = $(window).height();
  var mwidth = $(window).width();

  if (mwidth >= 768) {
    $(".hero-banner-section").height(mheight - 113);
  } else {
    $(".hero-banner-section").height(mheight - 78);
  }
});

// Instafeed
// $(window).on("load", function(e) {
//   var instaurl = 'https://api.instagram.com/v1/users/467174069/media/recent/?access_token=467174069.1677ed0.e23b900839bc4be5a29cb6eec0161bbf&callback=?';
//   $.ajax({
//     url: instaurl,
//     dataType: "jsonp",
//     success: function(response) {
//       console.log(response);
//       setTimeout(function() {
//         $.each(response.data, function(i, item) {
//           if ($(window).width() >= 767) {
//             if (i > 3) return false;
//           } else {
//             if (i > 3) return false;
//           }
//
//           $('<div class="insta-col-item"><a href="' + item.link + '" target="_blank"><div class="insta-item bg-cover" style="background-image:url(' + item.images.standard_resolution.url + ')"></div></a></li>').appendTo('#instapics');
//           //$('.t-feeds').find('.photolist'+i).html('<a href="'+item.link+'" target="_blank"><img src="'+item.images.standard_resolution.url+'" class="img-respond"/><span class="insta-icon"><img src="/images/gates/location/instagram.png" alt=""/></span><div class="insta-overlay"><div class="overlay-con"><img src="/images/gates/location/instagram.png"><span>Follow Us <br> on Instagram</span></div></div></a>');
//         });
//         $('#instapics').slideDown('slow');
//       }, 1000);
//     }
//   });
// });

$(window).on('load', function() {
  // Instagram API script
  var instaurl = 'https://instafeed.traveltripper.io/u/westhouseny/';
  var instaFeedUrl = "https://www.instagram.com/p/";
  $.ajax({
      url: instaurl,
      dataType: "json",
      success: function(response) {
        console.log(response);
        setTimeout(function() {
            $.each(response.medias, function(i, item) {
                if (window.innerWidth > 992) {
                  if (i > 3) return false;
                } else {
                  if (i > 3) return false;
                }
                $('<div class="insta-col-item"><a href="' + instaFeedUrl + item.shortcode +'" target="_blank"><div class="insta-item bg-cover" style="background-image:url(' + item.thumbnail + ')"></div></a></div>')
                  .appendTo('#instapics');
                });
              var heightDIV = $('#instafeed div:first-child')
                .innerWidth(); $('#instafeed')
              .slideDown('slow');
            }, 500);
        }
      });

  });

if($('#fb-root').length){
  // Facebook share
  window.fbAsyncInit = function() {
    FB.init({
      appId: '1883009305284419',
      status: true,
      cookie: true,
      xfbml: true
    });
  };

  (function() {
    var e = document.createElement('script');
    e.async = true;
    e.src = document.location.protocol +
      '//connect.facebook.net/en_US/all.js';
    document.getElementById('fb-root').appendChild(e);
  }());
}
// get rt3 offers in gallery
  $('#lightgallery').rezGallery({
            hotelID : 'NYCWST',
            portalID : 'westhousehotelnewyork',
            buttonClass :'common-btn',
            pageLink : true,
            description : true,
            offerdetailPage : '/offer/'
  });
