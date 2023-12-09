
const token = localStorage.getItem('token')
const headers = {headers: {'Authorization': token}}
const groupId = localStorage.getItem('groupId')
    
window.addEventListener('DOMContentLoaded', async () => {
    try {
          let response = await axios.get(`http://localhost:3000/admin/get-group-member/${groupId}`, headers,token)
    
        console.log(response.data.admins)
        usersOfGroup(response.data.Users);
        adminsOfGroup(response.data.admins);
        getAllUsers();
    }
    catch (err) {
        console.log(err)
  }
})

function usersOfGroup(data) {
    data.map(ele => {
        let p = document.getElementById("userlist");
        p.innerHTML += `<ul id="duser">${ele.name} <button type="button" class="rbtn" id="${ele.id}">Remove User</button></ul>`;
    
    })
}


function adminsOfGroup(data) {
    data.forEach(element => {
        let parent = document.getElementById("duser");
        parent.innerHTML += `<button> Make Admin</button>`
    });
}


async function getAllUsers() {
    try {
        let result = await axios.get(`http://localhost:3000/admin/get-all-user/${groupId}`, headers, token)
        let data = result.data.data;
        for(let i = 0; i < data.length; i++){
        let name = data[i].name
        let id = data[i].id
        console.log('name.....')
        const p2 = document.getElementById('p2')
        

        p2.innerHTML += `<ul><input type="checkbox"  id="userid" value="${id}">${name}</ul>`;

        }
        const p2 = document.getElementById("p2");
        let btn = document.createElement('button')
        btn.class = 'addbtn1';
        btn.id = 'addbtn';
        btn.textContent = 'Add Users'

       p2.appendChild(btn);
        
        btn.addEventListener("click", updateAddedUsersByAdmin);
    }
    catch (err) {
        console.log(err)
    }
    
}


async function updateAddedUsersByAdmin(e) {
    try {
        e.preventDefault()
        console.log('jbjhbjbhj')
    }
    catch (err) {
        console.log(err)
    }
}
   
    
    
    
   // console.log(data.name)
    
