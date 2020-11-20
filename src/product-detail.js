
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import './App.css';
import { AppServices } from './app.services';
import { withRouter } from 'react-router';
import { IMAGE_URL, URL } from './constants';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: []
      // id: '',
      // name: '',
      // description: '',
      // price: 0,
      // image: null,
      // classForName: 'form-control txt',
      // classForDesscription: 'form-control txt',
      // classForPrice: 'form-control txt',
      // valid: false,
      // editMode: false
    }
  }

  componentDidMount() {
    console.log('ID:', this.props.match.params.id)
    this.setState({ product: this.getProduct(this.props.match.params.id) });
  }

  getProduct = (id) => {
    return AppServices.GetProduct(id)
      .then(result => {
        this.setState({ product: result.data })
      })
      .catch(function (error) {
        return console.log('Error', error);
      });
  }


  render() {
    return (
      <Fragment>
        <header className="container">
          <Link to="/">Back</Link>
          <div className='col'>

            {(!this.state.product || this.state.product.length === 0) && <div>No product Exits</div>}
            {this.state.product &&
              <div>
                <h2>Product Detail - {this.state.product['name']}</h2>
                <div className='col'><label>ID: {this.state.product['id']}</label></div>
                <div className='col'><label> Name: {this.state.product['name']}</label></div>
                <div className='col'><label>Description: {this.state.product['description']}</label></div>
                <div className='col'><label>Price: {this.state.product['price']}</label></div>
                <div className='col'><label> <img src={this.state.product['image'] ? `${IMAGE_URL}${this.state.product['image']}` : `${IMAGE_URL}noimg.png`} alt="no " width="500px" /> </label></div>
              </div>
            }

          </div>
        </header>
      </Fragment >
    );
  }
}

export default withRouter(ProductDetail);