document.addEventListener('DOMContentLoaded', function () {

      document.getElementById('create-password').addEventListener('click', createPassword);
      document.getElementById('list-passwords').addEventListener('click', listPasswords);

});

function listPasswords() {
    console.log("Password is listed.");
}

function comparePasswords() {
  console.log("Comparing passwords.");
  var pass1 = document.getElementById("password-1").value;
  var pass2 = document.getElementById("password-2").value;
  if(pass1  === pass2){
    console.log(`Passwords did match.`);
    encryptPassword(pass1);
  }
  else{
    console.log(`Passwords did not match.`)
  }
}


function createPassword() {
  var html =   '<form> Homepage:<br> <input type="text" name="homepage"><br><br>Password:<br><input id="password-1" type="password" name="password"><br>Password again:<br><input id="password-2" type="password" name="password"><br><input target="_blank" id="btn-submit" value="Submit"></form>'
  document.getElementById("index").innerHTML = html;
  document.getElementById('btn-submit').addEventListener('click', comparePasswords);
  console.log("Creates a new password.");
}

function encryptPassword(password){
  var key = CryptoJS.lib.WordArray.random(16);
  var iv  = CryptoJS.lib.WordArray.random(16);
  var encrypted = CryptoJS.AES.encrypt(password, key, { iv: iv });
  console.log(`Crypted password: ${encrypted}`);
}
