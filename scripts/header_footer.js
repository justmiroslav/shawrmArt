const phoneButton = document.getElementById("phone-number-id");
const headerImage = document.querySelector(".image-header img");
const searchButton = document.getElementById("search-header-id");
const footerButtons = document.querySelectorAll(".footer-nav button");
const basketHeader = document.getElementById("basket-header-id");
const basketCount = document.getElementById("basket-count");

searchButton.addEventListener("click", function () {
    alert("This feature is under development :)");
});

phoneButton.addEventListener("click", function() {
    var phoneNumber = "tel:+38-044-404-44-04";
    window.location.href = phoneNumber;
});

footerButtons.forEach(button => {
    button.addEventListener("click", () => {
        let text;

        if(button.textContent === "Our story") {
            text = `
            <h2><span class="brand-name">ShawrmArt:</span> Where every step is creativity and every flavour is an art</h2>
            <p>In the very beginning, when dreams and flavours were still young and fresh, ShawrmArt started her journey. 
            She was not a name, but rather an idea, a dream, a conception and a dash of magic.</p>
            <p>The owner of ShawrmArt did not have millions at the start, was not a professional chef, and did not have much experience 
            in entrepreneurship. His name was not known to many people, and his dream began in a humble town in eastern Ukraine.</p>
            <p>However, as it happens in life, not everything went smoothly. At one point, when he had already started to raise money 
            for his own business, suddenly war broke out in the country and the owner of ShawrmArt lost everything he had. 
            His dream was shattered and he was forced to start from scratch.</p>
            <p>Selflessly believing in a better future, he travelled to Kyiv in search of new opportunities and a better life. 
            He worked in various establishments, collecting every coin and accumulating knowledge, 
            each day feeling more and more in himself the desire for something more.</p>
            <p>Gradually, he began to have positive things in his life. After a while, having saved enough money, 
            he opened his first shawarma shop. A small spot where every piece of shawarma was prepared with love and respect 
            for flavour and taste.</p>
            <p>Progress continued to move forward. The eatery, with its delicious shawarma, 
            became popular in the neighbourhood. Over time, the owner sold his small outlet, while retaining 
            the rights to the name and recipe of the shawarma. With these funds, he decided to take a bolder step.</p>
            <p>This is how ShawrmArt appeared, a unique author's restaurant in the centre of Kyiv. 
            Here the art of cooking is combined with real taste, and each dish is a true masterpiece. The restaurant has 
            become a true cult place that attracts gourmets and lovers of delicious food from all over the city.</p>
            <p>Today ShawrmArt is not just a restaurant, it is a symbol of quality and passion for cookery. 
            It is located in the centre of Kyiv, in the heart of culinary art. Here every shawarma is a work of art, 
            and every dish is a delicious creation that will surely leave an unforgettable impression on you. 
            ShawrmArt is a place where every step is creativity and where every flavour is art.</p>
            `;
        } else if(button.textContent === "Privacy policy") {
            text = `We appreciate the privacy of our clients. All personal data is stored in encrypted form 
            and is not passed on to third parties without your consent.`; 
        } else if(button.textContent === "Promotions") {
            text = `Keep an eye on our promotions at
                <span class="tiktok">
                    <img src="../images/tik_tok.png">  
                    <a href="https://tiktok.com" target="_blank">TikTok</a>
                </span>
                and
                <span class="instagram">
                    <img src="../images/instagram.jpg">
                    <a href="https://instagram.com" target="_blank">Instagram</a>
                </span>`;
            } else if(button.textContent === "Delivery and payment") {
            text = `Delivery and payment:
                <ul>
                <li>Delivery area: Kyiv and region</li>
                <li>Delivery payment: For every 10 km from our restaurant the price increases by 50 UAH</li>
                <li>Order payment: Cash or terminal, after receiving the order from the courier</li>
                </ul>
                Also, you can book a table in our establishment by the above phone number. Bon appetit!`;
        }

        const modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            ${text}
        </div>
        `;

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
    }); 
});

headerImage.addEventListener("click", function() {
    const zoomElement = document.createElement("div");
    zoomElement.classList.add("zoom");
    document.body.appendChild(zoomElement);
    
    const bigImage = document.createElement("img");
    bigImage.src = headerImage.src;
    bigImage.style.width = "80%";
    bigImage.style.height = "80%";

    zoomElement.appendChild(bigImage);

    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") {
            zoomElement.remove();
        }
    });

    document.addEventListener("click", function(e) {
        if (!e.target.isEqualNode(headerImage)) {
            zoomElement.remove(); 
            document.removeEventListener("click", this); 
        }
    });
});

basketHeader.addEventListener("click", () => {
    showBasketItems();
});

function showBasketItems() {
    const storage = JSON.parse(localStorage.getItem("orders")) || [];

    const modal = document.querySelector(".modal");
    if (modal) {
        modal.remove();
    }

    if (!storage || storage.length === 0) {
        const emptyBasketMessage = document.createElement("div");
        emptyBasketMessage.classList.add("modal");
        emptyBasketMessage.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Basket:</h2>
                <div class="basket-content">Nothing to show ╯︿╰</div>
            </div>
        `;

        emptyBasketMessage.querySelector(".close").addEventListener("click", () => {
            emptyBasketMessage.remove();
        });

        emptyBasketMessage.addEventListener("click", (e) => {
            if (e.target === emptyBasketMessage) {
                emptyBasketMessage.remove();
            }
        });

        document.addEventListener("keydown", (e) => {
            if(e.key === "Escape") {
                emptyBasketMessage.remove();
                document.activeElement.blur();
            }  
        });

        basketCount.style.display = "none";
        document.body.appendChild(emptyBasketMessage);
        return;
    }

    let totalCost = 0;
    let basketContent = "";
    storage.forEach((order, index) => {
        const price = parseFloat(order.price.replace(" uah", ""));
        basketContent += `<p>Order ${index + 1} - ${order.price}. `;
        basketContent += `<button class="pay-button" data-index="${index}">Buy</button>`;
        basketContent += `<button class="delete-button" data-index="${index}">Delete</button></p>`;
        totalCost += price;
    });
    basketContent += `<p><strong>Total price: ${totalCost} uah.</strong></p>`;

    const newModal = document.createElement("div");
    newModal.classList.add("modal");
    newModal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Basket:</h2>
            <div class="basket-content">${basketContent}</div>
        </div>
    `;

    newModal.querySelector(".close").addEventListener("click", () => {
        newModal.remove();
    });

    newModal.addEventListener("click", (e) => {
        if (e.target === newModal) {
            newModal.remove();
        }
    });

    document.addEventListener("keydown", (e) => {
        if(e.key === "Escape") {
            newModal.remove();
            document.activeElement.blur();
        }  
    });

    newModal.querySelectorAll(".pay-button").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = parseInt(e.target.getAttribute("data-index"));
            const orderPrice = parseFloat(storage[index].price.replace(" uah", ""));
            removeOrder(index);
            updateBasketCount();
            showBasketItems();
            alert(`The Order number ${index + 1} has been successfully placed. Bon appetit!`);
            totalCost -= orderPrice;
        });
    });
    
    newModal.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = parseInt(e.target.getAttribute("data-index"));
            const orderPrice = parseFloat(storage[index].price.replace(" uah", ""));
            removeOrder(index);
            updateBasketCount();
            showBasketItems();
            totalCost -= orderPrice;
        });
    });

    basketCount.style.display = "block";
    document.body.appendChild(newModal);
}

function removeOrder(index) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    if (index >= 0 && index < orders.length) {
        const menuItems = document.querySelectorAll(".menu-item");
        menuItems.forEach(menuItem => {
            const addToBasketButton = menuItem.querySelector("button");
            if (addToBasketButton && addToBasketButton.textContent === "✓" && menuItem.id === orders[index].menuId) {
                addToBasketButton.textContent = "+";
            }
        });
        orders.splice(index, 1);
        localStorage.setItem("orders", JSON.stringify(orders));
    }
}

function updateBasketCount() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    basketCount.innerText = orders.length;
    basketCount.style.display = orders.length > 0 ? "block" : "none";
    localStorage.setItem("basketCount", basketCount.innerText);
}

updateBasketCount();
