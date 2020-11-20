import axios from 'axios';
import { URL } from './constants'
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



export const AppServices = {
    GetProducts,
    GetProduct,
    AddProduct,
    EditProduct,
    DeleteProduct,
    UploadFile
}

function GetProducts() {
    return axios.get(`${URL}products`);
}

function GetProduct(id) {
    return axios.get(`${URL}products/${id}`)
}

function AddProduct(name, description, price, image) {
    var data = {
        name: name,
        description: description,
        price: price,
        image: image
    };
    console.log('SAVE:', data)
    return axios.post(`${URL}products`, data);
}

function EditProduct(id, name, description, price, image) {
    var data = {
        id: id,
        name: name,
        description: description,
        price: price,
        image: image
    };
    return axios.put(`${URL}products/${id}`, data);
}

function DeleteProduct(id) {
    return axios.delete(`${URL}products/${id}`);
}

function UploadFile(file, fileName) {
    console.log('hehe:', file, fileName);
    const fd = new FormData();
    fd.append("formFile", file);
    fd.append("fileName", fileName)
    return axios.post(`${URL}products/image`, fd);
}