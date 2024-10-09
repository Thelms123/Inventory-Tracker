/* Product class */

class Product{
    constructor(name, quantity, price, description){
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.description = description;
    }
    getName(){
        return this.name;
    }
    setName(){
        this.name = name;
    }
    getQuantity(){
        return this.quantity;
    }
    setQuantity(newQuantity){
        this.quantity = newQuantity;
    }
    getPrice(){
        return this.price;
    }
    setPrice(price){
        this.price = price;
    }
    getDescription(){
        return this.description;
    }
    setDescription(description){
        this.description = description;
    }
}
/* Inventory class */
class Inventory{
    constructor(){
        this.product = [];
    }
    getProduct(){
        return this.product;
    }
    addProduct(product){
        this.product.push(product);
    }
    deleteProduct(name){
        this.product = this.product.filter(p => p.getName() !== name);
    }
    calculateTotal(){
        return this.product.reduce((total, product) => total + parseFloat(product.getPrice()), 0);
    }
    updateProductQuantity(name, quantity){
        const product = this.product.find(p => p.getName() === name);
        if(product){
            product.setQuantity(quantity);
        }
    }
}

const inventory = new Inventory();
document.getElementById('addProductBtn').addEventListener('click', () =>{
    const name = document.getElementById('productName').value;
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const price = (document.getElementById('productPrice').value);
    const description = document.getElementById('productDescription').value;

    if(name && quantity >= 0){
        const product = new Product(name,quantity,price,description);
        inventory.addProduct(product);
        updateTable();
    }

});

function updateTable(){
    const tableBody = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML= '';

    inventory.getProduct().forEach(product =>{
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = product.getName();
        row.insertCell(1).textContent = product.getQuantity();
        row.insertCell(2).textContent = product.getPrice();
        row.insertCell(3).textContent = product.getDescription();

        
        const actionCell = row.insertCell(4);
        const updateBtn = document.createElement('button');
        updateBtn.textContent = 'Update Quantity';
        updateBtn.addEventListener('click', () => {
            const currentQuantity = product.getQuantity();
            const newQuantityString = prompt('Enter new quantity:', currentQuantity);
            const newQuantity = parseInt(newQuantityString);

            if (!isNaN(newQuantity) && newQuantity >= 0) {
                product.setQuantity(newQuantity);
                updateTable(); 
            } else {
                console.error('Invalid quantity entered. Please enter a valid number.');
            }
        });
        actionCell.appendChild(updateBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            inventory.deleteProduct(product.getName());
            updateTable();
        });
        actionCell.appendChild(deleteBtn);
    });

    const totalAmount = inventory.calculateTotal();
    document.getElementById('totalAmount').textContent = `N${totalAmount.toFixed(2)}`;
}