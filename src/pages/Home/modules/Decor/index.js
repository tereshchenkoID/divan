import style from './index.module.scss';

const Decor = ({type}) => {

    return (
        <div className={style.block}>
            <img
                src={`/img/decor/${type}.jpeg`}
                alt="Decor"
            />
        </div>
    );
}

export default Decor;
