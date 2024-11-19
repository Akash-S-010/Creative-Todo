let input = document.querySelector("#taskInput");
let btn = document.querySelector("#taskAdd");
let ul = document.querySelector("#tasksList");
let notification = document.querySelector("#notification");
let listArr = [];

//------- Load tasks from localStorage on page load
const loadTasks = () => {
    let storageData = JSON.parse(localStorage.getItem("task")) || [];
    listArr = storageData; //------- Sync the listArr with the data from localStorage

    if (listArr.length === 0) {
        notification.style.display = "block";
    } else {
        notification.style.display = "none";
        listArr.forEach(task => createTaskElement(task));
    }
};

//------- Create a task element and append it to the DOM
const createTaskElement = (task) => {
    let li = document.createElement("li");
    li.textContent = task;

    let deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fa-solid", "fa-trash");
    li.appendChild(deleteBtn);

    let editBtn = document.createElement("i");
    editBtn.classList.add("fa-solid", "fa-pen-to-square");
    li.appendChild(editBtn);

    ul.appendChild(li);

    //------- Add delete functionality
    deleteBtn.addEventListener("click", () => {
        li.style.animation = "fadeOut 0.3s ease-in-out";
        li.addEventListener("animationend", () => {
            listArr = listArr.filter(item => item !== task);
            li.remove();
            localStorage.setItem("task", JSON.stringify(listArr));
            if (listArr.length === 0) {
                notification.style.display = "block";
            }
        });
    });

    //------- Add edit functionality
    editBtn.addEventListener("click", () => {
        let editValue = prompt("Edit your task:", task);
        if (editValue !== null && editValue.trim() !== "") {
            let taskIndex = listArr.indexOf(task);
            if (taskIndex !== -1) {
                listArr[taskIndex] = editValue;
                localStorage.setItem("task", JSON.stringify(listArr));
                li.firstChild.nodeValue = editValue;
            }
        }
    });
};

//------- Add a new task
const builtTask = () => {
    let inputValue = input.value.trim();
    if (inputValue === "") {
        alert("Please enter your task");
    } else {
        notification.style.display = "none";
        listArr.push(inputValue);
        localStorage.setItem("task", JSON.stringify(listArr));
        createTaskElement(inputValue);
        input.value = "";
        input.focus();
    }
};

//------- Event listeners
btn.addEventListener("click", builtTask);
input.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        builtTask();
    }
});

//------- Load tasks on page load
loadTasks();
