function login() {
        $.ajax({
          url: '/profs',
          type: 'GET',

          contentType: 'application/json; charset=utf-8',
          dataType: 'json',

          success: function(data) {
          var len = data.length;
            console.log(data);
            renderHTML(data,len); 
          }
        });

      function renderHTML(data,len){
      var uname = $('#reguser').val();
      var pword = $('#regpass').val();

        for (var i = 0; i < len; i++) {
          var dbuname = data[i].username;
          var dbpass = data[i].password;
          
           if (uname == dbuname&& pword == dbpass) {
              setCookie("status", 1, 30);
              window.location = '/my';
            }
      }
    }
};
function logout() {
    setCookie("status", 0, 0);
    window.location = '/';
};

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*2*60*30));
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
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
       user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
           setCookie("username", user, 30);
       }
    }
}

function reg() {
    window.location = '/signup';
};

function saveReg() {
    var arr = { "id": null,
                "username": $("#newuser").val(),
                "password": $("#newpass").val()};
        $.ajax({
            url: '/signup',
            type: 'POST',
            data: JSON.stringify(arr),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
           
            success: function(msg) {
             
            }
        });

        window.location = '/';
  };