document.addEventListener("DOMContentLoaded", function() {
    let profileDropdownList = document.querySelector(".profile-dropdown-list");
    let btn = document.querySelector(".profile-dropdown-btn");

    if (profileDropdownList && btn) {
        let classList = profileDropdownList.classList;
        const toggleProfileDropdown = () => classList.toggle("active");

        btn.addEventListener("click", toggleProfileDropdown);
        window.addEventListener("click", function (e) {
            if (!btn.contains(e.target)) classList.remove("active");
        });
    }

    let modalBtns = document.querySelectorAll(".buat-daftar");
    modalBtns.forEach(function (btn) {
        btn.onclick = function () {
            let modal = btn.getAttribute("open-popup");
            document.getElementById(modal).style.display = "block";
            initPopupMap(); 
        };
    });

    let closeBtns = document.querySelectorAll(".close");
    closeBtns.forEach(function (btn) {
        btn.onclick = function () {
            let modal = btn.closest(".popup");
            modal.style.display = "none";
        };
    });

    window.onclick = function(event) {
        if (event.target.className === "popup") {
            event.target.style.display = "none";
        }

        if (!event.target.matches('.menu-icon')) {
            var dropdowns = document.getElementsByClassName('popup-menu');
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.style.display === 'block') {
                    openDropdown.style.display = 'none';
                }
            }
        }
    };

    function initMainMap() {
        let map = new google.maps.Map(document.getElementById("main-map"), {
            center: { lat: -6.200000, lng: 106.816666 },
            zoom: 13,
        });

        const visitList = JSON.parse(localStorage.getItem("visitList")) || [];
        visitList.forEach(visit => {
            let marker = new google.maps.Marker({
                position: { lat: parseFloat(visit.lat), lng: parseFloat(visit.lng) },
                map: map,
                title: visit.title,
            });
        });
    }

    function initPopupMap() {
        let map;
        let marker;
        let latInput = document.getElementById("lat");
        let lngInput = document.getElementById("lng");

        map = new google.maps.Map(document.getElementById("popup-map"), {
            center: { lat: -6.200000, lng: 106.816666 },
            zoom: 13,
        });

        marker = new google.maps.Marker({
            map: map,
            draggable: true,
        });

        google.maps.event.addListener(marker, "dragend", function () {
            let position = marker.getPosition();
            latInput.value = position.lat();
            lngInput.value = position.lng();
        });

        map.addListener("click", function (event) {
            marker.setPosition(event.latLng);
            marker.setVisible(true);
            latInput.value = event.latLng.lat();
            lngInput.value = event.latLng.lng();
        });

        const input = document.getElementById("pac-input");
        const searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        searchBox.addListener("places_changed", function() {
            const places = searchBox.getPlaces();
            if (places.length === 0) {
                return;
            }

            const bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
                if (!place.geometry) {
                    return;
                }

                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }

                marker.setPosition(place.geometry.location);
                marker.setVisible(true);
                latInput.value = place.geometry.location.lat();
                lngInput.value = place.geometry.location.lng();
            });
            map.fitBounds(bounds);
        });

        document.querySelector(".submit").addEventListener("click", function(event) {
            event.preventDefault();
            let visitList = JSON.parse(localStorage.getItem("visitList")) || [];
            let newVisit = {
                lat: latInput.value,
                lng: lngInput.value,
                title: document.getElementById("judul").value,
                date: document.getElementById("date").value,
                description: document.getElementById("deskripsi").value
            };
            visitList.push(newVisit);
            localStorage.setItem("visitList", JSON.stringify(visitList));
            document.getElementById("popup").style.display = "none";
            updateVisitList();
        });
    }

    function updateVisitList() {
        let visitListContainer = document.getElementById("visit-list");
        visitListContainer.innerHTML = "";
        let visitList = JSON.parse(localStorage.getItem("visitList")) || [];
        visitList.forEach(visit => {
            let visitElement = document.createElement("div");
            visitElement.className = "container-box";
            visitElement.innerHTML = `
                <img src="assets/default-image.png" alt="">
                <div class="container-text">
                    <h2>${visit.title}</h2>
                    <p>${visit.date}</p>
                    <p>${visit.description}</p>
                </div>
            `;
            visitListContainer.appendChild(visitElement);
        });
    }

    initMainMap();
    updateVisitList();
});

function toggleMenu() {
    var popupMenu = document.getElementById('popupMenu');
    if (popupMenu.style.display === 'block') {
        popupMenu.style.display = 'none';
    } else {
        popupMenu.style.display = 'block';
    }
}

function editPertanyaan() {
    alert('Edit pertanyaan');
}

function hapusPertanyaan() {
    alert('Hapus pertanyaan');
}
