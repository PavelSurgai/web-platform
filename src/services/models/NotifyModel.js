export class NotifyModel {
  constructor(callBack, container) {
    this.callBack = callBack;
    this.container = container;
  }

  init = () => {
    let touchstartX = 0;
    let touchendX = 0;
    let transformX = 0;
    let touchstartXUY = 0;
    const { callBack } = this;

    this.container.addEventListener('touchstart', event => {
      this.container.style.transition = '0s';
      touchstartX = event.changedTouches[0].clientX;
      touchstartXUY = event.changedTouches[0].clientX;
    }, true);

    this.container.addEventListener('touchend', event => {
      this.container.style.transition = '0.35s ease-out';
      touchendX = event.changedTouches[0].clientX;
      const isWillClosed = handleGesure();
      if (!isWillClosed) this.container.style.transform = 'translateX(0px)';
    }, false);

    this.container.addEventListener('touchmove', event => {
      transformX = event.changedTouches[0].clientX;
      const differency = transformX - touchstartXUY;
      if (Math.abs(differency) > 10 && differency > -50) this.container.style.transform = `translateX(${differency}px)`;
    }, false);

    function handleGesure() {
      if (touchendX > touchstartX && touchendX - touchstartX > 120) {
        callBack();
        return true;
      }
      return false;
    }
  }
}