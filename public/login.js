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
           
        localStorage.setItem('token', response.data.token)
        alert('Login Successful')
        location = 'chat.html'
    }catch(err){
        console.log(err)
        alert('Email id or password Incorrect')
    }
}