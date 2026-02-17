import styles from './styles.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

export const Banner = () => {
  return (
    <div className={styles.container}>
      <Swiper
        slidesPerView={1}
        className={styles.swiper}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
        loop={true}       
      >
        <SwiperSlide className={styles.slide}>
          <div className={styles.slideImage}>1</div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <div className={styles.slideImage} >2</div>
        </SwiperSlide>
      </Swiper>

    </div>
  )
}