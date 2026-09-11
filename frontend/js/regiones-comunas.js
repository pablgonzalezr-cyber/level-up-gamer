const regionesComunas = {
    "Arica y Parinacota": ["Arica", "Camarones", "Putre"],
    "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte"],
    "Antofagasta": ["Antofagasta", "Calama", "Tocopilla"],
    "Atacama": ["Copiapó", "Caldera", "Vallenar"],
    "Coquimbo": ["La Serena", "Coquimbo", "Ovalle"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "San Antonio"],
    "Metropolitana de Santiago": ["Santiago", "Maipú", "Puente Alto", "Las Condes", "Providencia"],
    "O'Higgins": ["Rancagua", "San Fernando", "Rengo"],
    "Maule": ["Talca", "Curicó", "Linares"],
    "Ñuble": ["Chillán", "Bulnes", "San Carlos"],
    "Biobío": ["Concepción", "Talcahuano", "Los Ángeles"],
    "La Araucanía": ["Temuco", "Villarrica", "Angol"],
    "Los Ríos": ["Valdivia", "La Unión", "Panguipulli"],
    "Los Lagos": ["Puerto Montt", "Osorno", "Castro"],
    "Aysén": ["Coyhaique", "Aysén"],
    "Magallanes": ["Punta Arenas", "Puerto Natales"]
};

function cargarRegiones() {
    const selectRegion = document.getElementById("region");
    if (!selectRegion) {
        return;
    }
    selectRegion.innerHTML = '<option value="">Seleccione una región</option>';
    for (let region in regionesComunas) {
        selectRegion.innerHTML += '<option value="' + region + '">' + region + '</option>';
    }
}

function cargarComunas() {
    const region = document.getElementById("region").value;
    const selectComuna = document.getElementById("comuna");
    selectComuna.innerHTML = '<option value="">Seleccione una comuna</option>';
    if (region !== "") {
        const comunas = regionesComunas[region];
        for (let comuna of comunas) {
            selectComuna.innerHTML += '<option value="' + comuna + '">' + comuna + '</option>';
        }
    }
}