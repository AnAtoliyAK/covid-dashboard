import React, { Component } from 'react';

import styles from './CountryLevel.module.css';

export default class CountryLevel extends Component {


  render() {
    return (
      <div className={styles.countryLevel}>
        <div>
          {/* TODO */}
          <div>{`${this.props.country.Country
            != null
            ? this.props.country.Country
            : `World`} confirmed`}</div>
          <div>{`NewDeaths: ${this.props.country.NewConfirmed
            != null
            ? this.props.country.NewConfirmed
            : this.props.global.NewConfirmed}`}</div>
          <div>{`TotalDeaths: ${this.props.country.TotalConfirmed
            != null
            ? this.props.country.TotalConfirmed
            : this.props.global.TotalConfirmed}`}</div>
          <div>{`${this.props.population
            != null
            ? `Population: ${this.props.population}`
            : ``}`}</div>
          <img className={styles.flag} src={this.props.flag != null ? this.props.flag : ''} alt=""/>
        </div>
      </div>
    )
  }
}