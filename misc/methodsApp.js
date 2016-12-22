$(document).ready(function(){
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
      var sch = $('#txtsearch').val();
        if (uname == "" || pword == "") {
            window.alert("missing credentials");
            window.location = '/';
        };
        if (uname != "" || pword != "" && sch == "") {
          for (var i = 0; i < len; i++) {
            var dbuname = data[i].username;
            var dbid = data[i].id;
            var dbpass = data[i].password;
            var en = CryptoJS.MD5(dbpass).toString();
            $("#a").append("<tr><td>" + dbid+"<td>"
            				+ dbuname+"<td>"
            				+ en+"</tr>");
            }
          }
/*
            if (sch != "") {
              for (var x = 0; x < len; x++) {
              var dbuname = data[i].username;
              var dbid = data[i].id;
              var dbpass = data[i].password;
              var en = CryptoJS.MD5(dbpass).toString();

            if (uname == dbuname) {
              $("#a").append("<tr><td>" + dbid+"<td>"
                      + dbuname+"<td>"
                      + en+"</tr>");
            }
            break;
            };
        }
        */
      }
    
});