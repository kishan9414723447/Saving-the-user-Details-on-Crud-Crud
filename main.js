let container = document.getElementById("container");
let submitItem = document.getElementById("submitBtn");

function myFunction() {
  axios
    .get(
      "https://crudcrud.com/api/f4dbe7c7f577496f9fb5ecd7648a1edc/appointmentData"
    )
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        let userName = res.data[i].Name;
        let userEmail = res.data[i].email;
        let userPhone = res.data[i].phonenumber;

        var li = document.createElement("li");
        var textNode = document.createTextNode(
          `${userName}-${userEmail}-${userPhone}`
        );
        var button = document.createElement("button");
        var deleteText = document.createTextNode("Delete");
        var span = document.createElement("span");
        var editBtn = document.createElement("button");
        var editText = document.createTextNode("EDIT");

        li.appendChild(textNode);
        button.appendChild(deleteText);
        editBtn.appendChild(editText);
        span.appendChild(li);
        span.appendChild(button);
        span.appendChild(editBtn);
        container.appendChild(span);
      }
    })
    .catch((err) => console.log(err));
}
submitItem.addEventListener("click", (e) => {
  e.preventDefault();
  let userName = document.getElementById("name").value;
  let userEmail = document.getElementById("email").value;
  let userPhone = document.getElementById("phone").value;

  let userObj = {
    Name: userName,
    email: userEmail,
    phonenumber: userPhone,
  };

  // var userObj_searlized=JSON.stringify(userObj);

  // localStorage.setItem(userEmail,userObj_searlized);
  axios
    .post(
      "https://crudcrud.com/api/f4dbe7c7f577496f9fb5ecd7648a1edc/appointmentData",
      userObj
    )
    .catch((err) => console.log(err));

  var li = document.createElement("li");
  var textNode = document.createTextNode(
    `${userName}-${userEmail}-${userPhone}`
  );
  var button = document.createElement("button");
  var deleteText = document.createTextNode("Delete");
  var span = document.createElement("span");
  var editBtn = document.createElement("button");
  var editText = document.createTextNode("EDIT");

  li.appendChild(textNode);
  button.appendChild(deleteText);
  editBtn.appendChild(editText);
  span.appendChild(li);
  span.appendChild(button);
  span.appendChild(editBtn);
  container.appendChild(span);

  button.addEventListener("click", (e) => {
    e.preventDefault();
    var parentEle = button.parentElement;
    parentEle.remove();
    var str = parentEle.firstElementChild.innerText;
    const arr = str.split("-");
    localStorage.removeItem(arr[1]);
  });

  editBtn.addEventListener("click", (e) => {
    e.preventDefault();
    var parentOfEdit = editBtn.parentElement;
    document.getElementById("name").value = userName;
    document.getElementById("email").value = userEmail;
    document.getElementById("phone").value = userPhone;
    parentOfEdit.remove();
  });
});
