
document.getElementById("signIn-btn")
    .addEventListener("click", ()=>{
        
        const userName = "admin";
        const password = "admin123";

        const inputUserName = document.getElementById("userName");
        const inputPassword = document.getElementById("password");

        const inputUserNameValue = inputUserName.value;
        const inputPasswordValue = inputPassword.value;
        
        if(inputUserNameValue === userName && inputPasswordValue === password){
            inputUserName.value = "";
            inputPassword.value = "";
            window.open("./home.html");
        }
        else{
            alert(`
                
                
                Please Privide valid username and password`)
        }
    })