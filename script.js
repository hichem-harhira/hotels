// -------------- INSCRIPTION SECTION START --------------

function signup() {
    test = true;

    // Retrieve data from inputs
    const firstName = document.getElementById("Firstname").value;
    const lastName = document.getElementById("Lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("Passeword").value;
    const confirmPassword = document.getElementById("ConfirmPasseword").value;
    const telNumber = document.getElementById("telNumber").value;
   

    // Validate inputs
    validateFirstName(firstName);
    validateLastName(lastName);
    validateEmailInput(email);
    validatePassword(password);
    validateConfirmPassword(password, confirmPassword);
    validateTelNumberInput(telNumber);

    // If all validations pass
    if (test) {
        console.log(firstName, lastName, email, password, confirmPassword, telNumber);

        // Store data in localStorage
        const idUser = JSON.parse(localStorage.getItem("idUser") || "10");

        const user = {
            id: idUser,
            firstName: firstName,
            lastName: lastName,
            email: email,
            pwd: password,
            tel: telNumber,
            role: "user",
        };

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        users.push(user);

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("idUser", idUser + 1);

        // Redirect to login page
        location.replace("Login.html");
    }
}

// Input validation functions
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

// Helper functions
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.innerHTML = message;
    element.style.color = "red";
}

function clearError(elementId) {
    document.getElementById(elementId).innerHTML = "";
}

// Adding Admins
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

// -------------- INSCRIPTION SECTION END --------------

// -------------- LOGIN SECTION START --------------

function login() {
    const email = document.getElementById("email").value;
    const pwd = document.getElementById("pwd").value;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(user => user.email === email && user.pwd === pwd);

    if (foundUser) {
        clearError("loginError");
        localStorage.setItem("connectedUser", foundUser.id);

        switch (foundUser.role) {
            case "user":
                location.replace("home.html");
                break;
            case "Admin":
                location.replace("dashboard.html");
                break;
        }
    } else {
        showError("loginError", "Authentication Failed");
    }
}


function verifInput(condition, idSpan, msgError) {

    // declaration de la variable de sortie
     var test =true;
    
     if (condition) {
        document.getElementById(idSpan).innerHTML = " ";
    
    } else {
        // afficher un msg d'erreur 
    
    document.getElementById(idSpan).innerHTML = msgError;
    document.getElementById(idSpan).style.color= "red";
    test = false;
    }
    return test;
      
    }

// -------------- PRODUCT SECTION START 2 --------------

function addProduct() {

    //  recuperation des donnes :
    
var productName = document.getElementById("productName").value;
var verifProductName = verifInput(productName.length>5,"productNameError", "Product name must have a 6 minimum caraters");
console.log(verifProductName);

var price = document.getElementById("price").value;
var verifPrice = verifInput(price>0 , "priceError" , "Invalid Price");
console.log(verifPrice);


var stock = document.getElementById("stock").value;
var verifStock = verifInput(stock>0, "stockError", "Invalid Stock");
console.log(verifStock);

var img = document.getElementById("img").value;
console.log(img);

var newImg = replaceCh(img);
console.log(newImg);

var category = document.getElementById("category").value;

console.log(productName,price,stock,category);  



if (verifProductName && verifPrice && verifStock) {


    var idProduct = JSON.parse(localStorage.getItem("idProduct") || "1");
    var connectedUser = localStorage.getItem("connectedUser");
//  Declaration des objets :

var product = {
    id : idProduct,
    idUser : connectedUser,
    productName : productName,
    price : price,
    stock : stock,
    category : category,
    img : newImg
};
//  stockage :

var products = JSON.parse(localStorage.getItem("products") || "[]");
products.push(product);
localStorage.setItem("products",JSON.stringify(products));
localStorage.setItem("idProduct",idProduct+1);
location.reload();

    
}


}

function displayUsersForAdmin() {

//  recuperation des donnés : 

var users = JSON.parse(localStorage.getItem("users") || "[]");

 var usersTable = `<table class="table table-dark">
							<thead>
							  <tr>
								<th scope="col">First name</th>
								<th scope="col">Last Name</th>
								<th scope="col">Email</th>
								<th scope="col">Tel</th>
                                <th scope="col">Actions</th>
							  </tr>
							</thead>
							<tbody>`;


                             for (let i = 0; i < users.length; i++) {
                            
                                usersTable = usersTable +  `<tr>
								<th scope="row">${users[i].firstName}</th>
								<td>${users[i].lastName}</td>
								<td>${users[i].email}</td>
								<td>@${users[i].tel}</td>
							  </td>
							  <td>

                             <button type="button" class="btn btn-danger" onclick = "deleteUser(${users[i].id})" >Delete</button>
                            <button type="button" class="btn btn-warning" onclick = "editUser(${users[i].id})">Edit</button>
                              
                              </td>
                              </tr>`;

                                
                             }
                             

                             usersTable = usersTable + `</tbody>
						      </table>`;
							 						

document.getElementById("usersTable").innerHTML = usersTable;


}


function displayProductsForAdmin() {

    //  recuperation des donnés : 
    
    var products = JSON.parse(localStorage.getItem("products") || "[]");

    var idusers = JSON.parse(localStorage.getItem("users") || "[]");
    
     var usersTable = `<table class="table table-dark">
                                <thead>
                                  <tr>
                                    <th scope="col">product name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Mail</th>
                                    <th scope="col">Tel</th>
                                    <th scope="col">Actions</th>
                                  </tr>
                                </thead>
                                <tbody>`;
    
    
                                 for (let i = 0; i < products.length; i++) {
                                
                                    usersTable = usersTable +  `<tr>
                                    <th scope="row">${products[i].productName}</th>
                                    <td>${products[i].price}</td>
                                    <td>${products[i].stock}</td>
                                    <td>${products[i].category}</td>
                                    <td>@${products[i].idUser}</td>
                                   
                                  </td>
                                  <td>
    
                                 <button type="button" class="btn btn-danger">Delete</button>
                            
                                  </td>
                                  </tr>`;
    
                                
                                 }
                                 
    
                                 usersTable = usersTable + `</tbody>
                                  </table>`;
                                                         
    
    document.getElementById("productTable").innerHTML = usersTable;
    

    }
    

function displayOrderForAdmin() {

//  recuperation des donnés : 

var orders = JSON.parse(localStorage.getItem("orders") || "[]");

var products = getFromLocalStorage("products");

var users = getFromLocalStorage("users");

 var orderTable = `<table class="table table-dark">
							<thead>
							  <tr>
								<th scope="col">Product Name</th>
								<th scope="col">QTY</th>
								<th scope="col">Tel Expediteur</th>
								<th scope="col">Tel Reciever</th>
                                <th scope="col">Actions</th>
							  </tr>
							</thead>
							<tbody>`;


                             for (let i = 0; i < orders.length; i++) {
                            if (orders[i].statue == "Confirmed !") {



                              var product = searchById(products ,orders[i].idProduct);
                              var userExp = searchById(users,product.idUser);
                              var userDes = searchById(users, orders[i].idUser);





                                orderTable = orderTable +  `<tr>
								<th scope="row">${product.productName}</th>
								<td>${orders[i].qty}</td>
								<td>${userExp.tel}</td>
								<td>${userDes.tel}</td>
							  </td>
							  <td>

                             <button type="button" class="btn btn-danger" onclick = "deleteUser(${orders[i].id})" >Delete </button>
                              
                              </td>
                              </tr>`;

                            }
                                
                            
                             }
                             

                             orderTable = orderTable + `</tbody>
						      </table>`;
							 						

document.getElementById("orderTable").innerHTML = orderTable;



}

    
//  bouton sup

function deleteUser(id) {

    //  recuperation des donnes :

    var users = JSON.parse(localStorage.getItem("users") || "[]");

    //  rechercher l'utilisateur a supprimer 

    for (let i = 0; i < users.length; i++) {
       if (users[i].id == id) {
         var pos = i ;
         break;
       }
        
    }

// delete :

users.splice(pos,1);
localStorage.setItem("users",JSON.stringify(users));
location.reload();

}

//  fonction generique local storage

function getFromLocalStorage(key){

   return JSON.parse(localStorage.getItem(key) || "[]")

}


function editUser(id) {

//  recuperation des doccnes :

var users = getFromLocalStorage("users");
var user;
for (let i = 0; i < users.length; i++) {

    //  recuperer l'objet
    
    if (users[i].id == id) {
        user = users[i];
        break;
    }
    
}

var editUser = `

                        
						<h3>Edit</h3>

					<div class="row login_form" id="contactForm" novalidate="novalidate">
						<div class="col-md-12 form-group">
						<input type="tel" class="form-control" id="tel" name="name" value = "${user.tel}">
						<span id="telError"></span>
						</div>


                        <div class="col-md-12 form-group">
						<button type="button" value="submit" class="primary-btn" id="submitBtn" onclick="saveEditUser(${user.tel})">Save</button>
						</div>
                    </div>

`;

document.getElementById("editUser").innerHTML=editUser;

}

function saveEditUser(id) {   
    // Recuperer les users
    var users = getFromLocalStorage("users");
    // Recuperer new tel
    var newtel = document.getElementById("tel").value;
    if (newtel.length==8 && !isNaN(newtel)) {
        document.getElementById("telError").innerHTML = " ";
        // modification
        for (let i = 0; i < users.length; i++) {
                 if (users[i].id == id) {
               users[i].tel = newtel;
                break;           
            }
        }
        // stockage
        localStorage.setItem("users", JSON.stringify(users));
        console.log(newtel);

        
        location.reload();

    } else {

        // afficher un msg d'erreur 

    document.getElementById("telError").innerHTML = "Invalid tel";
    document.getElementById("telError").style.color= "red";

    }   
    
    }


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


function displayCart()  {

    //  recuperer :

    var products = getFromLocalStorage("products");

    var cart = "";

    for (let i = 0; i < products.length; i++) {
       
        cart = cart +  `<div class="col-lg-3 col-md-6">
        <div class="single-product">
            <img class="img-fluid" src=${products[i].img} alt="">
            <div class="product-details">
                <h6>${products[i].productName}</h6>
                <div class="price">
                    <h6>${products[i].price}</h6>
                    <h6 class="l-through"> this is shit do not buy </h6>
                </div>
                <div class="prd-bottom">

                    <a href="" class="social-info">
                        <span class="ti-bag"></span>
                        <p class="hover-text">add to bag</p>
                    </a>
                    <a href="" class="social-info">
                        <span class="lnr lnr-heart"></span>
                        <p class="hover-text">Wishlist</p>
                    </a>
                    <a href="" class="social-info">
                        <span class="lnr lnr-sync"></span>
                        <p class="hover-text">compare</p>
                    </a>
                    <a href="" class="social-info">
                        <span class="lnr lnr-move"></span>
                        <p class="hover-text">view more</p>
                    </a>
                    <div>
                        <button type="button" class="btn btn-warning" onclick="buyProduct(${products[i].id})"}>Add Product !</button>
                    </div>
                </div>
            </div>
        </div>
    </div> `
        
    }

  
                   document.getElementById("cart").innerHTML = cart;
}


function buyProduct(id){

    //  sauvgarder id dans LS :

localStorage.setItem("prToReserve",id);

location.replace("productDetails.html");

}



function displayProductDetails() {

//  recuperer key products

var products = getFromLocalStorage("products");

//  id product

var prToReserve = localStorage.getItem("prToReserve");

//  chercher l'objet :

var product = searchById(products,prToReserve);

console.log(product);

var productDetails = `
					<div class="s_product_text">
						<h3> ${product.productName}</h3>
						<h2> ${product.price}</h2>
						<ul class="list">
							<li><a class="active" href="#"><span>Category</span> : ${product.category}</a></li>
							<li><a href="#"><span>Availibility</span> :  ${product.stock}</a></li>
						</ul>
						<p>Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for
							something that can make your interior look awesome, and at the same time give you the pleasant warm feeling
							during the winter.</p>
						<div class="product_count">
							<label for="qty">Quantity:</label>
							<input type="text" name="qty" id="qty" title="Quantity:" class="input-text qty">
                            <span id="qtyError"></span>
						</div>
						<div class="card_area d-flex align-items-center">
							<button class="primary-btn" href="#" onclick = "AddToBasket(${product.id})">Add to Basket</button>
							<a class="icon_btn" href="#"><i class="lnr lnr lnr-diamond"></i></a>
							<a class="icon_btn" href="#"><i class="lnr lnr lnr-heart"></i></a>
						</div>
					</div>
`

document.getElementById("productDetails").innerHTML=productDetails;

    
}


function AddToBasket(id) {

    //  verification connected User

var connectedUser = localStorage.getItem("connectedUser");
var products = getFromLocalStorage("products");

if (connectedUser) {

var qty = document.getElementById("qty").value;
var product = searchById(products,id);

console.log(product);

if (Number(qty) > 0 && Number(qty) < Number(product.stock) ) {

    document.getElementById("qtyError").innerHTML="";

//  creation objet ID 

var idOrder = JSON.parse(localStorage.getItem("idOrder") || "1")
var order = {
    id : idOrder,
    idUser : connectedUser,
    idProduct : id,
    qty : qty,
    statue : "en attente"
}

var orders = getFromLocalStorage("orders");
orders.push(order);
localStorage.setItem("orders",JSON.stringify(orders));
localStorage.setItem("idOrder",idOrder + 1);

//  modifier le stock

for (let i = 0; i < products.length; i++) {
    if (products[i].id == id) {
        console.log(typeof(products[i].stock));
        console.log(typeof(qty));
        
      products[i].stock =Number(products[i].stock)- Number(qty);
      
        break;
    }
    location.reload();
}
localStorage.setItem("products",JSON.stringify(products));
// location.replace("myBasket.html")
} else {
document.getElementById("qtyError").innerHTML="Invalid Quantity";
document.getElementById("qtyError").style.color = "red";
}
} 
else {
    location.replace("login.html");
}
  
}

function displayBasket() {

    var orders = getFromLocalStorage("orders");

    var connectedUser = localStorage.getItem("connectedUser");

    var products = getFromLocalStorage("products");



    var basket = `
                        <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Product Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                 <th scope="col">Statue</th>
                                <th scope="col">action</th>
                            </tr>
                        </thead>
                        <tbody>`

                        for (let i = 0; i < orders.length; i++) {
                            if (orders[i].idUser == connectedUser) {
                                var product = searchById(products,orders[i].idProduct)
                                basket = basket + `<tr>
                                <td>
                                    <div class="media">
                                        <div class="d-flex">
                                            <img src="img/cart.jpg" alt="">
                                        </div>
                                        <div class="media-body">
                                            <p>${product.productName}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h5>${product.price} €</h5>
                                </td>
                                <td>
                                    <div class="product_count">
                                        <h5>${orders[i].qty}</h5>
                                    </div>
                                </td>
                                <td>
                                    <h5>${orders[i].qty  * product.price} € </h5>
                                </td>
                                  <td>
                                    <h5> ${orders[i].statue} </h5>
                                </td>

                                <td>
                                    
                                </td>

                                <td> 
                                <button type="button" class="btn btn-success" onclick = "confirmOrder( ${orders[i].id})">Confirm</button>
                                    <button type="button" class="btn btn-danger" onclick = "deleteOrder(${orders[i].id})">Delete</button>
                                    </td>
                            </tr>`;


                            
                            }
                            
                        }

                            basket = basket + `<tr class="bottom_button">
                                <td>
                                    `;
                        
                    document.getElementById("basket").innerHTML = basket;
    
}


function deleteOrder(id) {

    //  recuperation des donnes :

    var orders = getFromLocalStorage("orders")

    var products = getFromLocalStorage("products");

    var order = searchById(orders,id);


    //  rechercher l'utilisateur a supprimer 

    for (let i = 0; i < orders.length; i++) {
       if (orders[i].id == id) {
         var pos = i ;
         break;
         
       }
        
    }

for (let i = 0; i < products.length; i++) {
    if (products[i].id == order.idProduct) {
        products[i].stock = products[i].stock + Number(order.qty);
        break;
    }
    
}

// delete  / modify:

orders.splice(pos,1);
localStorage.setItem("orders",JSON.stringify(orders));
localStorage.setItem("products",JSON.stringify(products));
 location.reload();

}


function confirmOrder(id) {

    // LS

    var orders = getFromLocalStorage("orders");

    // recherche ID
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id == id) {
            if (orders[i].statue == "en attente") {
                // Update the status
                orders[i].statue = "Confirmed !";
                localStorage.setItem("orders", JSON.stringify(orders));
                alert("Order has been confirmed!");
            } else {
                alert("Order already confirmed");
            }
            break;
        }
    }
    location.reload();
}

// modify
function editProfileInformation(){

var users = getFromLocalStorage("users");

var connectedUser = getFromLocalStorage("connectedUser")

console.log(connectedUser);

for (let i = 0; i < users.length; i++) {
    if (users[i].id == connectedUser ) {  
    var user = users[i]
    console.log(user);
    break;
    
    }  
}
        var myProfile =  `<div class="row login_form" id="contactForm" novalidate="novalidate">
                                        
                                    <div class="col-md-12 form-group">
                                    <h3 >My Profile</h3>
                                        <input type="text" class="form-control" id="Firstname" name="name" value = "${user.firstName}">
                                    <span id="firstNameError"></span>
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <input type="text" class="form-control" id="Lastname" name="name" value ="${user.lastName}">
                                    <span id="lastNameError"></span>
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <input type="email" class="form-control" id="email" name="name" value ="${user.email}">
                                        <span id="emailError"></span>
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <input type="password" class="form-control" id="Passeword" name="name" value ="${user.pwd}">
                                    <span id="passwordError"></span>
                                    </div>

                                    <div class="col-md-12 form-group">
                                        <input type="tel" class="form-control" id="telNumber" name="name" value ="${user.tel}">
                                    <span id="telNumberError"></span>
                                    </div>

                                
                                
                                    <div class="col-md-12 form-group">
                                        <div class="container mt-5">
                                            <h1 class="text-center mb-4">Profile Picture</h1>
                                        
                                            <!-- Image Upload Section -->
                                            <div class="col-md-12 form-group">

                                                 <h4>Profile Picture</h4>
                                                 <div class="text-center">
                                                 <img id="profileImage" src="" alt="Profile Image" class="img-thumbnail" style="max-width: 150px; max-height: 150px; object-fit: cover;">
                                            </div>
                                                 <input type="file" class="form-control-file mt-3" id="imageInput" accept="image/*">
                                          </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <button type="submit" value="submit" class="primary-btn" onclick="editProfile(${user.id})">Edit</button>
                                    </div>
`;
document.getElementById("editProfile").innerHTML = myProfile;

}

function editProfile(id) {


var users = getFromLocalStorage("users")

var newFirstName = document.getElementById("Firstname").value;
 validateFirstName(newFirstName);
var newLastName = document.getElementById("Lastname").value;
 validateLastName(newLastName);
var newEmail = document.getElementById("email").value;
validateEmailInput(newEmail);
var newPassword = document.getElementById("Passeword").value;
 validatePassword(newPassword);
var newtel = document.getElementById("telNumber").value;
validateTelNumberInput(newtel);

if (validateFirstName && validateLastName && validateEmailInput && validatePassword && validateTelNumberInput) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            users[i].firstName = newFirstName
            users[i].lastName = newLastName
            users[i].email = newEmail
            users[i].pwd = newPassword
            users[i].tel = newtel
            break;
        }
        
    }
localStorage.setItem("users",JSON.stringify(users));
location.reload;
}

}


function salesUser(id){

var users = getFromLocalStorage("users");
var products = getFromLocalStorage("products");
var connectedUser = getFromLocalStorage("connectedUser");
var orders = getFromLocalStorage("orders");


var salesOrder = `
                                    <table class="table table-hover table-dark"> 
                                    <thead>
                                    <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">Product Nmae</th>
                                      <th scope="col">Qty</th>
                                      <th scope="col">Tel Distributor</th>
                                      <th scope="col">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>`

                                  for (let i = 0; i < users.length; i++) {
                                    for (let i = 0; i < orders.length; i++) {
                                        if (orders[i].idUser == connectedUser && orders[i].statue == "Confirmed !" ) {
                                            var commande = orders[i];
                                 
                                            var product = searchById(products,commande.idProduct);
                                            
                                            var  distributor = searchById(users,product.idUser)
                                           
                                        }
                                    }
                                }
                                
                                      salesOrder = salesOrder + ` <tr>
                                      <th scope="row">1</th>
                                      <td>${product.productName}</td>
                                      <td>${commande.qty}</td>
                                      <td>${distributor.tel}</td>
                                      <td><button type="button" class="btn btn-danger" onclick = "deleteOrder(${commande.id})" >Delete</button></td>
                                    </tr>
                                  </tbody>
                                </table>`;

                                
  document.getElementById("usertable").innerHTML = salesOrder;

}
       
function navbarSupportedContent() {

var connectedUser = localStorage.getItem("connectedUser");
var users = getFromLocalStorage("users");
var user = searchById(users,connectedUser);

var navbarSupportedContent = "";

if (connectedUser) {

    if (user.role == "user"){ 
        navbarSupportedContent = navbarSupportedContent + `

        					<ul class="nav navbar-nav menu_nav ml-auto">

							<li class="nav-item"><a class="nav-link" href="home.html">Home</a></li>
							<li class="nav-item"><a class="nav-link" href="addProduct.html">Add Product</a></li>
                            <li class="nav-item"><a class="nav-link" href="myBasket.html">My Basket</a></li>
                            <li class="nav-item"><a class="nav-link" href="myProfile.html">Welcome ${user.firstName}</a></li>
                            <li class="nav-item"><button type="button" class="btn btn-danger" onclick = "Logout()" > Logout </button></li>   
						</ul>
        `;
    }
    else{
        navbarSupportedContent = navbarSupportedContent + `

        <ul class="nav navbar-nav menu_nav ml-auto">

        <li class="nav-item"><a class="nav-link" href="home.html">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="dashboard.html">Dashboard</a></li>
        <li class="nav-item"><a class="nav-link" href="myProfile.html">Welcome ${user.firstName}</a></li>
        <li class="nav-item"><button type="button" class="btn btn-danger" onclick = "Logout()" > Logout </button></li>
        
    </ul>
`;
    }

} else {

    navbarSupportedContent = navbarSupportedContent + `
    <ul class="nav navbar-nav menu_nav ml-auto">
    <li class="nav-item"><a class="nav-link" href="home.html">Home</a></li>
    <li class="nav-item"><a class="nav-link" href="signup.html">Sign</a></li>
    <li class="nav-item"><a class="nav-link" href="login.html">Log in</a></li>
    <li class="nav-item"><a class="nav-link" href="Contact.html">Contact</a></li>
    
</ul>
`;
}
document.getElementById("navbarSupportedContent").innerHTML = navbarSupportedContent;
}

function Logout() {

// supprimer key ConnectedUser :

localStorage.removeItem("connectedUser")

location.replace("login.html")

}


function replaceCh(ch) {

    var newCH = ch.replace(/[\\/]+/g, '/');
    var path = newCH.replace("fakepath","/Users/CP9-Hich/Desktop/DEV/FSJS/karma/img")
    
    return path;
    
    
    }


function searchbycategory(event) {

var code = event.keyCode;
console.log(code);

if (code == 13 ) {
    
//  recuperer la category

var categorySearch = document.getElementById("search_input").value;
console.log(categorySearch);

// sauvgarder la acategory dans LS
localStorage.setItem("categorySearch",categorySearch)

// NAVIGATION VER LA PAGE SEARCH 
location.replace("search.html");

}

}



function displaySearch() {

var products = getFromLocalStorage("products");
var categorySearch = localStorage.getItem("categorySearch");
var cart = "";

for (let i = 0; i < products.length; i++) {
    if (products[i].category == categorySearch ) {
       
        cart = cart +  `<div class="col-lg-3 col-md-6">
        <div class="single-product">
            <img class="img-fluid" src=${products[i].img} alt="">
            <div class="product-details">
                <h6>${products[i].productName}</h6>
                <div class="price">
                    <h6>${products[i].price}</h6>
                    <h6 class="l-through"> this is shit do not buy </h6>
                </div>
                <div class="prd-bottom">

                    <a href="" class="social-info">
                        <span class="ti-bag"></span>
                        <p class="hover-text">add to bag</p>
                    </a>
                    <a href="" class="social-info">
                        <span class="lnr lnr-heart"></span>
                        <p class="hover-text">Wishlist</p>
                    </a>
                    <a href="" class="social-info">
                        <span class="lnr lnr-sync"></span>
                        <p class="hover-text">compare</p>
                    </a>
                    <a href="" class="social-info">
                        <span class="lnr lnr-move"></span>
                        <p class="hover-text">view more</p>
                    </a>
                    <div>
                        <button type="button" class="btn btn-warning" onclick="buyProduct(${products[i].id})"}>Add Product !</button>
                    </div>
                </div>
            </div>
        </div>
    </div> `

    }
    
}

document.getElementById("cart").innerHTML= cart;

}