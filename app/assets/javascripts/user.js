$(function(){

  function appendUser(user){
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.nickname }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.nickname }">追加</div>
                </div>
               `
    $("#user-search-result").append(html);
  }

  function removeUser(user_id, user_nickname){
    var html = `
              <div class='chat-group-user'>
                <input name='group[user_ids][]' type='hidden' value='${ user_id }'>  
                <p class='chat-group-user__name'>${ user_nickname }</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>
               `
    $("#chat-group-users.js-add-user").append(html);
  }

  function appendErrMsgToHTML(msg){
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>
               `
               $("#user-search-result").append(html);
  }
  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url:  "/users",
      data: { keyword: input },
      dataType: "json"
    })
     .done(function(users){
        $("#user-search-result").empty();
        if(users.length !== 0){
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendErrMsgToHTML("一致するユーザーが見つかりません");
        }

    })
     .fail(function(){
      alert("ユーザー検索に失敗しました");
    }) 
  });

  $(document).on("click", ".chat-group-user__btn--add", function(){
    $(this).parent().remove();
    const user_id = $(this).attr("data-user-id");
    const user_nickname = $(this).attr("data-user-name");
    removeUser(user_id, user_nickname);
  });

  $(document).on("click", ".chat-group-user__btn--remove", function(){
    $(this).parent().remove();
  });
});