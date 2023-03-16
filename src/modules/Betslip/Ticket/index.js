import {useState} from "react";
import classNames from "classnames";

import Button from "components/Button";
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
