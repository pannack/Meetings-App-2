import Register from './register';

test( 'valideUsename will validate username in register form',()=>{
    const rp = new Register();
    document.body.innerHTML = `
    <div class="user-name form-input">
    <label for="name">Enter Username</label>
    <input type="text" class="name-r" id="name-r" required autocomplete="off"/>
    <span class="message message-error"></span>
  </div>               
    `;

    rp.usernameEl = document.querySelector( '#name-r' ) as HTMLInputElement;
    const formUser = ( rp.usernameEl as HTMLElement ).closest( '.user-name' ) as HTMLElement;
    const message = formUser.querySelector( '.message' ) as HTMLElement;
    rp.usernameEl.value = 'Praveen Kumar';

    const validateUsename = rp.validateUsename();

    // assert
    expect( validateUsename ).toEqual( true );
    expect( message.innerHTML ).toEqual( '' );
} );

test( 'validateEmail will validate email',()=>{
    const rp = new Register();
    document.body.innerHTML = 
    `
    <div class="form-email form-input">
            <label for="email">Enter Email</label>
            <input type="email" class="email-lr" id="email-lr" autocomplete="off" />
            <span class="message message-error"></span>
          </div>
          `
    rp.emailEl = document.querySelector( "#email-lr" ) as HTMLInputElement;
    const form = ( rp.emailEl as HTMLElement ).closest( ".form-email" ) as HTMLElement;
    const message = form.querySelector( ".message" ) as HTMLElement;
    rp.emailEl.value ="prak4@sapient.com"

    const validateEmail = rp.validateEmail();

    expect( validateEmail ).toEqual( true );
    expect( message.innerHTML ).toEqual( '' );

} );

test( 'validatePassword will validate Password',()=>{
    const rp = new Register();
    document.body.innerHTML=
    `
    <div class="form-password form-input">
            <label for="pass">Enter Password</label>
            <input type="password" class="pass-lr" id="pass-lr" />
            <span class="message message-error"></span>
          </div>
          `
    rp.passwordEl = document.querySelector( ".pass-lr" ) as HTMLInputElement;
    const form = ( rp.passwordEl as HTMLElement ).closest( ".form-password" ) as HTMLElement;
    const message = form.querySelector( ".message" ) as HTMLElement;
    rp.passwordEl.value ="Prak4@16";

    const validatePassword = rp.validatePassword();

    expect( validatePassword ).toEqual( true );
    expect( message.innerHTML ).toEqual( '' );
} )

test( 'validateConfirmPassword will validate Password matching',()=>{
    const rp = new Register();
    document.body.innerHTML =
    `
    <div class="form-confirm-password form-input">
            <label for="confrmpass">Confirm Password</label>
            <input type="password" class="confrmpass" id="confrmpass" />
            <span class="message message-error"></span>
          </div>
          <label for="pass">Enter Password</label>
            <input type="password" class="pass-lr" id="pass-lr" />
          
    `
    rp.confirmPasswordEl = document.querySelector( '.confrmpass' ) as HTMLInputElement;
    rp.passwordEl = document.querySelector( '.pass-lr' ) as HTMLInputElement;

    const form = ( rp.confirmPasswordEl as HTMLElement ).closest( ".form-confirm-password" ) as HTMLElement;
    const message = form.querySelector( '.message' ) as HTMLElement;
    rp.confirmPasswordEl.value = 'Prak4@16';
    rp.passwordEl.value = 'Prak4@16';

    const validateConfirmPassword = rp.validateConfirmPassword();
    expect( validateConfirmPassword  ).toEqual( true );
    expect( message.innerHTML ).toEqual( '' );
} )