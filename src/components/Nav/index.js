import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {setAuth} from "store/actions/authAction";
import {setSetting} from "store/actions/settingAction";
import {setTicket} from "store/actions/ticketAction";

import Button from "components/Button";
import Clock from "./Clock";
import Slider from "./Slider";
import Account from "./Account";

import style from './index.module.scss';

const Nav = () => {
    const dispatch = useDispatch()
    const {delta} = useSelector((state) => state.delta)
    const {setting} = useSelector((state) => state.setting)
    const {ticket} = useSelector((state) => state.ticket)

    useEffect(() => {

    }, [delta])

    const handleSetting = () => {
        const a = setting
        a.show = true
        dispatch(setSetting(a))
    }

    return (
        <nav className={style.block}>
            <div className={style.tab}>
                <Slider />
            </div>
            <div className={style.setting}>
                <div className={style.cell}>
                    <Account />
                </div>
                <div className={style.cell}>
                    <Clock />
                </div>
            </div>
            <div className={style.options}>
                <div className={style.option}>
                    <Button
                        type={'grey'}
                        size={'md'}
                        icon={'file-check'}
                        action={() => {
                            dispatch(setTicket(ticket.toggle === 0 ? 1 : 0))
                        }}
                    />
                </div>
                <div className={style.option}>
                    <Button
                        type={'grey'}
                        size={'md'}
                        icon={'diagram'}
                    />
                </div>
                <div className={style.option}>
                    <Button
                        type={'grey'}
                        size={'md'}
                        icon={'settings'}
                        action={() => {
                            handleSetting()
                        }}
                    />
                </div>
                <div className={style.option}>
                    <Button
                        type={'grey'}
                        size={'md'}
                        icon={'tv'}
                    />
                </div>
                <div className={style.option}>
                    <Button
                        type={'grey'}
                        size={'md'}
                        icon={'turn-off'}
                        action={() => {
                            sessionStorage.clear()
                            dispatch(setAuth(false))
                        }}
                    />
                </div>
            </div>
        </nav>
    );
}

export default Nav;
