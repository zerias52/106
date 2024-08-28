function saveTask(){
    console.log("Task Manager...");
    const title = $("#txtTitle").val();
    const description = $("#txtDescription").val();
    const color = $("#txtColor").val();
    const date = $("#txtDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();


    let taskSave = new Task(title, description, color, date, status, budget, );
    console.log(taskSave);

    //save to server(POST)
    $.ajax({
        type: "POST",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(taskSave),
        contentType: "application/json",
        success: function(response){
            console.log(response);
        },
        error: function(error){
            console.log(error);
        }
    });
    displayTask(taskSave);
}

//Display from server(GET)
function displayTask(task){
    let syntax = `
        <div class="task" style="border-color:${task.color}">
            <div class="info">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
            </div>
            <div class="status">
                <p>${task.status}</p>
            </div>
            <div class="date-budget">
                <p>${task.date}</p>
                <p>${task.budget}</p>
            </div>
        </div>
`;
    $("#list").append(syntax);
}

//create loadTasks function
function loadTask(){
    console.log("Hello from loadTask")

    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks",
        success: function(response){
            const tasks = JSON.parse(response);
            console.log(tasks);
            for (let task of tasks){
                if (task.name==="Brett"){
                    displayTask(task);
                }
            }
        },
        error: function(error) {
            console.log(error);
        },
    });
}

//create clearTask function
function clearTask(){
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks",
        success: function(response){
            const tasks = JSON.parse(response);
            console.log(tasks);
            for (let task of tasks){
                if (task.name==="Brett"){
                    deleteTask(task.id);
                }
            }
            $("#list .task").remove();
        },
        error: function(error) {
            console.log(error);
        },
    });
}

function deleteTask(task){
    $.ajax({
        type: "DELETE",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        success: function(response){
            console.log("Task Deleted:", response);
        },
        error: function(error) {
            console.log(error);
        },
    })
}

function init(){
    $("#btnSave").click(saveTask);
    $("#btnClear").click(clearTask);
    loadTask()

}

window.onload = init