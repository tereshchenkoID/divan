import {useState} from "react";
import classNames from "classnames";

import Icon from "components/Icon";
import TicketModal from "modules/TicketModal";

import style from './index.module.scss';

const Ticket = () => {
    const [active, setActive] = useState(false)

    return (
        <div className={style.block}>
            {
                active &&
                <TicketModal
                    data={{}}
                    action={setActive}
                />
            }
            <div
                className={
                classNames(
                        style.cell,
                        style.left
                    )
                }
            >
                <button
                    className={style.button}
                    onClick={() => {
                        setActive(true)
                    }}
                >
                    <Icon id={'info'} />
                </button>
            </div>
            <div
                className={
                    classNames(
                        style.cell,
                        style.left
                    )
                }
            >
                1111111111
            </div>
            <div
                className={
                    classNames(
                        style.cell,
                        style.left
                    )
                }
            >
                $6000
            </div>
            <div
                className={
                    classNames(
                        style.cell,
                        style.right
                    )
                }
            >
                $6000.20
            </div>
        </div>
    );
}

export default Ticket;
