<?php include('inc/header.php'); ?>
<section>
    <div class='container'>
        <div class='users_div' id='users_div'>
            <div id='users_div_container'></div>
        </div><!-- .users_div -->
        <div class='message_div'>
            <div class='messageList_div' id='messageList_div'></div><!-- .messageList_div -->
            <div class='textarea_div'>
                <textarea placeholder='Type Message Here' id='message'></textarea>
                <button onclick='chatroom.sendMessage()'>SEND</button>
            </div><!-- .textarea_div -->
        </div><!-- .message_div -->
    </div>
</section>
<?php include('inc/footer.php'); ?>
<script src="js/firebaseMessagesjs.js"></script>