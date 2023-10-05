
import { signInWithEmailAndPassword , sendPasswordResetEmail } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";



const Login = () => {

    const [registerError, setRegisterError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const emailRef = useRef(null)

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)


        setRegisterError("");
        setSuccessMsg("");

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
               
                if(result.user.emailVerified){
                    setSuccessMsg("Úser created successfully");
                }else{
                    alert('Please check your email and verify your account')
                }
                
            })
            .catch(error => {
                console.log(error.message)
                setRegisterError(error.message);
            })

    }

    const handleForgetPassword = ()=>{
        console.log('send reset email')
        const email = emailRef.current.value
        if(!email){
            console.log('Please provide a valid email' , email);
            return ;
        }

        // send validation email
        sendPasswordResetEmail(auth, email)
        .then(()=>{
            alert('Please check your email')
        })
        .catch(error=>{
            console.log(error.message)
        })
    }


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                        excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
                        a id nisi.
                    </p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                className="input input-bordered"
                                required
                                ref={emailRef}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                            />
                            <label className="label">
                                <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>

                    {registerError && <p className="text-red-600">{registerError}</p>}
                    {successMsg && <p className="text-green-600">{successMsg}</p>}

                    <p className="mx-6 mb-4">New to this site please <Link to="/register"> Register </Link></p>


                </div>
            </div>
        </div>
    );
};

export default Login;
