let sendbtn  = document.getElementById('send-btn');


sendbtn.addEventListener('click', sendMsg)

async function sendMsg(e) {
    try{
        e.preventDefault()
        const user_msg = document.getElementById('msg').value
        
        
        let obj = { user_msg}
        
        document.getElementById('chat-form').reset()

        const token = localStorage.getItem('token')
        let response = await axios.post('http://localhost:3000/msg/post-chats',obj, {headers: {'Authorization' : token}})
        console.log(response.data)
        console.log(obj,'chatsssss')
    }
    catch(err){
        console.log(err)
    }
}