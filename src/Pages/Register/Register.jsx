import { useState } from "react";
import SignUpForm from "../SignUpForm/SignUpForm";
import SignInForm from "../SignInForm/SignInForm";

const SlidingLoginSignup = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const toggleSignUpMode = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  // الزرار الكبير
  const buttonClasses = `
    w-full text-white bg-gradient-to-r from-blue-600 to-cyan-400 
    hover:from-blue-700 hover:to-cyan-500 shadow-lg 
    focus:ring-4 focus:outline-none focus:ring-cyan-300 
    font-semibold rounded-full text-sm px-5 py-3 text-center 
    transition-all duration-300 transform hover:scale-[1.02]
  `;

  // ازرار اللينكات
  const buttonForGFT = `
    inline-flex w-full justify-center items-center rounded-lg border border-gray-300 bg-white 
    py-2.5 px-4 text-sm font-medium text-gray-500 hover:bg-gray-50 shadow-sm transition-all 
    duration-200 hover:shadow hover:border-gray-400
  `;

  return (
    <div className="relative w-full min-h-screen bg-slate-200 overflow-hidden">

      {/* before desktop */}
      <div
        className={`
          hidden lg:block
          absolute w-225 h-225 rounded-[50%] 
          bg-cover bg-center bg-no-repeat z-6
          transition-all duration-[1.8s] ease-in-out
          [background-image:linear-gradient(rgba(8,47,73,0.6),rgba(8,47,73,0.6)),url('/src/assets/signup-bg-DGRfriy9.png')]
          ${isSignUpMode
            ? "right-[55%] translate-x-full -translate-y-[40%]"
            : "right-[45%] -translate-y-[45%]"
          }
        `}
      />

      {/* mobile al sora fo2 */}
      <div
        className="
          lg:hidden relative w-full h-52 flex flex-col items-center justify-center text-center px-6
          bg-cover bg-center
          bg-[linear-gradient(rgba(8,47,73,0.75),rgba(8,47,73,0.75)),url('/src/assets/signup-bg-DGRfriy9.png')]
        "
      >
        <h3 className="text-white text-2xl font-bold mb-1">
          {isSignUpMode ? (
            <>Connect with <span className="text-sky-400">amazing people</span></>
          ) : (
            <>Welcome Back to <span className="text-sky-400">SocialHub</span></>
          )}
        </h3>
        <p className="text-white/80 text-sm">
          {isSignUpMode
            ? "Join millions sharing moments and building connections"
            : "Sign in to connect with people all over the world"}
        </p>
      </div>

  
      <div className="absolute top-0 left-0 w-full h-full hidden lg:block">

        {/* Desktop */}
        <div
          className={`
            absolute top-1/2 left-1/2 grid grid-cols-1 z-5
            -translate-x-1/2 -translate-y-1/2
            w-[90%] lg:w-[30%]
            transition-all duration-[1.1s] ease-in-out
            ${isSignUpMode ? "lg:left-1/4" : "lg:left-3/4"}
          `}
        >
          {/* Sign In Form */}
          <div
            className={`flex items-center justify-center flex-col col-start-1 row-start-1 transition-all duration-500 delay-[0.4s] ${
              isSignUpMode ? "opacity-0 z-1 pointer-events-none" : "opacity-100 z-20"
            }`}
          >
            <SignInForm buttonClasses={buttonClasses} buttonForGFT={buttonForGFT} />
          </div>

          {/* Sign Up Form */}
          <div
            className={`flex items-center justify-center flex-col col-start-1 row-start-1 transition-all duration-500 delay-[0.4s] ${
              !isSignUpMode ? "opacity-0 z-1 pointer-events-none" : "opacity-100 z-20"
            }`}
          >
            <SignUpForm
              buttonClasses={buttonClasses}
              buttonForGFT={buttonForGFT}
              switchToSignIn={() => setIsSignUpMode(false)}
            />
          </div>
        </div>

        {/* Panels - Desktop بس */}
        <div className="absolute top-0 left-0 w-full h-full grid grid-cols-2 pointer-events-none">

          {/* بيظهر في Sign In */}
          <div className="flex items-center justify-center text-center z-7 px-12">
            <div
              className={`transition-all duration-[1.1s] ease-in-out ${
                isSignUpMode
                  ? "-translate-x-[200%] opacity-0 pointer-events-none"
                  : "opacity-100 pointer-events-auto translate-x-0"
              }`}
            >
              <h3 className="text-white text-3xl font-bold mb-2">
                Welcome Back to <span className="text-sky-500">SocialHub App</span>
              </h3>
              <p className="text-white opacity-90 mb-6">
                Signin to connect people all over the world
              </p>
              <p className="text-white opacity-90 mb-6">New Here?</p>
              <button
                onClick={toggleSignUpMode}
                className="bg-transparent border-2 border-white text-white px-10 py-2 rounded-full font-semibold hover:bg-white hover:text-cyan-500 transition-all pointer-events-auto"
              >
                Sign up
              </button>
            </div>
          </div>

          {/* بيظهر في Sign Up */}
          <div className="flex items-center justify-center text-center z-7 px-12">
            <div
              className={`transition-all duration-[1.1s] ease-in-out ${
                !isSignUpMode
                  ? "translate-x-[200%] opacity-0 pointer-events-none"
                  : "opacity-100 pointer-events-auto translate-x-0"
              }`}
            >
              <h3 className="text-white text-3xl font-bold mb-2">
                Connect with <span className="text-sky-500">amazing people</span>
              </h3>
              <p className="text-white opacity-90 text-sm mb-6">
                Join millions of users sharing moments, ideas, and building meaningful connections every day
              </p>
              <p className="text-white opacity-90 text-sm mb-6">Already Have an Account?</p>
              <button
                onClick={toggleSignUpMode}
                className="bg-transparent border-2 border-white text-white px-10 py-2 rounded-full font-semibold hover:bg-white hover:text-cyan-500 transition-all pointer-events-auto"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>

  {/* mobile */}
      <div className="lg:hidden flex flex-col items-center px-5 pt-6 pb-10 bg-slate-200 min-h-[calc(100vh-208px)]">

        {/* الفورم */}
        <div className="w-full max-w-sm">
          <div className={`transition-all duration-500 ${isSignUpMode ? "opacity-0 h-0 overflow-hidden pointer-events-none" : "opacity-100"}`}>
            <SignInForm buttonClasses={buttonClasses} buttonForGFT={buttonForGFT} />
          </div>

          <div className={`transition-all duration-500 ${!isSignUpMode ? "opacity-0 h-0 overflow-hidden pointer-events-none" : "opacity-100"}`}>
            <SignUpForm
              buttonClasses={buttonClasses}
              buttonForGFT={buttonForGFT}
              switchToSignIn={() => setIsSignUpMode(false)}
            />
          </div>
        </div>

        {/* التبديل بين الفورمز */}
        <p className="mt-6 text-sm text-gray-600 text-center">
          {isSignUpMode ? (
            <>
              Already have an account?{" "}
              <span onClick={toggleSignUpMode} className="text-cyan-500 font-bold cursor-pointer">
                Sign in
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span onClick={toggleSignUpMode} className="text-cyan-500 font-bold cursor-pointer">
                Sign up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default SlidingLoginSignup;