import {odds} from '../data'

import Label from "../../../modules/Label";
import Odd from "../Odd";

import style from './index.module.scss';

const Numbers = ({data}) => {
  return (
    <div>
      <Label text={'Numbers'} />
      <div className={style.row}>
        {
          data.statistics.numbers.map((el, idx) =>
            <div
              key={idx}
              className={style.cell}
            >
              <Odd
                type={odds[el.num].color}
                number={el.num}
              />
              <div>{el.count}</div>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Numbers;
