import style from './index.module.scss';

const Language = ({data}) => {
    console.log(data)

    return (
        <a
            href="#"
            className={style.block}
        >
            <span className={style.icon}>
                <img src={`https://img.sportradar.com/ls/crest/big/${data.cc.a2}.png`} alt={data.name} />
            </span>
            <span>{data.nativename}</span>
        </a>
    );
}

export default Language;
