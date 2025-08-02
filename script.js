// Dados simulados
const restaurantsData = [
    { id: 1, name: "Sabor da Cozinha", rating: 4.8, image: "https://via.placeholder.com/600x400?text=Sabor+da+Cozinha" },
    { id: 2, name: "Pizzaria Italiana", rating: 4.5, image: "https://via.placeholder.com/600x400?text=Pizzaria+Italiana" },
    { id: 3, name: "Churrascaria Gaúcha", rating: 4.9, image: "https://via.placeholder.com/600x400?text=Churrascaria+Gaucha" },
];

const menuData = [
    { id: 1, name: "Salada Caesar", price: 25.00, image: "https://via.placeholder.com/60x60?text=Salada" },
    { id: 2, name: "Filé Mignon ao Molho Madeira", price: 85.00, image: "https://via.placeholder.com/60x60?text=File" },
    { id: 3, name: "Torta Holandesa", price: 30.00, image: "https://via.placeholder.com/60x60?text=Torta" }
];

// Seleciona os elementos do DOM
const homePage = document.getElementById('home-page');
const restaurantsPage = document.getElementById('restaurants-page');
const reservationPage = document.getElementById('reservation-page');
const restaurantList = document.getElementById('restaurant-list');
const reservationForm = document.getElementById('reservation-form');
const preOrderMenu = document.getElementById('pre-order-menu');
const successModal = document.getElementById('success-modal');
const modalCloseButton = successModal.querySelector('.close-button');

// Navegação
const homeLink = document.getElementById('home-link');
const restaurantsLink = document.getElementById('restaurants-link');
const searchForm = document.getElementById('search-form');

// Funções de navegação
function navigateTo(page) {
    homePage.classList.add('hidden');
    restaurantsPage.classList.add('hidden');
    reservationPage.classList.add('hidden');
    page.classList.remove('hidden');
}

// Renderiza a lista de restaurantes
function renderRestaurants() {
    restaurantList.innerHTML = '';
    restaurantsData.forEach(restaurant => {
        const card = document.createElement('div');
        card.classList.add('restaurant-card');
        card.innerHTML = `
            <img src="${restaurant.image}" alt="${restaurant.name}">
            <div class="card-content">
                <h3>${restaurant.name}</h3>
                <p>⭐ ${restaurant.rating}</p>
                <button class="reserve-button" data-restaurant-id="${restaurant.id}">Reservar</button>
            </div>
        `;
        restaurantList.appendChild(card);
    });
}

// Renderiza o menu de pré-pedido
function renderPreOrderMenu() {
    preOrderMenu.innerHTML = '';
    menuData.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>R$ ${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity">
                <button type="button" class="minus-btn">-</button>
                <span class="item-quantity" data-item-id="${item.id}">0</span>
                <button type="button" class="plus-btn">+</button>
            </div>
        `;
        preOrderMenu.appendChild(menuItem);
    });
}

// Eventos de navegação
homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(homePage);
});

restaurantsLink.addEventListener('click', (e) => {
    e.preventDefault();
    renderRestaurants();
    navigateTo(restaurantsPage);
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Lógica para filtrar restaurantes (simulada)
    renderRestaurants();
    navigateTo(restaurantsPage);
});

// Delegação de eventos para botões de reserva
restaurantList.addEventListener('click', (e) => {
    if (e.target.classList.contains('reserve-button')) {
        const restaurantId = e.target.getAttribute('data-restaurant-id');
        const restaurant = restaurantsData.find(r => r.id == restaurantId);
        
        // Atualiza a página de reserva com os dados do restaurante
        document.getElementById('res-restaurant-name').textContent = restaurant.name;
        document.getElementById('res-restaurant-image').src = restaurant.image;
        document.getElementById('res-restaurant-rating').textContent = `⭐ ${restaurant.rating}`;

        renderPreOrderMenu();
        navigateTo(reservationPage);
    }
});

// Validação e envio da reserva
reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validação básica dos campos
    const guests = document.getElementById('guests').value;
    const date = document.getElementById('reservation-date').value;
    const time = document.getElementById('reservation-time').value;

    if (!guests || !date || !time) {
        alert("Por favor, preencha todos os campos da reserva.");
        return;
    }

    // Coleta dados do pré-pedido
    const preOrderItems = [];
    document.querySelectorAll('.item-quantity').forEach(item => {
        const quantity = parseInt(item.textContent);
        if (quantity > 0) {
            const itemId = item.getAttribute('data-item-id');
            const menuItem = menuData.find(m => m.id == itemId);
            preOrderItems.push({ ...menuItem, quantity });
        }
    });

    // Simulação de envio
    console.log("Reserva e pré-pedido enviados:", {
        guests,
        date,
        time,
        preOrderItems
    });

    // Exibe o modal de sucesso
    successModal.classList.remove('hidden');
});

// Eventos para o pré-pedido (aumentar/diminuir quantidade)
preOrderMenu.addEventListener('click', (e) => {
    const quantitySpan = e.target.closest('.quantity').querySelector('.item-quantity');
    let quantity = parseInt(quantitySpan.textContent);

    if (e.target.classList.contains('plus-btn')) {
        quantity++;
    } else if (e.target.classList.contains('minus-btn') && quantity > 0) {
        quantity--;
    }
    quantitySpan.textContent = quantity;
});

// Fecha o modal
modalCloseButton.addEventListener('click', () => {
    successModal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.add('hidden');
    }
});
