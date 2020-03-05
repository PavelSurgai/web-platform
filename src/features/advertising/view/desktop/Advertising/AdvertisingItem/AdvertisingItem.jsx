import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import './AdvertisingItem.scss';

const AdvertisingItem = ({ item }) => {
  const b = block('advertising-item');
  const newHTML = process.env.NODE_ENV === 'production' ? item.html : item.html.replace(new RegExp('src="', 'g'), 'src="https://seven-bet.com');
  return (
    <section className={b()} dangerouslySetInnerHTML={{ __html: newHTML }} />
  );
};

AdvertisingItem.propTypes = {
  item: PropTypes.shape({
    html: PropTypes.string,
  }),
};

export default AdvertisingItem;