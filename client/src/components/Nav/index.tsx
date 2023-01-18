import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/auth";
import { useDispatch, connect } from 'react-redux';
import Logo from '../../assets/logos/argentBankLogo.png';

interface Props {
    isConnected?: boolean,
    userName?: string,
    setRegisterTime?: Function
};

const Nav: React.FC<Props> = (props): JSX.Element => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout: Function = async (): Promise<void> => {
        await logout()(dispatch);
        navigate("/", { replace: true });
    };

    return(
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={Logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {props.isConnected ? 
                    (        
                        <>
                            <Link className="main-nav-item" to="/profile">
                                <i className="fa fa-user-circle"></i>
                                {props.userName}
                            </Link>
                            <Link className="main-nav-item" to="#" onClick={() => handleLogout()}>
                                <i className="fa fa-sign-out"></i>
                                Sign Out
                            </Link>
                        </>
                    )
                    :
                    (                
                        <Link className="main-nav-item" to="/login" onClick={() => props.setRegisterTime && props.setRegisterTime(false)}>
                            <i className="fa fa-user-circle nav-sign-in-icon"/>
                            Sign In
                        </Link>
                    )
                }
            </div>
        </nav>
    );
};

export default connect()(Nav);