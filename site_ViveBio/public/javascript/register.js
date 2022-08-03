console.log("register success");

const regExLetter = /^[A-Z]+$/i;
const regExEmail =
  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
const regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

const username = document.querySelector("#username"),
      errorUsername = document.querySelector("#errorUsername"),
      errorUsernameCross = document.querySelector("#errorUsernameCross");

const verifyUsername = async (username) => {
  try {
    let response = await fetch("/api/users/check-username", {
      method: "POST",
      body: JSON.stringify({
        username: username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await response.json();
    return result.data;
  } catch (error) {
    console.error;
  }
};
username.addEventListener("blur", async function () {
  let result = await verifyUsername(this.value);
  if (result) {
    errorUsername.innerHTML = 'Este usuario ya se encuentra en uso.';
    errorUsernameCross.setAttribute('class','register_error_icon register_error_box-stamp');
  }else{
    errorUsername.innerHTML = null;
    errorUsernameCross.style.display = "none";
    
  }
  
});
