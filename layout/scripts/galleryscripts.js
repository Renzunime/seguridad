let currentPage = 1;
const itemsPerPage = 12;  // 3 filas de 4 imágenes
const totalItems = 19;    // Total de imágenes en la galería
let filteredItems = [];   // Almacena las imágenes filtradas

// Función para filtrar las imágenes según la letra seleccionada
function filterGallery(letter) {
    const items = document.querySelectorAll('#gallery-list li');
    filteredItems = []; // Resetear la lista de elementos filtrados

    items.forEach(item => {
        const itemLetter = item.getAttribute('data-letter').toUpperCase(); // Obtener la letra del atributo 'data-letter'
        
        if (letter === '' || itemLetter === letter.toUpperCase()) {
            item.style.display = 'inline-block'; // Mostrar si coincide con la letra
            filteredItems.push(item);
        } else {
            item.style.display = 'none'; // Ocultar si no coincide
        }
    });

    // Mostrar la primera página después de filtrar
    showPage(1);
}

// Mostrar imágenes según la página actual
function showPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Ocultar todas las imágenes
    filteredItems.forEach(item => item.style.display = 'none');

    // Mostrar las imágenes de la página actual
    for (let i = startIndex; i < endIndex; i++) {
        if (filteredItems[i]) {
            filteredItems[i].style.display = 'inline-block';
        }
    }

    // Actualizar la página actual
    currentPage = page;
    updatePagination();
}

// Función para navegar entre las páginas
function goToPage(page) {
    if (page === 'prev') {
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    } else if (page === 'next') {
        if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
            showPage(currentPage + 1);
        }
    } else {
        showPage(page);
    }
}

// Actualizar la paginación (resaltar la página actual)
function updatePagination() {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const pageLinks = document.querySelectorAll('.pagination a');

    // Limpiar la paginación
    pageLinks.forEach(link => link.classList.remove('current'));

    // Crear los botones de la paginación
    const paginationContainer = document.querySelector('.pagination ul');
    paginationContainer.innerHTML = `
        <li><a href="#" onclick="goToPage('prev')">&laquo; Previous</a></li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        paginationContainer.innerHTML += `
            <li><a href="#" onclick="goToPage(${i})">${i}</a></li>
        `;
    }

    paginationContainer.innerHTML += `
        <li><a href="#" onclick="goToPage('next')">Next &raquo;</a></li>
    `;

    // Resaltar la página actual
    const currentPageLink = paginationContainer.querySelectorAll('a')[currentPage];
    if (currentPageLink) {
        currentPageLink.classList.add('current');
    }
}

// Mostrar la primera página al cargar la página
window.onload = () => {
    filterGallery(''); // Muestra todas las imágenes por defecto
};

// Función para crear la fila de letras (solo se debe crear una vez)
function createAlphabetFilter() {
    // Verificamos si la fila del filtro ya existe
    if (document.querySelector('.alphabet-filter') && !document.querySelector('.alphabet-filter').hasChildNodes()) {
        const alphabetFilter = document.querySelector('.alphabet-filter');
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        
        // Crear los botones para cada letra
        letters.forEach(letter => {
            const button = document.createElement('button');
            button.innerHTML = letter;
            button.onclick = () => filterGallery(letter);  // Asignar la función de filtro
            alphabetFilter.appendChild(button);
        });
    }
}

// Llamamos a la función para crear el filtro al cargar la página
document.addEventListener("DOMContentLoaded", createAlphabetFilter);
