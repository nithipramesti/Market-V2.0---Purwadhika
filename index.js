//PRODUCT LIST
let products = [
  {
    id: 1623345592011,
    name: "Yellow shirt",
    price: 28,
    category: "Cloth",
    stock: 18,
  },
  {
    id: 1623345592032,
    name: "Mango",
    price: 6.5,
    category: "Fruit",
    stock: 15,
  },
  {
    id: 1623345592039,
    name: "Pink Sweater",
    price: 52,
    category: "Cloth",
    stock: 24,
  },
  {
    id: 1623345592064,
    name: "iPhone 11 64GB",
    price: 999,
    category: "Electronic",
    stock: 6,
  },
  {
    id: 1623345592075,
    name: "Sausage",
    price: 11,
    category: "Fast Food",
    stock: 12,
  },
];

//RENDERING LIST
let fnRender = (index) => {
  const productList = products.map((product) => {
    let { id, name, price, category, stock } = product;

    if (id != index) {
      return `
      <tr>
        <td> ${id} </td>
        <td> ${category} </td>
        <td> ${name} </td>
        <td> $${price} </td>
        <td> ${stock} </td>
        <td> <button onclick="fnEditData(${id})">Edit</button"> </td>
        <td> <button onclick="fnDeleteData(${id})">Delete</button> </td>
      </tr>
    `;
    } else {
      return `
      <tr>
        <td> ${id} </td>
        <td> ${category} </td>
        <td> <input type="text" value="${name}"> </td>
        <td> <input type="text" value="${price}"> </td>
        <td> <input type="text" value="${stock}"> </td>
        <td> <button onclick="fnEditData(${id})">Edit</button"> </td>
        <td> <button onclick="fnDeleteData(${id})">Delete</button> </td>
      </tr>
    `;
    }
  });

  document.querySelector("#table_data--body").innerHTML = productList.join("");
};

// INPUT DATA FUNCTION to TABLE DATA
const fnInputData = () => {
  // Defining variables
  const name = document.querySelector("#input--name").value;
  const price = document.querySelector("#input--price").value;
  const category = document.querySelector("#input--category").value;
  const stock = document.querySelector("#input--stock").value;
  const inputInputField = document.querySelectorAll(".input--input_field");
  const tableData = document.querySelector("#table-data");

  const time = new Date();
  const id = time.getTime();
  //Inserting to Products array
  products.push({ id, name, price, category, stock });

  //Update Table Data
  fnRender();

  // Clear input field after submitting
  inputInputField.forEach((input) => {
    input.value = "";
  });
};

fnRender();

//RENDERING FILTER LIST
let fnRenderFilter = (ar) => {
  const productList = ar.map((product) => {
    let { id, name, price, category, stock } = product;
    return `
    <tr id="${id}">
      <td> ${id} </td>
      <td> ${category} </td>
      <td id="name-${id}"> ${name} </td>
      <td> $${price} </td>
      <td> ${stock} </td>
      <td class="edit-btn"> <button onclick="fnEditData(${id})">Edit</button"> </td>
      <td> <button onclick="fnDeleteData(${id})">Delete</button> </td>
    </tr>
    `;
  });

  document.querySelector("#table_data--body").innerHTML = productList.join("");
};

//FILTER DATA NAME
const fnFilterData = () => {
  const keywordName = document.querySelector("#filter--name");

  let filterProducts = products.filter((product) => {
    const nameLow = product.name.toLowerCase();
    const keywordNameLow = keywordName.value.toLowerCase();

    return nameLow.includes(keywordNameLow);
  });

  fnRenderFilter(filterProducts);
};

//FILTER DATA PRICE RANGE
const fnFilterPrice = () => {
  const minPrice = document.querySelector("#filter--price_min").value;
  const maxPrice = document.querySelector("#filter--price_max").value;

  let filterProducts = products;

  if (!(minPrice == "" || maxPrice == "")) {
    filterProducts = products.filter((product) => {
      return (
        Number(product.price) >= minPrice && Number(product.price) <= maxPrice
      );
    });
  }

  fnRenderFilter(filterProducts);
};

//FILTER DATA PRICE RANGE
const fnFilterCategory = () => {
  const filterCategory = document.querySelector("#filter--category").value;

  if (filterCategory == "") {
    fnRender();
  } else {
    let filterProducts = products.filter((product) => {
      return product.category == filterCategory;
    });

    fnRenderFilter(filterProducts);
  }
};

//FILTER RESET BUTTON
const fnResetFilter = () => {
  document.querySelector("#filter--name").value = "";
  document.querySelector("#filter--price_min").value = "";
  document.querySelector("#filter--price_max").value = "";
  document.querySelector("#filter--category").value = "";

  fnRender();
};

//EDIT AND DELETE DATA
const fnDeleteData = (id) => {
  console.log(id);
  products = products.filter((product) => {
    return product.id != id;
  });

  console.log(products);

  fnRender();
};

const fnEditData = (id) => {
  fnRender(id);
};
