import React, { useState, useEffect } from 'react';
import block from 'bem-cn';
const Stub = () => {
  const b = block('stub');
  const [timeLeft, setTimeLeft] = useState({ days: null, hours: null, min: null, sec: null });
  useEffect(() => {
    const currentTime = new Date();
    const targetTime = new Date(2020, 0, 4, 23, 0, 0, 0);
    const temp = targetTime - currentTime;
    const diff = new Date(+temp);
    const daysL = diff.getDate();
    const hoursL = diff.getHours();
    const minL = diff.getMinutes();
    const secL = diff.getSeconds();
    const timeL = { days: daysL, hours: hoursL, min: minL, sec: secL };
    setTimeLeft(timeL);
  }, [timeLeft]);
 
  return (
    <div className="stub__wrapper">
      <div className={b()}>
        <div className={b('text')}>Сайт временно приостановлен на техническое обновление</div>
        <div className={b('text')}>{` До возобновления работы сайта: ${timeLeft.days}д. ${timeLeft.hours}ч. ${timeLeft.min}мин. ${timeLeft.sec}сек. `}</div>
        <a href="https://www.free-kassa.ru/">
          <img src="https://www.free-kassa.ru/img/fk_btn/17.png" alt="freekassa" />
        </a>
      </div>
    </div>
  );
};

export default Stub;