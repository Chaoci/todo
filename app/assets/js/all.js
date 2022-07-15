const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'))

if(todos){ //如果todos為True 則會讓每個todos去addTODO function一次
    todos.forEach(todo=>{
        addTODO(todo)
    })
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    addTODO();
});

function addTODO(todo){
    let todoText = input.value;  //取input值
    if(todo){
        todoText = todo.text; //會出現li的值
    }


    if (todoText) {
        const todoEl = document.createElement('li'); //新增li標籤
        if (todo && todo.completed){
            todoEl.classList.add('completed');
        }    
        todoEl.innerText = todoText; //寫入值在新增的標籤中
        todoEl.addEventListener('click',()=>{
            todoEl.classList.toggle('completed'); //如果點擊li則會新增completed的class效果
            updateStorage(); //reset 儲存值
        });

        todoEl.addEventListener('contextmenu',(e)=>{ //點擊滑鼠右鍵的效果
            e.preventDefault();
            todoEl.remove();
            updateStorage(); //reset 儲存值
        });

        todosUL.appendChild(todoEl); //透過appendChild才能累加li標籤內容進 ul標籤中

        input.value="";
        updateStorage(); //reset 儲存值
    }
}

function updateStorage(){  //重新整理之後資料也能夠在
    const todosEl= document.querySelectorAll('li'); //先找到li
    const todos =[]; //空陣列

    todosEl.forEach(todoEl=>{
        todos.push({
            text: todoEl.innerText,  //push li上面的資料為text
            completed: todoEl.classList.contains('completed') //li的class樣式為需要含有completed;
        });
    });

    localStorage.setItem('todos',JSON.stringify(todos)); //存在local端
}