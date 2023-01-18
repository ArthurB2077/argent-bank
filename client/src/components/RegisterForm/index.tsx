import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { register } from "../../actions/auth";

interface Props {
    setRegisterTime: Function
}

const RegisterForm: React.FC<Props> = (props): JSX.Element => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const newEmailRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const handleSignUp: Function = async (event: Event): Promise<void> => {
        event.preventDefault();
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const newEmail = newEmailRef.current?.value;
        const newPassword = newPasswordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;

        if(newPassword !== confirmPassword) {
            alert("Passwords do not match");
        } else {
            await register(newEmail, confirmPassword, firstName, lastName)(dispatch);
            props.setRegisterTime(false)
            navigate("/login", { replace: true });
        }
    };

    return(
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle"/>
                <h1>Sign up</h1>
                <form onSubmit={(e) => handleSignUp(e)}>
                    <div className="input-wrapper">
                        <label htmlFor="firstName">First name</label>
                        <input ref={firstNameRef} type="text" id="firstName" name="firstname"/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="lastName">Last name</label>
                        <input ref={lastNameRef} type="text" id="lastName" name="lastname"/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="newEmail">Email</label>
                        <input ref={newEmailRef} type="text" id="newEmail" name="newemail"/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="newPassword">Password</label>
                        <input ref={newPasswordRef} type="password" id="newPassword" name="newpassword"/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input ref={confirmPasswordRef} type="password" id="confirmPassword" name="confirmpassword"/>
                    </div>
                    <button className="sign-in-button" type="submit">Sign Up</button>
                </form>
            </section>
        </main>
    );
};

export default connect()(RegisterForm);