import mir from '../../view/icons/topUp/mir.png';
import visa from '../../view/icons/topUp/visa.png';
import masterCard from '../../view/icons/topUp/master-card.png';
import yandexIcon from '../../view/icons/topUp/yandex-money.png';
import litecoin from '../../view/icons/topUp/litecoin.png';
import bitcoin from '../../view/icons/topUp/bitcoin.png';
import qiwiIcon from '../../view/icons/topUp/qiwi.png';
import payeer from '../../view/icons/topUp/payeer.png';
import perfectMoney from '../../view/icons/topUp/perfectMoney.png';
import advcash from '../../view/icons/topUp/advcash.png';
import mts from '../../view/icons/topUp/mts.png';
import beeline from '../../view/icons/topUp/beeline.png';
import tele2 from '../../view/icons/topUp/tele2.png';
import megafon from '../../view/icons/topUp/megafon.png';
import webmoney from '../../view/icons/topUp/webmoney.png';

const MethodTypes = {
  INTERKASSA: 'INTERKASSA',
  FREEKASSA: 'FREEKASSA',
};

const paymentMode = {
  yandex: {
    card: 'AC',
    yandex: 'PC',
  },
  freekassa: {
    qiwi: '63', // interkassa
    visa: '160',
    mastercard: '160',
    yandex: '45',
    litecoin: '147', // interkassa
    bitcoin: '116', // interkassa
    payeer: '114',
    perfectMoney: '64',
    advcash: '150', // interkassa
    mts: '84', // interkassa
    beeline: '83', // interkassa
    tele2: '132', // interkassa
    megafon: '82', // interkassa
    webmoney: '1',
  },
  interkassa: {
    advcash: {
      via: 'advcash_advcash_merchant_rub',
      pm: 196,
    },
    qiwi: {
      via: 'qiwi_qiwi_merchantPsp_rub',
      pm: 229,
    },
    bitcoin: {
      via: 'bitcoin_advcash_merchant_rub',
      pm: 216,
    },
    litecoin: {
      via: 'litecoin_advcash_merchant_rub',
      pm: 504,
    },
    mts: {
      via: 'mts_mpay_merchantGambling_rub',
      pm: 435,
    },
    megafon: {
      via: 'megafon_mpay_merchantGambling_rub',
      pm: 436,
    },
    beeline: {
      via: 'beeline_mpay_merchantGambling_rub',
      pm: 437,
    },
    tele2: {
      via: 'tele2_mpay_merchantGambling_rub',
      pm: 438,
    },
  },
};

const TopUpMethods = {
  VISA: {
    id: 'FREEKASSA',
    title: 'visa',
    iconFileNames: visa,
    phoneIsRequired: false,
    paymentMode: paymentMode.freekassa.visa,
  },
  MASTERCARD: {
    id: 'FREEKASSA',
    title: 'mastercard',
    iconFileNames: masterCard,
    phoneIsRequired: false,
    paymentMode: paymentMode.freekassa.mastercard,
  },
  QIWI: {
    id: 'FREEKASSA',
    title: 'qiwi',
    iconFileNames: qiwiIcon,
    phoneIsRequired: false,
    paymentMode: paymentMode.freekassa.qiwi,
  },
  YANDEX_MONEY: {
    id: 'FREEKASSA',
    title: 'yandexMoney',
    iconFileNames: yandexIcon,
    phoneIsRequired: false,
    paymentMode: paymentMode.freekassa.yandex,
  },
  WEBMONEY: {
    id: 'FREEKASSA',
    title: 'webmoney',
    iconFileNames: webmoney,
    phoneIsRequired: false,
    paymentMode: paymentMode.freekassa.webmoney,
  },
  LITECOIN: {
    id: 'FREEKASSA',
    title: 'litecoin',
    iconFileNames: litecoin,
    phoneIsRequired: false,
    paymentMode: paymentMode.freekassa.litecoin,
  },
  BITCOIN: {
    id: 'FREEKASSA',
    title: 'bitcoin',
    iconFileNames: bitcoin,
    phoneIsRequired: false,
    paymentMode: paymentMode.freekassa.bitcoin,
  },
  PAYEER: {
    id: 'FREEKASSA',
    title: 'payeer',
    iconFileNames: payeer,
    phoneIsRequired: false,
    paymentMode: paymentMode.freekassa.payeer,
  },
  PERFECT_MONEY: {
    id: 'FREEKASSA',
    title: 'perfectMoney',
    iconFileNames: perfectMoney,
    phoneIsRequired: false,
    paymentMode: paymentMode.freekassa.perfectMoney,
  },
  ADVCASH: {
    id: 'FREEKASSA',
    title: 'advcash',
    iconFileNames: advcash,
    phoneIsRequired: false,
    paymentMode: paymentMode.freekassa.advcash,
  },
  // MTS: {
  //   id: 'INTERKASSA',
  //   title: 'mts',
  //   iconFileNames: mts,
  //   phoneIsRequired: true,
  //   paymentMode: {
  //     ...paymentMode.interkassa.mts,
  //   },
  // },
  // BEELINE: {
  //   id: 'INTERKASSA',
  //   title: 'beeline',
  //   iconFileNames: beeline,
  //   phoneIsRequired: true,
  //   paymentMode: {
  //     ...paymentMode.interkassa.beeline,
  //   },
  // },
  // TELE2: {
  //   id: 'INTERKASSA',
  //   title: 'tele2',
  //   iconFileNames: tele2,
  //   phoneIsRequired: true,
  //   paymentMode: {
  //     ...paymentMode.interkassa.tele2,
  //   },
  // },
  // MEGAFON: {
  //   id: 'INTERKASSA',
  //   title: 'megafon',
  //   iconFileNames: megafon,
  //   phoneIsRequired: true,
  //   paymentMode: {
  //     ...paymentMode.interkassa.megafon,
  //   },
  // },
};

const TopUpMethodsForVerifiedUsers = {
  // пользователь считается подтверждённым (для интеркассы) если он пополнял более 3х раз свой счёт на сайте
  // для этого шлётся запрос на наш бэк по урлу https://seven-bet.com/api/payment/check_transactions
  VISA_INTERKASSA: {
    id: 'INTERKASSA',
    title: 'visa_interkassa',
    iconFileNames: visa,
    phoneIsRequired: false,
    paymentMode: {
      via: 'visa_cpaytrz_merchant_rub',
      pm: 464,
    },
  },
  MASTERCARD_INTERKASSA: {
    id: 'INTERKASSA',
    title: 'mastercard_interkassa',
    iconFileNames: masterCard,
    phoneIsRequired: false,
    paymentMode: {
      via: 'mastercard_cpaytrz_merchant_rub',
      pm: 465,
    },
  },
  MIR_INTERKASSA: {
    id: 'INTERKASSA',
    title: 'mir_interkassa',
    iconFileNames: mir,
    phoneIsRequired: false,
    paymentMode: {
      via: 'mir_cpaytrz_merchant_rub',
      pm: 478,
    },
  },
};

export {
  MethodTypes,
  TopUpMethods,
  TopUpMethodsForVerifiedUsers,
};
