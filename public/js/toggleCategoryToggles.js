let activeCheckboxes = document.querySelectorAll("input[type='checkbox']")

// fires if any checkbox is changed
activeCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        let parent = checkbox.closest(".columns").querySelector("#toggleCategory i")
        let siblings = checkbox.closest("tbody").querySelectorAll("input[type='checkbox']")
        
        let counter = 0
        siblings.forEach(sibling => {
            counter += sibling.checked
        });
        if (counter == siblings.length) {
            parent.innerText = "check_box"
        } else {
            parent.innerText = "check_box_outline_blank"
        }
    });
});


let categoryContainers = document.querySelectorAll(".container")

// fires only once after load
categoryContainers.forEach(container => {
    let parent = container.querySelector("#toggleCategory i")
    let children = container.querySelectorAll("input[type='checkbox']")
    
    let counter = 0
    children.forEach(child => {
        counter += child.checked
    });
    if (counter == children.length) {
        parent.innerText = "check_box"
    } else {
        parent.innerText = "check_box_outline_blank"
    }
});
