import React, { useState } from 'react';
import Login from "../../compnents/Forms/LoginForm";
import SignUp from "../../compnents/Forms/SignUpForm";


const LandingPage: React.FC = () => {
    const [showLogin, setShowLogin] = useState<boolean>(true);

    const toggleForm = (): void => {
        setShowLogin(!showLogin);
    };

    return (
        <div className="text-black landing-page font-poppins min-h-screen flex items-center justify-center">
            <div className="landing-content text-black p-8 w-full max-w-lg">
                <div className='p-5 font-bold text-center text-4xl text-green-700 font-pacifico '> Memora Games</div>
                {showLogin ? (
                    <Login toggleForm={toggleForm} />
                ) : (
                    <SignUp toggleForm={toggleForm} />
                )}
                <div className="form-toggle-link mt-6 text-center text-black">
                    <p>
                        {showLogin ? "Don't have an account? " : "Already have an account? "}
                        <span
                            onClick={toggleForm}
                            className="text-green-500 hover:text-green-600 cursor-pointer font-semibold"
                        >
                            {showLogin ? 'Sign Up' : 'Log In'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
