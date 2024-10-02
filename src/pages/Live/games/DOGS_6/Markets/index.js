import Slider from 'react-slick'

import Quinella from '../Quinella'
import Forecast from '../Forecast'
import Tricast from '../Tricast'
import Extra from '../Extra'
import Main from '../Main'

import style from './index.module.scss'

const init = {
  fade: true,
  dots: false,
  arrows: false,
  autoplay: true,
  infinite: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const Markets = ({ data }) => {
  return (
    <div className={style.block}>
      <Slider {...init}>
        <div className={style.slide}>
          <div className={style.row}>
            <Main data={data} />
          </div>
          <div className={style.row}>
            <Quinella data={data} />
          </div>
        </div>
        <div className={style.slide}>
          <div className={style.row}>
            <Forecast data={data} />
          </div>
          <div className={style.row}>
            <Extra data={data} />
          </div>
        </div>
        <div className={style.slide}>
          <Tricast data={data} from={0} to={10} index={'1/2'} />
        </div>
        <div className={style.slide}>
          <Tricast data={data} from={10} to={20} index={'2/2'} />
        </div>
      </Slider>
    </div>
  )
}

export default Markets
