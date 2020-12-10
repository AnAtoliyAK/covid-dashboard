import React, { Component } from 'react';

import styles from './CountryRecovered.module.scss';

export default class CountryRecovered extends Component {


  render() {
    return (
      <div className={styles.countryRecovered}>

        <div>
          <div>{`${this.props.country.Country
            != null
            ? this.props.country.Country
            : `World`} recovered`}</div>
          <div>{`NewRecovered: ${this.props.country.NewRecovered
            != null
            ? this.props.country.NewRecovered
            : this.props.global.NewRecovered}`}</div>
          <div>{`TotalRecovered: ${this.props.country.TotalRecovered
            != null ? this.props.country.TotalRecovered
            : this.props.global.TotalRecovered}`}</div>
        </div>
      </div>
    )
  }
}