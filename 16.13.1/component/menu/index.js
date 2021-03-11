
import React, { Component } from 'react'
import { routers } from '../../routers'
import { Link } from "react-router-dom";

export default class MenuComponent extends Component {
  render(){
    return (
      <nav>
        <ul>
          {
            routers.map((item, index) => {
              const { title, path } = item
              return (
                <li key={index}>
                  <Link to={path}>{title}</Link>
                </li>
              )
            }) 
          }
        </ul>
      </nav>
    )
  }
}