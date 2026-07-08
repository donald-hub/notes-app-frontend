const Reset = () =>{

    const crypto = require('crypto');

    function generateOTP() {
    // Generates a random integer between 100000 (inclusive) and 999999 (inclusive)
    return crypto.randomInt(100000, 1000000).toString();
    }


    return (
        <>
        <h2>OTP Verification</h2>
        <div>Your generated OTP is {generateOTP()}</div>
        <div>Verify</div>
        <div>Enter New Password</div>
        <div>Re-enter new Password</div>
        <button>Reset</button>
        </>
    );
}
export default Reset;