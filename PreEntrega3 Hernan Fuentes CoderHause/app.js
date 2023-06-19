const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container")

const productos = [
    {
      id: 1,
      nombre: "Camioneta Ford",
      precio: 10,
      img: "https://www.ford.com.ar/content/dam/Ford/website-assets/latam/ar/home/showroom/fds/far-showroom-ranger-raptor.jpg",
    },
    {
      id: 2,
      nombre: "Mustang GT",
      precio: 20,
      img: "https://www.ford.com.ar/content/dam/Ford/website-assets/latam/ar/home/showroom/fds/far-showroom-mustang.jpg",
    },
    {
      id: 3,
      nombre: "Ford Ranger",
      precio: 15,
      img: "https://www.ford.com.ar/content/dam/Ford/website-assets/latam/ar/home/showroom/fds/far-showroom-next-gen-ranger.jpg",
    },
  ];
  
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProducts = async () => {
    const response = await fetch("data.json");
    const data = await response.json();
    const productos = [
        {
          id: 1,
          nombre: "Producto 1",
          precio: 10.99,
          img: "https://www.ford.com.ar/content/dam/Ford/website-assets/latam/ar/home/showroom/fds/far-showroom-ranger-raptor.jpg",
        },
        {
          id: 2,
          nombre: "Producto 2",
          precio: 19.99,
          img: "https://www.ford.com.ar/content/dam/Ford/website-assets/latam/ar/home/showroom/fds/far-showroom-mustang.jpg",
        },
        {
          id: 3,
          nombre: "Producto 3",
          precio: 5.99,
          img: "https://www.ford.com.ar/content/dam/Ford/website-assets/latam/ar/home/showroom/fds/far-showroom-next-gen-ranger.jpg",
        },
      ];
};

getProducts();

productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
      <img src="${product.img}">
      <h3> ${product.nombre} </h3>
      <p class="price"> ${product.precio} $ </p>
       `;

       shopContent.append(content)

       let comprar = document.createElement("button")
       comprar.innerText = "comprar";
       comprar.className = "comprar";

       content.append(comprar);

       comprar.addEventListener("click", () => {
        carrito.push({
            id : product.id,
            img : product.img,
            nombre : product.nombre,
            precio : product.precio,
        });
        console.log(carrito);
       })

});

verCarrito.addEventListener("click", () => {

    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className ="modal-header"
    modalHeader.innerHTML = `
    <h1 class ="modal-header-title"> Carrito </h1>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText ="x";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click",() => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);


    carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content"
    carritoContent.innerHTML = `
    <img src=" ${product.img}">
    <h3> ${product.nombre} </h3>
    <p> ${product.precio} $ </p>
    `;

    modalContainer.append(carritoContent)
   });
   
   const total = carrito.reduce((acc, el) => acc + el.precio, 0);
   const totalBuying = document.createElement("div");
   totalBuying.className = "total-content";
   totalBuying.innerHTML = `total a pagar: ${total} $`;
   modalContainer.append(totalBuying);
});