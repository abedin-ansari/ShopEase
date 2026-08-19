import { useState } from "react";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="loginForm">
      <form>
        <h1>{isSignInForm ? "Sign In Form" : "Sign Up Form"}</h1>
        {!isSignInForm && <input type="text" placeholder="Full Name" />}{" "}
        {/* // If it is not Sign In form */}
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p>
          {isSignInForm ? "New to ShopEase? " : "Already have an account? "}

          <button onClick={handleToggle}>
            {isSignInForm ? "Sign Up Now" : "Sign In Now"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
