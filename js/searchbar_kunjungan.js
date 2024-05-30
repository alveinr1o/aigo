const product = [
  {
    id: 0,
    img: "assets/kunjungan-malang.png",
    title: "Jalan-jalan di Malang",
    waktu: "17 Agustus 2024",
    deskripsi:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque quia dolor vero blanditiis ipsam animi aut pariatur saepe neque voluptate!",
  },
  {
    id: 1,
    img: "assets/kunjungan-lombok.png",
    title: "Pemandangan Lombok",
    waktu: "20 Desember 2024",
    deskripsi:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque quia dolor vero blanditiis ipsam animi aut pariatur saepe neque voluptate!",
  },
  {
    id: 2,
    img: "assets/kunjungan-sawah.png",
    title: "Keindahan Sawah di Bandung",
    waktu: "20 Desember 2024",
    deskripsi:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque quia dolor vero blanditiis ipsam animi aut pariatur saepe neque voluptate!",
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
      var { img, title, waktu, deskripsi } = item;
      return `<a href="daftarkunjungan-maps.html">
                <div class="container-box">
                    <img src="${img}" alt="">
                    <div class="container-text">
                        <h2>${title}</h2>
                        <p>${waktu}</p>
                        <p>${deskripsi}</p>
                    </div>
                </div>
            </a>`;
    })
    .join("");
};
displayItem(categories);
