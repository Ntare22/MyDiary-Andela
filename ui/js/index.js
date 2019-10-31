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

/* Redirect to Profile, & Thoughts pages */
document.getElementById("profile-btn").onclick = () => {
    location.href = "../ui/profile.html";
}



const saveEntry = () => {
    const entryList = document.getElementById("t-wrap");
    const entryHead = document.getElementById("thought-heading").value;
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    let entryItem = document.createElement("li");
    entryItem.className = "item";
    inputElement.className = "checkbox";


    if (entryHead == "" && entryNotes == "") {
        console.log("Enter Heading");
    } else {
        entryItem.innerHTML = entryHead;
        entryItem.appendChild(inputElement);
        entryList.appendChild(entryItem);

        myPopup.style.display = "none";
    }

}

/***************** Profile *****************/


/************* Login ***************/

const logIn = () => {
    console.log("We're logged in")
}



/************* Logging out of myDiary App  */

const logOut = () => {
    console.log("And we're logged out!!!!")
}