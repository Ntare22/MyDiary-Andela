/***************  Adding a New Entry ****************/

/* My Popup */
const myPopup = document.getElementById("enter-thought");

/* The span element that closes the popup */
const closeBtn = document.getElementsByClassName("close")[0];


const addEntry = () => {
    const entryBtn = document.getElementById("new-entry");
    entryBtn.onclick = () => {
        location.href = "./add-entry.html"
    }
}

const updateEntry = () => {
    const updateBtn = document.getElementById("edit-entry");
    updateBtn.onclick = () => {
        location.href = "./update-entry.html"
    }
}

const deleteEntry = () => {
    const deleteBtn = document.getElementById("delete-entry");
    deleteBtn.onclick = () => {
        location.href = "./entries.html"
    }
}


/* When user clicks on X or Save button */
closeBtn.onclick = () => myPopup.style.display = "none";


/* When use click anywhere outside the popup */
window.onclick = (event) => {
    if (event.target == myPopup) {
        myPopup.style.display = "none";
    }
}

const saveEntry = () => {
    const entryList = document.getElementById("t-wrap");
    const entryHead = document.getElementById("thought-heading").value;
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    let entryItem = document.createElement("a");
    entryItem.className = "item";
    inputElement.className = "checkbox";
    entryItem.href = "./single-entry.html"


    if (entryHead == "") {
        console.log("Enter Heading");
    } else {
        entryItem.innerHTML = entryHead;
        entryItem.appendChild(inputElement);
        entryList.appendChild(entryItem);

        myPopup.style.display = "none";
    }

}




