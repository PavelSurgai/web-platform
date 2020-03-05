import visa from '../view/icons/topUp/visa.png';
import yandexIcon from '../view/icons/topUp/yandex-money.png';
import qiwiIcon from '../view/icons/topUp/qiwi.png';
import webmoney from '../view/icons/topUp/webmoney.png';

export const withdrawalMethods = [
  {
    type: 'Card',
    name: 'VISA & Master Card',
    iconFileNames: visa,
  },
  {
    type: 'Yandex',
    name: 'Yandex',
    iconFileNames: yandexIcon,
  },
  {
    type: 'QIWI',
    name: 'QIWI',
    iconFileNames: qiwiIcon,
  },
  {
    type: 'Webmoney',
    name: 'Webmoney',
    iconFileNames: webmoney,
  },
];