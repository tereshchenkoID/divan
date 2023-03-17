import {useState} from "react";

import classNames from "classnames";

import Button from "components/Button";
import TicketModal from "modules/TicketModal";

import style from './index.module.scss';

const Ticket = ({data, currency}) => {
    const [active, setActive] = useState(false)

    return (
        <div className={style.block}>
            {
                active &&
                <TicketModal
                    id={data.id}
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
                <div className={style.button}>
                    <Button
                        type={'red'}
                        size={'sm'}
                        icon={'info'}
                        action={() => {
                            setActive(true)
                        }}
                    />
                </div>
            </div>
            <div
                className={
                    classNames(
                        style.cell,
                        style.left
                    )
                }
            >
                {data.id}
            </div>
            <div
                className={
                    classNames(
                        style.cell,
                        style.right
                    )
                }
            >
                {currency} {data.amount}
            </div>
            <div
                className={
                    classNames(
                        style.cell,
                        style.right
                    )
                }
            >
                {
                    data.win
                    ?
                       `${currency} ${data.win}`
                    :
                        data.status
                }
            </div>
        </div>
    );
}

export default Ticket;
