import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import block from 'bem-cn';
import { Link } from 'react-router-dom';

// import SliderItem from './SliderItem';
import { actions } from '../../../redux';

import './Slider.scss';

class Slider extends Component {
  constructor(props) {
    super(props);

    this.sliderRef = React.createRef();
    this.state = {
      interfalFunction: null,
    };
  }

  static propTypes = {
    slides: PropTypes.arrayOf(PropTypes.shape({
      url_image: PropTypes.string,
      url: PropTypes.string,
      id: PropTypes.number,
    })),
    lang: PropTypes.string.isRequired,
    
    currentSlide: PropTypes.number.isRequired,
    loadSlider: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.loadSlider(this.props.lang);
    this.scrollListener(this.sliderRef.current);
  }

  componentWillUnmount() {
    clearInterval(this.state.interfalFunction);
  }

  componentWillUpdate(nextProps) {
    const f = () => {
      const sliderComponent = this.sliderRef;
      const imageHeight = sliderComponent.current ? sliderComponent.current.children : 0;
      const imageHeight1 = imageHeight.length ? imageHeight[0].children[0].clientHeight : 0;
      // if (imageHeight1) sliderComponent.current.style.height = `${imageHeight1}px`;
    };
    setTimeout(() => f(), 1000);
    if (!this.props.slides.length && nextProps.slides.length) {
      this.startScrolling();
    }
  }

  render() {
    const b = block('slider');
    const { slides } = this.props;
    const sliderList = slides.map((tempSlide, index) => (
      <a
        className={b('item').mix('scrollable')}
        key={index}
        href={tempSlide.url}
        onTouchStart={() => clearInterval(this.state.interfalFunction)}
        onTouchEnd={() => this.startScrolling()}>
        <img src={process.env.NODE_ENV === 'production' ? tempSlide.url_image : `https://pitch90bet.com/${tempSlide.url_image}`} className={b('image')} alt="" />
      </a>
    ));
    return (
      <section className={b()} ref={this.sliderRef}>
        {sliderList}
      </section>
    );
  }

  scrollListener = ref => {
    let touchstartXUY = 0;
    let touchendX = 0;
    ref.addEventListener('touchstart', event => {
      touchstartXUY = event.changedTouches[0].clientX;
    }, true);

    ref.addEventListener('touchend', event => {
      touchendX = event.changedTouches[0].clientX;
      let differenceX = (touchstartXUY - touchendX);
      if (Math.abs(differenceX) > 10) { this.leftScroll(differenceX); differenceX = 0 };
    }, false);
  }

  startScrolling = () => this.setState({ interfalFunction: setInterval(() => this.leftScroll(), 5000) });

  leftScroll = (difference = 0) => {
    const { slides } = this.props;
    const itemsBlock = this.sliderRef.current;
    const needScroll = this.sliderRef.current.clientWidth;
    const tempSlidesCount = Math.trunc((itemsBlock.scrollLeft / needScroll));
    const direction = difference < 0 ? -1 : 1;
    let resultAmount = 0;
    switch (tempSlidesCount + direction) {
      case -1: {
        resultAmount = slides.length - 1;
        break;
      }

      case slides.length: {
        resultAmount = 0;
        break;
      }

      default: {
        resultAmount = tempSlidesCount + direction;
      }
    }
    const iterator = (i, scrollWidths) => {
      let scroll = 0;
      if (direction * i <= direction * resultAmount * needScroll) {
        itemsBlock.scrollTo(i, 0);
        setTimeout(() => iterator(direction > 0 ? i + 15 : i - 15), 11);
      }
      else {
        itemsBlock.scrollTo((resultAmount * needScroll), 0);
      }
    };
    iterator(itemsBlock.scrollLeft, 0);
    // itemsBlock.scrollTo({ left: (resultAmount * needScroll), behavior: 'smooth' });
  };
}

function mapStateToProps(state) {
  return {
    slides: state.slider.slides,
    currentSlide: state.slider.currentSlide,
    lang: state.userSettings.lang,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
