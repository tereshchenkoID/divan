import style from './index.module.scss';

const Modal = ({action}) => {
    return (
        <div className={style.block}>
            <button
                className={style.button}
                onClick={() => {
                    action()
                }}
            >
                Skip Next game
            </button>
        </div>
    );
}

export default Modal;
