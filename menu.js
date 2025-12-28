const permanentMarkers = {
    weed: [
        { x: 2355, y: 3780, label: "Weed Location #1", area: "Fort Zancudo Swamp", description: "Found by Drug Officer During routine drug patrol", images: ["https://r2.fivemanage.com/WFJUnztU6NFDzltrV7jCl/image6.png"] },
        { x: 6137, y: 3115, label: "Weed Location #2", area: "Missing Location", description: "Placeholder description", images: [] },
        { x: 2472, y: 3666, label: "Weed Location #3", area: "Missing Location", description: "Placeholder description", images: [] },
        { x: 4871, y: 5940, label: "Weed Location #4", area: "Missing Location", description: "Placeholder description", images: [] },
        { x: 6011, y: 3688, label: "Weed Location #5", area: "East of Quary", description: "Found by Drug Officer During routine search of State Borders", images: ["https://r2.fivemanage.com/WFJUnztU6NFDzltrV7jCl/image3.png", "https://r2.fivemanage.com/WFJUnztU6NFDzltrV7jCl/image4.png"] },
        { x: 6481, y: 2566, label: "Weed Location #6", area: "Northern HumaneLabs Island", description: "Known spot by Drug Officers", images: ["https://r2.fivemanage.com/WFJUnztU6NFDzltrV7jCl/image.png"] },
        { x: 4770, y: 3162, label: "Weed Location #7", area: "Fort Zancudo Swamp", description: "Found by Drug Officer during routine flight", images: ["https://i.imgur.com/SOqINNc.jpeg"] },
    ],
    meth: [
        { x: 5707, y: 4998, label: "Meth Table #1", area: "South Palmer-Taylor Power Station", description: "Found by Drug Officer during routine search of State Borders", images: ["https://r2.fivemanage.com/WFJUnztU6NFDzltrV7jCl/image5.png"] },
        { x: 2619, y: 5285, label: "Meth Table #2", area: "Missing Location", description: "Placeholder description", images: [] },
    ],
    washing: [
        { x: 5391, y: 6397, label: "Washing Machine #1", area: "Missing Location", description: "Placeholder description", images: [] },
        { x: 5593, y: 6021, label: "Washing Machine #2", area: "Missing Location", description: "Placeholder description", images: [] },
        { x: 5599, y: 5711, label: "Washing Machine #3", area: "Missing Location", description: "Placeholder description", images: [] },
        { x: 4770, y: 3162, label: "Washing Machine #4", area: "Sandy Shores Abandoned Motel", description: "Found by Drug Officer during a 10-80, uncommon spot", images: ["https://r2.fivemanage.com/WFJUnztU6NFDzltrV7jCl/image2.png"] },
    ]
};

let currentType = '';

function updateCounts() {
    document.getElementById('weedCount').textContent = `${permanentMarkers.weed.length} Locations`;
    document.getElementById('methCount').textContent = `${permanentMarkers.meth.length} Locations`;
    document.getElementById('washingCount').textContent = `${permanentMarkers.washing.length} Locations`;
}

function showDetails(type) {
    currentType = type;
    const modal = document.getElementById('detailsModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    const titles = {
        weed: '🌿 Weed Farm Locations',
        meth: '🧪 Meth Table Locations',
        washing: '🧺 Washing Machine Locations'
    };

    modalTitle.textContent = titles[type];

    const locations = permanentMarkers[type];

    if (locations.length === 0) {
        modalBody.innerHTML = '<div class="no-data">No locations recorded</div>';
    } else {
        let html = '';
        locations.forEach((loc, index) => {
            html += `
                <div class="location-item" onclick="showLocationDetail('${type}', ${index})">
                    <div class="location-name">${loc.label}</div>
                    <div class="location-area">📍 ${loc.area}</div>
                </div>
            `;
        });
        modalBody.innerHTML = html;
    }

    modal.style.display = 'block';
}

function showLocationDetail(type, index) {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const location = permanentMarkers[type][index];

    const icons = {
        weed: '🌿',
        meth: '🧪',
        washing: '🧺'
    };

    modalTitle.textContent = `${icons[type]} ${location.label}`;

    let imagesHtml = '';
    if (location.images && location.images.length > 0) {
        location.images.forEach(img => {
            imagesHtml += `<img src="${img}" alt="Location image" style="width: 100%; border-radius: 8px;">`;
        });
    } else {
        imagesHtml = `
            <div class="detail-images">
                <div class="detail-image">No Image Available</div>
                <div class="detail-image">No Image Available</div>
                <div class="detail-image">No Image Available</div>
            </div>
        `;
    }

    modalBody.innerHTML = `
        <div class="detail-view">
            <div class="detail-header">
                <div class="detail-title">${location.label}</div>
                <div class="detail-location">📍 ${location.area}</div>
            </div>
            <div class="detail-body">
                <div class="detail-section">
                    <div class="detail-section-title">Description</div>
                    <div class="detail-description">${location.description}</div>
                </div>
                <div class="detail-section">
                    <div class="detail-section-title">Images</div>
                    ${imagesHtml}
                </div>
                <button class="back-btn" onclick="showDetails('${type}')">← Back to List</button>
            </div>
        </div>
    `;
}

function closeModal() {
    document.getElementById('detailsModal').style.display = 'none';
}

function openMap() {
    window.location.href = 'index.html';
}

function logout() {
    sessionStorage.removeItem('sahpAuthenticated');
    window.location.href = 'login.html';
}

window.onclick = function(event) {
    const modal = document.getElementById('detailsModal');
    if (event.target === modal) {
        closeModal();
    }
}

updateCounts();
