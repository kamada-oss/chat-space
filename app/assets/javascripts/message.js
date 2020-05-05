$(function(){

  // メッセージのHTMLを返す
  function buildHTML(message){
    var html =  `
                <div class="message" data-message-id=${message.id}></div>
                  <div class='chat-main__message-list--member-name'>
                    ${message.user_name}
                    <span class='chat-main__message-list--time'>
                     ${message.created_at}
                    </span>
                   </div>
                   <div class='chat-main__message-list--text'>
                    ${message.text}
                  </div>
                `
    if (message.image){
      var html = html + `<img src=${message.image} >`
    }
    return html
  }
  // メッセージ送信機能の非同期通信
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('form')[0].reset();
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.submit-btn').prop('disabled', false);
    })
     .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.submit-btn').prop('disabled', false);
    });
  });

  // メッセージの自動更新機能
  var reloadMessages = function(){
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
     .done(function(messages){
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        })
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
     .fail(function(){
      alert("error");
    })
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});