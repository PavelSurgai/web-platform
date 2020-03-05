import React, { useState, useEffect } from 'react';
import block from 'bem-cn';
import dayjs from 'dayjs';

import './Time.scss';

const Time = () => {
  const b = block('time');
  const currentTime = () => `${dayjs().format('HH')}:${dayjs().format('mm')}`;
  const [time, setTime] = useState(currentTime());
  useEffect(() => {
    const timeId = setInterval(() => {
      setTime(currentTime());
    }, 5000);
    return () => clearInterval(timeId);
  }, [time]);
  return (
    <div className={b()}>
      <span className={b('time')}>{time}</span>
      <div className={b('right')}>
        <span className={b('day')}>{dayjs().format('dddd')}</span>
        <span className={b('date')}>{dayjs().format('DD.MM.YYYY')}</span>
      </div>
    </div>
  );
};

export default Time;
