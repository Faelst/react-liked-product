import React, { FC, useState } from 'react';
import api from '../../service/api';
import './index.css'

interface Product {
  _id: string
  name: string
  imgSrc: string
  afterPrice: Number
  price: Number
  isFavorited: Boolean
}

export const ProductCard: FC<Product> = (props: Product) => {
  const [isFavorited, setIsFavorited] = useState(props.isFavorited)
  
  function handleChangeFavorite(event: any){
    setIsFavorited(!isFavorited)
    const productId = event['target'].id
    const userId = JSON.parse(sessionStorage.getItem('@App:user') || "")['_id']

    api.post('/favoriteProduct', {
      productId: productId,
      userId: userId,
      isFavorited: !isFavorited
    })
  }

  return (
    <div className="card">
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
          <button id={props._id} className="btn-like" onClick={handleChangeFavorite}>
            <i className="fa fa-thumbs-up"></i>
            <span className="icon">{isFavorited ? <img id={props._id} src="./heart-marked.png"></img> : <img id={props._id} src="./heart.png"></img>}</span>
          </button>
        </div>
      </div>
    </div>
  )
}