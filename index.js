//PRODUCT LIST
let products = [
  { name: "Yellow shirt", price: 28, category: "Cloth", stock: 18 },
  { name: "Mango", price: 6.5, category: "Fruit", stock: 15 },
  { name: "Pink Sweater", price: 52, category: "Cloth", stock: 24 },
  { name: "iPhone 11 64GB", price: 999, category: "Electronic", stock: 6 },
  { name: "Sausage", price: 11, category: "Fast Food", stock: 12 },
];

//RENDERING LIST
let fnRender = (ar) => {
  const productList = ar.map((product) => {
    let { name, price, category, stock } = product;
    return `
    <tr>
      <td> ${category} </td>
      <td> ${name} </td>
      <td> $${price} </td>
      <td> ${stock} </td>
    </tr>
    `;
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

  //Inserting to Products array
  products.push({ name, price, category, stock });

  //Update Table Data
  fnRender(products);

  // Clear input field after submitting
  inputInputField.forEach((input) => {
    input.value = "";
  });
};

fnRender(products);

//FILTER DATA NAME
const fnFilterData = () => {
  const keywordName = document.querySelector("#filter--name");

  let filterProducts = products.filter((product) => {
    const nameLow = product.name.toLowerCase();
    const keywordNameLow = keywordName.value.toLowerCase();

    return nameLow.includes(keywordNameLow);
  });

  fnRender(filterProducts);
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

  fnRender(filterProducts);
};

//FILTER DATA PRICE RANGE
const fnFilterCategory = () => {
  const filterCategory = document.querySelector("#filter--category").value;

  if (filterCategory === "All") {
    fnRender(products);
  } else {
    let filterProducts = products.filter((product) => {
      return product.category == filterCategory;
    });

    fnRender(filterProducts);
  }
};

//FILTER RESET BUTTON
const fnResetFilter = () => {
  document.querySelector("#filter--name").value = "";
  document.querySelector("#filter--price_min").value = "";
  document.querySelector("#filter--price_max").value = "";
  document.querySelector("#filter--category").value = "";

  fnRender(products);
};
