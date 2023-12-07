const token = localStorage.getItem('token')
const headers = { headers: { 'Authorization': token } }
const url = 'http://localhost:3000'

let groupId = localStorage.getItem('groupId')

if (groupId) {
    let sendbtn2 = document.getElementById('send-btn');
    sendbtn2.addEventListener('click', sendMsg2)

    async function sendMsg2(e) {
        e.preventDefault()
        let groupId = localStorage.getItem('groupId')
        const grpmsg = document.getElementById('msg').value

        let obj = { grpmsg, groupId }
        console.log('lllllllllllll')

        let response = await axios.post(`${url}/msg/post-group-chats`, obj, headers)
        console.log(response)
    }
}

else {
    let sendbtn = document.getElementById('send-btn');
sendbtn.addEventListener('click', sendMsg)

async function sendMsg(e) {
    try {
        e.preventDefault()
        const user_msg = document.getElementById('msg').value

        let obj = { user_msg }

        document.getElementById('chat-form').reset()

        const token = localStorage.getItem('token')
        let response = await axios.post(`${url}/msg/post-chats`, obj, headers)
        console.log(response.data.userId)
        showChat(response.data)
    }
    catch (err) {
        console.log(err)
    }
}

}




window.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = localStorage.getItem('token')


        //  setInterval( async (limit) => {

        let response = await axios.get('http://localhost:3000/msg/get-chats?_limit=10', headers)


        // console.log(response.data) 

        for (let i = 0; i < response.data.allData.length; i++) {

            let msgs = response.data.allData[i]

            const userId = response.data.allData[i].userId
            //console.log(userId)
            showChat(msgs)
            let arraymsg = JSON.parse(localStorage.getItem('usermsgs')) || []
            arraymsg.push(msgs)
            localStorage.setItem('usermsgs', JSON.stringify(arraymsg))
            //localStorage.setItem('userId',JSON.stringify(userId))


        }
        getGroupListOnMainPage()

        // },1000)fdf


    }
    catch (err) {
        console.log(err)
    }
})

function showChat(data) {
    // console.log(data)
    let chats = document.getElementById('chats')
    let div = document.createElement('div')
    let userId = localStorage.getItem('userId')
    //console.log(userId)
    if (userId == data.userId) {
        div.classList.add("message-box", "my-message");
        div.innerHTML = `<p>${data.text}<br><span>07:43</span></p>`
        chats.append(div)
    }
    else {
        div.classList.add("message-box", "friend-message");
        div.innerHTML = `<p>${data.text}<br><span>07:43</span></p>`
        chats.append(div)
    }
}


async function getGroupListOnMainPage() {
    try {
        let response = await axios.get('http://localhost:3000/msg/get-group-list', headers)
        console.log(response.data)
        
        
        showGroupList(response.data.result1)
    }
    catch (err) {
        console.log(err)
    }
}

function showGroupList(data) {
    // console.log(data)
    for (let i = 0; i < data.length; i++) {
        let name = data[i].name
        let id = data[i].id
        console.log(id)
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
                console.log(response);
                console.log('kmkmmmkmk')
            }
            catch (err) {
                console.log(err)
            }
        })
    })

}






