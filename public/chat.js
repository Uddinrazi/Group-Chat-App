let sendbtn  = document.getElementById('send-btn');


sendbtn.addEventListener('click', sendMsg)
const token = localStorage.getItem('token')
const headers = {headers: {'Authorization': token}}
async function sendMsg(e) {
    try{
        e.preventDefault()
        const user_msg = document.getElementById('msg').value
       
        
        let obj = { user_msg}
        
        document.getElementById('chat-form').reset()

        const token = localStorage.getItem('token')
        let response = await axios.post('http://localhost:3000/msg/post-chats',obj,headers)
       console.log(response.data.userId)
        showChat(response.data)
        
      //  localStorage.setItem('userId', JSON.stringify(response.data.userId))

    }
    catch(err){
        console.log(err)
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    try{
        const token = localStorage.getItem('token')
        
        
     //  setInterval( async (limit) => {
        
        let response = await axios.get('http://localhost:3000/msg/get-chats?_limit=10',headers)
        
        
   // console.log(response.data) 
    
        for(let i=0; i<response.data.allData.length; i++){
           
                let msgs = response.data.allData[i]
            
                const userId = response.data.allData[i].userId
                //console.log(userId)
                showChat(msgs)
                let arraymsg = JSON.parse(localStorage.getItem('usermsgs')) || []
                arraymsg.push(msgs)
                localStorage.setItem('usermsgs',JSON.stringify(arraymsg))
                //localStorage.setItem('userId',JSON.stringify(userId))
            
           
        }
        getGroupList()
       
   // },1000)fdf
       

    }
    catch(err){
        console.log(err)
    }
})

function showChat(data) {
 // console.log(data)
  let chats = document.getElementById('chats')
  let div = document.createElement('div')
  let userId = localStorage.getItem('userId')
  //console.log(userId)
  if(userId == data.userId){
  div.classList.add("message-box", "my-message");
  div.innerHTML = `<p>${data.text}<br><span>07:43</span></p>`
  chats.append(div)
}
else{
    div.classList.add("message-box", "friend-message");
  div.innerHTML = `<p>${data.text}<br><span>07:43</span></p>`
  chats.append(div)
}
}


async function getGroupList() {
    try{
        let response = await axios.get('http://localhost:3000/msg/get-group-list',headers)
        console.log(response.data)
      //  let group= response.data.user.groups
        //for (let i = 0; i < group.length; i++){
          //  console.log(group[i].id)
        //}
        
       // console.log(result)
       showGroupList(response.data)
    }
    catch(err){
        console.log(err)
    }
}

function showGroupList(data){
    console.log(data)
    for(let i=0; i<data.length;i++){
        let name = data[i].name
        console.log(data[i].name)
    const parent = document.getElementsByClassName('chat-box')
    const div = document.createElement('div')
    div.innerHTML += `<ul> ${name} </ul>`
    parent[0].append(div)
    }
    
}