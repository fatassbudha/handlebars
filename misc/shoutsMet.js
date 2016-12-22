$(document).ready(function(){
$.ajax({
          url: '/shouts',
          type: 'GET',

          contentType: 'application/json; charset=utf-8',
          dataType: 'json',

          success: function(datas) {
          var lens = datas.length;
            console.log(datas);
            renderHTML(datas,lens); 
          }
        });

	function renderHTML(datas,lens){
          for (var i = 0; i < lens; i++) {
            var out = datas[i].out;
            var user = datas[i].user;
            $("#b").append("<tr><td>" + user+"<td>"
            				+ out+"</tr>");
            }
        }
    
});