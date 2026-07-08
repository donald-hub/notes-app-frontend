import crypto from "crypto";
const Reset = () =>{


    // function generateOTP() {
    // // Generates a random integer between 100000 (inclusive) and 999999 (inclusive)
    // return crypto.randomInt(100000, 1000000).toString();
    // }

    // console.log("Your generated OTP is: ", generateOTP());

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