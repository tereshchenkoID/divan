import {Fragment} from "react";

import classNames from "classnames";

import style from './index.module.scss';

const findHeader = (id, data) => {
    return data.filter(el => el.id === id)
}

const checkForObject = (el) => {
    return typeof el === 'object'
}

const Table = ({headers, rows, table}) => {

    return (
        <div className={style.block}>
            <div className={style.overflow}>
                {
                    table.set.map((setElement, setIdx) =>
                        <div
                            key={setIdx}
                            className={style.table}
                        >
                            {
                                rows.map((tableRow, tableRowIdx) =>
                                    <Fragment key={tableRowIdx}>
                                        {
                                            tableRowIdx === 0 &&
                                            <div className={style.row}>
                                                {
                                                    setElement.headers.map((headerElement, headerIdx) =>
                                                        <div
                                                            key={headerIdx}
                                                            className={
                                                                classNames(
                                                                    style.cell,
                                                                    checkForObject(tableRow[findHeader(headerElement, headers)[0].name]) && style.lg
                                                                )
                                                            }
                                                            title={findHeader(headerElement, headers)[0].tooltip}
                                                        >
                                                            {
                                                                findHeader(headerElement, headers)[0].column
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        }
                                        <div
                                            key={tableRowIdx}
                                            className={style.row}
                                        >
                                            {
                                                setElement.headers.map((headerElement, idx) =>
                                                    <div
                                                        key={idx}
                                                        className={
                                                            classNames(
                                                                style.cell,
                                                                checkForObject(tableRow[findHeader(headerElement, headers)[0].name]) && style.lg
                                                            )
                                                        }
                                                    >
                                                        {
                                                            checkForObject(tableRow[findHeader(headerElement, headers)[0].name]) &&
                                                            tableRow[findHeader(headerElement, headers)[0].name].cc &&
                                                            <span className={style.country}>
                                                                <img
                                                                    src={`https://img.sportradar.com/ls/crest/big/${tableRow[findHeader(headerElement, headers)[0].name].cc.a2}.png`}
                                                                    alt={tableRow[findHeader(headerElement, headers)[0].name].cc.name}
                                                                />
                                                            </span>
                                                        }
                                                        <span>
                                                            {
                                                                checkForObject(tableRow[findHeader(headerElement, headers)[0].name])
                                                                    ?
                                                                    tableRow[findHeader(headerElement, headers)[0].name].fullname ||
                                                                    tableRow[findHeader(headerElement, headers)[0].name].shortname ||
                                                                    tableRow[findHeader(headerElement, headers)[0].name].name
                                                                    :
                                                                    tableRow[findHeader(headerElement, headers)[0].name]
                                                            }
                                                        </span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </Fragment>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Table;
