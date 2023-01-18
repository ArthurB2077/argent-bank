import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { login } from "../../actions/auth";

interface Props {
    setRegisterTime: Function
}

const LoginForm: React.FC<Props> = (props): JSX.Element => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const rememberUser = useRef<HTMLInputElement>(null);
    const currentUserRemembered: string | null = localStorage.getItem("userRemebered"); 
    const [isRememberedUser, setIsRememberedUser] = useState<boolean>(currentUserRemembered !== null ? JSON.parse(currentUserRemembered).isRemembered : false);

    useEffect(() => {
        if(isRememberedUser && currentUserRemembered !== null) {
            if (currentUserRemembered && JSON.parse(currentUserRemembered).user !== null && emailRef.current && passwordRef.current && rememberUser.current) {
                emailRef.current.value = JSON.parse(currentUserRemembered).user.email;
                passwordRef.current.value= JSON.parse(currentUserRemembered).user.password;
                rememberUser.current.checked = true;
            }
        } else {
            if (currentUserRemembered && JSON.parse(currentUserRemembered).user !== null && emailRef.current && passwordRef.current && rememberUser.current) {
                emailRef.current.value = '';
                passwordRef.current.value= '';
                rememberUser.current.checked = false;
            }
        }
    }, [isRememberedUser, currentUserRemembered]);

    const handleSubmit: Function = async (event: Event): Promise<void> => {
        event.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        await login(email, password)(dispatch);
        if (rememberUser.current?.checked) {
            if (currentUserRemembered) {
                localStorage.setItem('userRemebered', JSON.stringify({
                    ...JSON.parse(currentUserRemembered),
                    user: {
                        email: email,
                        password: password
                    }
                }));
            }
        } else {
            localStorage.removeItem('userRemebered');
        }
        navigate("/profile", { replace: true });
    };

    const handleRememberUser: Function = (): void => {
        if(rememberUser.current?.checked) {
            setIsRememberedUser(true);
            if(localStorage.getItem('userRemebered') === null) {
                const rememberedUserInStorage = {
                    isRemembered: true,
                    user: null
                };
                localStorage.setItem('userRemebered', JSON.stringify(rememberedUserInStorage));
            }
        } else {
            setIsRememberedUser(false);
            localStorage.removeItem('userRemebered');
        }
    };

    return(
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle"/>
                <h1>Sign In</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input ref={emailRef} type="text" id="username" name="username"/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input ref={passwordRef} type="password" id="password" name="password"/>
                    </div>
                    <div className="input-remember">
                        <input ref={rememberUser} type="checkbox" id="remember-me" onChange={() => handleRememberUser()}/>
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button" type="submit">Sign In</button>
                </form>
                <p>First connection ? <Link to="#" onClick={() => props.setRegisterTime(true)}>Sign up here</Link></p>
            </section>
        </main>
    );
};

export default connect()(LoginForm);