import CountryDeaths from './CountryDeaths';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        worldWideData: state.covidTable.worldWideData,
        activeCountry: state.countryList.activeCountry,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryDeaths);