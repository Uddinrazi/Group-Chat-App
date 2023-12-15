const token = localStorage.getItem('token')
const headers = { headers: { 'Authorization': token } }
const url = 'http://localhost:3000'

let groupId = localStorage.getItem('groupId')
console.log(groupId);

window.addEventListener('DOMContentLoaded', async () => {
   try {
        let response = await axios.get('http://localhost:3000/msg/get-group-list', headers)
        console.log(response.data)
        
       document.getElementById('name').innerHTML =`Welcome ${response.data.user.name}`
        showGroupList(response.data.result1)
    }
    catch (err) {
        console.log(err)
    }

})


let sendbtn = document.getElementById("send-btn");
sendbtn.addEventListener("click", sendMsg);

async function sendMsg(e) {
 //make another form byeee
  try {
    e.preventDefault();
    const grpmsg = document.getElementById("msg").value;
  let groupId = localStorage.getItem("groupId");
    console.log(groupId);

    let obj = { grpmsg, groupId };
   
    let response = await axios.post(
      `http://localhost:3000/msg/post-group-chats`,
      obj,
      headers
    );
    document.getElementById("chat-form").reset();
    
    let msg = response.data
   console.log(response.data)
    showChat('You',response.data.data.text, response.data.data.userId);
  } catch (err) {
    console.log(err);
  }
}



function showChat(name,data,userid) {
     
    let chats = document.getElementById('chats')
  let div = document.createElement('div')

    let userId = localStorage.getItem('userId')
  //console.log(userId)
  
    if (userId == userid || name == 'You') {
      div.classList.add("message-box", "my-message");
      div.innerHTML = `<p>${data}<br></p>`;
      chats.append(div);
    } else {
      div.classList.add("message-box", "friend-message");
      div.innerHTML = `<p><span>${name} :</span>${data}<br></p>`;
      chats.append(div);
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
        div.innerHTML += `<button type="button" class="gname"id="${id}">${name} </button>`
        parent[0].append(div)


    }
    document.querySelectorAll('.gname').forEach(ele => {
        ele.addEventListener('click', async (e) => {
          try {
              document.getElementById("admin").disabled = false;
                e.preventDefault()
            localStorage.setItem('groupId', ele.id)
            console.log(ele.id)
                let groupId = localStorage.getItem('groupId', ele.id)
               console.log(groupId)
              let chats = document.getElementById("chats")
              chats.innerHTML = ''
                let response = await axios.get(`http://localhost:3000/msg/get-group-chats/${groupId}`, headers, token)
               
              //console.log(response)
                let msg = response.data.response;
                if (response.data.groupId == groupId) {
                  msg.map((ele) => {
                    console.log(ele.user.name)
                    showChat(ele.user.name,ele.text, ele.userId);
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


const logout = document.querySelector(".logbtn");

logout.addEventListener("click", () => {
  localStorage.clear();
  location = "http://localhost:3000/login.html";
});



