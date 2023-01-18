import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../actions/auth';
import Nav from '../../components/Nav';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import Footer from '../../components/Footer';

interface RootState {
    authReducer: {
        isLoggedIn: boolean
    }
};

const Login: React.FC = (): JSX.Element => {

    const isLoggedIn: boolean = useSelector((state: RootState) => { 
        return state.authReducer.isLoggedIn
    });
    const dispatch = useDispatch();
    const [registerTime, setRegisterTime] = useState<boolean>(false);
    
    useEffect(()=> {
        if(isLoggedIn) {
            logout()(dispatch);
        }
    // eslint-disable-next-line
    }, []);

    return(
        <>
            <Nav setRegisterTime={setRegisterTime}/>
            {
                !registerTime ? <LoginForm setRegisterTime={setRegisterTime}/> : <RegisterForm setRegisterTime={setRegisterTime}/>
            }
            <Footer/>
        </>
    );
};

export default Login;