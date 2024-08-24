function saveTask(){
    console.log("Task Manager...");
    const title = $("#txtTitle").val();
    const description = $("#txtDescription").val();
    const color = $("#txtColor").val();
    const date = $("#txtDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();

    let taskSave = new Task(title, description, color, date, status, budget);
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

function init(){
    $("#btnSave").click(saveTask);

}

window.onload = init