import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import useSocket from "hooks/useSocket";

import {postData} from "helpers/api";
import checkCmd from "helpers/checkCmd";

import {setNotification} from "store/actions/notificationAction";

import Button from "components/Button";

import style from './index.module.scss';

const Password = ({action}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { sendMessage } = useSocket()
    const {isConnected, receivedMessage} = useSelector((state) => state.socket)
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [type, setType] = useState('password')

    const generatePassword = () => {
        const password = Math.random().toString(36).slice(-8);
        setNewPassword(password);
        setConfirmPassword(password);
        setType('text')
    };

    const checkNewPassword = () => {
        if (newPassword === confirmPassword && oldPassword.length > 4) {
            if (isConnected) {
                sendMessage({cmd:`account/${sessionStorage.getItem('authToken')}/password`, password: oldPassword, old_password: newPassword})
            }
            else {
                postData('/password', JSON.stringify({
                        password: oldPassword,
                        old_password: newPassword
                    }))
                    .then((json) => {
                        if (json.hasOwnProperty('data')) {
                            dispatch(setNotification(t('notification.old_password_invalid')))
                        }
                        else {
                            dispatch(setNotification(t('notification.password_changed')))
                        }
                    })
            }
        }
        else if(oldPassword.length < 4) {
            dispatch(setNotification(t('notification.type_old_password')))
        }
        else {
            dispatch(setNotification(t('notification.password_dont_match')))
        }
    }

    useEffect(() => {
        if (receivedMessage !== '' && checkCmd('password', receivedMessage.cmd)) {
            if (receivedMessage.hasOwnProperty('code')) {
                dispatch(setNotification(t('notification.old_password_invalid')))
            }
            else {
                dispatch(setNotification(t('notification.password_changed')))
            }
        }

    }, [receivedMessage])

    return (
        <div className={style.block}>
            <div className={style.row}>
                <div>
                    <p>{t('interface.old_password')}</p>
                </div>
                <div>
                    <input
                        className={style.input}
                        type={type}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div />
            </div>
            <div className={style.row}>
                <div>
                    <p>{t('interface.new_password')}</p>
                </div>
                <div>
                    <input
                        className={style.input}
                        type={type}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        className={style.button}
                        onClick={() => {
                            setType(type === 'password' ? 'text' : 'password')
                        }}
                    >
                        {type === 'password' ? t('interface.show') : t('interface.hide')} {t('interface.password')}
                    </button>
                </div>
            </div>
            <div className={style.row}>
                <div>
                    <p>{t('interface.confirm_password')}</p>
                </div>
                <div>
                    <input
                        className={style.input}
                        type={type}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        className={style.button}
                        onClick={() => {
                            generatePassword()
                        }}
                    >
                        {t('interface.generate_password')}
                    </button>
                </div>
            </div>
            <div className={style.row}>
                <div />
                <div className={style.actions}>
                    <Button
                        type={'green'}
                        size={'md'}
                        icon={'save'}
                        action={() => {
                            checkNewPassword()
                        }}
                    />
                    <Button
                        type={'red'}
                        size={'md'}
                        icon={'close'}
                        action={() => {
                            action(false)
                        }}
                    />
                </div>
                <div />
            </div>
        </div>
    );
}

export default Password;
