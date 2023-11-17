const btn = document.getElementById('btn1')

btn.addEventListener('click', submit);

async function submit(e){
    try{
        e.preventDefault()
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value
        const phone = document.getElementById('phone').value
        const password = document.getElementById('pwd').value;

        const user = {
            name, email,phone, password
        }
        document.getElementById('signup-form').reset();

        let response = await axios.post('http://localhost:5000/user/post-user-data', user)

    }catch(err){
        console.log(err)
    }
}


