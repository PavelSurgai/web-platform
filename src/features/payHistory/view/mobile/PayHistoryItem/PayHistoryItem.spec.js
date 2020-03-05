import React from 'react';
import { shallow } from 'enzyme';
import block from 'bem-cn';

import { PayHistoryItem } from './PayHistoryItem';

describe('PayHistoryItem tests', () => {
  const b = block('pay-history-item');
  const props = {
    locale: {
      amount: 'amount test',
      withdrawal: 'withdrawal test',
      withdrawalStatuses: { 0: 'Created', 1: 'During', 2: 'Paid out', 3: 'Blocked', 4: 'Canceled' },
      paymentTypes: { 1: 'Refill balance', 6: 'Bet win', 10: 'Withdrawal' },
    },
    item:
    { date: '18.07.2019 21:43', id: 10, paymentMode: 'Card', purse: null, status: 1, amount: 50, type: 'withdrawal' },
  };

  describe('PayHistoryItem with props', () => {
    const payHistoryItem = shallow(<PayHistoryItem {...props} />);
    const { locale } = props;
    const { date, amount } = props.item;

    it('render properly', () => {
      expect(payHistoryItem).toMatchSnapshot();
    });

    describe('render payHistoryItems', () => {
      it('render payHistoryItem type', () => {
        expect(payHistoryItem.find('.pay-history-item__type').text()).toEqual(locale.withdrawalStatuses[1]);
      });

      it('render payHistoryItem date', () => {
        expect(payHistoryItem.find('.pay-history-item__date').text()).toEqual(date);
      });

      it('render payHistoryItem purse', () => {
        expect(payHistoryItem.find('.pay-history-item__purse').text()).toEqual('');
      });

      it('render payHistoryItem amount-title', () => {
        expect(payHistoryItem.find('.pay-history-item__amount-title').text()).toEqual(`${locale.amount}: `);
      });

      it('render payHistoryItem amount-value', () => {
        expect(payHistoryItem.find('.pay-history-item__amount-value').text()).toEqual(amount.toString());
      });
    });

    it('render SVGInline', () => {
      expect(payHistoryItem.find('SVGInline')).toHaveLength(1);
    });

    it('have modificators', () => {
      const className = b('icon').toString();
      expect(payHistoryItem.find('SVGInline').props().className.toString()).toEqual(className.toString());
    });
  });
});