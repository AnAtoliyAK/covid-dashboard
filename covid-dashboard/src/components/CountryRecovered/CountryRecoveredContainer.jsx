import CountryRecovered from './CountryRecovered'
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        global: state.cases.global,
        country: state.cases.country,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryRecovered);