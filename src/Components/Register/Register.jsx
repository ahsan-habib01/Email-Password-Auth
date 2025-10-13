import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.init';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router';

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = e => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    console.log('clicked', email, password, terms, name, photo);

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

    if (!terms) {
      setError('Please accept our terms and conditions')
      return
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log('after auth', result.user);
        setSuccess(true);
        e.target.reset();

        //update user profile
        const profile = () => {
          displayName: name;
          photoURL: photo;
        }
        updateProfile(result.user, profile)
          .then(()=>{})
          .catch(error => {
          console.log(error);
        })

        // send email verification
        sendEmailVerification(result.user)
          .then(() => {
          alert('Verification email sent! Please check your inbox.');
        })
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
  
        <div className="card bg-base-100 m-auto w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold">Register now!</h1>
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Your Name"
                />
                <label className="label">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  className="input"
                  placeholder="Photo URL"
                />
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
                    <input type="checkbox" name="terms" class="checkbox" />
                    Accept Our Terms & Conditions
                  </label>
                </div>
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>
              {success && (
                <p className="text-green-500">Account Create Successfully</p>
              )}
              {error && <p className="text-red-500">{error}</p>}
            </form>
            <p>
              Already have an account? Please{' '}
              <Link to="/login" className="text-blue-400 underline">
                Login
              </Link>
            </p>
          </div>
        </div>
  
  );
};

export default Register;
