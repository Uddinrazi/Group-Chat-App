//let btn  = document.getElementById('grp-btn');
//btn.addEventListener('click', createGroup)
const token = localStorage.getItem('token')
const header = {headers: {'Authorization': token}}
window.addEventListener('DOMContentLoaded', async () => {
try{
  
let response = await axios.get('http://localhost:3000/grp/get-userlist',header)
  let usrId = response.data.userId
  console.log(usrId)
  for(let i=0; i<response.data.user.length; i++){
    let name  = response.data.user[i].name
    let id = response.data.user[i].id;
        
    let user = document.getElementById('select') 
    user.innerHTML += `<ul><input type="checkbox" name="checkbox1" id="userid" value="${id}">${name}<input type="checkbox" name="checkbox2" id="adminid" value="${id}"></ul>`

    
  }
  
 let checkbox2 = document.getElementsByName('checkbox2')
   checkbox2.forEach((box) => {
    let userId = localStorage.getItem('userId')
    admin1 = box.value
    if (admin1 == userId)
      box.disabled = true
  })
 
  let checkbox1 = document.getElementsByName('checkbox1')
  checkbox1.forEach((box) => {
    let userId = localStorage.getItem('userId')
    usrId = box.value
    if (usrId == userId)
      box.disabled = true
  })
   
}
   catch(err){
    console.log(err)
   }
  
})





let btn  = document.getElementById('cbtn');
btn.addEventListener('click', createGroup)

async function createGroup(e){
  try{
    e.preventDefault()
  
  let name = document.getElementById('name').value
  let checkbox1 = document.getElementsByName('checkbox1')
  let userId = []
  for(let i=0; i<checkbox1.length; i++){
    if(checkbox1[i].checked){
      userId.push(checkbox1[i].value)
    }
  }
  let checkbox2 = document.getElementsByName('checkbox2')
  let adminId = []
  for(let i=0; i<checkbox2.length; i++){
    if(checkbox2[i].checked){
      adminId.push(checkbox2[i].value)
    }
    
    //console.log(userId)
    console.log(checkbox2[i].value)
    
  }
  let obj ={
    name,userId,adminId
  }
  console.log(name,userId,adminId)

  let response = await axios.post('http://localhost:3000/grp/post-group-info',obj,header)
  console.log(response.data)
  }
  catch(err){
    console.log(err)
  }
}

