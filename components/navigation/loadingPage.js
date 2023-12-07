import pagestyles from '../../styles/module.css/components.module.css';
import styles from '../../styles/module.css/index.module.css';
export const Loading = () =>{
    return(
        <div id={styles.loading_container}>
            <div className={`${pagestyles.logoimg} ${styles.loading_image}`}>
                <span className={pagestyles.logo}>
                    SWAP-<b className={pagestyles.colored}>e</b>
                </span>
            </div>
            <p>Loading ...</p>
        </div>
    )
}