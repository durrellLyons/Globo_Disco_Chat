<section class='user_creds_div'>
    <h2>Sign In</h2>
    <div class='input_div'>
        <label for='username'>Username</label> <br>
        <input type='text' id='username' name='username' /><em id='username_validation'></em>
    </div><!-- .input_div -->

    <div class='input_div'>
        <label for='password'>Password</label> <br>
        <input type='password' id='password' name='password' /><em id='username_validation'></em>
    </div><!-- .input_div -->
    
    <div class='input_div'>
        <button onclick='users.signInUser();'>Sign In</button> <br>
        <p>Don't have an account? Click <span onclick='indexObject.loadView("inc/signup", "content")'>Here!</span></p>
    </div><!-- .input_div -->
</section>