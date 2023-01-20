import style from './index.module.scss';

const Container = ({children}) => {
    return (
        <div className={style.block}>
            {children}
        </div>
    );
}

export default Container;
