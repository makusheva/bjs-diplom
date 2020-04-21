
const myForm = new UserForm();
myForm.loginFormCallback = function (data) {
  ApiConnector.login(data, (serverResponse) => {
    if (serverResponse.success === true) {
      location.reload();
    } else {
      myForm.setLoginErrorMessage(serverResponse.data);
    }
  });
};
myForm.registerFormCallback = function (data) {
  ApiConnector.register(data, (serverResponse) => {
    if (serverResponse.success === true) {
      location.reload();
    } else {
      myForm.setRegisterErrorMessage(serverResponse.data);
    }
  });
};
