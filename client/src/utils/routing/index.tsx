import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

interface Props {
    children: JSX.Element,
};

interface RootState {
    authReducer: {
        isLoggedIn: boolean
    }
};

const PrivateRoute: React.FC<Props> = ({ children }): JSX.Element => {

    const isLoggedIn = useSelector((state: RootState): boolean => state.authReducer.isLoggedIn);

    return isLoggedIn ? children : <Navigate to="/login" replace={true}/>;
};

export default PrivateRoute;