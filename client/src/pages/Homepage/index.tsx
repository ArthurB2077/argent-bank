import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../actions/auth';
import Nav from '../../components/Nav';
import Banner from '../../components/Banner';
import Feature from '../../components/Feature';
import Footer from '../../components/Footer';

interface RootState {
    authReducer: {
        isLoggedIn: boolean
    }
};


const Homepage: React.FC = (): JSX.Element => {

    const isLoggedIn = useSelector((state: RootState) => state.authReducer.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(()=> {
        if(isLoggedIn) {
            logout()(dispatch);
        }
    // eslint-disable-next-line
    }, [isLoggedIn]);

    return (
        <>
            <Nav/>
            <main>
              <Banner/>
              <Feature/>
            </main>
            <Footer/>
        </>
    );
};
  
export default Homepage;
  