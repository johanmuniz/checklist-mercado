// selecionar elementos
const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItemBtn');
const shoppingList = document.getElementById('shoppingList');
const totalAmount = document.getElementById('totalAmount');

let total = 0.00; // valor total

// adiciona o item à lista quando o botão é clicado
addItemBtn.addEventListener('click', () => {
    const itemName = itemInput.value.trim();

    if (itemName) {
        addItemToList(itemName);
        itemInput.value = ''; // limpa o campo de entrada
    }
});

// função para adicionar item na lista
function addItemToList(itemName) {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    const itemText = document.createElement('span');
    itemText.classList.add('item-text');
    itemText.textContent = itemName;

    const itemActions = document.createElement('div');
    itemActions.classList.add('item-actions');

    // campo para a quantidade do item
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.classList.add('form-control', 'item-quantity-input');
    quantityInput.placeholder = 'Qtd';
    quantityInput.value = 1; // Quantidade inicial padrão

    // campo para o preço do item
    const priceInput = document.createElement('input');
    priceInput.type = 'number';
    priceInput.classList.add('form-control', 'item-price-input');
    priceInput.placeholder = 'Preço';

    // botão para marcar item como "pego"
    const markAsPegoBtn = document.createElement('button');
    markAsPegoBtn.textContent = 'Pego';
    markAsPegoBtn.classList.add('btn', 'btn-success', 'btn-sm');
    markAsPegoBtn.addEventListener('click', () => {
        const price = parseFloat(priceInput.value);
        const quantity = parseInt(quantityInput.value);
        if (price && quantity > 0) {
            markItemAsPego(listItem, price, quantity);
        } else {
            alert('Por favor, insira o preço e a quantidade válidos.');
        }
    });

    // botão para excluir o item
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'delete-btn');
    deleteBtn.addEventListener('click', () => {
        deleteItem(listItem, priceInput.value, quantityInput.value);
    });

    itemActions.appendChild(quantityInput);
    itemActions.appendChild(priceInput);
    itemActions.appendChild(markAsPegoBtn);
    itemActions.appendChild(deleteBtn);
    listItem.appendChild(itemText);
    listItem.appendChild(itemActions);

    shoppingList.appendChild(listItem);
}

// função para marcar item como "pego"
function markItemAsPego(listItem, price, quantity) {
    const totalItemPrice = price * quantity;
    total += totalItemPrice; // atualiza o total

    // atualiza a lista visualmente
    listItem.classList.add('list-group-item-success');
    listItem.querySelector('.item-actions').remove(); // remove os botões e campos de quantidade/preço

    // atualiza o total na interface
    totalAmount.textContent = total.toFixed(2);
}

// função para excluir o item da lista
function deleteItem(listItem, price, quantity) {
    const totalItemPrice = parseFloat(price) * parseInt(quantity);

    // se o item já foi pego e o preço foi definido, desconta do total
    if (listItem.classList.contains('list-group-item-success') && price && quantity > 0) {
        total -= totalItemPrice;
        totalAmount.textContent = total.toFixed(2);
    }

    // remove o item da lista
    shoppingList.removeChild(listItem);
}
