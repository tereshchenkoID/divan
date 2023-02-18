import classNames from "classnames";

import style from './index.module.scss';

const Theme = ({data, action}) => {

    return (
        <label className={style.block}>
            <input
                type={"checkbox"}
                className={style.input}
                aria-label={"Theme"}
                onChange={() => {
                    action(data === 'light' ? 'dark' : 'light')
                }}
                checked={data === 'light'}
            />
            <span className={style.slide} />
            <div className={
                    classNames(
                        style.icon,
                        style.left
                    )
                }
            >
                <svg viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M11.613 2.948a9.09 9.09 0 0 1 2.73-.552 9.167 9.167 0 0 0-3.015 10.43 9.167 9.167 0 0 0 9.043 6.005 9.088 9.088 0 0 1-2.438 1.344c-4.755 1.744-10.03-.7-11.773-5.454-1.745-4.755.699-10.029 5.453-11.773Z"
                    />
                </svg>
            </div>
            <div className={
                    classNames(
                        style.icon,
                        style.right
                    )
                }
            >
                <svg viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M7.713 6.33 6.24 4.94 5.086 6.036l1.465 1.39L7.713 6.33Zm-2.258 4.394H3v1.552h2.455v-1.552ZM12.818 3h-1.636v2.29h1.636V3Zm6.096 3.035L17.76 4.941l-1.465 1.39 1.154 1.094 1.465-1.39ZM16.287 16.67l1.465 1.397 1.154-1.094-1.473-1.39-1.146 1.087Zm2.259-5.946v1.552H21v-1.552h-2.454ZM12 6.842c-2.708 0-4.91 2.089-4.91 4.658 0 2.57 2.202 4.657 4.91 4.657s4.91-2.088 4.91-4.657c0-2.57-2.202-4.658-4.91-4.658ZM11.182 20h1.636v-2.29h-1.636V20Zm-6.096-3.035 1.154 1.094 1.465-1.397-1.154-1.094-1.465 1.397Z"
                    />
                </svg>
            </div>
        </label>
    );
}

export default Theme;
