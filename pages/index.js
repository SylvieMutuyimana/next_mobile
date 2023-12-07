import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Loading } from '../components/navigation/loadingPage';
import Login from './authentication/login';

const Index = ({ userDetails, userId, setUserDetails, setUserID }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('4444444')
    setTimeout(() => {
      setLoading(false);
      console.log("the userDetails: ", userDetails)
      if (userDetails && userDetails != '' && userDetails.type) {
        router.push(`/${userId}`);
      } 
    }, 2000); 
  }, [userDetails]);

  return (
    <>
      {loading ? (
        <>{Loading()}</>
      ) : (
        <Login setLoading={setLoading} setUserDetails={setUserDetails} setUserID={setUserID}/>
      )}
    </>
  );
};

export default Index;
