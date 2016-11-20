var check = 0;

function login() {

  var uname = $('#reguser').val();
  var pword = $('#regpass').val();
  $.getJSON('accs.json', function(data) {
    var obj = jQuery.parseJSON(JSON.stringify(data));

    for (var i = 0; i < obj.profiles.length; i++) {
      if (uname == obj.profiles[i].username && pword == obj.profiles[i].password) {

        check++;
        window.location = '/my';
      }

    }

  });

  if (check == 0) {
    document.getElementById("modal-title").textContent = "Error";
    document.getElementById("modal-text").textContent = "Incorrect Email/Password";

    $('#modal').modal('show');
    $('#reguser').val('');
    $('#regpass').val('');
  }
  counter = 0;

};