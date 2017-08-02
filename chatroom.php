<?php include('inc/header.php'); ?>
<section class='chatroom'>
    <div class='container'>
        <div class='users_div' id='users_div'>
            <div id='users_div_container' class='users_div_container'></div>
        </div><!-- .users_div -->
        <div class='message_div'>
            <div class='messageList_div' id='messageList_div'></div><!-- .messageList_div -->
        </div><!-- .message_div -->
        <div class='textarea_div'>
            <textarea placeholder='Type Message Here' id='message'></textarea>
            <button onclick='chatroom.sendMessage()'>SEND</button>
        </div><!-- .textarea_div -->
    </div>
</section>
<?php include('inc/footer.php'); ?>
<script src="js/firebaseMessagesjs.js"></script>
<script type='text/javascript'>
    var chatroom = new chatroomObject();
    chatroom.prototype = new usersObject();
    chatroom.getCurrentCookies();
    chatroom.displayUser();
    window.onbeforeunload = function(){
        return "Are you sure you want to close the window?";
    }
    /*
    window.onbeforeload = function() {
        alert('text');
        //chatroom.prototype.signOut(chatroom.currentUser);
    }
    */
</script>