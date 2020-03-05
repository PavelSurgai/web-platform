import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions } from '../../../redux';

import AdvertisingItem from './AdvertisingItem';

import './Advertising.scss';

class Advertising extends React.Component {
  static propTypes = {
    advertising: PropTypes.arrayOf(PropTypes.shape({
      html: PropTypes.string,
    })).isRequired,
    loadAdvertising: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
  }

  componentWillMount() {
    this.loadAdvertisingList();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.lang !== this.props.lang) this.loadAdvertisingList();
  }
  

  render() {
    const b = block('advertising');
    const { advertising } = this.props;

    const advertisingList = advertising.map((temp, index) => <AdvertisingItem key={index} item={temp} />);
    
    return (
      <article className={b()}>
        {advertisingList}
      </article>
    );
  }

  loadAdvertisingList = () => this.props.loadAdvertising();
}

const mapStatetoProps = state => ({
  advertising: state.advertising.advertising,
  lang: state.userSettings.lang,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(Advertising);