import style from './index.module.scss';

const Social = () => {
    return (
        <div className={style.block}>
            <a
                target={"_blank"}
                rel={"noreferrer"}
                aria-label={"Facebook"}
                href={"https://facebook.com"}
                className={style.item}
            >
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0a16 16 0 0 0-4 31.5l1.3.3V19.2h-4v-2.8h4.1v-5.2-.1c0-2.3 1.9-4.2 4.2-4.3a41.8 41.8 0 0 1 3.5.1H21v2.3h-1.5a3.5 3.5 0 0 0-2.4.8 2.8 2.8 0 0 0-.9 2.1v4.4h4.5l-.3 2.7h-4.2V32h1.1A16 16 0 0 0 16 0zm2.2 29.8v-8.6h4l.8-6.8h-4.8v-2.3-.1l.2-.5a1.5 1.5 0 0 1 1-.3H23v-6l-.9-.2a32.7 32.7 0 0 0-4.6-.2 6.3 6.3 0 0 0-6 6.4v3.2H7.2v6.8h4v8a14 14 0 1 1 7 .6z" />
                </svg>
            </a>
            <a
                target={"_blank"}
                rel={"noreferrer"}
                aria-label={"Twitter"}
                href={"https://twitter.com"}
                className={style.item}
            >
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0a16 16 0 1 0 16 16A16 16 0 0 0 16 0zm0 30a14 14 0 0 1-11.2-5.7l1.4.8a16 16 0 0 0 7.9 2.1h.3c3.6 0 6.8-1.5 9-3.9a11.2 11.2 0 0 0 2.2-10.2v.1L28 9.1l-4.4-.3a5.4 5.4 0 0 0-6-.8 5.6 5.6 0 0 0-3 3.8 49.5 49.5 0 0 1-6.8-3.5l.2.1L7 7.6 6.5 9l-.2 2c0 2.7 1.2 5 3.2 6.6l-3 1.8 3.5 1.9-5.3 2.9A14 14 0 1 1 16 30zm-5.4-10.7l2.7-1.5-1.5-.9a7.8 7.8 0 0 1-3.6-6c1.9 1 4.1 2.1 6.5 3.1l.4.2 1.5.6-.1-1.6c0-1.5.8-2.8 2-3.4l1.5-.3c1 0 1.9.4 2.5 1l.3.3h1.9L23.5 13l.1.4A9.5 9.5 0 0 1 22 22a11.7 11.7 0 0 1-13.2 2.2l5.4-2.9z" />
                </svg>
            </a>
        </div>
    );
}

export default Social;
