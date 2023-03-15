import {useDispatch} from "react-redux";

import {setNotification} from "store/actions/notificationAction";

import Icon from "components/Icon";

import style from './index.module.scss';

const Notification = ({text}) => {
    const dispatch = useDispatch()

    return (
        <div className={style.block}>
            <div className={style.wrapper}>
                <div className={style.text}>{text}</div>
                <button
                    className={style.button}
                    onClick={() => {
                        dispatch(setNotification(null))
                    }}
                >
                    <Icon id={'close'} />
                </button>
            </div>
        </div>
    );
}

export default Notification;
