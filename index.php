<?php include('inc/header.php'); ?>
<div id='content'></div>
<?php include('inc/footer.php'); ?>
<script type='text/javascript'>
    var loginScreen = 'inc/login';
    var contentDiv = 'content';
    document.getElementById('content').onload = indexObject.loadView(loginScreen, contentDiv);
    indexObject.deleteCookie();
</script>