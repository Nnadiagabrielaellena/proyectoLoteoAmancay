let map;  // Mapa global

// Datos de los loteos
const loteos = [
  {
    nombre: "Loteo Las Chacras",
    coordenadas: [-32.198563, -64.582161],
    lotes: [
      { nombre: "Lote 1", precio: 20000, img: "./style/img/lasChacras/IMG_4271.jpg", descripcion: "Lote ideal para construcción de vivienda unifamiliar." },
      { nombre: "Lote 2", precio: 55000, img: "./style/img/lasChacras/IMG_4273.jpg", descripcion: "Lote residencial con gran potencial de desarrollo." }
    ]
  },
  {
    nombre: "Loteo La Aldea",
    coordenadas: [-32.208563, -64.594735],
    lotes: [
      { nombre: "Lote 4", precio: 62000, img: "./style/img/villaAmancay/IMG_8447.jpg", descripcion: "Lote plano en zona residencial tranquila." },
      { nombre: "Lote 5", precio: 67000, img: "./style/img/villaAmancay/IMG_8448.jpg", descripcion: "Lote amplio, ideal para proyectos comerciales." }
    ]
  },
  {
    nombre: "Loteo Vistas de Amancay",
    coordenadas: [-32.218563, -64.604735],
    lotes: [
      { nombre: "Lote 35", precio: 70000, img: "./style/img/villaAmancay/IMG_20170521_104936402.jpg", descripcion: "Lote con vistas panorámicas al paisaje natural." },
      { nombre: "Lote 8", precio: 75000, img: "./style/img/villaAmancay/IMG_3745.jpg", descripcion: "Lote grande con acceso a servicios básicos." }
    ]
  }
];

document.getElementById("searchBtn").addEventListener("click", function() {
  // Obtener los valores de los precios desde los inputs
  const minPrice = parseInt(document.getElementById("minPrice").value) || 0;
  const maxPrice = parseInt(document.getElementById("maxPrice").value) || Infinity;

  // Filtrar los loteos según el precio
  const filteredLoteos = loteos.map(loteo => {
    const filteredLotes = loteo.lotes.filter(lote => lote.precio >= minPrice && lote.precio <= maxPrice);
    return { ...loteo, lotes: filteredLotes };
  }).filter(loteo => loteo.lotes.length > 0); // Eliminar loteos sin lotes que cumplen el filtro

  // Limpiar el contenedor de loteos
  const loteosContainer = document.getElementById("loteos-container");
  loteosContainer.innerHTML = "";

  // Mostrar los loteos filtrados
  filteredLoteos.forEach(loteo => {
    const loteoDiv = document.createElement("div");
    loteoDiv.classList.add("loteo");

    const loteoCard = document.createElement("div");
    loteoCard.classList.add("lote-card");

    const loteoTitle = document.createElement("h3");
    loteoTitle.textContent = loteo.nombre;

    loteoCard.appendChild(loteoTitle);

    loteo.lotes.forEach(lote => {
      const loteDiv = document.createElement("div");
      loteDiv.classList.add("lote");

      const loteImg = document.createElement("img");
      loteImg.src = lote.img;
      loteImg.alt = lote.nombre;

      const loteName = document.createElement("h4");
      loteName.textContent = lote.nombre;

      const lotePrice = document.createElement("p");
      lotePrice.textContent = `Precio: $${lote.precio}`;

      const loteDescription = document.createElement("p");
      loteDescription.textContent = lote.descripcion;

      loteDiv.appendChild(loteImg);
      loteDiv.appendChild(loteName);
      loteDiv.appendChild(lotePrice);
      loteDiv.appendChild(loteDescription);

      loteoCard.appendChild(loteDiv);
    });

    loteoDiv.appendChild(loteoCard);
    loteosContainer.appendChild(loteoDiv);
  });

  // Si el mapa no está inicializado, crear uno
  if (!map) {
    map = L.map('map').setView([-32.198563, -64.584735], 14); // Coordenadas iniciales del mapa

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  }

  // Limpiar las marcas del mapa antes de agregar nuevas
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);  // Eliminar las marcas antiguas
    }
  });

  // Agregar las marcas de los loteos filtrados al mapa
  filteredLoteos.forEach(loteo => {
    const marker = L.marker(loteo.coordenadas).addTo(map);
    marker.bindPopup(`<b>${loteo.nombre}</b><br>${loteo.lotes.length} Lotes disponibles`);

    // Agregar la funcionalidad de "Cómo llegar" con Google Maps
    const urlGoogleMaps = `https://www.google.com/maps/dir/?api=1&destination=${loteo.coordenadas[0]},${loteo.coordenadas[1]}`;
    marker.on('click', function () {
      window.open(urlGoogleMaps, "_blank");
    });
  });
});



