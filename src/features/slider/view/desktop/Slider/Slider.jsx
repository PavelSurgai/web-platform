import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import block from 'bem-cn';

import SliderItem from './SliderItem';
import { actions } from '../../../redux';

import './Slider.scss';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.sliderRef = React.createRef();
    this.state = {
      activeSliderWidth: 630,
      unActiveSlideWidth: 125,
      actionSlider: -1,
      swapCount: 0,
      slidesArray: [],
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
    changeSlider: PropTypes.func.isRequired,
    loadSlider: PropTypes.func.isRequired,
    clearSliderData: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.loadSlider(this.props.lang).then(() => {
      if (this.props.slides) {
        this.setSlidesArray();
        this.setState({ firstTimeout: setTimeout(() => this.autoChangeSlide(), 5000) });
      }
    });
  }

  componentWillUnmount() {
    this.props.clearSliderData();
    clearTimeout(this.state.timeOut);
    clearTimeout(this.state.firstTimeout);
  }

  onChangeSlide = index => {
    const { currentSlide } = this.props;
    const { actionSlider, slidesArray } = this.state;
    clearTimeout(this.state.firstTimeout);
    clearTimeout(this.state.timeOut);
    const newIndex = index === slidesArray.length ? 0 : index;
    if (actionSlider === -1) {
      const newSlides = this.shiftArray(slidesArray, currentSlide, newIndex);
      this.setState({ actionSlider: currentSlide });
      setTimeout(() => this.props.changeSlider(newIndex), 100);
      setTimeout(() => this.setState({ actionSlider: -1 }), 500);
      setTimeout(() => this.setState({ swapCount: 0, slidesArray: newSlides }), 500);
    }
    this.setState({ firstTimeout: setTimeout(() => this.autoChangeSlide(), 5000) });
  }

  render() {
    const b = block('slider');
    const { currentSlide } = this.props;
    const { activeSliderWidth, actionSlider, swapCount, slidesArray, unActiveSlideWidth } = this.state;
    const isAnimation = actionSlider !== -1;
    const swap = unActiveSlideWidth * swapCount;
    const style = {
      left: -1 * swap,
    };
    let sliders = slidesArray.map((item, index) => {
      const isActive = currentSlide === item.id;
      const isAction = actionSlider === item.id;
      return (<SliderItem
        key={index}
        item={item}
        number={item.id}
        unActiveSlideWidth={unActiveSlideWidth}
        isAnimation={isAnimation}
        widthActive={activeSliderWidth}
        callBack={this.onChangeSlide}
        isActive={isActive}
        isAction={isAction}
      />);
    });
    return (
      <section className={b()} ref={this.sliderRef}>
        <div className={b('wrapper')}>
          <div className={b('slide-out', { animation: isAnimation })} style={style}>
            {sliders}
          </div>
        </div>
      </section>
    );
  }

  setSlidesArray() {
    const { slides } = this.props;
    const { unActiveSlideWidth } = this.state;
    const sliderWidth = window.innerWidth * 0.7;
    const slideWidth = ((sliderWidth - 800) / (slides.length - 1)).toFixed(0);
    this.setState({ unActiveSlideWidth: slideWidth > unActiveSlideWidth ? slideWidth : unActiveSlideWidth });
    const newSlidesArray = [].concat(slides, slides.map(t => ({ ...t, id: t.id + slides.length })));
    if (slides && slides.length !== this.state.slidesArray.length) {
      this.setState({ slidesArray: newSlidesArray });
    }
  }

  autoChangeSlide = () => {
    this.onChangeSlide(this.props.currentSlide + 1);
    this.setState({
      timeOut: setTimeout(() => this.autoChangeSlide(this.props.currentSlide + 1), 5000),
    });
  }

  shiftArray = (slides, currentSlide, index) => {
    let newSlides = [...slides];
    const different = index - currentSlide;
    let steps = different < 0 ? (slides.length + different) : different;
    newSlides = newSlides.splice(steps).concat(newSlides);
    this.setState({ swapCount: steps });
    return newSlides;
  }
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
