/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import { useTranslation } from 'contexts/Localization'
import config from '../../Menu/config/config'

import UserMenu from '../../Menu/UserMenu'
import GlobalSettings from '../../Menu/GlobalSettings'
import ConnectWalletButton from '../../ConnectWalletButton';
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'

function Header() {
  const location = useLocation();
//   const mobileSidebarToggle = (e) => {
//     e.preventDefault();
//     document.documentElement.classList.toggle("nav-open");
//     const node = document.createElement("div");
//     node.id = "bodyClick";
//     node.onclick = function () {
//       // eslint-disable-next-line react/no-this-in-sfc
//       const parentEl = node && node.parentElement ? node.parentElement : null;

//       if (parentEl) {
//         parentEl.removeChild(node);
//         document.documentElement.classList.toggle("nav-open");
//       }
//     };
//     document.body.appendChild(node);
//   };

  const { currentLanguage, setLanguage, t } = useTranslation()
  const routes = config(t);
  const { account } = useActiveWeb3React()
  console.log(routes)
  console.log(location)

  const getActiveParent = () => {
    const parent = routes.filter((route) => {
        let isMatch = false
        if (route.href === '/liquidity') {
            return true
        }

        (route.items || []).forEach(subRoute => {
            if (!isMatch) {
              isMatch = subRoute.href === '/liquidity'
            }
        })
        if (isMatch) {
            return true
        }

        return false
    })

    if (parent.length) {
      return parent[0]
    }

    return {
      'items': [],
    }
  }

  return (
    <Navbar expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            // onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v" />
          </Button>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines" />
          <span className="navbar-toggler-bar burger-lines" />
          <span className="navbar-toggler-bar burger-lines" />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar>
            <Nav.Item>
              {getActiveParent().items.map((item, _) => {
                return (
                  <Nav.Link
                  className={
                    item.href === location.pathname
                      ? "m-0 active" : "m-0"}
                    href={item.href}
                  >
                    <i className="nc-icon nc-zoom-split" />
                    <span className="d-lg-block">
                      {item.label}
                    </span>
                  </Nav.Link>
                )
              })}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
