let todoItemsContainer = document.getElementById("todoItemsContainer");
let addtodobutton=document.getElementById("addtodobutton");
let savetodobutton=document.getElementById("savetodo");
function gettodolistlocalstorage(){
  let stringifytodolist=localStorage.getItem("todolist");
  let parsetodolist=JSON.parse(stringifytodolist);
  if(parsetodolist===null){
    return [];
  }
  else{
    return parsetodolist;
  }
}
let todoList=gettodolistlocalstorage();

addtodobutton.onclick=function(){
  onAddtodo();
}

savetodobutton.onclick=function(){
  localStorage.setItem("todolist",JSON.stringify(todoList));
};

function onTodostatus(checkboxId,labelId,todoId){
  let checkboxelement=document.getElementById(checkboxId);
  console.log(checkboxelement.checked);

  let labelElement=document.getElementById(labelId);
  labelElement.classList.toggle("check");
  
  let indexoftodo=todoList.findIndex(function(eachtodo){
    let eachtodoid="todo"+eachtodo.uniq;
    if(eachtodoid===todoId){
      return true;
    }
    else{
      return false;
    }
  });
  let todoobject=todoList[indexoftodo];
  if(indexoftodo.isChecked===true){
    todoobject.isChecked=false;
  }
  else{
    todoobject.isChecked=true;
  }

}
function deletetodo(todoId){
  let todoelement=document.getElementById(todoId);
  todoItemsContainer.removeChild(todoelement);
  console.log(todoList);
  console.log(todoId); 
  let deleteindex=todoList.findIndex(function(eachtodo){
    let eachTodoId="todo"+eachtodo.uniqueNo;
    if(eachTodoId===todoId){
      return true;
    }
    else{
      return false;
    } 

  });
  todoList.splice(deleteindex,1);

}

function createAndAppendTodo(todo) {
  let checkboxId="checkbox"+todo.uniq;
  let labelId="label"+todo.uniq;
  let todoId="todo"+todo.uniq;

  let todoElement = document.createElement("li");
  todoElement.id=todoId;
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId ;
  inputElement.checked=todo.isChecked;
  inputElement.classList.add("checkbox-input");
  todoElement.appendChild(inputElement);
  inputElement.onclick=function(){
    onTodostatus(checkboxId,labelId,todoId);
  };

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.id=labelId
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
  if(todo.isChecked===true){
    labelElement.classList.add("check");
  }
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.onclick=function(){
    deletetodo(todoId);
  };
  deleteIconContainer.appendChild(deleteIcon);
}
function onAddtodo(){
  let coun=todoList.length;
  coun=coun+1;
  let userinputelement=document.getElementById("todoUserInput");
  let userinputval=userinputelement.value;
  if(userinputval===""){
    alert('Enter valid Text');
    return;
  }
  
  let newTodo={
    text:userinputval,
    uniq:coun,
    isChecked:false
  };
  todoList.push(newTodo);
  createAndAppendTodo(newTodo);
  userinputelement.value="";
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}
