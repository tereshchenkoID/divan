import style from './index.module.scss';

const Navigation = () => {
    return (
        <nav className={style.block}>
            <div className={style.top}>Top</div>
            <div className={style.bottom}>Bottom</div>
        </nav>
    );
}

export default Navigation;
