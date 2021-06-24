import React, { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { ProductCard } from '../../component/Product-Card';
import axios from 'axios'
import './index.css';
import { useAuth } from '../../contexts/auth';

export const HomePage: FC = () => {
  const [products, setProducts] = useState([])
  const [userName, setUsername] = useState("")
  const [name, setName] = useState("")
  const { signed, Logout } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!signed)
      return history.push('/login')

    const userData = JSON.parse(sessionStorage.getItem('@App:user') || "");
    setName(userData['name'])
    setUsername(userData['username'])

    axios
      .get("http://localhost:8080/Products")
      .then((response) => {
        setProducts(response.data.products)
      })
      .catch((error) => {
        alert("Ocorreu um erro ao buscar os items");
      });
  }, []);

  return (
    <div className="container">
      <header>
        <div className="box-img">
          <img src="https://media-exp1.licdn.com/dms/image/C4E03AQETZvmUgtIO6A/profile-displayphoto-shrink_200_200/0/1623763617178?e=1629936000&v=beta&t=ZD3nkB4kvorBW24sdrdWFz4x_wk3oc1B2MozGSSCnTw"></img>
        </div>
        <div className="box-info">
          <div className="user-info">
            <span>Username: {userName}</span>
            <br />
            <span>Nome: {name}</span>
          </div>
          <div className="end-position">
            <button type="button" onClick={() => Logout(history)}>
              Sair
              </button>
          </div>
        </div>
      </header>

      <div className="topnav">
        <a className="" href="">Home</a>
        <a className="active" href="">Produtos</a>
        <a className="" href="">Favoritos</a>
      </div>


      <main className="cards-container">
        {products.map(e => <ProductCard
          key={e['_id']}
          _id={e['_id']}
          name={e['description']}
          imgSrc={e['imgUrl']}
          afterPrice={Number(e['afterPrice'])}
          price={Number(e['price'])} 
          isFavorited={false} />)}
      </main>
    </div>
  );
};
