let toggleVisibilities = document.querySelectorAll("#toggleVisibility");

toggleVisibilities.forEach((toggle) => {
    toggle.addEventListener("click", () => {
        let toggleIcon = toggle.querySelector("i");
        /**
         * select the parent column, see layout:
         * container -> [colum, column, column -> table]
         */
        let tableColumn = toggle
            .closest(".container")
            .querySelector("table")
            .closest(".column");
        switch (toggleIcon.innerText) {
            case "visibility_off":
                toggleIcon.innerText = "visibility";
                tableColumn.style.display = "";
                break;
            default:
                toggleIcon.innerText = "visibility_off";
                tableColumn.style.display = "none";
                break;
        }
    });
});

let toggleCategories = document.querySelectorAll("#toggleCategory");

toggleCategories.forEach((toggle) => {
    toggle.addEventListener("click", () => {
        let toggleIcon = toggle.querySelector("i");
        let tableCheckboxes = toggle
            .closest(".container")
            .querySelector("table")
            .querySelectorAll("input[type='checkbox']");
        switch (toggleIcon.innerText) {
            case "check_box":
                toggleIcon.innerText = "check_box_outline_blank";
                tableCheckboxes.forEach((checkbox) => {
                    checkbox.checked = false;
                });
                break;
            default:
                toggleIcon.innerText = "check_box";
                tableCheckboxes.forEach((checkbox) => {
                    checkbox.checked = true;
                });
                break;
        }
    });
});

let deleteCategories = document.querySelectorAll("#deleteCategory");

deleteCategories.forEach((button) => {
    button.addEventListener("click", async () => {
        await syncOrder();
        let categoryName = button
            .closest(".columns")
            .querySelector(".subtitle").innerText;
        await fetch("/del", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ categoryName }),
        });
        location.reload();
    });
});
