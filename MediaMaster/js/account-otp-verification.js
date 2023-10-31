let confirmOTP = document.getElementById("confirmOTP");
let userOTP = document.getElementById("forgotPwdinput1");
let isValidMail = getCookie("cms_isValidMail");

let sentOTP = "";
let recieveOTP = "";
let myemail = "";

confirmOTP.addEventListener("click", () => {
  recieveOTP = userOTP.value;
  if (checkOTP()) {
    window.close("./otp-verification.php");
    window.open("./create-password.php", "_self");
  } else {
    userOTP.value = "";
    alert(
      "OTP has not matched!\nnote: try-again or refresh to re-generate the OTP!"
    );
  }
});

function getCookie(name) {
  return (
    (name = (document.cookie + ";").match(new RegExp(name + "=.*;"))) &&
    name[0].split(/=|;/)[1]
  );
}

if (isValidMail == "true") {
  myemail = getCookie("cms-v-email");
  sentOTP = generateOTP();
  sendOTP(sentOTP);
  alert(
    "OTP has been successfully sent to your email address.\nnote: please check SPAM section!"
  );
}

function generateOTP() {
  return Math.floor(Math.random() * 1000000);
}

function checkOTP() {
  return sentOTP + "" == recieveOTP + "" ? true : false;
}

function sendOTP(otp) {
  Email.send({
    SecureToken: "a5d3f4a6-abbf-455b-9520-60da3ef646c9",
    To: myemail,
    From: "manishpatidar306906@gmail.com",
    Subject: "MM OTP verification",
    Body: "Your OTP is: " + otp,
  }).then((message) => alert(message));
}
