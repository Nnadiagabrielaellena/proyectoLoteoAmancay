// Crear el mapa interactivo con Leaflet
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
      { nombre: "Lote 1", lat: -32.198563, lon: -64.584735 },
      { nombre: "Lote 2", lat: -32.199563, lon: -64.585735 },
      { nombre: "Lote 3", lat: -32.200563, lon: -64.586735 }
    ]
  },
  {
    nombre: "Loteo San Fernando",
    coordenadas: [-32.208563, -64.594735],
    lotes: [
      { nombre: "Lote 4", lat: -32.208563, lon: -64.594735 },
      { nombre: "Lote 5", lat: -32.209563, lon: -64.595735 }
    ]
  },
  {
    nombre: "Loteo Los Nogales",
    coordenadas: [-32.218563, -64.604735],
    lotes: [
      { nombre: "Lote 7", lat: -32.218563, lon: -64.604735 },
      { nombre: "Lote 8", lat: -32.219563, lon: -64.605735 }
    ]
  }
];

// Agregar marcadores en el mapa para cada lote
loteos.forEach(loteo => {
  loteo.lotes.forEach(lote => {
    L.marker([lote.lat, lote.lon])
      .addTo(map)
      .bindPopup(`<b>${lote.nombre}</b><br>${loteo.nombre}`);
  });
});
