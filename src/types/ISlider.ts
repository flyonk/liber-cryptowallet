export interface ISlider {
  asNavFor?: [];
  autoplay?: boolean;
  autoplaySpeed?: number;
  centerMode?: boolean;
  changeDelay?: number;
  dots?: boolean;
  fade?: boolean;
  infinite?: boolean;
  initialSlide?: number;
  mobileFirst?: boolean;
  navButtons?: boolean;
  pauseOnDotsHover?: boolean;
  pauseOnHover?: boolean;
  responsive?: {
    breakpoint: number;
    settings: ISlider;
  };
  rtl?: boolean;
  slidesToShow?: number;
  speed?: number;
  swipeDistance?: number;
  throttleDelay?: number;
  timing?: string;
  unagile?: boolean;
}
