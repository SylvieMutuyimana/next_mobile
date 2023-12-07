import { AppPages } from '../components/navigation/page_links';
import styles from '../styles/module.css/App.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/global.css';
import AppLayout from './Layout';
import {getUserFromLocalStorage} from '../components/localStorage';
import { backendhost } from '../components/navigation/routes';
import { startComponents_ } from '../components/some_components';
import LoadingPage from './authentication/load';

function App({ Component, pageProps }) {
  const [currentPage, setCurrentPage] = useState(null);
  const starting_Components = startComponents_()
  const router = useRouter()
  const { pathname } = useRouter();
  const [userDetails, setUserDetails] = useState(null);
  const [userId, setUserID] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [appData, setappData] = useState(starting_Components)

  useEffect(()=>{
    //console.log('11111111')
    if(!appData.items || !appData.categories || !appData.wishlist || !appData.cart||
      !appData.purchases || !appData.sold_items) {
        if(!loadingData){setLoadingData(true)}
    }else if(loadingData){setLoadingData(false)}
  },[!appData.items, !appData.categories, !appData.wishlist, !appData.cart||
      !appData.purchases, !appData.sold_items])

  useEffect(() => {
    //console.log('222222222')
    const the_user = getUserFromLocalStorage('logged_ECOSWAP_user');
    const loginPage = AppPages.find(page => page.name === 'Login').path;
    if (!the_user && !pathname.endsWith(loginPage)) {
      //console.log('22112211221122112211')
      router.push(loginPage)
    } else {
      //console.log('333444333444333')
      //console.log('the_user:  ', the_user)
      //console.log('userDetails:  ', userDetails)
      if(!userDetails && the_user){
        //console.log('556655665566')
        setUserDetails(the_user)
        setUserID(the_user._id)
        //localStorage.setItem('logged_ECOSWAP_user', JSON.stringify(null));
      }
    }
  },[pathname, userId, userDetails]);

  useEffect(()=>{
    //console.log('3333333')
    if(loadingData && userId && userDetails){
      if(!appData.items || !appData.categories || !appData.wishlist || !appData.cart||
        !appData.purchases || !appData.sold_items
      ) {
        console.log('stuck here')
      }else{
        setLoadingData(false)
      }
    }
  },[loadingData, userId, userDetails])

  //console.log('pathname', pathname)
  //console.log('userdetails', userDetails)
  //console.log('appData', appData)
  return (
    <AppLayout userDetails={userDetails} userId={userId} 
      setUserDetails={setUserDetails} 
      currentPage={currentPage} setCurrentPage={setCurrentPage}
    >
      <section className={styles.content}>
        {(pathname === '' || pathname === '/')?(
          <Component
            {...pageProps}
            backendhost={backendhost}
            userDetails={userDetails}
            setUserDetails = {setUserDetails}
            setUserID = {setUserID}
            userId={userId}
          />
        ):(
          <>
            {loadingData ? (
              <>Fetching Data{LoadingPage()}</>
            ) : (
              <Component
                {...pageProps}
                backendhost={backendhost}
                userDetails={userDetails}
                userId={userId}
                appData={appData}
              />
            )}
          </>
        )}
      </section>
    </AppLayout>
  );
  
}

export default App;
