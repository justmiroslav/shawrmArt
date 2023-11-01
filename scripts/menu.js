const ingredients_dict = {
    lavash: [
        {name: "Classic", options: {"Humble portion": 25, "Standard portion": 35, "Generous portion": 50}},
        {name: "Sesame", options: {"Humble portion": 30, "Standard portion": 45, "Generous portion": 60}}],
    extra: [
        {name: "Fries", price: 30},
        {name: "Sausages", price: 45}],
    meat: [
        {name: "Chicken", options: {"Humble portion": 60, "Standard portion": 85, "Generous portion": 100}},
        {name: "Lamb", options: {"Humble portion": 70, "Standard portion": 90, "Generous portion": 110}},
        {name: "Veal", options: {"Humble portion": 85, "Standard portion": 100, "Generous portion": 130}}],
    sauce: [
        {name: "Garlic", price: 8},
        {name: "Tomato", price: 10},
        {name: "Cheese", price: 12}],
    veggies: [
        {name: "Cabbage", options: {"Humble portion": 10, "Standard portion": 15, "Generous portion": 20}},
        {name: "Carrots", options: {"Humble portion": 8, "Standard portion": 12, "Generous portion": 15}},
        {name: "Cucumbers", options: {"Humble portion": 10, "Standard portion": 12, "Generous portion": 15}}],
    spices: [
        {name: "Pepper", price: 5},
        {name: "Paprika", price: 5},
        {name: "Basil", price: 2}]
};

const menuItemsData = {
    order1: {title: "Meat Fest", imgSrc: "../images/menu/first.jpg"},
    order2: {title: "Avian commotion", imgSrc: "../images/menu/second.jpg"},
    order3: {title: "Explosive Experience", imgSrc: "../images/menu/third.jpg"},
    order4: {title: "Veal Passion", imgSrc: "../images/menu/fourth.jpg"},
    order5: {title: "Stomach Lambada",  imgSrc: "../images/menu/fifth.jpg"}
};

const menuIngredients = {
    order1: {lavash: "Classic", meat: "Chicken", sauce: ["Garlic"], veggies: ["Carrots", "Cucumbers"], extra: ["Sausages"]},
    order2: {lavash: "Sesame", meat: "Chicken", sauce: ["Tomato"], veggies: ["Cucumber"], spices: ["Paprika", "Basil"]},
    order3: {lavash: "Classic", meat: "Lamb", sauce: ["Garlic"], veggies: ["Cabbage"], spices: ["Pepper"]},
    order4: {lavash: "Sesame", meat: "Veal", sauce: ["Tomato"], veggies: ["Cabbage", "Carrots"], spices: ["Pepper"]},
    order5: {lavash: "Classic", meat: "Chicken", sauce: ["Cheese"], veggies: ["Cabbage", "Cucumber"]}
};

function calculateOrderPrice(variation, selectedPortion) {
    let total = 0;

    for (const ingredientCategory in variation) {
        const ingredients = Array.isArray(variation[ingredientCategory]) ? variation[ingredientCategory] : [variation[ingredientCategory]];

        for (const ingredientName of ingredients) {
            const ingredientInfo = ingredients_dict[ingredientCategory].find(item => item.name === ingredientName);

            if (ingredientInfo) {
                if (ingredientInfo.options) {
                    total += ingredientInfo.options[selectedPortion];
                } else {
                    total += ingredientInfo.price;
                }
            } else {
                return 0;
            }
        }
    }

    totalPrice = Math.round(total * 1.1);

    return totalPrice;
}

function createMenuItems() {
    const menuItemsContainer = document.querySelector(".menu-items");
    for (const key in menuIngredients) {
        const variation = menuIngredients[key];
        const presents = menuItemsData[key];
        const menuItem = document.createElement("div");
        menuItem.id = key.replace("order", "");
        menuItem.classList.add("menu-item");

        const titleContainer = document.createElement("div");
        titleContainer.classList.add("title-container");
        menuItem.appendChild(titleContainer);
        
        const variationTitle = document.createElement("h2");
        variationTitle.textContent = presents.title;
        menuItem.appendChild(variationTitle);

        const contentContainer = document.createElement("div");
        contentContainer.classList.add("content-container");
        menuItem.appendChild(contentContainer);

        const img = document.createElement("img");
        img.src = presents.imgSrc;
        contentContainer.appendChild(img);

        const variationName = `Shawarma with ${variation.meat.toLowerCase()}, ${variation.veggies.join(", ").toLowerCase()} and ${variation.sauce.join(",").toLowerCase()} sauce` +
        (variation.extra ? `, plus ${variation.extra.join(", ").toLowerCase()}` : "");
        const text = document.createElement("p");
        text.textContent = variationName;
        contentContainer.appendChild(text);

        const portionSelect = document.createElement("select");
        portionSelect.innerHTML = `
            <option value="Generous portion">Generous portion</option>
            <option value="Standard portion">Standard portion</option>
            <option value="Humble portion">Humble portion</option>
        `;
        contentContainer.appendChild(portionSelect);

        const addToBasketButton = document.createElement("button");
        addToBasketButton.textContent = "+";
        contentContainer.appendChild(addToBasketButton);

        const learnMoreButton = document.createElement("button");
        learnMoreButton.textContent = "?";
        learnMoreButton.classList.add("learn-more-button");
        contentContainer.appendChild(learnMoreButton);

        img.addEventListener("click", function() {
            const zoomElement = document.createElement("div");
            zoomElement.classList.add("zoom");
            document.body.appendChild(zoomElement);
          
            const bigImage = document.createElement("img");
            bigImage.src = img.src;
            bigImage.style.width = "80%";
            bigImage.style.height = "80%";

            zoomElement.appendChild(bigImage);

            document.addEventListener("keydown", function(e) {
                if (e.key === "Escape") {
                    zoomElement.remove();
                }
            });

            document.addEventListener("click", function(e) {
                if (!e.target.isEqualNode(img)) {
                    zoomElement.remove(); 
                    document.removeEventListener("click", this); 
                }
            });
        });

        addToBasketButton.addEventListener("click", () => {
            const selectedPortion = portionSelect.value;
            const orderPrice = calculateOrderPrice(variation, selectedPortion);
            const thisOrders = JSON.parse(localStorage.getItem("orders")) || [];
            const thisOrder = {
                menuId: menuItem.id,
                status: addToBasketButton.textContent,
                portion: selectedPortion,
                id: thisOrders.length + 1,
                price: orderPrice + " uah"
            };
            
            const existingOrder = thisOrders.find(order => order.menuId === thisOrder.menuId);
            if (!existingOrder) {
                thisOrder.status = "✓";
                thisOrders.push(thisOrder);
                addToBasketButton.textContent = "✓";
            }

            localStorage.setItem("orders", JSON.stringify(thisOrders));

            basketCount.innerText = thisOrders.length;
            basketCount.style.display = thisOrders.length > 0 ? "block" : "none";
            localStorage.setItem("basketCount", basketCount.innerText);
        });

        window.addEventListener("load", () => {
            const storage = JSON.parse(localStorage.getItem("orders")) || [];
            const existingOrder = storage.find(order => order.menuId === key.replace("order", ""));
            if (existingOrder) {
                addToBasketButton.textContent = existingOrder.status;
                portionSelect.value = existingOrder.portion;
            }
        });

        learnMoreButton.addEventListener("click", () => {
            const apiUrl = "https://api.spoonacular.com/recipes/guessNutrition";
            const apiKey = "e9bb679997a440d997fcd4774d768c3f";
            const ingredientsQuery = `title=${variation.meat}+with+${variation.veggies.join("+and+")}+and+${variation.sauce}` +
            (variation.extra ? `+plus+${variation.extra.join("+and+")}` : "");

            const fullApiUrl = `${apiUrl}?apiKey=${apiKey}&${ingredientsQuery}`;

            fetch(fullApiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const modal = document.createElement("div");
                    modal.classList.add("modal");
                    const modalContent = document.createElement("div");
                    modalContent.classList.add("modal-content");
                    modalContent.innerHTML = `
                        <span class="close">&times;</span>
                        <h2>${variationTitle.textContent}</h2>
                        <ul>
                            <li>Calories: ${data.calories.value}</li>
                            <li>Carbs: ${data.carbs.value}</li>
                            <li>Fat: ${data.fat.value}</li>
                            <li>Protein: ${data.protein.value}</li>
                        </ul>
                    `;
                    modal.appendChild(modalContent);

                    modal.querySelector(".close").addEventListener("click", () => {
                        modal.remove();
                    });

                    modal.addEventListener("click", (e) => {
                        if(e.target === modal) {
                            modal.remove();
                        }
                    });

                    document.addEventListener("keydown", (e) => {
                        if(e.key === "Escape") {
                            modal.remove();
                            document.activeElement.blur();
                        }  
                    });

                    document.body.appendChild(modal);
                })
                .catch(error => {
                    console.error("Error fetching data from the API", error);
                });
        });

        menuItemsContainer.appendChild(menuItem);
    }
}

if (typeof window !== "undefined") {
    createMenuItems(); 
}

module.exports = {
    calculateOrderPrice
};
