const mainDivs = document.querySelectorAll(".ingredient");
const orderInfo = document.getElementById("order-info");
const totalPrice = document.getElementById("total-price");
const basketInfo = document.getElementById("basket-info");
const orderButton = document.getElementById("order-button");
let selectedIngredients = [];

const ingredients = {
    lavash: [
        {image: "../images/constructor/classic_lavash.jpg", name: "Classic", options: {"Humble portion": 25, "Standard portion": 35, "Generous portion": 50}},
        {image: "../images/constructor/sesam_lavash.jpg", name: "Sesame", options: {"Humble portion": 30, "Standard portion": 45, "Generous portion": 60}}],
    extra: [
        {image: "../images/constructor/fries.jpg", name: "Fries", price: 30},
        {image: "../images/constructor/sausages.jpg", name: "Sausages", price: 45}],
    meat: [
        {image: "../images/constructor/chicken_meat.jpg", name: "Chicken", options: {"Humble portion": 60, "Standard portion": 85, "Generous portion": 100}},
        {image: "../images/constructor/lamb_meat.jpg", name: "Lamb", options: {"Humble portion": 70, "Standard portion": 90, "Generous portion": 110}},
        {image: "../images/constructor/veal_meat.jpg", name: "Veal", options: {"Humble portion": 85, "Standard portion": 100, "Generous portion": 130}}],
    sauce: [
        {image: "../images/constructor/garlic_sauce.jpg", name: "Garlic", price: 8},
        {image: "../images/constructor/tomato_sauce.jpg", name: "Tomato", price: 10},
        {image: "../images/constructor/cheese_sauce.jpg", name: "Cheese", price: 12}],
    veggies: [
        {image: "../images/constructor/cabbage.jpg", name: "Cabbage", options: {"Humble portion": 10, "Standard portion": 15, "Generous portion": 20}},
        {image: "../images/constructor/carrots.jpg", name: "Carrots", options: {"Humble portion": 8, "Standard portion": 12, "Generous portion": 15}},
        {image: "../images/constructor/cucumbers.jpg", name: "Cucumbers", options: {"Humble portion": 10, "Standard portion": 12, "Generous portion": 15}}],
    spices: [
        {image: "../images/constructor/pepper_spices.jpg", name: "Pepper", price: 5},
        {image: "../images/constructor/paprica_spices.jpg", name: "Paprika", price: 5},
        {image: "../images/constructor/basil_spices.jpg", name: "Basil", price: 2}]  
};

mainDivs.forEach(div => {
    showIngredients(div, ingredients[div.id])  
});

function showIngredients(div, ingredients) {
    ingredients.forEach(ingredient => {
        const ingredientDiv = document.createElement("div")
        ingredientDiv.classList.add("ingredient-item")
        const image = document.createElement("img");
        image.src = ingredient.image;
        ingredientDiv.appendChild(image);
        const nameLabel = document.createElement("span")
        nameLabel.innerText = ingredient.name

        ingredientDiv.appendChild(nameLabel)
        const quantitySelect = document.createElement("select");

        if (ingredient.options) {
            for(let i = 0; i < Object.keys(ingredient.options).length; i++) {
                const option = document.createElement("option")
                option.value = Object.keys(ingredient.options)[i]
                option.innerText = Object.keys(ingredient.options)[i]

                if (option.value === "Generous portion") {
                    option.selected = true;
                }
                
                quantitySelect.appendChild(option)
            }
            ingredientDiv.appendChild(quantitySelect);
        } else {
            const priceLabel = document.createElement("span");
            ingredientDiv.appendChild(priceLabel);
        }

        image.addEventListener("click", function() {
            const zoomElement = document.createElement("div");
            zoomElement.classList.add("zoom");
            document.body.appendChild(zoomElement);
          
            const bigImage = document.createElement("img");
            bigImage.src = image.src;
            bigImage.style.width = "80%";
            bigImage.style.height = "80%";

            zoomElement.appendChild(bigImage);

            document.addEventListener("keydown", function(e) {
                if (e.key === "Escape") {
                    zoomElement.remove();
                }
            });

            document.addEventListener("click", function(e) {
                if (!e.target.isEqualNode(image)) {
                    zoomElement.remove(); 
                    document.removeEventListener("click", this); 
                }
            });
        });

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "-";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", function() {
            const ingredientName = ingredient.name;
            if (!selectedIngredients.some(item => item.name === ingredientName)) {
                alert(`Ingredient ${ingredientName} is not present in the basket`);
                return;
            }
            const indexToRemove = selectedIngredients.findIndex(item => item.name === ingredientName);
            
            if (indexToRemove !== -1) {
                selectedIngredients.splice(indexToRemove, 1);
                
                const ingredientElement = basketInfo.querySelector(`[data-ingredient="${ingredientName}"]`);
                if (ingredientElement) {
                    ingredientElement.remove();
                }
            }
            updateBasketInfo();
            updateTotalPrice();
            addButton.innerText = "+";
            console.log(`Ingredient ${ingredientName} is successfully deleted`);
        });
        
        ingredientDiv.appendChild(deleteButton)

        const addButton = document.createElement("button")
        addButton.innerText = "+";
        addButton.addEventListener("click", function() {

            if (div.id === "lavash" || div.id === "meat") {
                if (selectedIngredients.some(item => item.divName === div.id)) {
                    alert(`You can pick only one ingredient from ${div.id} list`);
                    return;
                }
            }
            if (selectedIngredients.some(item => item.name === ingredient.name)) {
                alert("This ingredient is already in basket");
                return;
            }
            
            if (ingredient.options) {
                const selectedQuantity = quantitySelect.value;
                const ingredientPrice = ingredient.options[selectedQuantity];
                const newIngredient = {
                    ...ingredient,
                    price: ingredientPrice,
                    quantity: selectedQuantity,
                    divName: div.id
                };
                selectedIngredients.push(newIngredient);
            } else {
                selectedIngredients.push({
                    ...ingredient,
                    id: ingredient.id,
                    divName: div.id
                });
            }
        
            updateTotalPrice();
            updateBasketInfo();
            addButton.innerText = "✓";
            console.log(`Ingredient ${div.id} is successfully added`);
        });
        
        ingredientDiv.appendChild(addButton)

        div.querySelector(".options").appendChild(ingredientDiv)
    });
}

function updateTotalPrice() {
    let total = 0;
    selectedIngredients.forEach(ingredient => {
        if (ingredient.options) {
            total += ingredient.options[ingredient.quantity];
        } else {
            total += ingredient.price;
        }
    });

    totalPrice.innerText = `Total price: ${total} uah`;

    if (selectedIngredients.length === 0) {
        totalPrice.style.display = "none";
    } else {
        totalPrice.style.display = "block";
    }
}

function updateBasketInfo() {
    basketInfo.innerHTML = `<ul>`;
    
    if (selectedIngredients.length === 0) {
        return;
    }

    selectedIngredients.forEach(ingredient => {
        const name = ingredient.name;
        const price = ingredient.options ? ingredient.options[ingredient.quantity] : ingredient.price;

        if (ingredient.divName !== "lavash" && ingredient.divName !== "sauce") {
            if (ingredient.quantity) {
                basketInfo.innerHTML += `<li><span data-ingredient="${name}">${name} (${ingredient.quantity.split(" ")[0]}) - ${price} uah</span></li>`;
            } else {
                basketInfo.innerHTML += `<li><span data-ingredient="${name}">${name} - ${price} uah</span></li>`;
            }
        } else {
            if (ingredient.quantity) {
                basketInfo.innerHTML += `<li><span data-ingredient="${name}">${name} ${ingredient.divName} (${ingredient.quantity.split(" ")[0]}) - ${price} uah</span></li>`;
            } else {
                basketInfo.innerHTML += `<li><span data-ingredient="${name}">${name} ${ingredient.divName} - ${price} uah</span></li>`;
            }
        } 
    });

    basketInfo.innerHTML += `</ul>`;
}

orderButton.addEventListener("click", placeOrder);

document.addEventListener("keyup", function(e) {
    if (e.key === "Enter") {
        placeOrder();  
    }
});

function placeOrder() {
    if (selectedIngredients.some(ingredient => ingredient.divName === "lavash") &&
        selectedIngredients.some(ingredient => ingredient.divName === "meat") &&
        selectedIngredients.some(ingredient => ingredient.divName === "sauce") &&
        selectedIngredients.some(ingredient => ingredient.divName === "veggies")) {

        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        const newOrder = {
            id: orders.length + 1,
            price: totalPrice.innerText.split(":")[1],
        };
        orders.push(newOrder);
        localStorage.setItem("orders", JSON.stringify(orders));

        basketCount.innerText = orders.length;
        basketCount.style.display = orders.length > 0 ? "block" : "none";
        localStorage.setItem("basketCount", basketCount.innerText);
        selectedIngredients = [];
        updateTotalPrice();
        updateBasketInfo();

        mainDivs.forEach(div => {
            const addButton = div.querySelectorAll(".ingredient-item button");
            addButton.forEach(button => {
                if (button.innerText === "✓") {
                    button.innerText = "+";
                }
            });

            const quantitySelect = div.querySelectorAll(".ingredient-item select");
            quantitySelect.forEach(select => {
                select.value = "Generous portion";
            });
        });
    } else {
        alert("Minimum of one ingredient from each category (lavash, meat, sauce, veggies) must be in the order");
    }
}