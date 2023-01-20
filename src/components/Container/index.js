import style from './index.module.scss';

const Logo = () => {
    return (
        <a
            href={"./"}
            className={style.block}
            aria-label={"Logo"}
        />
    );
}

export default Logo;
