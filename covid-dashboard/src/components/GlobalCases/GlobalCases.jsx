import React, { Component } from 'react';

import styles from './GlobalCases.module.scss';

export default class GlobalCases extends Component {
  render() {
    return (
      <div className={styles.globalCases}>GlobalCases
        <div>
          {this.props.global.TotalConfirmed}
        </div>
      </div>
    )
  }
}