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
        <td> <button onclick="fnAddToCart(${id})">Add</button"> </td>
        <td> <button onclick="fnEditData(${id})">Edit</button"> </td>
        <td> <button onclick="fnDeleteData(${id})">Delete</button> </td>
      </tr>
    `;
    } else {
      return `
      <tr>
        <td> ${id} </td>
        <td> ${category} </td>
        <td> <input type="text" id="edit--name" value="${name}"> </td>
        <td> <input type="text" id="edit--price" value="${price}"> </td>
        <td> <input type="text" id="edit--stock" value="${stock}"> </td>
        <td> <button onclick="fnAddToCart(${id})">Add</button"> </td>
        <td> <button onclick="fnSaveChanges(${id})">Save</button"> </td>
        <td> <button onclick="fnCancelChanges()">Cancel</button> </td>
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
      <td> <button onclick="fnAddToCart(${id})">Add</button"> </td>
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
  let minPrice = document.querySelector("#filter--price_min").value;
  let maxPrice = document.querySelector("#filter--price_max").value;

  let filterProducts = products;

  // if (!(minPrice == "" || maxPrice == "")) {
  //   filterProducts = products.filter((product) => {
  //     return (
  //       Number(product.price) >= minPrice && Number(product.price) <= maxPrice
  //     );
  //   });
  // }

  if (minPrice == "") {
    minPrice = 0;
  }

  if (maxPrice == "") {
    maxPrice = 10000000000;
  }

  filterProducts = products.filter((product) => {
    return (
      Number(product.price) >= minPrice && Number(product.price) <= maxPrice
    );
  });

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

//DELETE DATA
const fnDeleteData = (id) => {
  products = products.filter((product) => {
    return product.id != id;
  });

  fnRender();
};

//EDIT DATA
const fnEditData = (id) => {
  fnRender(id);
};

//SAVE CHANGES
const fnSaveChanges = (id) => {
  const editName = document.querySelector("#edit--name");
  const editPrice = document.querySelector("#edit--price");
  const editStock = document.querySelector("#edit--stock");

  products.forEach((product) => {
    if (product.id == id) {
      product.name = editName.value;
      product.price = editPrice.value;
      product.stock = editStock.value;
    }
  });

  fnRender();
};

//CANCEL CHANGES
const fnCancelChanges = () => {
  fnRender();
};

//CART ARRAY
let cart = [];

//RENDERING CART LIST
let fnRenderCart = (ar) => {
  const productList = ar.map((product) => {
    let { id, name, price, category, qty } = product;
    return `
    <tr id="${id}">
      <td> ${id} </td>
      <td> ${category} </td>
      <td id="name-${id}"> ${name} </td>
      <td> $${price} </td>
      <td> ${qty} </td>
      <td> <button onclick="fnDeleteCart(${id})">Delete</button> </td>
    </tr>
    `;
  });

  document.querySelector("#cart--body").innerHTML = productList.join("");
};

//ADD TO CART
const fnAddToCart = (id) => {
  let newCart = true;
  products.forEach((product) => {
    if (product.id == id) {
      cart.forEach((cartProduct) => {
        if (product.id == cartProduct.id) {
          newCart = false;

          if (product.stock > 0) {
            cartProduct.qty++;
            product.stock--;
            fnRender();
          } else {
            alert(`The stock is ${cartProduct.stock}!`);
          }
        }
      });

      if (newCart == true) {
        cart.push({ ...product, qty: 1 });
        product.stock--;
        fnRender();
      }
    }
  });

  fnRenderCart(cart);
};

//DELETE PRODUCT IN CART
const fnDeleteCart = (id) => {
  //restore product stock
  products.forEach((product) => {
    if (product.id == id) {
      cart.forEach((cartProduct) => {
        if (cartProduct.id == id) {
          product.stock += cartProduct.qty;
        }
      });
    }
  });

  //delete product from cart
  cart = cart.filter((cartProduct) => {
    return cartProduct.id != id;
  });

  fnRenderCart(cart);
  fnRender();
};

//CHECKOUT
const fnCheckout = () => {
  const transactionaDetail = document.querySelector("#transaction_detail");

  const cartList = cart.map((product) => {
    let { name, price, category, qty } = product;
    return `
    [${category}] ${name} | $${price} x ${qty} = $${price * qty} <br>
    `;
  });

  let total = 0;
  cart.forEach((product) => {
    total += product.price * product.qty;
  });
  let tax = total * 0.1;

  transactionaDetail.innerHTML = `${cartList.join("")}<br>
  <b>Sub Total: $${total}</b> <br>
  <b>Tax: $${tax}</b> <br>
  <b>Sub Total: $${total + tax}</b> 
  `;
};
