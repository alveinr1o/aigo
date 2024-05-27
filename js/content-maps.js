document.addEventListener("DOMContentLoaded", function() {
    let profileDropdownList = document.querySelector(".profile-dropdown-list");
    let btn = document.querySelector(".profile-dropdown-btn");
  
    if (profileDropdownList && btn) {
        let classList = profileDropdownList.classList;
        const toggle = () => classList.toggle("active");
  
        btn.addEventListener("click", toggle);
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
  
    window.onclick = function (event) {
        if (event.target.className === "popup") {
            event.target.style.display = "none";
        }
    };
  });
  
  let map, marker;
  
  function initMap() {
    const position = { lat: -6.200000, lng: 106.816666 };
  
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: position,
    });
  
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
    });
  
    map.addListener("click", (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        placeMarker(event.latLng);
        document.getElementById("lat").value = lat;
        document.getElementById("lng").value = lng;
        document.getElementById("location").value = `Lat: ${lat}, Lng: ${lng}`;
    });
  
    marker.addListener("dragend", (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        document.getElementById("lat").value = lat;
        document.getElementById("lng").value = lng;
        document.getElementById("location").value = `Lat: ${lat}, Lng: ${lng}`;
    });
  }
  
  function initPopupMap() {
    const position = { lat: -6.200000, lng: 106.816666 };
  
    const popupMap = new google.maps.Map(document.getElementById("popup-map"), {
        zoom: 13,
        center: position,
    });
  
    const popupMarker = new google.maps.Marker({
        map: popupMap,
        draggable: true,
        position: position,
    });
  
    popupMap.addListener("click", (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        popupMarker.setPosition(event.latLng);
        document.getElementById("lat").value = lat;
        document.getElementById("lng").value = lng;
    });
  
    popupMarker.addListener("dragend", (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        document.getElementById("lat").value = lat;
        document.getElementById("lng").value = lng;
    });
  }
  
  window.initMap = initMap;