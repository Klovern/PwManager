document.addEventListener('DOMContentLoaded', function () {
  initializeButtons();

});

function initializeButtons(){
  document.getElementById('create-password').addEventListener('click', createPassword);
  document.getElementById('list-passwords').addEventListener('click', listPasswords);
}

var passwordArray = [];

function listPasswords() {
  var html = "";
    for (var i = 0; i < passwordArray.length; i++) {
      var html = html + passwordArray[i] + "<br>";
    }
    html = `<p> ${html} </p>`
    document.getElementById("index").innerHTML = html;
}

function comparePasswords() {
  console.log("Comparing passwords.");
  var pass1 = document.getElementById("password-1").value;
  var pass2 = document.getElementById("password-2").value;
  var url = document.getElementById("url").value;
  if(pass1  === pass2){
    console.log(`Passwords did match.`);
    var encrypted = encryptPassword(pass1);
    var pwcontent = setNewPassword(url,encrypted);
    console.log(`output in array: ${passwordArray}`);
  }
  else{
    console.log(`Passwords did not match.`)
  }
}


function createPassword() {
  var html =   '<form> Homepage:<br> <input type="text" id="url"><br><br>Password:<br><input id="password-1" type="password" name="password"><br>Password again:<br><input id="password-2" type="password" name="password"><br><input target="_blank" id="btn-submit" value="Submit"></form>'
  document.getElementById("index").innerHTML = html;
  document.getElementById('btn-submit').addEventListener('click', comparePasswords);
  console.log("Creates a new password.");
}

function encryptPassword(password){
  // must return a 16bit passwordfriendly string
  // saves string to clipboard
  var key = CryptoJS.lib.WordArray.random(16);
  var iv  = CryptoJS.lib.WordArray.random(16);
  var encrypted = CryptoJS.AES.encrypt(password, key, { iv: iv });
  console.log(`Crypted password: ${encrypted}`);

  var html = `<p> password is ${encrypted} </p><br> <button class="clipBtn" data-clipboard-text="${encrypted}" data-clipboard-action="cut">  Cut to clipboard  </button>`;

  document.getElementById("index").innerHTML = html;
  copyToClipboard();


  return encrypted;

}

// currently does not copy the text, but it should.
function copyToClipboard(){
  console.log(Clipboard.isSupported());
  var clipboard = new Clipboard('.clipBtn');

  clipboard.on('success', function(e) {
      console.info('Action:', e.action);
      console.info('Text:', e.text);
      console.info('Trigger:', e.trigger);
      e.clearSelection();

      var html = `<h1>Password-Manager</h1>
          <button id="create-password" type="button">New password</button>
          <button id="list-passwords" type="button" >List passwords</button>`;
          document.getElementById("index").innerHTML = html;
          initializeButtons();
  });

  clipboard.on('error', function(e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
  });
}


function setNewPassword(url, password) {
  var obj = `{ "url" : ${url}, "password" : ${password}, }`;
  passwordArray.push(obj);
  return obj;
}
