import styles from '../../../styles/module.css/allPages/app_pages.module.css';
import pageStyles from '../../../styles/module.css/components.module.css';
import AddButton from '../../../components/pages/add_button';

export default function Layout({ children, add_route, userId, main_page }) {
    const name = 'Settings'
    const add_page = (route) => `/facility/${userId}/${route}`;

    return (
        <section id={pageStyles.PageLayout}>
            <div id={styles[name]}>
                {main_page ? (
                    <>
                        {name && (
                            name === 'Settings' ? (
                                <>{AddButton(add_page(add_route), name, main_page, add_page('settings/newAdmin'))}</>
                            ) : (
                                <>{AddButton(add_page(add_route), name, main_page)}</>
                            )
                        )}
                        <br />
                        {children}
                    </>
                ) : (
                    <>
                        <div className={styles.add}>
                            {AddButton(add_page, name)}
                            <br />
                            {children}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
