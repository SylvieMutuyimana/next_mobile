import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Login from './authentication/login';
import LoadingPage from './authentication/load';

const Index = ({ userDetails, userId, setUserDetails, setUserID }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('ghvjgfc')
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
        <>{LoadingPage()}</>
      ) : (
        <Login setLoading={setLoading} setUserDetails={setUserDetails} setUserID={setUserID}/>
      )}
    </>
  );
};

export default Index;
