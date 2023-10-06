import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useState } from "react";
import { FaEye , FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";


const Register = () => {
    const [registerError , setRegisterError] = useState(' ');
    const [successMessage , setSuccessMessage] = useState(' ');
    const [showPassword , setShowPassword] = useState(false);

    const handleRegister = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        const name = e.target.name.value;
        console.log (name , email , password , accepted);
        
        if(password.length < 6){
            setRegisterError('Password should be minimum 6 characters or longer');
            return;
        }
        else if (!/[A-Z]/.test(password)){
            setRegisterError("Your Password should have at least one Upper Case character");
            return;
        }
        else if(!accepted){
            setRegisterError("Please Read and Accept our Terms and condition");
            return;
        }
        
        // reset error
        setRegisterError(' ');

        // reset success
        setSuccessMessage(' ');

    // create user
     createUserWithEmailAndPassword(auth , email , password)
        .then( result =>{
            console.log(result.user);
            setSuccessMessage("Successfully Logged in")
            
            // update profile

            updateProfile( result.user ,{
                displayName: name ,
                photoURL: "https://example.com/jane-q-user/profile.jpg"
            })
            .then(() =>{
                console.log("Profile Updated");
            })
            .catch()

            // send email verification
            sendEmailVerification( result.user)
            .then( () =>{
                alert("Please check your email and verify your account")
            })
          

        })

        .catch(error =>{
            console.error(error);
            setRegisterError(error.message)
        })
    }
    return (
        <div className="">
            <div className="mx-auto md:w-1/2">
            <h2 className="text-3xl mb-8">Please Register</h2>
            <form onSubmit={handleRegister}>
                <input className="mb-4 w-full py-2 px-4" placeholder="Your Name" type="text" name="name" id="" required />
                <input className="mb-4 w-full py-2 px-4" placeholder="Email Address" type="email" name="email" id="" required />
                <br />
                <div className="relative mb-4">
                <input className=" w-full  py-2 px-4" placeholder="Password"
                 type={ showPassword ? "text" :  "password" }
                  name="password" id="" required />
                <br />
                <span className="absolute right-2 top-3" onClick={ () => setShowPassword(!showPassword)}>
                    {
                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                    }
                </span>
                </div>
                <div className="mb-4">
                    <input type="checkbox" name="terms" id="" />
                    <label className="ml-2" htmlFor="">Accept our <a className="text-blue-500 underline" href="">Terms and condition</a></label>
                </div>
                <input className="btn btn-secondary mb-4  w-full" type="submit" value="Register" />
            </form>
            {
                registerError && <p className="text-red-700">{registerError}</p>
            }
            {
                successMessage && <p className="text-green-700">{successMessage}</p>
            }

            <p>Already have an Account?<Link className="underline text-blue-500 ml-2" to="/login">Log In Now</Link></p>
            </div>
        </div>
    );
};

export default Register;