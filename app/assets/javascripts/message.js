$(function(){

  function buildHTML(message){
    var html =  `<div class='chat-main__message-list--member-name'>
                  ${message.user_name}
                  <span class='chat-main__message-list--time'>
                    ${message.created_at}
                  </span>
                 </div>
                 <div class='chat-main__message-list--text'>
                  ${message.text}
                 </div>`
    if (message.image){
      var html = html + `<img src=${message.image} >`
    }
    return html
  }

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
});