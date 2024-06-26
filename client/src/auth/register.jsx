import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import PasswordChecklist from "react-password-checklist"

// import { useNavigate } from 'react-router-dom'; 

function Register() {
  const register = useAuthStore((state) => state.register);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { usernameExists, checkUsernameExists } = useAuthStore();

  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false); // State to track password validity
  const [passwordFocused, setPasswordFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (isValid) => {
    setPasswordValid(isValid);
  };


  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  
  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };




  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'username' && value.trim() !== '') {
      await checkUsernameExists(value.trim());
    }
  };

  const handleCheckboxChange = (e) => {
    setTermsAccepted(e.target.checked);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    setErrorMessage(''); // Clear any previous error message
    setSuccessMessage(''); // Clear any previous success message

    try {
      const registrationResult = await register(username, email, password);
      if (registrationResult.success) {
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setSuccessMessage('Account created successfully!');
      } else {
        // Registration failed, display error message
        setErrorMessage(registrationResult.errorMessage);
      }
    } catch (error) {
      // Handle error
      if (error.response) {
          // If server responds with an error, display the error message from the server
          setErrorMessage(error.errorStatusMessage);
      } else {
          // If something else went wrong, display a generic error message
          setErrorMessage('An unexpected error occurred. Please try again later.');
      }
  }
  };

  


  return (
    <>
      <section className="">
      
        <div className="flex items-center justify-center px-6 py-8 h-screen">
          <div className="w-full rounded-lg sm:max-w-md">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">Create an account</h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>

                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium">Username</label>

                  <input
                    type="text"
                    name="username"
                    id="username" 
                    value={formData.username}
                    onChange={handleChange}
                    className={`border ${formData.username && usernameExists ? 'ring-2 ring-red-500' : 'border-gray-300 focus:border-primary-600'} sm:text-sm rounded-lg block w-full p-2.5`}
                    placeholder="Username"
                    required
                  />
                  {/* IF USERNAME EXIST SHOW USERNAME ALREADY EXIST */}
                  {/* IF USERNAME IS AVAILABLE SHOW USERNAME IS AVAILABLE */}
                  <div className=' text-red-500 text-sm mt-2 '> {formData.username && usernameExists && <p className="text-red-500">Username already exists</p>}</div>
                  <div className=' text-green-500 text-sm mt-2 '> {formData.username && !usernameExists && <p className="text-green-500">Username available</p>}</div>
                 
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5" placeholder="Email" required />
                </div>
                
                <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password" id="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required
                          onFocus={handlePasswordFocus}
                          onBlur={handlePasswordBlur}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute top-0 end-0 p-3.5 rounded-e-md"
                        >
                          <svg
                            className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {showPassword ? (
                              <>
                                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                <line x1="2" x2="22" y1="2" y2="22"></line>
                              </>
                            ) : (
                              <>
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </>
                            )}
                          </svg>
                        </button>
                      </div>
                </div>


                                
                <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium">Confirm password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="confirmPassword" id="confirm-password" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required
                          onFocus={handlePasswordFocus}
                          onBlur={handlePasswordBlur}                        

                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute top-0 end-0 p-3.5 rounded-e-md"
                        >
                          <svg
                            className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {showPassword ? (
                              <>
                                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                <line x1="2" x2="22" y1="2" y2="22"></line>
                              </>
                            ) : (
                              <>
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </>
                            )}
                          </svg>
                        </button>
                      </div>
                </div>

              {/* Conditionally render the PasswordChecklist only when password input is focused */}
              {passwordFocused && (
                  <div className='mt-3'>
                    <PasswordChecklist
                      rules={["minLength","specialChar","number","capital","match"]}
                      minLength={8}
                      value={formData.password}
                      valueAgain={formData.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                )}

      
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                  <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 checkbox" checked={termsAccepted} onChange={handleCheckboxChange} required />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light">I accept the <a className="font-medium text-primary hover:underline" href="#/">Terms and Conditions</a></label>
                  </div>
                </div>
                <button type="submit" disabled={!passwordValid || !termsAccepted} className={`w-full text-white btn btn-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${!passwordValid && 'cursor-not-allowed opacity-50'}`}>Create an account</button>
                <p className="text-sm font-light">
                  Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                </p>

                
                <div>{errorMessage && <p className="text-sm text-red-700 text-center rounded-md bg-red-100 border border-red-400 p-4">{errorMessage}</p>}</div>
                <div>{successMessage && <p className="text-sm text-green-700 text-center rounded-md bg-green-100 border border-green-400 p-4">{successMessage}</p>}</div>

              </form>
            </div>
          </div>

        
        </div>
      </section>
    </>
  );
}

export default Register;
