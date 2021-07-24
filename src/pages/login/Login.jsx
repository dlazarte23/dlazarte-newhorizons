import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import { SignIn } from "../../services/AuthenticatedService";
import { validateEmail, validateText } from "../../utils/RegexValidations";
import {
  actionIsAuthenticated,
  actionAlertMessage,
} from "../../actions/applicationAction";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const alertMessage = useSelector(
    (state) => state.applicationReducer.alertMessage
  );
  const refEmail = useRef(null);
  const refPassword = useRef(null);

  const handleClickSignIn = async () => {
    const email = refEmail.current?.value;
    const password = refPassword.current?.value;

    if (email && password) {
      const userToLogin = {
        email,
        password,
      };

      const resultSignIn = await SignIn(userToLogin);
      if (resultSignIn.isAuthenticated) {
        localStorage.setItem("IS_AUTHENTICATED", resultSignIn.isAuthenticated);
        localStorage.setItem("USER_DATA", JSON.stringify(resultSignIn.data));
        localStorage.setItem("USER_ID", resultSignIn.data.id);
        dispatch(actionIsAuthenticated());
      } else {
        dispatch(actionAlertMessage(true, resultSignIn.message));
      }
    } else {
      dispatch(
        actionAlertMessage(
          true,
          "Debe ingresar un correo y una contraseña para poder ingresar."
        )
      );
    }
  };

  useEffect(() => {
    return () => {
      dispatch(actionAlertMessage());
    };
  }, [dispatch]);

  const [validated, setValidated] = useState({
    email: false,
    password: false,
  });
  console.log(validated);

  const handleChangeEmail = (e) => {
    const valueInput = e.target.value;
    const isValid = validateEmail(valueInput);
    let messageValidation = "El correo no es válido";
    if (!isValid) {
      setValidated({ ...validated, email: false });
      dispatch(actionAlertMessage(true, messageValidation));
    } else {
      setValidated({ ...validated, email: true });
      dispatch(actionAlertMessage());
    }
  };

  const handleChangePassword = (e) => {
    const valueInput = e.target.value;
    const isValid = validateText(valueInput);
    let messageValidation = "La contraseña debe tener minimo 6 caracteres";
    if (!isValid) {
      setValidated({ ...validated, password: false });
      dispatch(actionAlertMessage(true, messageValidation));
    } else {
      setValidated({ ...validated, password: true });
      dispatch(actionAlertMessage());
    }
  };

  return (
    <div className="body-public">
      <div className="form-signin text-center">
        <div>
          <img
            src="https://jonmircha.com/img/category/react.svg"
            alt="Logo"
            width="72"
            height="57"
          />
          <h1 className="h3 mb-3 fw-normal">Iniciar Sesión</h1>
          <div className="form-floating">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="email@example.com"
              ref={refEmail}
              onChange={handleChangeEmail}
            />
            <label htmlFor="email">Correo Electronico</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Contraseña"
              ref={refPassword}
              onChange={handleChangePassword}
            />
            <label htmlFor="password">Contraseña</label>
          </div>
          <div className="d-grid gap-2 mx-auto">
            <button
              className="btn btn-lg btn-success"
              onClick={handleClickSignIn}
              disabled={!validated.email || !validated.password}
            >
              Ingresar
            </button>
            <Link className="btn btn-lg btn-primary" to="/register">
              Registrar
            </Link>
            {alertMessage.visibility ? (
              <AlertMessage message={alertMessage.message} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
