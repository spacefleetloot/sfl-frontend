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
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";
import { useTranslation } from 'contexts/Localization'

// import logo from "assets/img/reactlogo.png";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  const { currentLanguage, setLanguage, t } = useTranslation()
  console.log('routes', routes(t))
  console.log(location)
  return (
    <div className="sidebar" data-image={image}>
      <div
        className="sidebar-background"
        // style={{
        //   backgroundImage: "url(" + image + ")",
        // }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="/"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              spacefleet
            </div>
          </a>
        </div>
        <Nav>
          {routes(t).map((prop, _) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    location.pathname.includes(prop.href)
                      ? "active"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={`key_${Math.random()}`}
                >
                  <NavLink
                    to={prop.href}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.label}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
