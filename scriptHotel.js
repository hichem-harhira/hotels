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
            role: category
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


function login() {
        const email = document.getElementById("email").value;
        const pwd = document.getElementById("pwd").value;
    
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const foundUser = users.find(user => user.email === email && user.pwd === pwd);
    
        if (foundUser) {
            clearError("loginError");
            localStorage.setItem("connectedUser", foundUser.id);
    
            switch (foundUser.role) {
                case "Guest":
                    location.replace("home.html");
                    break;
                case "Owner":
                    location.replace("home.html");
                case "Admin":
                    location.replace("home.html");
                    break;
            }
        } else {
            showError("loginError", "Failed");
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
                                    <li> <a> Welcome ${user.firstName}</a> </li>
                                    <li class="active"><a href="./home.html">Home</a></li>
                                    <li><a href="./rooms.html">Rooms</a></li>
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
                                    <li><a> Welcome ${user.firstName}</a></li>                           
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
                                    <li><a> Welcome ${user.firstName}</a></li>                           
                                    <li class="active"><a href="./home.html">Home</a></li>
                                    <li><a href="./rooms.html">Dashboard Palace</a></li>     
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
                                    <li> Welcome Guest </li>
                                    <li class="active"><a href="./home.html">Home</a></li>
                                    <li><a href="./rooms.html">Rooms</a></li>
                                    <li><a href="sign.html">Check Reserved </a></li>
                                    <li><a href="login.html">Log in</a></li>     
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

    var mansion = getFromLocalStorage("mansions");


    var connectedUser = getFromLocalStorage("connectedUser");
    
    
    var addroom =  `
    <h2 class="text-center my-4 display-4">Mansion Dashboard</h2>
    <table class="table">
                <thead class="thead-dark">
                <tr>
                    <th scope="col">Mansion Name</th>
                    <th scope="col">Mansion Adresse</th>
                    <th scope="col">Room Number</th>
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
                        <td><button type="button" class="btn btn-success" onclick = addRooms(${mansion[i].mansionId})>Modify</button></td>
                      </tr>`
                      
                    }  
                }
                     addroom = addroom + `
                            </tbody>
                             </table>
                                        `
    
        document.getElementById('v-pills-messages').innerHTML = addroom;
    
}

function dashboardRooms() {
    // Fetch data from local storage
    var mansions = getFromLocalStorage("mansions");
    var connectedUser = getFromLocalStorage("connectedUser");
    var roomsKey = getFromLocalStorage("roomsKey");

    console.log("Mansions:", mansions); // Log mansions
    console.log("Connected User:", connectedUser); // Log connected user
    console.log("Rooms:", roomsKey); // Log rooms

    // Start building the table HTML
    var addroom = `
        <h2 class="text-center my-4 display-4">Rooms Dashboard</h2>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Room Name</th>
                    <th scope="col">Room Capacity</th>
                    <th scope="col">Price</th>
                    <th scope="col" class="text-center" >Actions</th>
                </tr>
            </thead>
            <tbody>`;

    // Iterate through all rooms
    for (let i = 0; i < roomsKey.length; i++) {
        // Find the mansion associated with this room
        var mansion = mansions.find(m => m.mansionId == roomsKey[i].mansionId);
        // Check if the mansion is owned by the connected user
        if (mansion && mansion.ownerId == connectedUser) {   
            // Add the room to the table
            addroom += `
                <tr>
                    <th scope="row">${roomsKey[i].roomName}</th>
                    <td>${roomsKey[i].capacity}</td>
                    <td>${roomsKey[i].price}</td>
                    <td class="text-center">
                    
                    <button type="button" class="btn btn-success" onclick="addRooms()">Modify</button>
   
                    <button type="button" class="btn btn-danger" onclick="deleteRoom(${roomsKey[i].roomId})">Delete</button>
              
                    
                    </td>
                </tr>`;
        } else {   
        }
    }
    // Close the table
    addroom += `
            </tbody>
        </table>`;

    // Update the roomsdashboard div with the generated table
    document.getElementById('roomsdashboard').innerHTML = addroom;
}