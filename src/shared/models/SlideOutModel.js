export class SlideOutModel {
  constructor(callBack, container) {
    this.callBack = callBack;
    this.container = container;
  }

  checkIsScrollable = event => event.path
    .filter(t => t.className !== undefined)
    .findIndex(temp =>
      temp.className.length && temp.className.indexOf('scrollable') + 1) + 1;

  checkIsNotMenuTouch = event => event.path
    .filter(t => t.className !== undefined)
    .findIndex(temp => temp.className.length && temp.className.indexOf('side-menu') + 1) === -1;

  init = () => {
    let touchstartX = 0;
    let touchendX = 0;
    let isScrollable;
    const { callBack } = this;

    const handleGesure = () => {
      const range = 100;

      if (touchendX < touchstartX && touchstartX - touchendX > range) {
        callBack(false);
      }
    };

    this.container.addEventListener('touchstart', event => {
      touchstartX = event.changedTouches[0].screenX;
      isScrollable = this.checkIsScrollable(event);
    }, true);

    this.container.addEventListener('click', event => {
      if (this.checkIsNotMenuTouch(event)) callBack(false);
    }, true);

    this.container.addEventListener('touchend', event => {
      touchendX = event.changedTouches[0].screenX;
      if (!isScrollable) {
        handleGesure();
      }
    }, false);
  }
}