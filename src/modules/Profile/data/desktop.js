import { UserInfo, ChangePassword } from 'features/profile/desktop';
import { TopUp, Withdrawal } from 'features/payment/desktop';
import { PayHistory } from 'features/payHistory/desktop';
import { BetHistory } from 'features/betHistory/desktop';
import { PromotionalCodes } from 'features/promocodes/view/desktop';

export const profileTabs = {
  USERINFO: {
    name: 'user-info',
    textIdent: 'userInfo',
    route: '/profile/user-info',
    component: UserInfo,
  },
  // TOPUP: {
  //   name: 'top-up',
  //   textIdent: 'topUp',
  //   route: '/profile/top-up',
  //   component: TopUp,
  // },
  // WITHDRAWAL: {
  //   name: 'withdrawal',
  //   textIdent: 'withdrawalMoney',
  //   route: '/profile/withdrawal',
  //   component: Withdrawal,
  // },
  BET_HISTORY: {
    name: 'bet-history',
    textIdent: 'betHistory',
    route: '/profile/bet-history',
    component: BetHistory,
  },
  PAY_HISTORY: {
    name: 'pay-history',
    textIdent: 'payHistory',
    route: '/profile/pay-history',
    component: PayHistory,
  },
  CHANGE_PASSWORD: {
    name: 'change-password',
    textIdent: 'changePassword',
    route: '/profile/change-password',
    component: ChangePassword,
  },
  // ACTIVATE_PROMOCODE: {
  //   name: 'promotional-codes',
  //   textIdent: 'promotionalCodes',
  //   route: '/profile/activate-promocode',
  //   component: PromotionalCodes,
  // },
};
