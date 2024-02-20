import style from './index.module.scss'

const Label = ({ text }) => {
  return <div className={style.block}>{text}</div>
}

export default Label
