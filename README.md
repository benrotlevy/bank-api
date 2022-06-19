# bank-api

base-url: https://bank-api-benjamin.herokuapp.com/

get users: /users , method: get

get user: /users/:id , method: get

add new user: /users , method: post, body: {"name": "john doe", "passportId": "000000000", "cash": 0, "credit": 0}

deposit: /manage/deposit/:id , method: patch, body: {"amount": x}

withdraw: /manage/withdraw/:id , method: patch, body: {"amount": x}

update credit: /manage/credit/:id , method: patch, body: {"amount": x}

transfer: /manage/transfer , method: patch, body: {"from": "000000000", "to": "000000000", "amount": x}

filter by cash: /users/cash/:amount , method: get

filter by credit: /users/credit/:amount , method: get

toggle active: /users/active/:id , method:patch

filter by cash and active: /users/filter/cash , method:get , body:{active: true, amount: x}
