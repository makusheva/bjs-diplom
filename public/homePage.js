
const logOut = new LogoutButton();
logOut.action = function (logout) {
  ApiConnector.logout((serverResponse) => {
    if (serverResponse.success === true) {
      location.reload();
    }
  });
};

// Получение информации о пользователе
ApiConnector.current((serverResponse) => {
  if (serverResponse.success === true) {
    ProfileWidget.showProfile(serverResponse.data);
  }
});

// Получение текущих курсов валюты
const exchangeRates = new RatesBoard();
function loadRates() {
  ApiConnector.getStocks((serverResponse) => {
    if (serverResponse.success === true) {
      exchangeRates.clearTable();
      exchangeRates.fillTable(serverResponse.data);
    }
  });
}
loadRates();

// Операции с деньгами
const moneyTransactions = new MoneyManager();
moneyTransactions.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, (serverResponse) => {
    if (serverResponse.success === true) {
      ProfileWidget.showProfile(serverResponse.data);
      const messageOk = 'Кабинет пополнен успешно';
      moneyTransactions.setMessage(false, messageOk);
    } else {
      const messageError = 'Ошибка';
      moneyTransactions.setMessage(true, messageError);
    }
  });
};

moneyTransactions.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney(data, (serverResponse) => {
    if (serverResponse.success === true) {
      ProfileWidget.showProfile(serverResponse.data);
      const messageOk = 'Кабинет пополнен успешно';
      moneyTransactions.setMessage(false, messageOk);
    } else {
      const messageError = 'Ошибка';
      moneyTransactions.setMessage(true, messageError);
    }
  });
};

moneyTransactions.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, (serverResponse) => {
    if (serverResponse.success === true) {
      ProfileWidget.showProfile(serverResponse.data);
      const messageOk = 'Кабинет пополнен успешно';
      moneyTransactions.setMessage(false, messageOk);
    } else {
      const messageError = 'Ошибка';
      moneyTransactions.setMessage(true, messageError);
    }
  });
};

// Работа с избранным
const favorites = new FavoritesWidget();
function listFavorites() {
  ApiConnector.getFavorites((serverResponse) => {
    if (serverResponse.success === true) {
      favorites.clearTable();
      favorites.fillTable(serverResponse.data);
      moneyTransactions.updateUsersList(serverResponse.data);
    }
  });
}
listFavorites();

favorites.addUserCallback = function (data) {
  ApiConnector.addUserToFavorites(data, (serverResponse) => {
    if (serverResponse.success === true) {
      favorites.clearTable();
      favorites.fillTable(serverResponse.data);
      const messageOk = 'Пользователь успешно добавлен';
      favorites.setMessage(false, messageOk);
    } else {
      const messageError = 'Ошибка добавления';
      favorites.setMessage(true, messageError);
    }
  });
};
favorites.removeUserCallback = function (data) {
  ApiConnector.removeUserFromFavorites(data, (serverResponse) => {
    if (serverResponse.success === true) {
      favorites.clearTable();
      favorites.fillTable(serverResponse.data);
      const messageOk = 'Пользователь успешно удален';
      favorites.setMessage(false, messageOk);
    } else {
      const messageError = 'Ошибка удаления';
      favorites.setMessage(true, messageError);
    }
  });
};
