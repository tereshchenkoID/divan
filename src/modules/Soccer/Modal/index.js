import {useDispatch} from "react-redux";

import {setLive} from "store/actions/liveAction";
import {setModal} from "store/actions/modalAction";

import style from './index.module.scss';

const Modal = () => {
    const dispatch = useDispatch()

    return (
        <div className={style.block}>
            <button
                className={style.button}
                onClick={() => {
                    dispatch(setLive(0))
                    dispatch(setModal(0))
                }}
            >
                Skip Next game
            </button>
        </div>
    );
}

export default Modal;
