const token = localStorage.getItem("token");
const headers = { headers: { Authorization: token } };
const groupId = localStorage.getItem("groupId");

window.addEventListener("DOMContentLoaded", async () => {
  try {
    let response = await axios.get(
      `http://localhost:3000/admin/get-group-member/${groupId}`,
      headers,
      token
    );

    console.log(response.data);
    //console.log(response.data.Users);
    getAllUsers();
    usersOfExistingGroup(response.data.Users);
    adminsOfGroup(response.data.admins);
  } catch (err) {
    console.log(err);
  }
});

function usersOfExistingGroup(data) {
  data.map((ele) => {
    let p = document.getElementById("userlist");
    p.innerHTML += `<ul class="remove" id="${ele.id}" >${ele.name}
<button type="button" class="rbtn" id="${ele.id}">Remove User</button></ul>`;
  });

  let rbtn = document.querySelectorAll(".rbtn");
  rbtn.forEach((ele) => {
    const btnid = ele.id;
    const rbutton = document.getElementById(btnid);

    rbutton.addEventListener("click", removeUsersFromGroup);
  });
}

async function removeUsersFromGroup(e) {
  try {
    e.preventDefault();
    let userId = e.target.id;

    let response = await axios.delete(
      `http://localhost:3000/admin/delete-group-user/${groupId}/${userId}`,
      headers,
      token
    );
    e.target.parentElement.remove()
   // e.target.parentElement.add()
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

function adminsOfGroup(admins) {
  const adminid = admins.map((admin) => admin.id);
  console.log(adminid);
  let ul = document.querySelectorAll("ul");
  ul.forEach((ulele) => {
    let flag = true;
    let btn = document.createElement("button");
    for (let i = 0; i < adminid.length; i++) {
      if (ulele.id == adminid[i]) {
        btn.classList.add("removeAdmin"); // Use classList.add to add a class
        btn.id = "addbtn1";
        btn.textContent = "Remove Admin";
        const buttonClone = btn.cloneNode(true);
        ulele.appendChild(buttonClone);
        flag = false;
        break;
      }
    }
    if (flag) {
      btn.classList.add("addAdmin"); // Use classList.add to add a class
      btn.id = "addbtn2";
      btn.textContent = "Make Admin";
      const buttonClone2 = btn.cloneNode(true);
      ulele.appendChild(buttonClone2);
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

    let data = result.data.data;
    for (let i = 0; i < data.length; i++) {
      let name = data[i].name;
      let id = data[i].id;
      console.log("name.....");
      const p2 = document.getElementById("p2");

      p2.innerHTML += `<ul><input type="checkbox" class="box" id="userid" value="${id}">${name}</ul>`;
    }
    const p2 = document.getElementById("p2");
    let btn = document.createElement("button");
    btn.class = "addbtn1";
    btn.id = "addbtn";
    btn.textContent = "Add Users";

    p2.appendChild(btn);

    btn.addEventListener("click", updateAddedUsersByAdmin);
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
    console.log(userId);

    let obj = { userId };

    let response = await axios.post(
      `http://localhost:3000/admin/add-new-users/${groupId}`,
      obj,
      headers,
      token
    );

    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

// console.log(data.name)
