var mainEmailInput = document.getElementById('emailInput');
var mainPasswordInput = document.getElementById('passwordInput');
var nameInput = document.getElementById('nameInput');
var emailSignup = document.getElementById('emailSignup');
var passwordSignup = document.getElementById('passwordSignup');

var logout = document.querySelector('#logOut');
if(localStorage.getItem('userNames') !== null)
{
    logout.addEventListener('click' , function(){
        localStorage.removeItem('userNames')
    })
}



 var userName = localStorage.getItem('userNames');
 if(userName)
 {
    document.getElementById('userName').innerHTML = userName ; 
 }
 




var usersContainer = [];

if(localStorage.getItem('userSignUp') != null)
{
    var usersContainer = JSON.parse(localStorage.getItem('userSignUp'));
}

document.querySelector('#signUp-btn').addEventListener('click' , function(){
    if(validationEmpty() == true)
    {
        passwordSignup.classList.replace('mb-4' , 'my-2');
        document.querySelector('.error-input3').innerHTML = 'All the inputs are required!'
    }
    else if(validationName() == false)
    {
        nameInput.classList.replace('my-4' , 'my-2');
        document.querySelector('.error-input1').innerHTML = 'Your Name must have at least 3 characters(only letters)!';
    }
    else if(validationEmail() == false)
    {
        emailSignup.classList.replace('mb-4' , 'my-2');
        document.querySelector('.error-input2').innerHTML = 'Your email is invalid! (ex: usename@gmail.com)';
    }
    else if (validationPassword() == false)
    {
        passwordSignup.classList.replace('mb-4' , 'my-2');
        document.querySelector('.error-input3').innerHTML = 'Your password must have at least 5 characters!';
    }
    else if(validationName() == true &&  validationEmail() == true && validationPassword() == true && checkEmailExist() !== true )
    {
        document.querySelector('#signUp-btn').setAttribute('href' , 'index.html')
        saveSignUp()
    }
    })





document.querySelector('#login-btn').addEventListener('click' , function()
{

    if (checkEmailMatch() == true)
    {
        document.getElementById('login-btn').setAttribute('href' , 'home.html');
    }
    else
    {
        document.querySelector('.error-input').innerHTML = 'Incorrect Email or Password !'
    }
  
    
})





function saveSignUp()
{
    var user = 
        {
            userName: nameInput.value,
            userEmail: emailSignup.value,
            userPassword: passwordSignup.value
        };
    usersContainer.unshift(user);
    localStorage.setItem('userSignUp' , JSON.stringify(usersContainer));
}

function validationEmail()
{
    var regexEmail = /^.{4,20}@[a-zA-Z]{4,8}\.com/
    if(regexEmail.test(emailSignup.value) == true)
    {
        return true;
    }
    else
    {
        return false;
    }
}
function validationPassword()
{
    var regexPassword = /^.{5,20}/
    if(regexPassword.test(passwordSignup.value) == true)
    {
        return true;
    }
    else
    {
        return false;
    }
}
function validationName()
{
    var regexName = /^[a-zA-z]{3,20}\s?([a-zA-z]{3,20}$)?$/
    if(regexName.test(nameInput.value) == true)
    {
        return true;
    }
    else
    {
       return false;
    }
}
function validationEmpty()
{
   var regexEmpty = /^$/
   if(regexEmpty.test(nameInput.value) == true|| regexEmpty.test(emailSignup.value) == true || regexEmpty.test(passwordSignup.value) == true)
   {
    return true ;
   }
   else
   {
    return false ;
   }
}
function checkEmailExist()
{
    for(i = 0 ; i < usersContainer.length ; i++)
    {   
        if(emailSignup.value.toLowerCase() == usersContainer[i].userEmail.toLowerCase())
        {
            passwordSignup.classList.replace('mb-4' , 'my-2');
            document.querySelector('.error-input3').innerHTML = 'This email already exists!';
            return true;
        }
    }
}
function checkEmailMatch()
{
    
    for(  i = 0 ; i < usersContainer.length ; i++)
    {
       
        if(mainEmailInput.value.toLowerCase() == usersContainer[i].userEmail.toLowerCase() && mainPasswordInput.value == usersContainer[i].userPassword)
        {
        localStorage.setItem('userNames' , usersContainer[i].userName )
         return true;
            
        } 

    }
  
}








