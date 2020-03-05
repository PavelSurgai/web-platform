import { addNotify } from 'features/notify';
import { TopUpMethods } from 'features/payment/redux';

const actionTypes = {
  ACTION_FAILURE: 'payment/ACTION_FAILURE',
  INIT_LOADING: 'payment/INIT_LOADING',
  WITHDRAWAL_LOADING: 'payment/WITHDRAWAL_LOADING',
  WITHDRAWAL: 'payment/WITHDRAWAL',
  TOP_UP_SUCCESS: 'payment/TOP_UP_SUCCESS',
  ACCESS_TO_INTERKASSA_VISA_TOPUP_SUCCESS: 'payment/ACCESS_TO_INTERKASSA_VISA_TOPUP_SUCCESS',
};

function initFreeKassa(paymentInfo) {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const intAmount = parseInt(paymentInfo.amount, 10);
    const { min } = getState().userSettings.limits.payment.topUp;
    if (intAmount >= min) {
      dispatch({ type: actionTypes.INIT_LOADING });
      const response = await api.payment.initFreeKassa(paymentInfo.paymentMode, intAmount);
      if (response.success) {
        window.location.href = response.data.url;
      } else {
        dispatch({ type: actionTypes.ACTION_FAILURE });
        dispatch(addNotify(response.errorMessage, 'error'));
      }
    } else {
      dispatch(addNotify(getState().locale.payment.amountLess, 'error'));
    }
  };
}

const _getForm = form => {
  let interkassaGAVNO = document.createElement('div'); // создаём div
  interkassaGAVNO.innerHTML = form; // записываем в него форму которая приходит от interkassa
  return interkassaGAVNO;
};

function initInterkassa(paymentInfo) {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const response = await api.payment.initInterkassa(paymentInfo);
    const { payment } = getState().locale;
    if (response.success) {
      dispatch({ type: actionTypes.INIT_LOADING });
      dispatch(parseInterkassaForm(response.data, paymentInfo));
      addIPhoneNotify(paymentInfo, dispatch, payment);
    } else {
      dispatch({ type: actionTypes.ACTION_FAILURE });
      dispatch(addNotify(response.errorMessage, 'error'));
    }
  };
}

function addIPhoneNotify(paymentInfo, dispatch, locale) {
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (iOS && paymentInfo.paymentMode.via.includes('qiwi')) {
    dispatch(addNotify(locale.requestSended));
  }
}

function parseInterkassaForm(data, paymentInfo) {
  return async (dispatch, getState, extra) => {
    if (data.url) {
      dispatch({ type: actionTypes.TOP_UP_SUCCESS });
      window.open(data.url);
    } else if (data.html) {
      let interKassaHiddenForm = _getForm(data.html);
      interKassaHiddenForm.querySelector('#phone').value = paymentInfo.phone; // заполняем input#phone
      const form = interKassaHiddenForm.querySelector('#internalForm'); // записали форму по id
      dispatch(sendInterkassaFormData({
        formData: new FormData(form), // создаём formdata
        url: form.action,
        method: form.method,
        isQiwi: paymentInfo.paymentMode.via === TopUpMethods.QIWI.paymentMode.via,
      }));
    }
  };
};

function sendInterkassaFormData({ formData, url, method, isQiwi }) {
  return async (dispatch, getState, extra) => {
    const response = await fetch(url, { body: formData, method });
    const resultJson = await response.json();
    if (resultJson.resultCode === 0 && !isQiwi) { // если успех и это не киви
      const divs = _getForm(resultJson.resultData.internalForm).querySelectorAll('div'); // ищем все дивы
      const resultText = Array.from(divs).map(key => key.textContent).join(' '); // проходим по всем дивам и записываем textContent
      dispatch({ type: actionTypes.TOP_UP_SUCCESS });
      dispatch(addNotify(resultText, 'success', false));
    } else if (resultJson.resultCode === 0 && isQiwi) { // если успех и это киви ебучее
      dispatch({ type: actionTypes.TOP_UP_SUCCESS });
      window.open(resultJson.resultData.paymentForm.action);
    } else {
      dispatch({ type: actionTypes.ACTION_FAILURE });
      dispatch(addNotify(resultJson.resultMsg, 'error'));
    }
  };
}

function withdrawal(withdrawalInfo) {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const intAmount = parseInt(withdrawalInfo.amount, 10);
    const { min } = getState().userSettings.limits.payment.withdrawal;
    const { withdrawalSuccess } = getState().locale.payment;
    if (intAmount >= min) {
      dispatch({ type: actionTypes.WITHDRAWAL_LOADING });
      const response = await api.payment.withdrawal(withdrawalInfo);
      if (response.success) {
        dispatch({ type: actionTypes.WITHDRAWAL });
        dispatch(addNotify(withdrawalSuccess, 'success'));
      } else {
        dispatch({ type: actionTypes.ACTION_FAILURE });
        dispatch(addNotify(response.errorMessage, 'error'));
      }
    } else {
      dispatch(addNotify(getState().locale.payment.amountLess, 'error'));
    }
  };
}

// проверка делал ли пользователь 3 и более пополнений на сайт для включения карт interkassa
function getAccessToInterkassaTopUp() {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const response = await api.payment.getAccessToInterkassaTopUp();
    if (response.success) {
      dispatch({ type: actionTypes.ACCESS_TO_INTERKASSA_VISA_TOPUP_SUCCESS, payload: response.data });
    } else {
      dispatch({ type: actionTypes.ACTION_FAILURE });
    }
  };
}

export {
  actionTypes,
  initFreeKassa,
  withdrawal,
  initInterkassa,
  getAccessToInterkassaTopUp,
};