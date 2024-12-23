// Inicializar el mapa y configurarlo
const map = L.map('map').setView([-32.198563, -64.584735], 14);

// Añadir la capa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Loteos y sus coordenadas
const loteos = [
  {
    nombre: "Loteo Las Chacras",
    coordenadas: [-32.198563, -64.582161],
    lotes: [
      { nombre: "Lote 1", lat: -32.198563, lon: -64.584735, precio: 20000, superficie: '500 m²' },
      { nombre: "Lote 2", lat: -32.199563, lon: -64.585735, precio: 55000, superficie: '450 m²' },
    ]
  },
  {
    nombre: "Loteo La Aldea",
    coordenadas: [-32.208563, -64.594735],
    lotes: [
      { nombre: "Lote 4", lat: -32.208563, lon: -64.594735, precio: 62000, superficie: '480 m²' },
      { nombre: "Lote 5", lat: -32.209563, lon: -64.595735, precio: 67000, superficie: '500 m²' },
    ]
  },
  {
    nombre: "Loteo Villa Amancay",
    coordenadas: [-32.218563, -64.604735],
    lotes: [
      { nombre: "Lote 35", lat: -32.218563, lon: -64.604735, precio: 70000, superficie: '550 m²' },
      { nombre: "Lote 8", lat: -32.219563, lon: -64.605735, precio: 75000, superficie: '600 m²' },
    ]
  }
];

// Función para limpiar el valor de los campos de precio y convertirlo en número
function limpiarPrecio(valor) {
  // Si el valor es vacío o no es un número válido, devolver 0
  if (!valor) return 0;
  
  // Limpiar el valor para quitar caracteres no numéricos como "$", "u$" etc.
  return parseFloat(valor.replace(/[^\d.-]/g, '')) || 0;
}

// Función para actualizar los lotes visibles según el filtro de precios
function updateLotes() {
  // Obtener los valores de los campos de precio y limpiarlos
  const minPrice = limpiarPrecio(document.getElementById('minPrice').value);
  const maxPrice = limpiarPrecio(document.getElementById('maxPrice').value);

  // Limpiar los lotes previamente mostrados
  markers.forEach(marker => map.removeLayer(marker));
  markers.length = 0;

  loteos.forEach(loteo => {
    loteo.lotes.forEach(lote => {
      // Filtrar lotes por precio
      if (lote.precio >= minPrice && lote.precio <= maxPrice) {
        // Crear marcador para el lote filtrado
        const marker = L.marker([lote.lat, lote.lon])
          .addTo(map)
          .bindPopup(`
            <b>${lote.nombre}</b><br>
            Precio: $${lote.precio}<br>
            Superficie: ${lote.superficie}<br>
            ${loteo.nombre}
          `);

        // Guardar el marcador en el array
        markers.push(marker);
      }
    });
  });
}

// Evento para el botón de búsqueda
document.getElementById('searchBtn').addEventListener('click', updateLotes);

// Array para almacenar los marcadores
const markers = [];

// Inicializar el mapa con todos los lotes visibles al principio
updateLotes();


