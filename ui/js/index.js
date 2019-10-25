/***************  Adding a New Entry ****************/

/* My Popup */
const myPopup = document.getElementById("enter-thought");

/* Button to bring out Popup */
const popUpBtn = document.getElementById("new-entry");

/* The span element that closes the popup */
const closeBtn = document.getElementsByClassName("close")[0];


/* When user clicks button */
popUpBtn.onclick = () => myPopup.style.display = "block";

/* When user clicks on X or Save button */
closeBtn.onclick = () => myPopup.style.display = "none";


/* When use click anywhere outside the popup */
window.onclick = (event) => {
    if (event.target == myPopup) {
        myPopup.style.display = "none";
    }
}

document.getElementById("edit-entry").style.display = "none";
document.getElementById("delete-entry").style.display = "none";

const saveEntry = () => {
    const entryList = document.getElementById("t-wrap");
    const entryHead = document.getElementById("thought-heading").value;
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    let entryItem = document.createElement("a");
    entryItem.className = "item";
    inputElement.className = "checkbox";
    entryItem.href = "./single-entry.html"
    // const entryNotes = document.getElementById("thoughts").value;


    if (entryHead == "") {
        console.log("Enter Heading");
    } else {
        entryItem.innerHTML = entryHead;
        entryItem.appendChild(inputElement);
        entryList.appendChild(entryItem);

        document.getElementById("edit-entry").style.display = "block";
        document.getElementById("delete-entry").style.display = "block";

        myPopup.style.display = "none";
    }

}




