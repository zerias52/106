
function sayHello(){
    console.log("Hello");
}

function init(){
    console.log("This is the initial state:");
    sayHello()
}

window.onload = init;