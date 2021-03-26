const servicesCarousel = () => {
  
    
class Slider {
    constructor({ main, wrapper, next, prev, infiniteSlide = false, slidesToShow = 3, position = 0, responsive = []}) {
      this.main = document.querySelector(main);
      this.wrapper = document.querySelector(wrapper);
      this.slides = Array.from(this.wrapper.children);
      this.next = document.querySelector(next);
      this.prev = document.querySelector(prev);
      this.slidesToShow = slidesToShow;
      this.options = {
          position,
          infiniteSlide,
          sliderWidth: Math.trunc(100 / this.slidesToShow),
          maxPosition: this.slides.length - this.slidesToShow,
        };
        this.responsive = responsive;
    }
    addClass() {
      this.main.classList.add("slider");
      this.wrapper.classList.add("slider__wrapper");
      this.slides.forEach((item) => {
        item.classList.add("slider__item");
      });
    }
    generateStyles() {
      let style = document.getElementById('slider-style');
      if(!style) {
        style = document.createElement("style");
        style.id = "slider-style";
      }
      style.textContent = `
        .slider{
          overflow: hidden;
        }
        .slider__wrapper{
          display: flex;
          transition: transform 0.5s;
          will-change: transform;
        }
        .slider__item{
          flex: 0 0 ${this.options.sliderWidth}%;
        }
        .slider__prev, .slider__next {
          margin: 0 10px;
          border: 20px solid transparent;
          background: transparent;
          outline:none;
          cursor:pointer;
        }
        .slider__next{
          border-left-color: #19b5fe;
        }
        .slider__prev{
          border-right-color: #19b5fe;
        }
      `;
      document.head.append(style);
    }
    controlSlider() {
      this.prev.addEventListener("click", () => {
        this.prevSlide();
      });
      this.next.addEventListener("click", () => {
        this.nextSlide();
      });
    }
    prevSlide() {
      if (this.options.infiniteSlide || this.options.position > 0) {
        --this.options.position;
        if(this.options.position < 0) {
          this.options.position = this.options.maxPosition
        }
        this.wrapper.style.transform = `translateX(-${ this.options.position * this.options.sliderWidth }%)`;
      }
    }
    nextSlide() {
      if (this.options.infiniteSlide || this.options.position < this.options.maxPosition) {
        ++this.options.position;
        if(this.options.position > this.options.maxPosition) {
          this.options.position = 0;
        }
        this.wrapper.style.transform = `translateX(-${ this.options.position * this.options.sliderWidth }%)`;
      }
    }
    addArrows() {
      this.prev = document.createElement('button');
      this.next = document.createElement('button');
  
      this.prev.className = 'slider__prev';
      this.next.className = 'slider__next';
  
      this.main.append(this.prev);
      this.main.append(this.next);
    }
    responseInit(){
      const slidesToShowDefault = this.slidesToShow;
      const allResponse = this.responsive.map((item) => {
        return item.breakpoint
      });
      const maxResponse = Math.max(...allResponse);
      
      const checkResponse = () => {
        const windowWidth = document.documentElement.clientWidth;
        if(windowWidth < maxResponse) {
         for(let i = 0; i < allResponse.length; i++) {
           if(windowWidth < allResponse[i]){
            this.slidesToShow = this.responsive[i].slideToShow;
            this.options.sliderWidth = Math.floor(100 / this.slidesToShow);
            this.generateStyles();
           } 
         } 
        } else {
          this.slidesToShow = slidesToShowDefault;
          this.options.sliderWidth = Math.floor(100 / this.slidesToShow);
          this.generateStyles();
         }
      };
      checkResponse();
  
      window.addEventListener('resize', () => {
        checkResponse();
      })
    }
    init() {
      this.addClass();
      this.generateStyles();
      if (this.prev && this.next) {
        this.controlSlider();
      } else {
        this.addArrows();
        this.controlSlider();
      }
      if(this.responsive) {
        this.responseInit();
      }
    }
  }
  
  const slider = new Slider({
    main: ".services-slider-wrapper",
    wrapper: ".services-slider",
    next: "#service-arrow-right",
    prev: "#service-arrow-left",
    infiniteSlide: true,
    slidesToShow: 5,
    responsive: [{
      breakpoint: 1024,
      slideToShow: 3,
    },
    {
      breakpoint: 768,
      slideToShow: 2,
    },
    {
      breakpoint: 576,
      slideToShow: 1,
    },]
  });
  slider.init();

}

export default servicesCarousel;