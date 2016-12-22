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

      var uname = $('#txtsearch').val();

          for (var i = 0; i < len; i++) {
              var dbuname = data[i].username;
              var dbid = data[i].id;
              var dbpass = data[i].password;
              var en = CryptoJS.MD5(dbpass).toString();

            if (uname == dbuname || uname == dbid) {
              $("#a").append("<tr><td>" + dbid+"<td>"
                      + dbuname+"<td>"
                      + en+"</tr>");
            }
            break;
          }
        }
    
});