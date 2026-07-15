import mail from "../services/auth";
const Reset = () =>{


    const data = mail();
    console.log(data);
    return (
        <>
        <h2>OTP Verification</h2>
        <div>Verify</div>
        <div>Enter New Password</div>
        <div>Re-enter new Password</div>
        <button>Reset</button>
        </>
    );
}
export default Reset;