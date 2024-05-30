const product = [
  {
    id: 0,
    img: "assets/logo.png",
    nama: "Adid Sadida",
    poin: "200 Poin",
  },
  {
    id: 1,
    img: "assets/logo.png",
    nama: "Adid Sadida",
    poin: "200 Poin",
  },
  {
    id: 2,
    img: "assets/logo.png",
    nama: "Adid Sadida",
    poin: "200 Poin",
  },
  {
    id: 3,
    img: "assets/logo.png",
    nama: "Adid Sadida",
    poin: "200 Poin",
  },
  {
    id: 4,
    img: "assets/logo.png",
    nama: "Adid Sadida",
    poin: "200 Poin",
  },
  {
    id: 5,
    img: "assets/logo.png",
    nama: "Adid Sadida",
    poin: "200 Poin",
  },
  {
    id: 6,
    img: "assets/logo.png",
    nama: "Adid Sadida",
    poin: "200 Poin",
  },
  {
    id: 7,
    img: "assets/logo.png",
    nama: "Adid Sadida",
    poin: "200 Poin",
  },
  {
    id: 8,
    img: "assets/logo.png",
    nama: "Adid Sadida",
    poin: "200 Poin",
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
    return item.nama.toLowerCase().includes(searchData);
  });
  displayItem(filteredData);
});

const displayItem = (items) => {
  document.getElementById("root").innerHTML = items
    .map((item) => {
      var { img, nama, poin } = item;
      return `<div class="user">
                    <img src="${img}" alt="" id="user-profile">
                    <div class="poin">
                        <span>${nama}</span>
                        <div class="star-poin">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 23 21" fill="none">
                                <path d="M11.5189 0L14.0739 7.86338L22.3419 7.86338L15.6529 12.7232L18.2079 20.5866L11.5189 15.7268L4.82992 20.5866L7.38488 12.7232L0.695892 7.86338L8.96394 7.86338L11.5189 0Z" fill="#F7A02E"/>
                            </svg>
                            <span id="poin">${poin}</span> 
                        </div> 
                    </div>
                </div>`;
    })
    .join("");
};
displayItem(categories);
