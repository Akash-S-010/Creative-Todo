let input = document.querySelector("#taskInput");
let btn = document.querySelector("#taskAdd");
let ul = document.querySelector("#tasksList");
let listArr = [];

let storageData = JSON.parse(localStorage.getItem("task"));
console.log(storageData);
 listArr=storageData;

const builtTask = () => {
    let inputValue = input.value;
    if (inputValue === "") {
        alert("Please enter your task");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputValue;
        ul.appendChild(li);
        listArr.push(inputValue);
        console.log(listArr);

        localStorage.setItem("task", JSON.stringify(listArr));

        let deleteBtn = document.createElement("i");
        deleteBtn.classList.add("fa-solid", "fa-trash");
        li.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", () => {
            li.style.animation = "fadeOut 0.3s ease-in-out";
            li.addEventListener("animationend", () => {
                listArr = listArr.filter(item => item !== inputValue);
                console.log(listArr);
                li.remove();
                localStorage.setItem("task", JSON.stringify(listArr));
            });
        });

        input.value = "";
        input.focus(); 
    }
};



input.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        builtTask()
    }
})

btn.addEventListener("click", builtTask);
