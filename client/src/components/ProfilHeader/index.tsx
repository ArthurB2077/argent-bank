import { useState, useRef } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { update } from "../../actions/profile";

interface Props {
    userFirstName: string,
    userLastName: string,
}

interface AuthState {
    authReducer: {
        user: {
            email: string,
            password: string,
            token: string,
        }
    }
}

const ProfilHeader: React.FC<Props> = ({ userFirstName, userLastName }): JSX.Element => {

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const [editing, setEditing] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state: AuthState) => state.authReducer.user.token);

    const handleSubmit: Function = async (event: Event): Promise<void> => {
        event.preventDefault();
        if(firstNameRef.current && lastNameRef.current) {
            await update(token, firstNameRef.current.value, lastNameRef.current.value)(dispatch);
            setEditing(false);
        }
    };

    return(
        <div className="header">
            {editing ? 
                (
                    <>
                        <h1>Welcome back<br/>{userFirstName} {userLastName}!</h1>
                        <form className="edit-profile-form" onSubmit={(e) => handleSubmit(e)}>
                            <div className="edit-input-container">
                                <div className="edit-input-wrapper input-wrapper">
                                    <label htmlFor="firstName">First name</label>
                                    <input ref={firstNameRef} type="text" id="firstName" name="firstName"/>
                                </div>
                                <div className="edit-input-wrapper input-wrapper">
                                    <label htmlFor="lastName">Last name</label>
                                    <input ref={lastNameRef} type="text" id="lastName" name="lastName"/>
                                </div>
                            </div>
                            <div className="edit-button-container">
                                <div className="edit-button-wrapper">
                                    <button className="edit-button" type="submit">Save</button>
                                </div>
                                <div className="edit-button-wrapper-left">
                                    <button className="edit-button" onClick={() => setEditing(false)}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </>
                )
                :
                (
                    <>
                        <h1>Welcome back<br/>{userFirstName} {userLastName}!</h1>
                        <button className="edit-button" onClick={() => setEditing(true)}>Edit Name</button>
                    </>
                )

            }
        </div>
    );
};

export default connect()(ProfilHeader);