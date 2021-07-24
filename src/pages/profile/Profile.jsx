//import md5 from "md5";
import { GetUserById, UpdateUser } from "../../services/AuthenticatedService";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import Modal from "../../components/Modal/Modal";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionModal } from "../../actions/applicationAction";
import { validateEmail, validateText } from "../../utils/RegexValidations";
import { actionAlertMessage } from "../../actions/applicationAction";

const Profile = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.applicationReducer.modal);
  const alertMessage = useSelector(
    (state) => state.applicationReducer.alertMessage
  );
  const [userData, setUserData] = useState(undefined);
  const [formData, setFormData] = useState(undefined);
  const loadDataCurrentUser = async () => {
    const currentUserId = localStorage.getItem("USER_ID");
    const currentUser = await GetUserById(currentUserId);
    setUserData(currentUser);
    setFormData({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      password: atob(currentUser.password),
    });
  };

  const handleChangeInput = (e) => {
    const nameInput = e.target.name;
    const valueInput = e.target.value;

    const isValid =
      nameInput === "email"
        ? validateEmail(valueInput)
        : validateText(valueInput);

    let messageValidation =
      nameInput === "email"
        ? "El correo no es válido."
        : "Ingrese mínimo 6 caracteres";
    if (!isValid) {
      dispatch(actionAlertMessage(true, messageValidation));
    } else {
      dispatch(actionAlertMessage());
    }

    if (nameInput === "email") {
      setFormData({
        ...formData,
        [nameInput]: valueInput,
      });
    } else {
      setFormData({
        ...formData,
        [nameInput]: valueInput,
      });
    }
  };

  const closeModal = () => {
    dispatch(actionModal());
  };

  const handleSaveUserData = async () => {
    const userToUpdate = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: btoa(formData.password),
    };
    const currentUserId = localStorage.getItem("USER_ID");
    const resultUpdate = await UpdateUser(currentUserId, userToUpdate);
    if (resultUpdate) {
      dispatch(
        actionModal(
          true,
          closeModal,
          "Mensaje",
          "Información actualizada correctamente.😎"
        )
      );
      loadDataCurrentUser();
    }
  };

  useEffect(() => {
    loadDataCurrentUser();
  }, []);

  return (
    <>
      {modal.visibility ? (
        <Modal
          title={modal.title}
          subTitle={modal.subTitle}
          callback={modal.callback}
        />
      ) : null}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Perfil</h1>
      </div>
      {userData ? (
        <div className="main-body">
          <div className="row">
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={userData.photoUrl}
                      alt="gravatar"
                      className="rounded-circle p-1"
                      width="155"
                    />
                    <div className="mt-3">
                      <h4>{`${userData.firstName} ${userData.lastName}`}</h4>
                      <p className="text-secondary mb-1">{userData.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {formData !== undefined ? (
              <div className="col-6">
                <div className="card">
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Información:</h6>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Nombres</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="text"
                          name="firstName"
                          className="form-control"
                          value={formData.firstName}
                          onChange={handleChangeInput}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Apellidos</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="text"
                          name="lastName"
                          className="form-control"
                          value={formData.lastName}
                          onChange={handleChangeInput}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Correo</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          value={formData.email}
                          onChange={handleChangeInput}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Password</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          value={formData.password}
                          onChange={handleChangeInput}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              "Cargando..."
            )}
          </div>
          <br />
          <div className="row">
            <div className="col"></div>
            <div className="col">
              {alertMessage.visibility ? (
                <AlertMessage message={alertMessage.message} />
              ) : null}
              <button
                className="btn btn-lg btn-success float-end"
                onClick={handleSaveUserData}
                disabled={alertMessage.message.length > 0}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h5>Cargando...</h5>
      )}
    </>
  );
};

export default Profile;
