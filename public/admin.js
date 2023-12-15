const token = localStorage.getItem("token");
const headers = { headers: { Authorization: token } };
const groupId = localStorage.getItem("groupId");
const userId = localStorage.getItem("userId");
const admin = localStorage.getItem("admin");
console.log(userId);

const existingusrs = async () => {
  try {
    let response = await axios.get(
      `http://localhost:3000/admin/get-group-member/${groupId}`,
      headers,
      token
    );

    console.log(response.data);
    //console.log(response.data.Users);

    usersOfExistingGroup(response.data.Users);
    adminsOfGroup(response.data.admins);
  } catch (err) {
    console.log(err);
  }
};
window.addEventListener("DOMContentLoaded", () => {
  getAllUsers();
});
function usersOfExistingGroup(data) {
  let p = document.getElementById("userlist");
  p.innerHTML = " ";
  data.map((ele) => {
    p.innerHTML += `<ul class="remove" id="${ele.id}" >${ele.name}
<button type="button" class="rbtn" id="${ele.id}">Remove User</button> &nbsp;&nbsp;</ul>`;
  });

  let rbtn = document.querySelectorAll(".rbtn");
  rbtn.forEach((ele) => {
    const btnid = ele.id;
    const rbutton = document.getElementById(btnid);

    rbutton.addEventListener("click", removeUsersFromGroup);
  });
}

function adminsOfGroup(admins) {
  const adminid = admins.map((admin) => admin.id);
  console.log(adminid);
  let flag = false;
  adminid.map((adminId) => {
    console.log(adminId);
    console.log(userId);
    if (userId == adminId) {
      flag = true;
    }
  });
  localStorage.setItem("admin", flag);
  let ul = document.querySelectorAll("ul");
  console.log(ul)
  ul.forEach((ulele) => {
    let flag = true;
    
    for (let i = 0; i < adminid.length; i++) {
      if (ulele.id == adminid[i]) {
        let btn = document.createElement("button");
        btn.classList.add("removeAdmin"); // Use classList.add to add a class
       // btn.id = "addbtn1";
        btn.textContent = "Remove Admin";
        //const buttonClone = btn.cloneNode(true);
        ulele.appendChild(btn);
        flag = false;
        break;
      }
    }
    if (flag) {
      let btn1 = document.createElement("button");
      btn1.classList.add("addAdmin"); // Use classList.add to add a class

      //btn.id = "addbtn2";
      btn1.textContent = "Make Admin";
      //const buttonClone2 = btn.cloneNode(true);
      ulele.appendChild(btn1);
    }
  });
}



  

async function getAllUsers() {
  try {
    let result = await axios.get(
      `http://localhost:3000/admin/get-all-user/${groupId}`,
      headers,
      token
    );
    console.log(result.data);
    const p2 = document.getElementById("p2");
    p2.innerHTML = " ";
    let data = result.data.data;
    for (let i = 0; i < data.length; i++) {
      let name = data[i].name;
      let id = data[i].id;
      console.log("name.....");

      const li = document.createElement("li");
      li.id = `excludedUser${data[i].id}`;

      li.innerHTML += `<input type="checkbox" class="box" id="userid" value="${id}">${name}`;
      p2.appendChild(li);
    }
    //const p2 = document.getElementById("p2");
    let btn = document.createElement("button");
    btn.class = "addbtn1";
    btn.id = "addbtn";
    btn.textContent = "Add Users";

    p2.appendChild(btn);

    btn.addEventListener("click", updateAddedUsersByAdmin);
    existingusrs();
  } catch (err) {
    console.log(err);
  }
}

async function updateAddedUsersByAdmin(e) {
  try {
    e.preventDefault();
    let checkbox1 = document.getElementsByClassName("box");
    console.log(checkbox1);
    let userId = [];
    for (let i = 0; i < checkbox1.length; i++) {
      if (checkbox1[i].checked) {
        userId.push(checkbox1[i].value);
      }
    }

    let obj = { userId };
    let response = await axios.post(
      `http://localhost:3000/admin/add-new-users/${groupId}`,
      obj,
      headers,
      token
    );
    getAllUsers();
    usersOfExistingGroup(response.data.Users);
    adminsOfGroup(response.data.admins);
  } catch (err) {
    console.log(err);
  }
}

async function removeUsersFromGroup(e) {
  try {
    e.preventDefault();
    let userId = e.target.id;
    if (userId == userId && admin === true) {
      alert('jbjjjhj')
    }
    let response = await axios.delete(
      `http://localhost:3000/admin/delete-group-user/${groupId}/${userId}`,
      headers,
      token
    );
    e.target.parentElement.remove();
    // e.target.parentElement.add();
    console.log(response);
    getAllUsers();
    console.log("gjgjhgjhg");
  } catch (err) {
    console.log(err);
  }
}

// console.log(data.name)
