// Todo eleman ekleme

// Eleman seçimi
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnAddNewTask = document.querySelector('#btnAddNewTask');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');

// Eventler
eventListeners();

function eventListeners() {
    form.addEventListener('submit', addNewItem);
    btnDeleteAll.addEventListener('click', deleteAllItems);
    taskList.addEventListener('click', deleteItem);
    document.addEventListener('DOMContentLoaded', loadItems); // Load items on DOMContentLoaded
}

// Load items
function loadItems() {
    let todos = getItemsFromLS();
    todos.forEach(function (item) {
        createItem(item);
    });
}

// Local Storage'dan itemları al
function getItemsFromLS() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}

function setItemToLS(text) {
    let todos = getItemsFromLS();
    todos.push(text);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function createItem(text) {
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    // a elementi oluşturma
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    // a elementini li'ye ekleme
    li.appendChild(a);

    // li'yi ul'ye ekleme
    taskList.appendChild(li);
}

// Yeni eleman ekleme
function addNewItem(e) {
    if (input.value === '') {
        alert('Add new item');
        e.preventDefault();
        return;
    }

    // li elementi oluşturma
    createItem(input.value);

    // Local Storage'a ekleme
    setItemToLS(input.value);

    // input temizleme
    input.value = '';

    e.preventDefault();
}

// Tüm elemanları silme
function deleteAllItems(e) {
    if (confirm('Are you sure?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.removeItem('todos'); // Local Storage'dan tüm itemları sil
    }
    e.preventDefault();
}

// Eleman silme
function deleteItem(e) {
    if (e.target.className === 'fas fa-times') {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

function deleteItemFromLS(text) {
    let todos = getItemsFromLS();
    todos.forEach(function (todo, index) {
        if (todo === text) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}