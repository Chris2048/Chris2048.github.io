var myDataRef = new Firebase('https://chris2048.firebaseIO.com/chat/entries');
var lastChatter = null;
$('#nameInput').val('anon')

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
function displayChatMessage(name, text) {
  if (name == 'anon'){
   $('#messagesDiv').append('<div><span style="font-weight: bold;color:grey;"><i>anon</i>: </span>' + escape(text) +"</div>");
  } else {
   if (lastChatter != null && name == lastChatter) {
    $('#messagesDiv').append("<div>&nbsp;&nbsp;" + escape(text) +"</div>");
   } else {
    $('#messagesDiv').append('<div><span style="font-weight: bold;color:#CC9933;">'+ escape(name) +': </span>' + escape(text) +"</div>");
   }
  }
lastChatter = name;
$("#messagesDiv").prop({ scrollTop: $("#messagesDiv").prop("scrollHeight") });
};
