"use strict";

var form = document.getElementById('form');
var input = document.getElementById('input');
var todosUL = document.getElementById('todos');
var todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
  //如果todos為True 則會讓每個todos去addTODO function一次
  todos.forEach(function (todo) {
    addTODO(todo);
  });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  addTODO();
});

function addTODO(todo) {
  var todoText = input.value; //取input值

  if (todo) {
    todoText = todo.text; //會出現li的值
  }

  if (todoText) {
    var todoEl = document.createElement('li'); //新增li標籤

    if (todo && todo.completed) {
      todoEl.classList.add('completed');
    }

    todoEl.innerText = todoText; //寫入值在新增的標籤中

    todoEl.addEventListener('click', function () {
      todoEl.classList.toggle('completed'); //如果點擊li則會新增completed的class效果

      updateStorage(); //reset 儲存值
    });
    todoEl.addEventListener('contextmenu', function (e) {
      //點擊滑鼠右鍵的效果
      e.preventDefault();
      todoEl.remove();
      updateStorage(); //reset 儲存值
    });
    todosUL.appendChild(todoEl); //透過appendChild才能累加li標籤內容進 ul標籤中

    input.value = "";
    updateStorage(); //reset 儲存值
  }
}

function updateStorage() {
  //重新整理之後資料也能夠在
  var todosEl = document.querySelectorAll('li'); //先找到li

  var todos = []; //空陣列

  todosEl.forEach(function (todoEl) {
    todos.push({
      text: todoEl.innerText,
      //push li上面的資料為text
      completed: todoEl.classList.contains('completed') //li的class樣式為需要含有completed;

    });
  });
  localStorage.setItem('todos', JSON.stringify(todos)); //存在local端
}
//# sourceMappingURL=all.js.map
