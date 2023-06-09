import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
// import {useTranslation} from "react-i18next";

import {setAuth} from "store/actions/authAction";
import {setTicket} from "store/actions/ticketAction";

import SettingsModal from "modules/SettingsModal";
import ReportsModal from "modules/ReportsModal";
import Button from "components/Button";
import Clock from "./Clock";
import Games from "./Games";
import Account from "./Account";

import style from './index.module.scss';

const Nav = () => {
    const dispatch = useDispatch()
    // const { i18n } = useTranslation()
    const {ticket} = useSelector((state) => state.ticket)
    const [sm, setSm] = useState(false) // Settings Modal
    const [rm, setRm] = useState(false) // Reports Modal

    return (
        <nav className={style.block}>
            <div className={style.tab}>
                <Games />
            </div>
            <div className={style.setting}>
                <div className={style.cell}>
                    <Account />
                </div>
                <div className={style.cell}>
                    <Clock />
                </div>
                {/*<div className={style.cell}>*/}
                {/*    <button*/}
                {/*        className={style.language}*/}
                {/*        onClick={() => {*/}
                {/*            i18n.changeLanguage('ukr');*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        UA*/}
                {/*    </button>*/}
                {/*    <button*/}
                {/*        className={style.language}*/}
                {/*        onClick={() => {*/}
                {/*            i18n.changeLanguage('en');*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        EN*/}
                {/*    </button>*/}
                {/*</div>*/}
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
                        action={() => {
                            setRm(true)
                        }}
                    />
                </div>
                <div className={style.option}>
                    <Button
                        type={'grey'}
                        size={'md'}
                        icon={'settings'}
                        action={() => {
                            setSm(true)
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
            {
                sm && <SettingsModal action={setSm} />
            }
            {
                rm && <ReportsModal action={setRm} />
            }
        </nav>
    );
}

export default Nav;
