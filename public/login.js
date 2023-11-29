const btn2 = document.getElementById("login-btn");

btn2.addEventListener("click", submitloginform);


async function submitloginform(e){

    try{
        e.preventDefault()
        const email = document.getElementById('email').value;
        const password = document.getElementById('pwd').value;

        let loginInfo = {
            email, password
        }
        
        document.getElementById('login-form').reset()

        let response = await axios.post('http://localhost:3000/user/post-login-data', loginInfo)
        console.log(response.data)
        let token = response.data.token
        localStorage.setItem('token', response.data.token)
        alert('Login Successful')
        let decodeToken = parseJwt(token)
        let userId = decodeToken.userid
        localStorage.setItem('userId', userId)      
        location = 'chat.html'
    }catch(err){
        console.log(err)
        alert('Email id or password Incorrect')
    }
}


function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  
    return JSON.parse(jsonPayload);
  }
  
  