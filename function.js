window.onload=function(){
    document.getElementById("update").disabled=true;
}
var updatebtn=document.getElementsById("update");
updatebtn.onclick=function(){
    updateRecord(formData);
}
var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);    
    }
}

function readFormData() {
    var formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["gender"] = document.querySelector('input[name="gender"]:checked').value;
    formData["age"] = document.getElementById("age").value;
    formData["city"] = document.getElementById("city").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.gender;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.age;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.city;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<button onClick="onEdit(this)" style=" border-radius:15px;padding:3px 5px;background:#fff;" >Update</button>
                       <button a onClick="onDelete(this)" style="border-radius:15px;padding:3px 5px;background:#fff;" >Remove</button>`;
}

function resetForm() {
    document.getElementById("update").disabled=true;
    document.querySelector('input[type="submit"]').disabled=false;
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("city").value = "";
    selectedRow = null;
}

function onEdit(td) {
    document.getElementById("update").disabled=false;
    document.querySelector('input[type="submit"]').disabled=true;
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById('gender').value = selectedRow.cells[1].innerHTML;
    document.getElementById("age").value = selectedRow.cells[2].innerHTML;
    document.getElementById("city").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.gender;
    selectedRow.cells[2].innerHTML = formData.age;
    selectedRow.cells[3].innerHTML = formData.city;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("name").value == "") {
        isValid = false;
        document.getElementById("validation").classList.remove("displaynone");
    } else {
        isValid = true;
        if (!document.getElementById("validation").classList.contains("displaynone"))
            document.getElementById("validation").classList.add("displaynone");
    }
    return isValid;
}