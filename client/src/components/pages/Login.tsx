import { useState } from 'react';
import { Input } from '../form/Input';
import { useNavigate, useOutletContext } from 'react-router-dom';

interface OutletContextTypes {
  jwtToken: string;
  setJwtToken: React.Dispatch<React.SetStateAction<string>>;
  setAlertClassName: React.Dispatch<React.SetStateAction<string>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setJwtToken, setAlertClassName, setAlertMessage } =
    useOutletContext<OutletContextTypes>();
  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log('email/pass', email, password);

    if (email === 'admin@example.com') {
      setJwtToken('abc');
      setAlertClassName('d-none');
      setAlertMessage('');
      navigate('/');
    } else {
      setAlertClassName('alert-danger');
      setAlertMessage('Invalid credentials');
    }
  };
  return (
    <>
      <div className="col-md-6 offset-md-3">
        <h2>Login</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <Input
            title="Email Address"
            type="email"
            className="form-control"
            name="email"
            autoComplete="email-new"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Email Address"
            value={email}
            errorDiv={''}
            errorMessage={''}
          />
          <Input
            title="Password"
            type="password"
            className="form-control"
            name="password"
            autoComplete="password-new"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="Passsword"
            value={password}
            errorDiv={''}
            errorMessage={''}
          />
          <hr />
          <input className="btn btn-primary" value="Login" type="submit" />
        </form>
      </div>
    </>
  );
}
