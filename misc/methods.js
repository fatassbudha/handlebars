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
        if (uname == "" || pword == "") {
            window.alert("missing credentials");
            window.location = '/';
        };
        if (uname != "" || pword != "") {
          for (var i = 0; i < len; i++) {
            var dbuname = data[i].username;
            var dbpass = data[i].password;
            if (uname == dbuname&& pword == dbpass) {
                setCookie("status", 1, 30);
                setCookie("user", uname, 30);
                setCookie("id", data[i].id, 30);
                invalid = 1;
                window.location = '/my';
                exit;
            }
          }

        window.alert("invalid credentials");
        window.location.reload() = '/';
        }
      var element = document.getElementById("user");
      element.innerHTML = uname;
    }
};

function logout() {
    setCookie("status", 0, 0);
    setCookie("user", "");
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
function regNew() {
    window.location = '/signup2';
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
        if ($("#newuser").val() == "" ||
            $("#newpass").val() == "") {
          window.alert("missing credentials");
          window.location = '/signup2';
        }
        else{
           window.location = '/my';
        }
  };
function saveReg2() {
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
        if ($("#newuser").val() == "" ||
            $("#newpass").val() == "") {
          window.alert("missing credentials");
          window.location = '/signup2';
        }
        else{
           window.location = '/my';
        }
  };

function gotoshout(){
      window.location = '/new?';
};

  function shout(){
    var id = getCookie("user");
    var arr = { "user": id,
                "out": $("#txtShout").val()};
        $.ajax({
            url: '/new? ',
            type: 'POST',   
            data: JSON.stringify(arr),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
           
            success: function(msg) {
             
            }
        });

    window.location = '/my';
  };

  function del(){
      window.location = '/delete';
};
function search(){
      window.reload;
};
function deletee() {
  var counter = 0;
  var id = document.getElementById('id2del').value;
  if(id == ''){
    window.alert('All fields require input.');
    window.location='/delete';
  }
  else{
    window.alert('Delete Successful!');
    window.location = '/my';
  }
}
function gotoupd(){
      window.location = '/update';
  };

  function upd(){
      var newuser = document.getElementById('newuser').value;
      var updateid = document.getElementById('updateid').value;
      window.alert('Update Successful!'); 
            window.location='/my';
          }