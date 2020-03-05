import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import Input from 'components/Input/desktop';
import Button from 'components/Button/desktop';
import './AdditionalInfo.scss';

export class AdditionalInfo extends React.Component {
  state = {
    yandex: '',
    card: '',
    numberDocument: '',
    address: '',
  }

  static propTypes = {
    locale: PropTypes.object.isRequired,
    yandex: PropTypes.string.isRequired,
    card: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    numberDocument: PropTypes.string.isRequired,

    updateUserInfo: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { yandex, card, numberDocument, address } = this.props;
    this.setState({
      yandex,
      card,
      numberDocument,
      address,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { yandex, card, numberDocument, address } = this.state;
    if (nextProps.yandex !== yandex || nextProps.card !== card ||
    nextProps.numberDocument !== numberDocument || nextProps.address !== address) {
      this.setState({
        yandex: nextProps.yandex,
        card: nextProps.card,
        numberDocument: nextProps.numberDocument,
        address: nextProps.address,
      });
    }
  }

  onInputChange = e => this.setState({ [e.currentTarget.name]: e.currentTarget.value });

  render() {
    const b = block('additional-info');
    const { locale, updateUserInfo } = this.props;
    const { yandex, card, numberDocument, address } = this.state;
    return (
      <section className={b()}>
        <h5 className={b('title')}>{locale.additionalInfo}</h5>
        <form
          className={b('info')}
          onSubmit={e => {
            e.preventDefault();
            updateUserInfo(this.state);
          }}
        >

          <label className={b('item')}>
            <span className={b('item-title')}>{`${locale.yandex}:`}</span>
            <div className={b('item-field')}>
              <Input value={yandex} name="yandex" callBack={this.onInputChange} />
            </div>
          </label>

          <label className={b('item')}>
            <span className={b('item-title')}>{`${locale.card}:`}</span>
            <div className={b('item-field')}>
              <Input value={card} name="card" callBack={this.onInputChange} />
            </div>
          </label>

          <label className={b('item')}>
            <span className={b('item-title')}>{`${locale.numberDocument}:`}</span>
            <div className={b('item-field')}>
              <Input value={numberDocument} name="numberDocument" callBack={this.onInputChange} />
            </div>
          </label>

          <label className={b('item')}>
            <span className={b('item-title')}>{`${locale.address}:`}</span>
            <div className={b('item-field')}>
              <Input value={address} name="address" callBack={this.onInputChange} />
            </div>
          </label>
          
          <div className={b('stub')} />

          <div className={b('button')}>
            <Button
              type="submit"
              text={locale.save}
              size="low"
              color="green"
            />
          </div>
        </form>
      </section>
    );
  }
}