import React, { FC, useContext } from 'react';
import { useHistory } from 'react-router';
import { AuthService } from '../../service/auth';
import { GlobalStateContext } from '../../state';
import './index.css'

interface Product {
  _id: string
  name: string
  imgSrc: string
  afterPrice: Number
  price: Number
}

export const ProductCard: FC<Product> = (props: Product) => {

  
  return (
    <div key={props._id} className="card">
      <img src={props.imgSrc} alt="Avatar"></img>
      <div className="container">
        <h4>
          <b>{props.name}</b>
        </h4>
        <p>de R$ {props.afterPrice.toFixed(2)} por</p>
        <h3>
          <b>R$ {props.price.toFixed(2)}</b>
        </h3>
        <h5>
          ou <strong>12x R$ {(Number(props.price) / 12).toFixed(2)}</strong> s/ juros
      </h5>
        <hr />
        <div className="box-btn">
          <button className="btn-buy">Comprar</button>
          <button className="btn-like">
            <i className="fa fa-thumbs-up"></i>
            <span className="icon"><img src="./heart.png"></img></span>
          </button>
        </div>
      </div>
    </div>
  )
}