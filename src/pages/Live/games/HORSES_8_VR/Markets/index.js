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
          <Tricast data={data} from={0} to={7} index={'1/6'} />
        </div>
        <div className={style.slide}>
          <Tricast data={data} from={7} to={14} index={'2/6'} />
        </div>
        <div className={style.slide}>
          <Tricast data={data} from={14} to={21} index={'3/6'} />
        </div>
        <div className={style.slide}>
          <Tricast data={data} from={21} to={28} index={'4/6'} />
        </div>
        <div className={style.slide}>
          <Tricast data={data} from={28} to={35} index={'5/6'} />
        </div>
        <div className={style.slide}>
          <Tricast data={data} from={35} to={42} index={'6/6'} />
        </div>
      </Slider>
    </div>
  )
}

export default Markets
