const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".toDoList");
const addBtn = document.querySelector(".addBtn");

const ls = "ToDo_LS";

let ToDo_LS = [];

saveToDo = () => {
  localStorage.setItem(ls, JSON.stringify(ToDo_LS));
};

deleteToDo = (event) => {
  const btn = event.target;
  const li = btn.parentNode;
  console.log(li.id);
  toDoList.removeChild(li);

  const clearList = ToDo_LS.filter((todo) => {
    //삭제한 li의 id와 다른 리스트

    return todo.id !== parseInt(li.id);
  });
  ToDo_LS = clearList;
  saveToDo();
};

ckList = (event) => {
  const checked = event.target;
  const ckTodo = checked.parentNode.childNodes[1];
  ckTodo.classList.toggle("checked");
};

printToDo = (text) => {
  const li = document.createElement("li");
  const ck = document.createElement("input");
  ck.type = "checkbox";
  ck.addEventListener("click", ckList);
  const span = document.createElement("span");

  const deleteBtn = document.createElement("button");
  const newId = ToDo_LS.length + 1;

  deleteBtn.innerText = "X";
  deleteBtn.addEventListener("click", deleteToDo);
  span.innerText = text;

  li.appendChild(ck);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  li.id = newId;
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId,
  };

  ToDo_LS.push(toDoObj);
  saveToDo();
};

loadToDo = () => {
  const loadArray = localStorage.getItem(ls);
  if (loadArray !== null) {
    const parseToDo = JSON.parse(loadArray);
    parseToDo.forEach((list) => {
      printToDo(list.text);
    });
  }
};

submitHandle = (e) => {
  e.preventDefault();
  if (toDoInput.value === "") {
    alert("내용을 입력하세요");
  } else {
    const inpTxt = toDoInput.value;
    printToDo(inpTxt);
    toDoInput.value = "";
  }
};

init = () => {
  loadToDo();
  toDoForm.addEventListener("submit", submitHandle);
  addBtn.addEventListener("click", submitHandle);
};
init();
