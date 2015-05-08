(function($) {

  $("#register-location").change(function(ev) {
    $("#wire-transfer-title .date").text(ev.target.value);
  });

  $("#register-invoice-name").change(function(ev) {
    $("#wire-transfer-title .full_name").text(ev.target.value);
  });

  $("#wire-transfer-email").click(function (ev) {
    ev.preventDefault();
    var lnk = $(ev.target);
    var fields = [
      $("#register-location").val(),
      $("#register-invoice-name").val() + ", " + $("#register-contact").val(),
      $("#register-invoice-street").val(),
      $("#register-invoice-zipcode").val() + ' ' +
      $("#register-invoice-city").val() + ' ' +
      $("#register-invoice-country").val(),
      $("#register-invoice-taxid").val(),
      $("#register-about").val()
    ];
    var mailto = lnk.attr("href") + "&body=" + encodeURIComponent(fields.join("\n"));
    location.href = mailto;
  })


})(jQuery);
