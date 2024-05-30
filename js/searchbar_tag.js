const product = [
  {
    id: 0,
    title: "Judul Tag",
    jumlah_pertanyaan: "10 pertanyaan",
  },
  {
    id: 1,
    title: "Judul Tag",
    jumlah_pertanyaan: "10 pertanyaan",
  },
  {
    id: 2,
    title: "Judul Tag",
    jumlah_pertanyaan: "10 pertanyaan",
  },
  {
    id: 3,
    title: "Judul Tag",
    jumlah_pertanyaan: "10 pertanyaan",
  },
  {
    id: 4,
    title: "Judul Tag",
    jumlah_pertanyaan: "10 pertanyaan",
  },
  {
    id: 5,
    title: "Judul Tag",
    jumlah_pertanyaan: "10 pertanyaan",
  },
  {
    id: 6,
    title: "Judul Tag",
    jumlah_pertanyaan: "10 pertanyaan",
  },
  {
    id: 7,
    title: "Judul Tag",
    jumlah_pertanyaan: "10 pertanyaan",
  },
  {
    id: 8,
    title: "Judul Tag",
    jumlah_pertanyaan: "10 pertanyaan",
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
      var { title, deskripsi, jumlah_pertanyaan } = item;
      return `<a href="tagset.html"><div class="tag-content">
                    <h3>${title}</h3>
                    <span class="count-pertanyaan">
                        ${jumlah_pertanyaan}
                    </span>
                </div></a>`;
    })
    .join("");
};
displayItem(categories);
