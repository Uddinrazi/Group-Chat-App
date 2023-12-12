const token = localStorage.getItem('token')
const headers = { headers: { 'Authorization': token } }
const url = 'http://localhost:3000'

let groupId = localStorage.getItem('groupId')


window.addEventListener('DOMContentLoaded', async () => {
   try {
        let response = await axios.get('http://localhost:3000/msg/get-group-list', headers)
      //  console.log(response.data)
        
        
        showGroupList(response.data.result1)
    }
    catch (err) {
        console.log(err)
    }

})


let sendbtn = document.getElementById("send-btn");
sendbtn.addEventListener("click", sendMsg);

async function sendMsg(e) {
 
  try {
    e.preventDefault();
    const grpmsg = document.getElementById("msg").value;

    let obj = { grpmsg, groupId };
    console.log(obj)
    let response = await axios.post(
      `http://localhost:3000/msg/post-group-chats`,
      obj,
      headers
    );
    document.getElementById("chat-form").reset();
    
    let msg = response.data
    console.log(response.data)
    msg.map((ele) => {
      showChat(ele.text);
    })
    //showChat(response.data);
  } catch (err) {
    console.log(err);
  }
}



function showChat(data) {
     console.log(data)
    let chats = document.getElementById('chats')
    let div = document.createElement('div')
    let userId = localStorage.getItem('userId')
    //console.log(userId)
    if (userId == data.userId) {
        div.classList.add("message-box", "my-message");
        div.innerHTML = `<p>${data}<br><span>07:43</span></p>`
        chats.append(div)
    }
    else {
        div.classList.add("message-box", "friend-message");
        div.innerHTML = `<p>${data}<br><span>07:43</span></p>`
        chats.append(div)
    }
}




function showGroupList(data) {
    // console.log(data)
    for (let i = 0; i < data.length; i++) {
        let name = data[i].name
        let id = data[i].id
        //console.log(id)
        const parent = document.getElementsByClassName('chat-box')
        const div = document.createElement('div')
        div.class = 'container'
        div.innerHTML += `<button type="button" class="gname"id="${id}">${name} <p id="admin">Admins</button>`
        parent[0].append(div)


    }
    document.querySelectorAll('.gname').forEach(ele => {
        ele.addEventListener('click', async (e) => {
            try {
                e.preventDefault()
                localStorage.setItem('groupId', ele.id)
                let groupId = localStorage.getItem('groupId', ele.id)
               
                let response = await axios.get(`http://localhost:3000/msg/get-group-chats/${groupId}`, headers, token)
                console.log(response.data);

                let msg = response.data.response;
                if (response.data.groupId == groupId) {
                  msg.map((ele) => {
                    console.log(ele);
                    showChat(ele.text);
                  });
                } 
                //showChat(response.data.response);
                
            }
            catch (err) {
                console.log(err)
            }
        })
    })

}






