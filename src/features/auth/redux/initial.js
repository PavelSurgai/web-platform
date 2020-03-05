export const initialState = {
  isAuth: false,
  actionProcessing: false,
  user: {},
  balance: 0,
  bonusBalance: 0,
  handleIsOpen: false,
  phoneRecovery: false,
  codeWasSended: false,
  authModal: {
    isOpen: false,
    isSignIn: true,
  },
  isVerifying: false,
  oneClickModal: {
    email: '',
    password: '',
    isOpen: false,
  },
};