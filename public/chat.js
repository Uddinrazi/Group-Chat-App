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
        
        localStorage.setItem('userMsg', response.data)

    }
    catch(err){
        console.log(err)
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    try{
        const token = localStorage.getItem('token')
        
       // setInterval( async (limit) => {
        
        let response = await axios.get('http://localhost:3000/msg/get-chats?_limit=10',{headers: {'Authorization': token}})
        
        
    console.log(response.data)      
        for(let i=0; i<response.data.allData.length; i++){
            let msgs = response.data.allData[i].text
            console.log(msgs)
            
            let arraymsg = JSON.parse(localStorage.getItem('usermsgs')) || []
            arraymsg.push(msgs)
            localStorage.setItem('usermsgs',JSON.stringify(arraymsg))
        }
   // },1000)fdf
       

    }
    catch(err){
        console.log(err)
    }
})

function showChat(data) {
  //  console.log(data)
}