var check = 0;

function login() {

  var uname = $('#reguser').val();
  var pword = $('#regpass').val();
  $.getJSON('accs.json', function(data) {
    var obj = jQuery.parseJSON(JSON.stringify(data));

    for (var i = 0; i < obj.profiles.length; i++) {
      if (uname == obj.profiles[i].username && pword == obj.profiles[i].password) {

        check++;

        setCookie("status", 1, 30);
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
  check = 0;

};
function logout() {
    setCookie("status", 0, 30);
    window.location = '/';
};

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function checkCookie() {
    var user=getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
       user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
           setCookie("username", user, 30);
       }
    }
}