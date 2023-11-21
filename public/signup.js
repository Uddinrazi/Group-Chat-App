const btn1 = document.getElementById('btn1')

btn1.addEventListener('click', submit);

async function submit(event){
    try{
        event.preventDefault()
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value
        const phone = document.getElementById('phone').value
        const password = document.getElementById('pwd').value;

        const user = {
            name, email,phone, password
        }
        document.getElementById('signup-form').reset();

       let response = await axios.post('http://localhost:3000/user/post-user-data', user)
      
       console.log(response.data)
       if(response.status === 226){
        alert('Email id already exist Please Login')
    }
    else{
        alert('Successfully signed up')
    }
    }catch(err){
        console.log(err)
    }
}


