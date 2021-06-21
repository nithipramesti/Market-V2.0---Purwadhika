const inputData = () => {
  const inputName = document.querySelector("#input--name").value;
  const inputPrice = document.querySelector("#input--price").value;
  const inputCategory = document.querySelector("#input--category").value;
  const inputStock = document.querySelector("#input--stock").value;

  const inputInputField = document.querySelectorAll(".input--input_field");

  const tableData = document.querySelector("#table-data");

  tableData.innerHTML += `<tr>
  <td>124345</td>
  <td>${inputCategory}</td>
  <td>${inputName}</td>
  <td>${inputPrice}</td>
  <td>${inputStock}</td>
  </tr>`;

  inputInputField.forEach((input) => {
    input.value = "";
  });
};
