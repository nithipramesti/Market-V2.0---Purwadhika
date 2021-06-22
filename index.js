//PRODUCT LIST
let products = [
  { name: "Yellow shirt", price: 28, category: "Cloth", stock: 18 },
  { name: "Mango", price: 6.5, category: "Fruit", stock: 15 },
  { name: "Pink Sweater", price: 52, category: "Cloth", stock: 24 },
  { name: "iPhone 11 64GB", price: 999, category: "Electronic", stock: 6 },
  { name: "Sausage", price: 11, category: "Fast Food", stock: 12 },
];

//RENDERING LIST
let fnRender = () => {
  const productList = products.map((product) => {
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
  fnRender();

  // Clear input field after submitting
  inputInputField.forEach((input) => {
    input.value = "";
  });
};

fnRender();

//FILTER DATA
const fnFilterData = () => {
  const filterName = document.querySelector("#filter--name");
  console.log(filterName.value);
};
