import 'jqBootstrapValidation';


$(function() {

  $("#contactStmanRecapt input,#contactStmanRecapt textarea").jqBootstrapValidation({
  // $("input,textarea").jqBootstrapValidation({

      preventSubmit: true,
      submitError: function($form, event, errors) {
          // additional error messages or events
      },
      submitSuccess: function($form, event) {
          event.preventDefault(); // prevent default submit behaviour
          // get values from FORM
          var fields={};
          var options={};
          var recaptcha = grecaptcha.getResponse();

          var date = new Date();
          var slug = date.getFullYear().toString()+'-';
          var month = date.getMonth();
          month++;
          if (month<10) {
            slug+='0';
          }
          slug+=month.toString();
          slug+='-adm33';

          var subscribe = false;
          var message_subscribe = " unsubscribe";
          // if ($("input#subscribe").is( ':checked'))
          // {
          //   subscribe = true;
          //   message_subscribe = " subscribe";
          // }

          fields['name']=$("input#name").val();
          fields['email']=$("input#email").val();
          fields['message']=$("textarea#message").val();
          // fields['subscribe']=subscribe;
          options['slug']=slug; 
          options['parent']='clean_blog contact'; //$("input#parent").val(); 
          options['origin']=HOST_URL+BASE_URL+'/';//"https://admien33.github.io/clean_agency_demo01/"; //$("input#origin").val(); 
          // options['origin']="https://admien33.github.io/clean_agency_demo01/"; //$("input#origin").val(); 
          options['gotcha']=$("input#gotcha").val(); 
          //add info page

          // var name = $("input#name").val();
          // var email = $("input#email").val();
          // var phone = $("input#phone").val();
          // var message = $("textarea#message").val();
          // var firstName = name; // For Success/Failure Message
          var firstName = fields['name']; // For Success/Failure Message
          // Check for white space in name for Success/Fail message
          if (firstName.indexOf(' ') >= 0) {
              firstName = name.split(' ').slice(0, -1).join(' ');
          } 

          $('#success').html("<div class='alert alert-info'>");
          $('#success > .alert-info').html("<i class='fa fa-spinner fa-pulse fa-3x fa-fw'></i>").append("</i>"); 
          $('#success > .alert-info').append('<span class="sr-only">'); 
          $('#success > .alert-info').append("<strong>Waiting server's reply </strong>");  
          $('#success > .alert-info').append("</span>")
          $('#success > .alert-info').append('</div>');
                           

          $.ajax({
              url: STATICMAN_URL,
              // url: "https://sleepy-retreat-12152.herokuapp.com/v2/entry/id2m/staticman-receipt-lacasebiocoutras/master/comments",
              type: "POST",
              dataType: 'text',
              data: {
                  fields: fields,
                  options: options,
                  'g-recaptcha-response': recaptcha
              },
              cache: false,
              success: function() {
                  // Success message
                  $('#success').html("<div class='alert alert-success'>");
                  $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                      .append("</button>");
                  $('#success > .alert-success')
                      .append("<strong>Your message has been sent. </strong>");
                  $('#success > .alert-success')
                      .append('</div>');

                  //clear all fields
                  $('#contactStmanRecapt').trigger("reset");
              },
              error: function() {
                  // Fail message
                  $('#success').html("<div class='alert alert-danger'>");
                  $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                      .append("</button>");
                  $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                  $('#success > .alert-danger').append('</div>');
                  //clear all fields
                  $('#contactStmanRecapt').trigger("reset");
              }
          })
      }, // end submitSuccess
    filter: function() {
       return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});


