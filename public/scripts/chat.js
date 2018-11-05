
$(function() {
  let socket = io();
  let name = '';
  let nameInput = $('#name-input');
  let chatInput = $('#chat-input');


  // handle name entered with via keyboard enter
  nameInput.keydown(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      // ensure message not empty
      if (nameInput.val() !== '') {
        name = nameInput.val();
        alert("Welcome "+ name);
        nameInput.val('');
        $('.enter-name').hide();
        socket.emit('newClient', name);
      }else {
        var msg = "Please enter your nickname first";
        alert(msg);
      }
    }
  });

  // handle name entered with when clicking enter


  $('#name_button').on('click', function(event) {
    // alert("success");
    event.preventDefault();

    // ensure message not empty
    if (nameInput.val() !== '') {

      name = nameInput.val();
      alert("Welcome "+ name);
      nameInput.val('');
      $('.enter-name').hide();
      socket.emit('newClient', name);
    }else {
      var msg = "Please enter your nickname first";
      alert(msg);
    }
  });


  // handle keyboard enter button being pressed
  chatInput.keydown(function(event) {
    if (event.which == 13) {
      event.preventDefault();

      // ensure message not empty
      if (chatInput.val() !== '' && name !== '') {
        socket.emit('newMessage', {name: name, msg: chatInput.val()});
        chatInput.val('');
      }else if (name == '') {
        var msg = "Please enter your nickname first";
        alert(msg);
      }else{
        var msg = "Empty message can't be submitted";
        alert(msg);
      }
    }
  });

  // handle submit chat message button being clicked
  $('#chat_button').on('click', function(event) {
    event.preventDefault();

    // ensure message not empty
    if (chatInput.val() !== '' && name !== '') {
      socket.emit('new:message', {name: name, msg: chatInput.val()});
      chatInput.val('');
    }else if (name == '') {
      var msg = "Please enter your nickname first";
      alert(msg);
    }else{
      var msg = "Empty message can't be submitted";
      alert(msg);
    }
  });

  // handle receiving new messages
  socket.on('newMessage', function(msgObject){
    $('#messages').append($('<div class="msg new-chat-message">').html('<span class="member-name">' + msgObject.name + '</span>: ' + msgObject.msg));
    $('.chat-window').scrollTop($('#messages').height());
  });


});
