import { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { retrieve } from '../../actions/profile';
import Nav from "../../components/Nav";
import ProfilHeader from "../../components/ProfilHeader";
import Footer from "../../components/Footer";
import Account from "../../components/Account";

interface Transaction {
    title: string;
    amount: string;
    description: string;
};

interface AuthState {
    authReducer: {
        user: {
            email: string,
            password: string,
            token: string,
        }
    }
};

interface Profile {
    createdAt: string | null,
    email: string | null,
    firstName: string | null,
    id: string | null,
    lastName: string | null,
    updatedAt: string | null,
}

interface ProfileState {
    profileReducer: {
        loading: boolean,
        error: string | null,
        data: Profile | null,
        message: string | null,
    }
};

const Profil: React.FC = (): JSX.Element => {

    const transactionMock: Array<Transaction> = [
        {
            title: "Argent Bank Checking (x8349)",
            amount: "2,082.79",
            description: "Available Balance",
        },
        {
            title: "Argent Bank Savings (x6712)",
            amount: "10,928.42",
            description: "Available Balance",
        },
        {
            title: "Argent Bank Credit Card (x8349)",
            amount: "184.30",
            description: "Current Balance",
        }
    ];
    const dispatch = useDispatch();
    const token = useSelector((state: AuthState) => state.authReducer.user.token);
    const firstName = useSelector((state: ProfileState) => state.profileReducer.data && state.profileReducer.data.firstName);
    const lastName = useSelector((state: ProfileState) => state.profileReducer.data && state.profileReducer.data.lastName);

    useEffect(() => {
        retrieve(token)(dispatch);
    // eslint-disable-next-line
    }, [firstName, lastName]);

    return(
        <>
            {firstName && lastName &&
                <>
                    <Nav isConnected={true} userName={firstName}/>
                    <main className="main bg-dark">
                        <ProfilHeader userFirstName={firstName} userLastName={lastName}/>
                        <h2 className="sr-only">Accounts</h2>
                        {transactionMock && transactionMock.map((trans, index) => 
                            <Account key={`transaction-${index}`} title={trans.title} amount={trans.amount} description={trans.description}/>)
                        }
                    </main>
                    <Footer/>
                </>
            }
        </>
    );
};

export default connect()(Profil);