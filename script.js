var myDataRef = new Firebase('https://chris2048.firebaseIO.com/chat/entries');
var lastChatter = null;
$('#nameInput').val('anon');
var comment = _.template('<div><%= username %><%- message %></div>');
var user = _.template('<span style="font-weight: bold;color:<% print((username == "anon")?"grey":"#CC9933"); %>;"><i><%- username %></i>: </span>');

String.prototype.repeat = function( num )
{
    return new Array( num + 1 ).join( this );
}
$('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var name = $('#nameInput').val();
      var text = $(this).val();
      //myDataRef.push({name: name, text: text});
      $.ajax({
        type: 'POST',
        url: 'http://chris2048.pythonanywhere.com/chat/post',
        crossDomain: true,
        data: {name: name, message: text},
        dataType: 'json'
      });
      $('#messageInput').val('');
    }
  });
myDataRef.on('child_added', function(snapshot) {
    var entry = snapshot.val();
    displayChatMessage(entry.chatter, entry.text);
  });
function displayChatMessage(name, mess) {
  md = $('#messagesDiv')
  var name_el = (lastChatter != null && name == lastChatter) ? '&nbsp;&nbsp;' : user({username: name});
  md.append(comment({username: name_el, message: mess}))
lastChatter = name;
$("#messagesDiv").prop({ scrollTop: $("#messagesDiv").prop("scrollHeight") });
};
