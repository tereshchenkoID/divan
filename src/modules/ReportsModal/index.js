import classNames from "classnames";

import Button from "components/Button";

import style from './index.module.scss';

const ReportsModal = ({action}) => {

    return (
        <div className={style.block}>
            <div className={style.wrapper}>
                <div className={style.header}>
                    <p>Financial reports</p>
                    <div
                        className={
                            classNames(
                                style.button,
                                style.sm,
                            )
                        }
                    >
                        <Button
                            type={'red'}
                            size={'sm'}
                            icon={'close'}
                            action={() => {
                                action(false)
                            }}
                        />
                    </div>
                </div>
                <div className={style.body}>
                    <div className={style.container}>
                        <div className={style.title}>Reports</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportsModal;
