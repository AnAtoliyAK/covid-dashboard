import * as axios from 'axios';

import React, { Component } from 'react';

import CountrySearchContainer from './CountrySearch/CountrySearchContainer';
import styles from './CountryList.module.scss';

const WORLD_WIDE_NUMBERS = {
  POPULATION_KOEFICIENT: 100000,
};

const POPULATION_COUNT_TYPE = {
  ABSOLUTE_TYPE: 'absolute',
  RELATIVE_TYPE: 'relative',
};

const COUNTRY_SELECTED = {
  TRUE: true,
  FALSE: false,
}
export default class CountryList extends Component {
  componentDidMount() {
    axios.get(`https://api.covid19api.com/summary`).then((response) => {
      this.props.setGlobalData(response.data.Global);
      this.props.setCountriesData(response.data.Countries);
      this.props.setCovidTableWorldWideData(response.data.Global);
    });
  }

  onCountryChanged(activeCountry) {
    this.props.setActiveCountry(activeCountry);
    this.props.setIsCountrySelected(COUNTRY_SELECTED.TRUE);
    axios
      .get(
        `https://restcountries.eu/rest/v2/name/${activeCountry.Country}?fullText=true`
      )
      .then((response) => {
        const activeCountryPopulation = response.data[0].population;
        const activeCountryFlag = response.data[0].flag;
        const newActiveCountry = this.convertActiveCountryToRelativePopulationType(activeCountry, activeCountryPopulation);

        this.props.setPopulation(activeCountryPopulation);
        this.props.setFlagUrl(activeCountryFlag);

        this.props.setActiveCountry(activeCountry);
        this.props.setActiveRelativeCountry(newActiveCountry);

        if (
          this.props.populationValueType === POPULATION_COUNT_TYPE.RELATIVE_TYPE
        ) {
          this.props.setCovidTableActiveCountry(newActiveCountry);

        } else {
          this.props.setCovidTableActiveCountry(activeCountry);
        }
      });
  }

  convertActiveCountryToRelativePopulationType(activeCountry, activeCountryPopulation) {
    const newActiveCountry = { ...activeCountry };
    newActiveCountry.NewDeaths = this.convertNumberToRelativePopulationType(activeCountry.NewDeaths, activeCountryPopulation);
    newActiveCountry.TotalDeaths = this.convertNumberToRelativePopulationType(activeCountry.TotalDeaths, activeCountryPopulation);
    newActiveCountry.NewRecovered = this.convertNumberToRelativePopulationType(activeCountry.NewRecovered, activeCountryPopulation);
    newActiveCountry.TotalRecovered = this.convertNumberToRelativePopulationType(activeCountry.TotalRecovered, activeCountryPopulation);
    newActiveCountry.NewConfirmed = this.convertNumberToRelativePopulationType(activeCountry.NewConfirmed, activeCountryPopulation);
    newActiveCountry.TotalConfirmed = this.convertNumberToRelativePopulationType(activeCountry.TotalConfirmed, activeCountryPopulation);

    return newActiveCountry;
  }

  convertNumberToRelativePopulationType(number, population) {
    return Math.floor(
      (number / population) * WORLD_WIDE_NUMBERS.POPULATION_KOEFICIENT
    );
  }

  render() {
    return (
      <div className={styles.countryList}>
        <div>
          <CountrySearchContainer />
          {this.props.countryList.map((c) => {
            return (
              <div key={c.CountryCode}>
                <div
                  className={styles.countries}
                  onClick={() => {
                    this.onCountryChanged(c);
                  }}
                >
                  <img
                    alt="logo"
                    src={`https://www.countryflags.io/${c.CountryCode}/shiny/64.png`}
                    className={styles.countryItem_flag}
                  />
                  <span className={styles.totalConfirmed}>{c.TotalConfirmed}</span>
                  <span>{c.Country}</span>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
