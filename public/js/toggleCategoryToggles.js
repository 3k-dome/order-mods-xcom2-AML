let activeCheckboxes = document.querySelectorAll("input[type='checkbox']");

// fires if any checkbox is changed
activeCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        let parent = checkbox
            .closest(".columns")
            .querySelector("#toggleCategory i");
        let siblings = checkbox
            .closest("tbody")
            .querySelectorAll("input[type='checkbox']");

        let counter = 0;
        siblings.forEach((sibling) => {
            counter += sibling.checked;
        });
        if (counter == siblings.length) {
            parent.innerText = "check_box";
        } else {
            parent.innerText = "check_box_outline_blank";
        }
    });
});
