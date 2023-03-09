import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillCartFill } from 'react-icons/bs';
import { Badge } from '@material-ui/core';
import styled from 'styled-components';

const StyledNav = styled.nav`
  background-color: black;
  
  .nav-link {
    font-weight: normal;
    transition: all 0.3s ease;
    color: white;
  }

  .nav-link:hover {
    font-weight: bold;
  }
  
  .cart-total {
    margin-left: 0.8rem;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

function Nav(props) {
  return (
    <StyledNav className="navbar navbar-expand-lg bg-body-tertiary ">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <StyledDiv className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to="/">Levi's Crew</Link>
            <Link className="nav-link" to="/Bio">About</Link>
          </StyledDiv>
          <StyledDiv className="navbar-nav ms-auto">
            {
              props.user.apitoken
                ?
                <>
                  <Link className="nav-link" to="/Login" onClick={props.logMeOut}>Log Out</Link>
                  <Link className='nav-link'>Hello, {props.user.first_name}</Link>
                </>
                :
                <>
                  <Link className="nav-link" to="/Login">Log In</Link>
                </>
            }
            <Link className='nav-link' to='/Cart'>
              <Badge overlap="rectangular" badgeContent={props.cart.length} color="secondary">
                <BsFillCartFill />
              </Badge>
              <span className="cart-total">${props.cartTotal()}</span>
            </Link>
          </StyledDiv>
        </div>
      </div>
    </StyledNav>
  );
}

export default Nav;