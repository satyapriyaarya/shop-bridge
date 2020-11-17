import axios from 'axios';

// Username: OpkohjbmHm
// Database name: OpkohjbmHm
// Password: IkomctmmV2
// Server: remotemysql.com
// Port: 3306
// const url = 'https://5fa901e3c9b4e90016e69dab.mockapi.io/api/v1/';
// CREATE TABLE Products (
//     [Id] int NOT NULL IDENTITY(1,1),
//     [Name] varchar(100) NOT NULL,
//     [Description] varchar(1000),
//     [Price] decimal,
//     [Image] varchar(100),
//     PRIMARY KEY (Id)
// );

const url = 'http://localhost:5001/api/';

export const AppServices = {
    GetProducts,
    GetProduct,
    AddProduct,
    EditProduct,
    DeleteProduct
}

function GetProducts() {
    return axios.get(`${url}products`);
}

function GetProduct(id) {
    return axios.get(`${url}products/${id}`)
}

function AddProduct(name, description, price, image) {
    var data = {
        name: name,
        description: description,
        price: price,
        image: image
    };
    return axios.post(`${url}products`, data);
}

function EditProduct(id, name, description, price, image) {
    var data = {
        id: id,
        name: name,
        description: description,
        price: price,
        image: image
    };
    return axios.put(`${url}products/${id}`, data);
}

function DeleteProduct(id) {
    return axios.delete(`${url}products/${id}`);
}