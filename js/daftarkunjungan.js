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

// Initialize and add the map
function initMap() {
  let map;
  let marker;
  let input = document.getElementById("location");
  let latInput = document.getElementById("lat");
  let lngInput = document.getElementById("lng");
  let autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.setFields(["geometry", "name"]);

  map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -6.200000, lng: 106.816666 },
      zoom: 13,
  });

  marker = new google.maps.Marker({
      map: map,
      draggable: true,
  });

  autocomplete.addListener("place_changed", function () {
      let place = autocomplete.getPlace();
      if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
      }

      if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
      } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
      }

      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      latInput.value = place.geometry.location.lat();
      lngInput.value = place.geometry.location.lng();
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
}

// Load the map
initMap();
});