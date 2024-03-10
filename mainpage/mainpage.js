let submenu = document.getElementById("submenu");

function toggleMenu(){
    submenu.classList.toggle("open-menu")
}

document.querySelector("#button-create").addEventListener("click", function(){
    document.querySelector(".popup").classList.add("active");
})

document.querySelector(".popup .close-btn").addEventListener("click", function(){
    document.querySelector(".popup").classList.remove("active");
})

document.querySelector("#button-create-submit").addEventListener("click", function(){
    document.querySelector(".popup").classList.remove("active");
})

function createItem(){

    let title = document.getElementById("title").value;
    let subtitle = document.getElementById("subtitle").value;
    let titleColor = document.getElementById("title-color").value;
    let due = document.getElementById("due").value;
    let dateColor = document.getElementById("date-color").value;
    let description = document.getElementById("description").value;

    let wrapper = document.createElement("div");
    wrapper.classList.add("card");
    wrapper.classList.add("card-wrapper");
    wrapper.style.width = "18rem";
    wrapper.style.borderRadius = "20px";
    wrapper.setAttribute("id", "card-wrapper-id");

    let body = document.createElement("div")
    body.classList.add("card-body");

    let cardTitle = document.createElement("div")
    cardTitle.classList.add("card-title-background");
    cardTitle.style.backgroundColor = titleColor;


    let h5 = document.createElement("h5")
    h5.classList.add("card-title");
    h5.textContent = title;
    h5.setAttribute("id", "card-title-value");


    let h6 = document.createElement("h6")
    h6.classList.add("card-subtitle")
    h6.classList.add("mb-2")
    h6.classList.add("text-body-secondary")
    h6.textContent = subtitle;
    h6.setAttribute("id", "card-subtitle" );


    let button = document.createElement("button")
    button.classList.add("btn")
    button.classList.add("btn-success")
    button.classList.add("button-done")
    button.textContent = "Done"
    button.setAttribute("onclick", "doneItem()")
    button.setAttribute("id", "button-done");


    let h6p2 = document.createElement("h6")
    h6p2.classList.add("card-subtitle")
    h6p2.classList.add("mb-2")
    h6p2.classList.add("text-body-secondary")
    h6p2.classList.add("due-date")
    h6p2.style.backgroundColor = dateColor;
    h6p2.textContent = due
    h6p2.setAttribute("id", "card-due");


    let p = document.createElement("p")
    p.classList.add("card-text")
    p.textContent = description
    p.setAttribute("id", "card-text-value");


    wrapper.appendChild(body)
    body.append(cardTitle)
    cardTitle.append(h5)
    cardTitle.append(h6)
    body.append(h6p2)
    body.append(button)
    body.append(p)

    document.getElementById("todo-border-box").appendChild(wrapper)
}

function doneItem(){
    let title = document.getElementById("card-title-value").textContent;
    console.log(title)
    let subtitle = document.getElementById("card-subtitle").textContent;

    let titlecolor = document.getElementById("card-title-background")
    let titlecolorvalue = window.getComputedStyle(titlecolor);
    let titlecolorvalueget = titlecolorvalue.getPropertyValue("background-color");
    
    let due = document.getElementById("card-due").textContent;

    let duecolor = document.getElementById("card-due")
    let duecolorvalue = window.getComputedStyle(duecolor);
    let duecolorvalueget = duecolorvalue.getPropertyValue("background-color");
    
    let dateColor = document.getElementById("date-color").textContent;

    let description = document.getElementById("card-text-value").textContent;

    let wrapper = document.createElement("div");
    wrapper.classList.add("card");
    wrapper.classList.add("card-wrapper");
    wrapper.style.width = "18rem";
    wrapper.style.borderRadius = "20px";
    wrapper.setAttribute("id", "card-wrapper-id-delete");

    let body = document.createElement("div")
    body.classList.add("card-body");

    let cardTitle = document.createElement("div")
    cardTitle.classList.add("card-title-background");
    cardTitle.style.backgroundColor = titlecolorvalueget;


    let h5 = document.createElement("h5")
    h5.classList.add("card-title");
    h5.textContent = title;
    h5.setAttribute("id", "card-title-value");
    

    let h6 = document.createElement("h6")
    h6.classList.add("card-subtitle")
    h6.classList.add("mb-2")
    h6.classList.add("text-body-secondary")
    h6.textContent = subtitle;
    h6.setAttribute("id", "card-subtitle");


    let h6p2 = document.createElement("h6")
    h6p2.classList.add("card-subtitle")
    h6p2.classList.add("mb-2")
    h6p2.classList.add("text-body-secondary")
    h6p2.classList.add("due-date")
    h6p2.style.backgroundColor = dateColor;
    h6p2.textContent = due
    h6p2.style.backgroundColor = duecolorvalueget;
    h6p2.setAttribute("id", "card-due");

    let button = document.createElement("button")
    button.classList.add("btn")
    button.classList.add("btn-danger")
    button.classList.add("button-done")
    
    button.setAttribute("onclick", "deleteItem()")
    button.setAttribute("id", "button-delete");
    button.textContent = "Delete"

    let p = document.createElement("p")
    p.classList.add("card-text")
    p.textContent = description
    p.setAttribute("id", "card-text-value");

    wrapper.appendChild(body)
    body.append(cardTitle)
    cardTitle.append(h5)
    cardTitle.append(h6)
    body.append(h6p2)
    body.append(button)
    body.append(p)

    document.getElementById("todo-border-complete").appendChild(wrapper)
}

function deleteItem(){
    var cardwrapper = document.getElementById("card-wrapper-id-delete");
    cardwrapper.remove(); 
}