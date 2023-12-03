let todoList = [];

// HANDLE AND FORM check
const addInput = document.querySelector('#addInput');
const formLayout = document.querySelector("#addForm");

formLayout.addEventListener("submit", (e) => {
    e.preventDefault();
    if (addInput.value) {
        addTodos(addInput.value);
        addInput.value = '';
    }
})

function addTodos(addedValue) {
    const newTodos = {
        id: Date.now(),
        label: addedValue,
        isDone: false,
        isEditting: false,
    }
    todoList.unshift(newTodos);
    renderTodos();
}

// HANDLE RENDER TODO-ITEMS;
function renderTodos() {
    const todoListLayout = document.querySelector('#todoList');
    todoListLayout.innerHTML = "";

    todoList.forEach((todoItem) => {
        const { id, label, isDone, isEditting } = todoItem || {};
        console.log(isEditting);

        const todoItemNode = document.createElement('li');
        todoItemNode.className = ` todo-item ${isDone ? "done" : ""}`;
        todoItemNode.id = id;

        const labelNode = document.createElement("span");
        labelNode.className = "todo-label";
        labelNode.innerText = label;

        const actionNode = document.createElement('div');
        actionNode.className = "todo-action";

        const delBtnNode = document.createElement('button');
        delBtnNode.className = "btn btn-delete";
        delBtnNode.innerText = "Delete";


        delBtnNode.addEventListener("click", (e) => {
            // console.log(id);
            deleteTodo(id);
        })

        const editBtnNode = document.createElement("button");
        editBtnNode.className = "btn btn-edit";
        editBtnNode.innerText = "Edit";
        editBtnNode.addEventListener("click", (e) => {
            e.preventDefault();
            // CALL EDIT FUNCTION
            toggleEditView(id)
        })

        const donetBtnNode = document.createElement("button");
        donetBtnNode.className = "btn btn-done";
        donetBtnNode.innerText = isDone ? "Undone" : "Done";
        donetBtnNode.addEventListener("click", (e) => {
            e.preventDefault();
            // CALL DONE FUNCTION
            updateTodoStatus(id);
        })

        const editInputNode = document.createElement("input");
        editInputNode.className = "input editInput";
        editInputNode.value = label;


        const saveBtnNode = document.createElement("button");
        saveBtnNode.className = "btn";
        saveBtnNode.innerText = "Save";

        const editFormNode = document.createElement("form");
        editFormNode.className = "form editForm";
        editFormNode.addEventListener("submit", (e) => {
            e.preventDefault();
            if (editInputNode.value) {
                updateTodoLabel(id, editInputNode.value);
                toggleEditView(id);
                editInputNode.value = "";
            }
        })

        if (isEditting) {
            editFormNode.appendChild(editInputNode);
            editFormNode.appendChild(saveBtnNode);
            todoItemNode.appendChild(editFormNode);
        } else {
            actionNode.appendChild(delBtnNode);
            !isDone && actionNode.appendChild(editBtnNode);
            actionNode.appendChild(donetBtnNode);

            todoItemNode.appendChild(labelNode);
            todoItemNode.appendChild(actionNode);
        }

        todoListLayout.appendChild(todoItemNode);
    })

}

function deleteTodo(id) {
    todoList = todoList.filter((todo) => todo.id != id);
    renderTodos();
}

function updateTodoStatus(id) {
    todoList = todoList.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    // console.log(todoList);
    renderTodos();
}

function toggleEditView(id) {
    todoList = todoList.map((todo) =>
        todo.id === id ? { ...todo, isEditting: !todo.isEditting } : todo
    );
    renderTodos();
}

function updateTodoLabel(id, editedLabel) {
    // console.log(editedLabel)
    todoList = todoList.map((todo) =>
        todo.id === id ? { ...todo, label: editedLabel } : todo
    );
    renderTodos();
}