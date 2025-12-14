let currentMap = 'satellite';
let scale = 0.5;
let pointX = 0;
let pointY = 0;
let start = { x: 0, y: 0 };
let panning = false;
let markerMode = false;
let markerIdCounter = 1;
let selectedMarkerType = 'weed';

// ============================================
// # PUT COORDS HERE (paste between the brackets)
// ============================================
const permanentMarkers = {
    weed: [
        // Example: { x: 1234, y: 5678, label: "North Farm" },
    { x: 2355, y: 3780, label: "Weed Location #1" },
    { x: 6137, y: 3115, label: "Weed Location #2" },
    { x: 2472, y: 3666, label: "Weed Location #3" },
    { x: 4871, y: 5940, label: "Weed Location #4" },
    ],
    meth: [
        // Example: { x: 2345, y: 3456, label: "Desert Lab" },
        
    ],
    washing: [
        // Example: { x: 3456, y: 4567, label: "Laundromat" },
    { x: 5391, y: 6397, label: "Washing Machine #1" },
    { x: 5593, y: 6021, label: "Washing Machine #2" },
    { x: 5599, y: 5711, label: "Washing Machine #3" },
    ]
};
// ============================================

const mapViewer = document.getElementById('mapViewer');
const satelliteMap = document.getElementById('satelliteMap');
const loading = document.getElementById('loading');
const satImage = document.getElementById('satImage');
const markersContainer = document.getElementById('markersContainer');
const markerNotice = document.getElementById('markerNotice');
const locationsList = document.getElementById('locationsList');

let loaded = 0;
function imageLoaded() {
    loaded++;
    if (loaded === 1) {
        loading.style.display = 'none';
        satelliteMap.style.display = 'block';
        centerMap();
        loadPermanentMarkers();
        updateLocationsList();
    }
}
satImage.onload = imageLoaded;
satImage.onerror = function() {
    loading.innerHTML = '<div>Error loading map. Please check your connection.</div>';
};

function setTransform() {
    const t = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
    satelliteMap.style.transform = t;
    markersContainer.style.transform = t;
}

function centerMap() {
    const rect = mapViewer.getBoundingClientRect();
    pointX = (rect.width - satImage.width * scale) / 2;
    pointY = (rect.height - satImage.height * scale) / 2;
    setTransform();
}

function zoom(delta, mouseX, mouseY) {
    const oldScale = scale;
    scale = Math.min(Math.max(0.5, scale + delta), 4);
    if (scale === oldScale) return;

    const ratio = scale / oldScale;
    pointX = mouseX - ratio * (mouseX - pointX);
    pointY = mouseY - ratio * (mouseY - pointY);

    setTransform();
}

mapViewer.addEventListener('wheel', (e) => {
    e.preventDefault();

    const rect = mapViewer.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const delta = e.deltaY < 0 ? 0.15 : -0.15;
    zoom(delta, mouseX, mouseY);
}, { passive: false });

mapViewer.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    
    if (markerMode) {
        const rect = mapViewer.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const x = (mouseX - pointX) / scale;
        const y = (mouseY - pointY) / scale;
        
        const label = prompt('Enter location name:', getDefaultName());
        
        if (label) {
            createMarker(x, y, label, false, selectedMarkerType);
            const coordString = `{ x: ${Math.round(x)}, y: ${Math.round(y)}, label: "${label}" },`;
            
            navigator.clipboard.writeText(coordString).then(() => {
                console.log('✅ Coordinates copied to clipboard!');
                console.log(`Add this to permanentMarkers.${selectedMarkerType}: ${coordString}`);
                alert(`Coordinates copied! Paste in script.js under permanentMarkers.${selectedMarkerType}`);
            }).catch(err => {
                console.log('⚠️ Copy this manually:', coordString);
            });
            
            toggleMarkerMode();
        }
        return;
    }
    
    panning = true;
    start = { x: e.clientX - pointX, y: e.clientY - pointY };
});

function getDefaultName() {
    const names = {
        weed: 'Weed Farm #',
        meth: 'Meth Table #',
        washing: 'Washing Machine #'
    };
    return names[selectedMarkerType] + markerIdCounter;
}

mapViewer.addEventListener('mousemove', (e) => {
    if (!panning) return;
    pointX = e.clientX - start.x;
    pointY = e.clientY - start.y;
    setTransform();
});

mapViewer.addEventListener('mouseup', () => panning = false);
mapViewer.addEventListener('mouseleave', () => panning = false);

function toggleMarkerMode() {
    markerMode = !markerMode;
    markerNotice.style.display = markerMode ? 'block' : 'none';
    document.getElementById('markerBtn').classList.toggle('active', markerMode);
    document.getElementById('typeSelector').style.display = markerMode ? 'flex' : 'none';
    mapViewer.style.cursor = markerMode ? 'crosshair' : 'grab';
}

function selectMarkerType(type) {
    selectedMarkerType = type;
    document.querySelectorAll('.type-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.${type}-btn`).classList.add('active');
}

function createMarker(x, y, label, permanent = false, type = 'weed') {
    const m = document.createElement('div');
    m.className = 'marker';
    m.style.left = x + 'px';
    m.style.top = y + 'px';
    
    const icons = {
        weed: '🌿',
        meth: '🧪',
        washing: '🧺'
    };
    
    const colors = {
        weed: '#4CAF50',
        meth: '#2196F3',
        washing: '#FF9800'
    };
    
    m.innerHTML = `<div class="marker-icon" style="background: ${colors[type]};">${icons[type]}</div><div class="marker-label">${label}</div>`;
    if (!permanent) {
        m.addEventListener('contextmenu', e => {
            e.preventDefault();
            m.remove();
        });
    }
    markersContainer.appendChild(m);
}

function loadPermanentMarkers() {
    permanentMarkers.weed.forEach(m => createMarker(m.x, m.y, m.label, true, 'weed'));
    permanentMarkers.meth.forEach(m => createMarker(m.x, m.y, m.label, true, 'meth'));
    permanentMarkers.washing.forEach(m => createMarker(m.x, m.y, m.label, true, 'washing'));
}

function updateLocationsList() {
    locationsList.innerHTML = '';
    
    const totalLocations = permanentMarkers.weed.length + permanentMarkers.meth.length + permanentMarkers.washing.length;
    
    if (totalLocations === 0) {
        locationsList.innerHTML = '<div class="no-locations">No locations saved yet</div>';
        return;
    }
    
    if (permanentMarkers.weed.length > 0) {
        const weedSection = document.createElement('div');
        weedSection.className = 'location-section';
        weedSection.innerHTML = '<div class="section-title">🌿 Weed Farms</div>';
        permanentMarkers.weed.forEach((marker) => {
            const item = document.createElement('div');
            item.className = 'location-item weed-item';
            item.textContent = marker.label;
            item.onclick = () => navigateToLocation(marker.x, marker.y);
            weedSection.appendChild(item);
        });
        locationsList.appendChild(weedSection);
    }
    
    if (permanentMarkers.meth.length > 0) {
        const methSection = document.createElement('div');
        methSection.className = 'location-section';
        methSection.innerHTML = '<div class="section-title">🧪 Meth Tables</div>';
        permanentMarkers.meth.forEach((marker) => {
            const item = document.createElement('div');
            item.className = 'location-item meth-item';
            item.textContent = marker.label;
            item.onclick = () => navigateToLocation(marker.x, marker.y);
            methSection.appendChild(item);
        });
        locationsList.appendChild(methSection);
    }
    
    if (permanentMarkers.washing.length > 0) {
        const washingSection = document.createElement('div');
        washingSection.className = 'location-section';
        washingSection.innerHTML = '<div class="section-title">🧺 Washing Machines</div>';
        permanentMarkers.washing.forEach((marker) => {
            const item = document.createElement('div');
            item.className = 'location-item washing-item';
            item.textContent = marker.label;
            item.onclick = () => navigateToLocation(marker.x, marker.y);
            washingSection.appendChild(item);
        });
        locationsList.appendChild(washingSection);
    }
}

function navigateToLocation(x, y) {
    scale = 2.0;
    const rect = mapViewer.getBoundingClientRect();
    pointX = rect.width / 2 - x * scale;
    pointY = rect.height / 2 - y * scale;
    setTransform();
}

function resetView() {
    scale = 0.5;
    centerMap();
}

window.addEventListener('resize', () => {
    centerMap();
});