import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import './CurrencySelector.scss';

class CurrencySelector extends React.Component {
  state = { isOpen: false };

  static propTypes = {
    itemsList: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeValue: PropTypes.string.isRequired,
    callBack: PropTypes.func.isRequired,
  }

  render() {
    const b = block('currency-selector');
    const { isOpen } = this.state;
    const { itemsList, activeValue, callBack } = this.props;
    const optionsList = itemsList.filter(temp => activeValue !== temp).map(temp => (
      <div key={temp} className={b('item')} onClick={() => callBack(temp)}>
        {temp}
      </div>
    ));
    return (
      <div className={b()} onClick={this.changeOpened}>
        <div className={b('active-item', { opened: isOpen ? 'open' : 'close' })}>
          {itemsList.find(temp => activeValue === temp)}
        </div>
        <div className={b('additional-items')}>
          {isOpen && optionsList}
        </div>
      </div>
    );
  }

  changeOpened = () => this.setState(state => ({ isOpen: !state.isOpen }));
}

export default CurrencySelector;