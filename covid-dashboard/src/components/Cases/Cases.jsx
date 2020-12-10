import * as axios from 'axios';

import React, { Component } from 'react';

import styles from './Cases.module.css';

export default class Cases extends Component {
  componentDidMount() {
    axios.get(`https://api.covid19api.com/summary`)
      .then(response => {
        this.props.setGlobalData(response.data.Global);
        this.props.setCountriesData(response.data.Countries);
      });
  }

  onCountryChanged(activeCountry) {
    this.props.setActiveCountry(activeCountry);
    axios.get(`https://restcountries.eu/rest/v2/name/${activeCountry}?fullText=true`)
    .then(response => {
      console.log('Response',response.data[0].population);
      console.log('Response2',response.data[0].flag);
        this.props.setPopulation(response.data[0].population);
        this.props.setFlagUrl(response.data[0].flag);

    });
}

  render() {
    return (
      <div className={styles.cases}>
        <div>
          {this.props.countries.map(c => {
            return <div
              key={c.CountryCode}
              className={styles.countries}
              onClick={() => { this.onCountryChanged(c.Country) }}>
              <span>{c.TotalConfirmed}</span>
              <span>{c.Country}</span>
            </div>
          })}
        </div>

      </div>
    )
  }
}