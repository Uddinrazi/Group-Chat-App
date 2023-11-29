
async function createGroup(){
try{
  //location = 'group.html'
   

  let response = await axios.get('http://localhost:3000/grp/get-userlist')
  
  for(let i=0; i<response.data.user.length; i++){
    let name  = response.data.user[i].name
    let user = document.getElementById('select') 
    user.innerHTML += `<b>${name}<b>`

  }
}
   catch(err){
    console.log(err)
   }
  
}


function closeForm() {
    document.getElementById("popForm").style.display = "none";
  }
  closeForm()


/*window.addEventListener('DOMContentLoaded', async() => {
    try{
      let response = await axios.get('http://localhost:3000/grp/get-userlist')
      console.log(response)
    }
    catch(err){
      console.log(err)
    }
  }) */