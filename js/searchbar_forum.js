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
      var { title, nama, waktu, deskripsi, jumlah_komentar } = item;
      return `<div class="pertanyaan">
                    <h3>${title}</h3>
                    <span>${nama} - ${waktu}</span>
                    <span class="text-pertanyaan">${deskripsi}</span>
                    <a href="pertanyaan.html"><span id="jawaban">${jumlah_komentar}</span></a>
                </div>`;
    })
    .join("");
};
displayItem(categories);
