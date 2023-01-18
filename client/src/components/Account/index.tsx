interface Props {
    title: string,
    amount: string,
    description: string,
}

const Account: React.FC<Props> = (props): JSX.Element => {
    return(
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{props.title}</h3>
                <p className="account-amount">{`$${props.amount}`}</p>
                <p className="account-amount-description">{props.description}</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
            </div>
      </section>
    );
};

export default Account;