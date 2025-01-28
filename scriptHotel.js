function signup () {

    test = true;

    // Retrieve data from inputs
var firstName = document.getElementById("Firstname").value;
var lastName = document.getElementById("Lastname").value;
var email = document.getElementById("email").value;
var password = document.getElementById("Passeword").value;
var confirmPassword = document.getElementById("ConfirmPasseword").value;
var telNumber = document.getElementById("telNumber").value;
var category = document.getElementById("category").value;
var adresse = document.getElementById("adresse").value;


    // Validate inputs
    validateFirstName(firstName);
    validateLastName(lastName);
    validateEmailInput(email);
    validatePassword(password);
    validateConfirmPassword(password, confirmPassword);
    validateTelNumberInput(telNumber);
    validateAddress(adresse);

//  Local Storage :

    if (test) {
        console.log(firstName, lastName, email, password, confirmPassword, telNumber,category,adresse);

        // Store data in localStorage
        const idUser = JSON.parse(localStorage.getItem("idUser") || "10");

        const user = {
            id: idUser,
            firstName: firstName,
            lastName: lastName,
            email: email,
            pwd: password,
            tel: telNumber,
            adresse : adresse,
            role: category,
            statue : "wait",
        };

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        users.push(user);

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("idUser", idUser + 1);

        // Redirect to login page
        location.replace("Login.html");
    }
}

//  function for tests
function validateFirstName(firstName) {
    if (firstName.length >= 5) {
        clearError("firstNameError");
    } else {
        showError("firstNameError", "First name must have at least 5 characters");
        test = false;
    }
}

function validateLastName(lastName) {
    if (lastName.length >= 3) {
        clearError("lastNameError");
    } else {
        showError("lastNameError", "Last name must have at least 3 characters");
        test = false;
    }
}

function validateEmailInput(email) {
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(email)) {
        clearError("emailError");
    } else {
        showError("emailError", "Invalid email");
        test = false;
    }
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    if (passwordRegex.test(password)) {
        clearError("passwordError");
    } else {
        showError("passwordError", "Invalid password");
        test = false;
    }
}

function validateConfirmPassword(password, confirmPassword) {
    if (password === confirmPassword) {
        clearError("confirmPasswordError");
    } else {
        showError("confirmPasswordError", "Passwords do not match");
        test = false;
    }
}

function validateTelNumberInput(telNumber) {
    const telRegex = /^\d{8}$/;
    if (telRegex.test(telNumber)) {
        clearError("telNumberError");
    } else {
        showError("telNumberError", "Invalid telephone number");
        test = false;
    }
}

function validateAddress(adresse) {
    if (adresse === "") {
       showError("adresseError", "Adresse must be filled")
        test = false;
    } else {
       clearError("adresseError")
    }
  
}


// Helper functions
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.innerHTML = message;
    element.style.color = "red";
}

function clearError(elementId) {
    document.getElementById(elementId).innerHTML = "";
}


//  get element from LocalStorage :

function getFromLocalStorage(key){

    return JSON.parse(localStorage.getItem(key) || "[]")
 
 }


//  search By id
function searchById(key,id) {

    var obj ;
    
    for (let i = 0; i < key.length; i++) {
        if (key[i].id == id) {
            obj = key[i];
            break;
        }
        
    }
    return  obj;
    }



 function addAdmin() {
        const adminUsers = [
            { id: "1", firstName: "Admin1", lastName: "Admin1", email: "Admin@gmail.com", pwd: "Admin1@admin123", tel: "98774526", role: "Admin" },
            { id: "2", firstName: "Admin2", lastName: "Admin2", email: "Admin@gmail.com", pwd: "Admin2@admin123", tel: "29700332", role: "Admin" },
            { id: "3", firstName: "Admin3", lastName: "Admin3", email: "Admin@gmail.com", pwd: "Admin3@admin123", tel: "29700369", role: "Admin" },
        ];
    
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        users.push(...adminUsers);
    
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("adminAdded", true);
    }
    
    function login() {
        const email = document.getElementById("email").value;
        const pwd = document.getElementById("pwd").value;
    
        // Fetch users from localStorage
        const users = JSON.parse(localStorage.getItem("users") || "[]");
    
        // Find the user matching email and password
        const foundUser = users.find(user => user.email === email && user.pwd === pwd);
    
        if (foundUser) {
            // Clear previous error messages
            clearError("loginError");
    
            // Additional validation for the "Owner" role
            if (foundUser.role === "Owner" && foundUser.statue !== "Confirmed") {
                // Owner not yet accepted
                showError("loginError", "Your account has not been confirmed yet.");
                return;
            }
    
            // Save the connected user ID in localStorage
            localStorage.setItem("connectedUser", foundUser.id);
    
            // Redirect based on the user's role
            switch (foundUser.role) {
                case "Guest":
                    location.replace("./home.html");
                    break;
                case "Owner":
                    location.replace("./home.html");
                    break;
                case "Admin":
                    location.replace("./home.html");
                    break;
                default:
                    showError("loginError", "Invalid user role.");
            }
        } else {
            // If no user matches the credentials, show an error
            showError("loginError", "Incorrect email or password.");
        }
    }
    
// add admin
function navbarSupportedContent() {

    var connectedUser = localStorage.getItem("connectedUser");
    var users = getFromLocalStorage("users");
    var user = searchById(users, connectedUser);

    var navbarSupportedContent = "";

    if (connectedUser) {

        if (user.role == "Guest") {
            navbarSupportedContent = navbarSupportedContent + `

                                <nav class="mainmenu">
                                <ul>
                                   
                                    <li><a href="./home.html">Home</a></li>
                                    <li><a href="./roomsPalace.html">Rooms</a></li>
                                    <li><a href="./sign.html">Check Reserved </a></li>          
                                    <li><a href="./blog.html">News</a></li>
                                    <li><a href="./contact.html">Contact</a></li>
                                    <li class="nav-item"><button type="button" class="btn btn-danger" onclick="Logout()"> Logout </button></li> 
                                </ul>
                            </nav>
            `;
        } else if (user.role == "Owner") {
            navbarSupportedContent = navbarSupportedContent + `
    
                                <nav class="mainmenu">
                                <ul>
                                                            
                                    <li class="active"><a href="./home.html">Home</a></li>
                                    <li><a href="./mansion.html">Add Mansion/Rooms</a></li>
                                    <li><a href="./sign.html">Reserved Rooms</a></li>       
                                    <li><a href="./blog.html">News</a></li>
                                    <li><a href="./contact.html">Contact</a></li>
                                    <li class="nav-item"><button type="button" class="btn btn-danger" onclick="Logout()"> Logout </button></li> 
                                </ul>
                            </nav>
            `;
        } else if (user.role == "Admin") {
            navbarSupportedContent = navbarSupportedContent + `
    
                                <nav class="mainmenu">
                                <ul>
                                                             
                                    <li class="active"><a href="./home.html">Home</a></li>
                                    <li><a href="./dashboardPalace.html">Dashboard Palace</a></li>     
                                    <li><a href="./blog.html">News</a></li>
                                    <li><a href="./contact.html">Contact</a></li>
                                    <li class="nav-item"><button type="button" class="btn btn-danger" onclick="Logout()"> Logout </button></li> 
                                </ul>
                            </nav>
            `;
        }

    } else {

        navbarSupportedContent = navbarSupportedContent + `
                                <nav class="mainmenu">
                                <ul>
                                    
                                    <li class="active"><a href="./home.html">Home</a></li>
                                    <li><a href="./rooms.html">Rooms</a></li>
                                    <li><a href="./sign.html">Sign Up </a></li>
                                    <li><a href="./login.html">Log in</a></li>     
                                    <li><a href="./blog.html">News</a></li>
                                    <li><a href="./contact.html">Contact</a></li>
                                    <li class="nav-item"><button type="button" class="btn btn-danger" onclick="Logout()"> Logout </button></li> 
                                </ul>
                            </nav>
        `;
    }
    document.getElementById("navbarSupportedContent").innerHTML = navbarSupportedContent;
}


function AddMansion() {

    test = true;
//  call value
    var mansionName = document.getElementById("mansionName").value;
    var mansionAdresse = document.getElementById("mansionAdresse").value;
    var ville = document.getElementById("ville").value;
    var codePostal = document.getElementById("codePostal").value;
    var roomNumbers = document.getElementById("roomNumbers").value;
    var serviceInclus = document.getElementById("serviceInclus").value;

//  validate inputs

    validateMansionName(mansionName);
    validateMansionAdresse(mansionAdresse);
    validateVille(ville);
    validatecodePostal(codePostal);
    validateroomNumbers(roomNumbers);
    validateServiceInclus(serviceInclus);

//  time to log with LS

if (test) {
    console.log(mansionName,mansionAdresse,ville,codePostal,roomNumbers,serviceInclus);
    
//  CALL FOR THE CONNECTED USER ID

var connectedUser = getFromLocalStorage("connectedUser");
console.log(connectedUser);
var users = getFromLocalStorage("users")
var owner = searchById(users,connectedUser);
console.log(owner);


//  push elements in LS 

var idMansion = JSON.parse(localStorage.getItem("idMansion") || "1");

var mansion = {
    mansionId : idMansion,
    ownerId: owner.id,
    mansionName: mansionName,
    mansionAdresse: mansionAdresse,
    mansionVille : ville,
    codePostal: codePostal,
    roomNumbers: roomNumbers,
    serviceInclus : serviceInclus
   
};

mansions = getFromLocalStorage("mansions");
mansions.push(mansion);

localStorage.setItem("mansions", JSON.stringify(mansions));
localStorage.setItem("idMansion", idMansion + 1);

// Redirect to login page
location.reload();

}

}

//  function for tests for mansion
function validateMansionName(mansionName) {
    if (mansionName.length >= 6) {
        clearError("mansionNameError");
    } else {
        showError("mansionNameError", "Mansion name must be 6 letters or more");
        test = false;
    }
}

function validateMansionAdresse(mansionAdresse) {
    if (mansionAdresse) {
        clearError("mansionNameError");
    } else {
        showError("mansionAdresseError", "Mansion adresse must not be empty");
        test = false;
    }
}

function validateVille(ville) {
    if (ville) {
        clearError("mansionNameError");
    } else {
        showError("villeError", "Ville must not be empty");
        test = false;
    }
}

function validatecodePostal(codePostal) {
    if (!codePostal || !/^\d{4}$/.test(codePostal)) {
        showError("codePostalError", "Postal code must 4 numbers");
        test = false;
    } else {
        clearError("codePostalError");
    }
}

function validateroomNumbers(roomNumbers) {
    if (!roomNumbers) {
        showError("roomNumbersError", "Description must not be empty");
        test = false;
    } else if (!/^[1-5]$/.test(roomNumbers)) {
        showError("roomNumbersError", "Description must be a digit between 1 and 5");
        test = false;
    } else {
        clearError("roomNumbersError");
    }
}

function validateServiceInclus(serviceInclus) {
    if (serviceInclus) {
        clearError("serviceInclusError");
    } else {
        showError("serviceInclusError", "Services must not be empty");
        test = false;
    }
}


function rooms () {

var mansion = getFromLocalStorage("mansions");


var connectedUser = getFromLocalStorage("connectedUser");



var addroom =  `
<h2 class="text-center my-4 display-4">Add rooms to your mansion</h2>
<table class="table">
            <thead class="thead-dark">
            <tr>
                <th scope="col">Mansion Name</th>
                <th scope="col">Mansion Adresse</th>
                <th scope="col">Number of Rooms</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>`

            for (let i = 0; i < mansion.length; i++) {
                if (mansion[i].ownerId == connectedUser) {
               
                    addroom = addroom + 

                    `<tr>
                    <th scope="row">${mansion[i].mansionName}</th>
                    <td>${mansion[i].mansionAdresse}</td>
                    <td>${mansion[i].roomNumbers}</td>
                    <td><button type="button" class="btn btn-success" onclick = addRooms(${mansion[i].mansionId})>Add Room</button></td>
                  </tr>`
                  
                }  
            }
                 addroom = addroom + `
                        </tbody>
                         </table>
                                    `

    document.getElementById('v-pills-profile').innerHTML = addroom;
}


function addRooms(id) {

    window.location.href = `addRooms.html?mansionId=${id}`;

}
//  issue ID - CHATGPT
function getMansionIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("mansionId");
}



function confirmRooms(id) {
var mansionId = getMansionIdFromURL();


    test = true;

    //  call value
    
        var roomName = document.getElementById("roomName").value;
        var capacity = document.getElementById("capacity").value;
        var descriptionRoom = document.getElementById("descriptionRoom").value;
        var price = document.getElementById("price").value;
        var categoryRoom = document.getElementById("category").value;
    
    
        //  validate inputs :
    
        validateRoomName(roomName);
        validateRoomCapacity(capacity);
        validateDescriptionRoom(descriptionRoom);
        validatePriceInput(price);

if (test) {
    console.log(roomName,capacity,descriptionRoom,price,categoryRoom,mansionId);

    //  CALL FOR THE mansions 
var roomsKey = getFromLocalStorage("roomsKey");
var mansions = getFromLocalStorage("mansions");
var mansionRooms = roomsKey.filter(room => room.mansionId === mansionId);
console.log(mansionRooms);


if (mansionRooms.length >= 5) {
    alert("You can't add any more rooms to this mansion! Maximum of 5 rooms allowed.");
    return;
}

//  push elements in LS 

var idRoom = JSON.parse(localStorage.getItem("idRoom") || "1");

var room = {
    mansionId : mansionId,
    idRoom: idRoom,
    roomName: roomName,
    capacity: capacity,
    descriptionRoom: descriptionRoom,
    price : price,
    categoryRoom : categoryRoom

};

roomsKey = getFromLocalStorage("roomsKey");
roomsKey.push(room);

localStorage.setItem("roomsKey", JSON.stringify(roomsKey));
localStorage.setItem("idRoom", idRoom + 1);

// Redirect to login page
location.reload();
    
}
    

}

//  validation Function for rooms 

function validateRoomName(roomName) {
    if (roomName.length >= 5) {
        clearError("roomNameError");
    } else {
        showError("roomNameError", "Room Name must have at least 5 characters");
        test = false;
    }
}

function validateRoomCapacity(capacity) {
    if (!capacity) {
        showError("capacityError", "Capacity must not be empty");
        test = false;
    } else if (!/^[1-4]$/.test(capacity)) {
        showError("capacityError", "Capacity must be a digit between 1 and 4");
        test = false;
    } else {
        clearError("capacityError");
    }
}

function validateDescriptionRoom(descriptionRoom) {
    if (descriptionRoom.length >= 5) {
        clearError("descriptionError");
    } else {
        showError("descriptionError", "Description must not be empty");
        test = false;
    }
}

function validatePriceInput(price) {
    // Check if the price is empty
    if (!price) {
        showError("priceError", "Price must not be empty");
        return false; // Stop further validation
    }

    // Convert price to a number for validation
    const priceValue = Number(price);

    // Check if the price is a valid number
    if (isNaN(priceValue)) {
        showError("priceError", "Price must be a valid number");
        return false; // Stop further validation
    }

    // Check if the price is positive
    if (priceValue <= 0) {
        showError("priceError", "Price must be greater than 0!");
        return false; // Stop further validation
    }

    // Optional: Check if the price is within a specific range
    if (priceValue > 10000) {
        showError("priceError", "For real? The price is too high!");
        return false; // Stop further validation
    }

    // If all checks pass, clear any errors
    clearError("priceError");
    return true;
}

function dashboardMansion() {
    var mansions = getFromLocalStorage("mansions");
    var connectedUser = getFromLocalStorage("connectedUser");

    var addroom = `
    <h2 class="text-center my-4 display-4">Mansion Dashboard</h2>
    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Mansion Name</th>
                <th scope="col">Mansion Address</th>
                <th scope="col">Room Number</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>`;

    for (let i = 0; i < mansions.length; i++) {
        if (mansions[i].ownerId == connectedUser) {
            addroom += `
            <tr>
                <td>${mansions[i].mansionName}</td>
                <td>${mansions[i].mansionAdresse}</td>
                <td>${mansions[i].roomNumbers}</td>
                <td><button type="button" class="btn btn-success" onclick="modifMansion(${mansions[i].mansionId})">Modify</button>
                    <button type="button" class="btn btn-danger" onclick="deleteMansion(${mansions[i].mansionId})">Delete</button>
             </td>
                
            </tr>`;
        }
    }
    addroom += `
        </tbody>
    </table>`;

    // Update the dashboard container
    document.getElementById('dashboardContainer').innerHTML = addroom;
}


function deleteMansion(id) {
    // Retrieve the data from the correct key
    var mansions = JSON.parse(localStorage.getItem("mansions") || "[]");

    // Find the mansion to delete
    for (let i = 0; i < mansions.length; i++) {
        if (mansions[i].mansionId == id) {
            mansions.splice(i, 1); // Remove the mansion at index i
            break;
        }
    }

    // Save the updated data back to the correct key
    localStorage.setItem("mansions", JSON.stringify(mansions));

    // Optionally reload the page
    location.reload();
}

function modifMansion(id) {
    console.log(id);
    

    var mansions = getFromLocalStorage("mansions");
    var mansion;
    for (let i = 0; i < mansions.length; i++) {

        //  recuperer l'objet
        
        if (mansions[i].mansionId == id) {
            mansion = mansions[i];
            break;
        }
    
    }
    
    var editMansion = `
    
                          <h3>Edit Mansion</h3>
        <form>
            <div class="mb-3">
                <label for="mansionName" class="form-label">Mansion Name</label>
                <input type="text" class="form-control" id="newmansionName" value="${mansion.mansionName}">
                <span id="mansionNameError" class="text-danger"></span>
            </div>
            <div class="mb-3">
                <label for="mansionAdresse" class="form-label">Address</label>
                <input type="text" class="form-control" id="newmansionAdresse" value="${mansion.mansionAdresse}">
                <span id="mansionAdresseError" class="text-danger"></span>
            </div>
            <div class="mb-3">
                <label for="ville" class="form-label">City</label>
                <input type="text" class="form-control" id="newville" value="${mansion.mansionVille}">
                <span id="villeError" class="text-danger"></span>
            </div>
            <div class="mb-3">
                <label for="codePostal" class="form-label">Postal Code</label>
                <input type="text" class="form-control" id="newcodePostal" value="${mansion.codePostal}">
                <span id="codePostalError" class="text-danger"></span>
            </div>
            <div class="mb-3">
                <label for="roomNumbers" class="form-label">Number of Rooms</label>
                <input type="text" class="form-control" id="newroomNumbers" value="${mansion.roomNumbers}">
                <span id="roomNumbersError" class="text-danger"></span>
            </div>
            <div class="mb-3">
                <label for="serviceInclus" class="form-label">Included Services</label>
                <input type="text" class="form-control" id="newserviceInclus" value="${mansion.serviceInclus}">
                <span id="serviceInclusError" class="text-danger"></span>
            </div>
            <button type="button" class="btn btn-success" onclick="saveMansion(${mansion.mansionId})">Save</button>
        </form>
    
    `;
    
    document.getElementById("editMansion").innerHTML=editMansion;


    }

function saveMansion(id) {

    console.log("Mansion ID to Save:", id);

    var mansions = getFromLocalStorage("mansions");

    // Updated IDs
    var newMansionNmae = document.getElementById("newmansionName").value;
    var newmansionAdresse = document.getElementById("newmansionAdresse").value;
    var newVille = document.getElementById("newville").value;
    var newCodePostal = document.getElementById("newcodePostal").value;
    var newroomNumber = document.getElementById("newroomNumbers").value;
    var newserviceInclus = document.getElementById("newserviceInclus").value;

    console.log("Input values before validation:");
    console.log({
        newMansionNmae,
        newmansionAdresse,
        newVille,
        newCodePostal,
        newroomNumber,
        newserviceInclus,
    });

    let test = true; // Reset test to true before running validations

    // Validate each input and log the result

    const isMansionNameValid = validateMansionName(newMansionNmae);
    const isMansionAdresseValid = validateMansionAdresse(newmansionAdresse);
    const isVilleValid = validateVille(newVille);
    const isCodePostalValid = validatecodePostal(newCodePostal);
    const isRoomNumberValid = validateroomNumbers(newroomNumber);
    const isServiceInclusValid = validateServiceInclus(newserviceInclus);


    // Check if all validations passed
    if (test) {

        for (let i = 0; i < mansions.length; i++) {
            if (mansions[i].mansionId == id) {
                console.log("Updating Mansion:", mansions[i]);

                mansions[i].mansionName = newMansionNmae;
                mansions[i].mansionAdresse = newmansionAdresse;
                mansions[i].mansionVille = newVille;
                mansions[i].codePostal = newCodePostal;
                mansions[i].roomNumbers = newroomNumber;
                mansions[i].serviceInclus = newserviceInclus;

               
                break;
            }
        }

        localStorage.setItem("mansions", JSON.stringify(mansions));
       

        location.reload();
    } else {
        console.log("Validation Failed");
    }
}

function dashboardRooms() {
    var mansions = getFromLocalStorage("mansions");
    var connectedUser = getFromLocalStorage("connectedUser");
    var roomsKey = getFromLocalStorage("roomsKey");

    var addroom = `
    <h2 class="text-center my-4 display-4">Rooms Dashboard</h2>
    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Room Name</th>
                <th scope="col">Room Capacity</th>
                <th scope="col">Price</th>
                <th scope="col" class="text-center">Actions</th>
            </tr>
        </thead>
        <tbody>`;

    for (let i = 0; i < roomsKey.length; i++) {
        var mansion = mansions.find(m => m.mansionId == roomsKey[i].mansionId);
        if (mansion && mansion.ownerId == connectedUser) {
            addroom += `
            <tr>
                <td>${roomsKey[i].roomName}</td>
                <td>${roomsKey[i].capacity}</td>
                <td>${roomsKey[i].price}</td>
                <td class="text-center">
                    <button type="button" class="btn btn-success" onclick="addRooms(${roomsKey[i].idRoom })">Modify</button>
                    <button type="button" class="btn btn-danger" onclick="deleteRoom(${roomsKey[i].idRoom })">Delete</button>
                </td>
            </tr>`;
        }
    }
    addroom += `
        </tbody>
    </table>`;

    // Update the dashboard container
    document.getElementById('dashboardContainer').innerHTML = addroom;
}

function deleteRoom(id) {
    console.log(id);
    
    // Retrieve the data from the correct key
    var roomsKey = getFromLocalStorage("roomsKey");

    // Check if roomsKey is null or empty
    if (!roomsKey || roomsKey.length === 0) {
        console.error("No rooms found in localStorage to delete.");
        alert("No rooms available to delete.");
        return; // Stop execution
    }

    // Find the room to delete
    for (let i = 0; i < roomsKey.length; i++) {
        if (roomsKey[i].idRoom == id) {
            roomsKey.splice(i, 1); // Remove the room at index i
            break;
        }
    }

    // Save the updated data back to the correct key
    localStorage.setItem("roomsKey", JSON.stringify(roomsKey));

    // Reload the page or refresh the dashboard
    // location.reload();
}



function ownersDashboard() {
    var users = getFromLocalStorage("users");

    var owners = `
    <h2 class="text-center my-4 display-4">Owners Table</h2>
    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Owner Name</th>
                <th scope="col">Owner Email</th>
                <th scope="col">Owner Tel Number</th>
                <th scope="col" class="text-center">Actions</th>
            </tr>
        </thead>
        <tbody>`;

    for (let i = 0; i < users.length; i++) {
        if (users[i].role == "Owner" && users[i].statue == "wait") {
            owners += `
            <tr>
                <td>${users[i].firstName}</td>
                <td>${users[i].email}</td>
                <td>${users[i].tel}</td>
                <td class="text-center">
                    <button type="button" class="btn btn-success" onclick="acceptOwner(${users[i].id})">Accept</button>
                    <button type="button" class="btn btn-danger" onclick="deleteUser(${users[i].id})">Delete</button>
                </td>
            </tr>`;
        }
    }
    owners += `
        </tbody>
    </table>`;

    // Update the dashboard container
    document.getElementById('list-home').innerHTML = owners;
}

function acceptOwner(id) {

    // LS

    var users = getFromLocalStorage("users");

    // recherche ID
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            if (users[i].statue == "wait") {
                // Update the status
                users[i].statue = "Confirmed";
                localStorage.setItem("users", JSON.stringify(users));
                alert("Owner has been confirmed!");
            } else {
                alert("Owner is already confirmed");
            }
            break;
        }
    }
    location.reload();
}


function Logout() {

    // supprimer key ConnectedUser :
    
    localStorage.removeItem("connectedUser")
    
    location.replace("login.html")
    
}


function userDashboard() {

        var users = getFromLocalStorage("users");

    
        var userslist = `
        <h2 class="text-center my-4 display-4">Users Table</h2>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col"> Email</th>
                    <th scope="col">Tel Number</th>
                    <th scope="col" class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>`;
    
        for (let i = 0; i < users.length; i++) {
            if (users[i].role !== 'Admin') {
                userslist += `
                <tr>
                    <td>${users[i].firstName}</td>
                    <td>${users[i].email}</td>
                    <td>${users[i].tel}</td>
                    <td class="text-center">
                        <button type="button" class="btn btn-danger" onclick="deleteUser(${users[i].id})">Delete</button>
                    </td>
                </tr>`;
            }     
        }
        userslist += `
            </tbody>
        </table>`;
        // Update the dashboard container
        document.getElementById('list-profile').innerHTML = userslist;
}



function deleteUser(id) {

 // Retrieve the data from the correct key
 var users = getFromLocalStorage("users");

 // Find the users to delete
 for (let i = 0; i < users.length; i++) {
     if (users[i].id == id) {
        users.splice(i, 1); // Remove the user at index i
         break;
     }
 }

 // Save the updated data back to the correct key
 localStorage.setItem("users", JSON.stringify(users));

 // Optionally reload the page
 location.reload();
    
}

function mansionDashboard() {
    var mansions = getFromLocalStorage("mansions");
    var users = getFromLocalStorage("users");

    var userslist = `
    <h2 class="text-center my-4 display-4">Mansions Table</h2>
    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Owner Name</th>
                <th scope="col">Nb Rooms</th>
                <th scope="col">Adresse</th>
                <th scope="col" class="text-center">Actions</th>
            </tr>
        </thead>
        <tbody>`;

    for (let i = 0; i < mansions.length; i++) {
        // Find owner by ID
        var owner = searchById(users, mansions[i].ownerId);

        // Check if owner exists and is not an Admin
        if (owner && owner.role !== "Admin") {
            userslist += `
            <tr>
                <td>${mansions[i].mansionName}</td>
                <td>${owner.firstName}</td>
                <td>${mansions[i].roomNumbers}</td>
                <td>${mansions[i].mansionAdresse}</td>
                <td class="text-center">
                    <button type="button" class="btn btn-danger" onclick="deleteUser(${mansions.id})">Delete</button>
                </td>
            </tr>`;
        } else {
            console.warn(`Owner not found for mansion: ${mansions[i].mansionName}`);
        }
    }

    userslist += `
        </tbody>
    </table>`;

    // Update the dashboard container
    document.getElementById("list-messages").innerHTML = userslist;
}

function roomsDashboard() {
    var roomsKey = getFromLocalStorage("roomsKey");
    var mansions = getFromLocalStorage("mansions");

    console.log("Rooms Data:", roomsKey);
    console.log("Mansions Data:", mansions);

    var userslist = `
    <h2 class="text-center my-4 display-4">Rooms Table</h2>
    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Room Name</th>
                <th scope="col">Mansion Name</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col" class="text-center">Actions</th>
            </tr>
        </thead>
        <tbody>`;

    for (let i = 0; i < roomsKey.length; i++) {
        // Log the mansionId of the room being processed
        console.log("Checking room:", roomsKey[i].roomName, "with mansionId:", roomsKey[i].mansionId);

        // Find the matching mansion directly - searchbyid didnt work:/
        var mansion = null;
        for (let j = 0; j < mansions.length; j++) {
            if (mansions[j].mansionId == roomsKey[i].mansionId) {
                mansion = mansions[j];
                break;
            }
        }

        if (mansion) {
            // Mansion found; add room details to the table
            userslist += `
            <tr>
                <td>${roomsKey[i].roomName}</td>
                <td>${mansion.mansionName}</td>
                <td>${roomsKey[i].categoryRoom}</td>
                <td>${roomsKey[i].price}</td>
                <td class="text-center">
                    <button type="button" class="btn btn-danger" onclick="deleteUser(${roomsKey[i].idRoom})">Delete</button>
                </td>
            </tr>`;
        } else {
            // Log a warning if a mansion is not found
            console.warn(`Mansion not found for room: ${roomsKey[i].roomName} (Mansion ID: ${roomsKey[i].mansionId})`);
        }
    }

    userslist += `
        </tbody>
    </table>`;

    // Update the dashboard container
    document.getElementById('list-settings').innerHTML = userslist;
}


function roomsPalace() {

//  reuperer 

var rooms = getFromLocalStorage("roomsKey");
var mansions = getFromLocalStorage("mansions")

var cart = "";

for (let i = 0; i < rooms.length; i++) {

    for (let j = 0; j < mansions.length; j++) {

        if (mansions[j].mansionId == rooms[i].mansionId) {
            mansion = mansions[j];
            break;
        }
        
    }
if (mansion) {
    
    cart = cart + `
<div class="col-lg-4 col-md-6">
    <div class="room-item">
        <img src="img/room/room-1.jpg" alt="">
        <div class="ri-text">
            <h4>${rooms[i].roomName}</h4>
            <h3>${rooms[i].price}<span>/Pernight</span></h3>
            <table>
                <tbody>
                    <tr>
                        <td class="r-o">Capcity:</td>
                        <td>${rooms[i].capacity}</td>
                    </tr>
                    <tr>
                        <td class="r-o">Category:</td>
                        <td>${rooms[i].categoryRoom}</td>
                    </tr>
                    <tr>
                        <td class="r-o">Mansion :</td>
                        <td>${mansion.mansionName}</td>
                    </tr>
                    <tr>
                        <td class="r-o">Mansion Adresse:</td>
                        <td>${mansion.mansionAdresse}</td>
                    </tr>
                    <tr>
                        <td class="r-o">Services:</td>
                        <td>${mansion.serviceInclus}</td>
                    </tr>
                </tbody>
            </table>
            <button type="button" class="btn btn-warning" onclick="reserveRoom(${rooms[i].idRoom})"}> Reserve ! </button>
        </div>
    </div>
</div>
`
}
console.log(rooms[i].id);
}

document.getElementById("roomList").innerHTML = cart;

}



function reserveRoom(id) {

console.log(id);

location.href ="reservingRoom.html"


}



