import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.init';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = e => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log('clicked', email, password);

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,}$/;

    if (!passwordPattern.test(password)) {
      setError(
        'Password must be at least 6 characters long and include uppercase, lowercase, and special character.'
      );
      return;
    }
    // const length6Pattern = /^.{6,}$/;
    // const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    // const specialPattern = /^(?=.*[@$!%*?&]).{6,}$/;

    // if (!length6Pattern.test(password)) {
    //   console.log('object');
    //   setError('Password must be 6 character or longer');
    //   return;
    // } else if (!casePattern.test(password)) {
    //   setError(
    //     'Password must be at least 6 characters and include both uppercase and lowercase letters.'
    //   );
    //   return;
    // } else if (!specialPattern.test(password)) {
    //   setError(
    //     'Password must be at least 6 characters long and include a special character (@$!%*?&).'
    //   );
    //   return;
    // }

    //reset status: success or error
    setError('');
    setSuccess(false);

    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log('after auth', result.user);
        setSuccess(true);
        e.target.reset();
      })
      .catch(error => {
        console.log('error happend', error.message);
        setError(error.message);
      });
  };

  const handleTogglePasswordShow = e => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="input"
                    placeholder="Password"
                  />
                  <button
                    onClick={handleTogglePasswordShow}
                    className="btn btn-xs absolute top-2 right-6"
                  >
                    {showPassword ? (
                      <EyeOff size={16} strokeWidth={1.25} />
                    ) : (
                      <Eye size={16} strokeWidth={1.25} />
                    )}
                  </button>
                </div>
                <div>
                  <label class="label">
                    <input type="checkbox"  class="checkbox" />
                    Accept Our Terms & Conditions
                  </label>
                </div>
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>
              {success && (
                <p className="text-green-500">Account Create Successfully</p>
              )}
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
