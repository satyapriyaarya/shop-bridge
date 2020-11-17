
import { Component, Fragment } from 'react';
import './App.css';
import { AppServices } from './app.services';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      id: '',
      name: '',
      description: '',
      price: 0,
      image: null,
      classForName: 'form-control txt',
      classForDesscription: 'form-control txt',
      classForPrice: 'form-control txt',
      valid: false,
      editMode: false
    }
  }

  componentDidMount() {
    this.setState({ products: this.getAllProducts() });
  }

  getAllProducts = () => {
    return AppServices.GetProducts()
      .then(result => {
        this.setState({ products: result.data })
      })
      .catch(function (error) {
        return console.log('Error', error);
      });
  }
  isEmptyOrNull = (str) => {
    str = (str === undefined || str == null) ? "" : str.toString().trim();
    if (str === "")
      return true;
    return false;
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleOnChangeFile = e => {
    this.setState({
      image: e.target.files[0]
    })
    console.log(e.target.files[0]);
    const fd = new FormData();
    fd.append('File', e.target.files[0], e.target.files[0].name);

  }
  AddProducts = () => {
    console.log(this.state.price)
    // e.preventDefault();
    this.setState({ valid: true });
    !this.isEmptyOrNull(this.state.name) ? this.setState({ classForName: 'form-control txt' }) : this.setState({ classForName: 'form-control txt required', valid: false })
    !this.isEmptyOrNull(this.state.description) ? this.setState({ classForDesscription: 'form-control txt' }) : this.setState({ classForDesscription: 'form-control txt required', valid: false })
    !this.isEmptyOrNull(this.state.price) ? this.setState({ classForPrice: 'form-control txt' }) : this.setState({ classForPrice: 'form-control txt required', valid: false })
    if (this.isEmptyOrNull(this.state.name) || this.isEmptyOrNull(this.state.description) || this.isEmptyOrNull(this.state.price)) {
      console.log('Invalid') //We can use bootstrap Toaste
    }
    else {
      var id = 0;
      if (this.state.editMode) {
        id = this.state.products && this.state.products.length > 0 ? this.state.products.sort((x, y) => x - y)[this.state.products.length - 1]['id'] : 1;
        console.log('satya:', id);
        AppServices.EditProduct(id, this.state.name, this.state.description, parseFloat(this.state.price), this.state.image).then(result => {
          this.setState({
            products: this.getAllProducts(),
            id: '',
            name: '',
            description: '',
            price: 0,
            image: null,
            editMode: false
          })
        });
      }
      else {
        AppServices.AddProduct(this.state.name, this.state.description, parseFloat(this.state.price), this.state.image).then(result => {
          this.setState({
            products: this.getAllProducts(),
            id: '',
            name: '',
            description: '',
            price: 0,
            image: null,
            editMode: false
          })
        });
      }

      // this.setState({
      //   products: [...this.state.products, {
      //     id: id,
      //     name: this.state.name,
      //     description: this.state.description,
      //     price: this.state.price,
      //     image: this.state.image
      //   }],
      //   id: '',
      //   name: '',
      //   description: '',
      //   price: '',
      //   image: '',
      //   editMode: false
      // })
    }
    // console.log(this.state.products);
  }

  onEdit = (id) => {
    var prod = this.state.products && this.state.products.length > 0 && this.state.products.filter(x => x.id === id);
    this.setState({
      id: prod[0]['id'],
      name: prod[0]['name'],
      description: prod[0]['description'],
      price: prod[0]['price'],
      image: prod[0]['image'],
      editMode: true
    })
    // console.log(prod);
  }
  delete = (id) => {
    AppServices.DeleteProduct(id).then(result => {
      this.setState({
        products: this.getAllProducts(),
        editMode: false
      })
    })
  }
  cancel = () => {
    this.setState({
      id: '',
      name: '',
      description: '',
      price: 0,
      image: null,
      editMode: false
    })
  }
  render() {
    return (
      <Fragment>
        <header className="container">
          {/* <form name='form'> */}
          <div className="row">
            <div className='col-sm-6'>
              <input name="name" className={this.state.classForName} maxLength="100" placeholder="Product name"
                value={this.state.name} onChange={this.handleOnChange} />
            </div>
            <div className='col-sm-6'>
              <input type="number" name="price" className={this.state.classForPrice} placeholder="Price"
                value={this.state.price} onChange={this.handleOnChange} />
            </div>
            <div className='col-sm-6'>
              <textarea name="description" className={this.state.classForDesscription} rows="5" maxLength="1000" placeholder="Desctiption"
                value={this.state.description} onChange={this.handleOnChange} />
            </div>
            <div className='col-sm-6'>
              <input type="file" name="image" className="form-control txt" placeholder="Image"
                value={this.state.image} onChange={this.handleOnChangeFile} />
            </div>
          </div>
          <div className="row">
            {this.state.editMode ? (
              <Fragment>
                <button name="edit" className='form-control btn primary-btn' onClick={this.AddProducts.bind(this)}>Update</button>
                <button name="cancel" className='form-control btn primary-btn' onClick={this.cancel.bind(this)}>Cancel</button>
              </Fragment>
            ) : (
                <button name="add" className='form-control btn primary-btn' onClick={this.AddProducts.bind(this)}>Add</button>
              )}
          </div>

          {/* </form> */}
          <div className='col'>
            <h2>List of products</h2>
            {(!this.state.products || this.state.products.length === 0) && <div>No products addded yet</div>}
            {this.state.products && this.state.products.length > 0 &&
              <div>
                <div className='row'>
                  <div className='col'><label>Product Name</label></div>
                  <div className='col'><label>Description</label></div>
                  <div className='col'><label>Price</label></div>
                  <div className='col'><label>Image</label></div>
                  <div className='col'><label>Action</label></div>
                  <div className='col'><label></label></div>
                </div>
                {(this.state.products.map((x, key) => {
                  return <div className='row' key={key}>
                    <div className='col'><label>{x.name}</label></div>
                    <div className='col'><label>{x.description}</label></div>
                    <div className='col'><label>{x.price}</label></div>
                    <div className='col'><label>{x.image}</label></div>
                    <div className='col'>
                      <button name="edit" className="form-control btn" onClick={this.onEdit.bind(this, x.id)}>Edit</button>
                    </div>
                    <div className='col'>
                      <button name="delete" className="form-control btn" onClick={this.delete.bind(this, x.id)}>Delete</button>
                    </div>
                  </div>
                }))}
              </div>
            }

          </div>
        </header>
      </Fragment>
    );
  }
}

export default App;