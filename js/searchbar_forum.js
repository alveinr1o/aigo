const product = [
  {
    id: 0,
    title: "Jalan-jalan di Singapore",
    nama: "Ahmad Qaulan Sadida",
    waktu: "18:00",
    deskripsi:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque quia dolor vero blanditiis ipsam animi aut pariatur saepe neque voluptate!",
    jumlah_komentar: "5 Jawaban",
  },
  {
    id: 1,
    title: "Food Street India",
    nama: "Rio Alvein Hasana",
    waktu: "20:00",
    deskripsi:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque quia dolor vero blanditiis ipsam animi aut pariatur saepe neque voluptate!",
    jumlah_komentar: "5 Jawaban",
  },
  {
    id: 2,
    title: "Pemandangan Bromo",
    nama: "Darmawan Putra",
    waktu: "07:00",
    deskripsi:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque quia dolor vero blanditiis ipsam animi aut pariatur saepe neque voluptate!",
    jumlah_komentar: "5 Jawaban",
  },
];

const categories = [
  ...new Set(
    product.map((item) => {
      return item;
    })
  ),
];

document.getElementById("searchBar").addEventListener("keyup", (e) => {
  const searchData = e.target.value.toLowerCase();
  const filteredData = categories.filter((item) => {
    return item.title.toLowerCase().includes(searchData);
  });
  displayItem(filteredData);
});

const displayItem = (items) => {
  document.getElementById("root").innerHTML = items
    .map((item) => {
      var { id, title, nama, waktu, deskripsi, jumlah_komentar } = item;
      return `<div class="pertanyaan">
                  <div class="tittle-box">
                    <h3>${title}</h3>
                    <div class="menu-icon-container">
                      <i class="fas fa-ellipsis-v menu-icon" onclick="toggleMenu(${id})"></i>
                      <div class="popup-menu" id="popupMenu-${id}">
                        <ul>
                          <li onclick="editPertanyaan()">Edit</li>
                          <li onclick="hapusPertanyaan()">Hapus</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <span>${nama} - ${waktu}</span>
                  <span class="text-pertanyaan">${deskripsi}</span>
                  <a href="pertanyaan.html"><span id="jawaban">${jumlah_komentar}</span></a>
                </div>`;
    })
    .join("");
};

displayItem(categories);

function toggleMenu(id) {
  var popupMenu = document.getElementById(`popupMenu-${id}`);
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
