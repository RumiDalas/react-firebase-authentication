import { createUserWithEmailAndPassword ,sendEmailVerification} from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(email, password , accepted);

    setRegisterError("");
    setSuccessMsg("");

    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters or longer");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Your password should have at least one uppercase character."
      );
      return;
    }else if(!accepted){
        setRegisterError(
            "Please accept our terms and conditions"
          );
          return;

    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccessMsg("Úser created successfully");
        // Email verification link
        sendEmailVerification(result.user)
        .then(() => {
            alert('Please check your email and verify your account')
        });
      })
      .catch((error) => {
        console.log(error);
        setRegisterError(error.message);
      });
  };

  return (
    <div className="mt-8 ">
      <div className="mx-auto md:w-1/2 ">
        <h2 className="text-3xl mb-4">Please Register</h2>
        <form onSubmit={handleRegister}>
          <input
            required
            placeholder="Email Address"
            className="border-2 border-indigo-500/100 w-full py-2 px-4 mb-4"
            type="email"
            name="email"
          />
          <br />
          <div className="relative">
          <input
            required
            placeholder="Password"
            className="mb-4 border-2 border-indigo-500/100 w-full py-2 px-4 "
            type={showPassword ?"text":"password"}
            name="password"
          />
          <span className="absolute top-3 right-2" onClick={()=> setShowPassword(!showPassword)}>
           {
            showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye> </FaEye>
           }
          </span>
          </div>

          <div className="mb-4">
          <input className="mb-2" type="checkbox" name="terms" id="terms"/>
          <label className="ml-2 " htmlFor="terms">Accept Our<a>Terms and Conditions</a></label>
          </div>
          <input
            className="btn btn-secondary mb-4 w-full"
            type="submit"
            value="Register"
          />
        </form>
        {registerError && <p className="text-red-600">{registerError}</p>}
        {successMsg && <p className="text-green-600">{successMsg}</p>}
      </div>
    </div>
  );
};

export default Register;
