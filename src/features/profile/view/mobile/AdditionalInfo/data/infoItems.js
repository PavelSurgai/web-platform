import firstName from './img/first-name.svg';
import lastName from './img/last-name.svg';
import numberDocument from './img/number-document.svg';
import phone from './img/phone.svg';

const infoItems = [
  {
    id: 'firstName',
    image: firstName,
  },
  {
    id: 'lastName',
    image: lastName,
  },
  {
    id: 'numberDocument',
    image: numberDocument,
  },
  {
    id: 'phone',
    image: phone,
  },
];

const stateItems = () => {
  let state = {};
  infoItems.forEach(temp => state = { ...state, [temp.id]: '' });
  return state;
};

export {
  infoItems,
  stateItems,
};