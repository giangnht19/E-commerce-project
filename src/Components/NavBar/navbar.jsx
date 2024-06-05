import React, { useContext, useState } from 'react';
import './navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext);

  return (
    <div className='navbar'>
      <div className="nav-logo" onClick={() => { setMenu("shop") }}>
        <Link to='/'><img src={logo} alt="logo" /></Link>
        <p className="nav-logo" onClick={() => { setMenu("shop") }}><Link to='/'>FashFRENZY</Link></p>
      </div>
      <ul className="nav-menu">
        <li className={menu === "shop" ? "active" : ""} onClick={() => { setMenu("shop") }}>
          <Link to='/'>Shop</Link>
          <hr />
        </li>
        <li className={menu === "mens" ? "active" : ""} onClick={() => { setMenu("mens") }}>
          <Link to='/mens'>Men</Link>
          <hr />
        </li>
        <li className={menu === "womens" ? "active" : ""} onClick={() => { setMenu("womens") }}>
          <Link to='/womens'>Women</Link>
          <hr />
        </li>
        <li className={menu === "kids" ? "active" : ""} onClick={() => { setMenu("kids") }}>
          <Link to='/kids'>Kids</Link>
          <hr />
        </li>
      </ul>
      <div className="nav-login-start">
        <Link to='/login'><button>Login</button></Link>
        <Link to='/cart'><img src={cart_icon} alt="cart_icon" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
}

export default Navbar;
