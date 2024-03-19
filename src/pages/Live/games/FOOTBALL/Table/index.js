import classNames from 'classnames'

import Slider from 'react-slick'

import { hostnames } from 'constant/config'

import style from './index.module.scss'

const init = {
  fade: true,
  dots: false,
  arrows: false,
  autoplay: true,
  infinite: true,
  speed: 500,
  autoplaySpeed: 10000,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const Table = ({ data }) => {
  return (
    <div className={style.block}>
      <div className={style.left}>
        <div className={style.results}>
          {data.league.matches.map((el_m, idx_m) => (
            <div key={idx_m} className={style.meta}>
              <div className={style.logo}>
                <img src={`${hostnames.ASSETS}/${el_m.teams.home.img}`} alt={el_m.teams.home.name} />
              </div>
              <div>
                <div>{el_m.teams.home.name}</div>
                <div className={style.states}>
                  {el_m?.teams?.home.last3?.split('').map((char, index) => (
                    <div key={index} className={classNames(style.state, style[char.toLowerCase()])} />
                  ))}
                </div>
              </div>
              <div>vs</div>
              <div>
                <div>{el_m.teams.away.name}</div>
                <div className={style.states}>
                  {el_m?.teams?.away.last3?.split('').map((char, index) => (
                    <div key={index} className={classNames(style.state, style[char.toLowerCase()])} />
                  ))}
                </div>
              </div>
              <div className={style.logo}>
                <img src={`${hostnames.ASSETS}/${el_m.teams.away.img}`} alt={el_m.teams.away.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={style.right}>
        <Slider {...init}>
          <div className={style.slide}>
            {data.league.matches[0].odds[0].groups
              .slice(0, data.league.matches[0].odds[0].groups.length - 4)
              .map((el_o, idx_o) => (
                <div key={idx_o} className={style.table}>
                  <div className={style.head}>
                    {el_o.markets.map((el_ma, idx_ma) => (
                      <div key={idx_ma} className={style.column}>
                        {el_ma.name && <div className={style.legend}>{el_ma.name.replaceAll('_', ' ')}</div>}
                        {el_ma.headers.map((el, idx) => (
                          <div key={idx} className={style.label}>
                            {el}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className={style.results}>
                    {data.league.matches.map((el_m, idx_m) => (
                      <div key={idx_m} className={style.row}>
                        {el_o.markets.map((el_ma, idx_ma) => (
                          <div key={idx_ma} className={style.column}>
                            {el_ma.outcomes.map((el, idx) => (
                              <div key={idx} className={classNames(style.odd, (!el.b || el.b === '1.00') && style.disabled)}>
                                {el.b ? parseFloat(el.b).toFixed(2) : '1.00'}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
          <div className={style.slide}>
            {data.league.matches[0].odds[0].groups
              .slice(data.league.matches[0].odds[0].groups.length - 4, data.league.matches[0].odds[0].groups.length - 1)
              .map((el_o, idx_o) => (
                <div key={idx_o} className={style.table}>
                  <div className={style.head}>
                    {el_o.markets.map((el_ma, idx_ma) => (
                      <div key={idx_ma} className={style.column}>
                        {el_ma.name && <div className={style.legend}>{el_ma.name.replaceAll('_', ' ')}</div>}
                        {el_ma.headers.map((el, idx) => (
                          <div key={idx} className={style.label}>
                            {el}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className={style.results}>
                    {data.league.matches.map((el_m, idx_m) => (
                      <div key={idx_m} className={style.row}>
                        {el_o.markets.map((el_ma, idx_ma) => (
                          <div key={idx_ma} className={style.column}>
                            {el_ma.outcomes.map((el, idx) => (
                              <div key={idx} className={classNames(style.odd, (!el.b || el.b === '1.00') && style.disabled)}>
                                {el.b ? parseFloat(el.b).toFixed(2) : '1.00'}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
          <div className={style.slide}>
            {data.league.matches[0].odds[0].groups[7].markets.map((el_ma, idx_ma) => (
              <div key={idx_ma} className={style.table}>
                <div className={style.head}>
                  {el_ma.name && <div className={style.legend}>{`${el_ma.name.replaceAll('_', ' ')} ${el_ma.headers[0]}`}</div>}
                  {el_ma.outcomes.map((el, idx) => (
                    <div key={idx} className={style.column}>
                      <div className={style.label}>{el.a}</div>
                    </div>
                  ))}
                </div>
                <div className={style.results}>
                  {data.league.matches.map((el_m, idx_m) => (
                    <div key={idx_m} className={style.row}>
                      {el_ma.outcomes.map((el, idx) => (
                        <div key={idx} className={style.column}>
                          <div className={classNames(style.odd, style.sm, (!el.b || el.b === '1.00') && style.disabled)}>
                            {el.b ? parseFloat(el.b).toFixed(2) : '1.00'}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Slider>
      </div>
    </div>
  )
}

export default Table
