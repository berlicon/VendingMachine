function calculateAmount(coins) {
    var amount = 0;
    for (var i = 0; i < coins.length; i++) {
        amount += (coins[i].name * coins[i].count);
    }
    return amount;
}

function addCoin(coins, newCoin) {
    for (var i = 0; i < coins.length; i++) {
        if (coins[i].name == newCoin.name) {
            coins[i].count++;
            break;
        }
    }
}

function recalculateClientCoins(machineCoins, clientCoins, clientAccount) {
    clientCoins[0].count =
    clientCoins[1].count =
    clientCoins[2].count =
    clientCoins[3].count = 0;

    var i = machineCoins.length - 1;
    var amount = clientAccount;
    while (amount > 0) {
        var count = Math.floor(amount / machineCoins[i].name);
        if (count > machineCoins[i].count) {
            count = machineCoins[i].count;
        }
        amount -= count * machineCoins[i].name;
        clientCoins[i].count = count;
        i--;
    }
};

var app = angular
            .module("myModule", [])
            .controller("myController", function ($scope) {

                $scope.products = [
                    { name: "Чай", price: 13, count: 10 },
                    { name: "Кофе", price: 18, count: 20 },
                    { name: "Кофе с молоком", price: 21, count: 20 },
                    { name: "Сок", price: 35, count: 15 },
                ];

                $scope.machineCoins = [
                    { name: 1, count: 100 },
                    { name: 2, count: 100 },
                    { name: 5, count: 100 },
                    { name: 10, count: 100 },
                ];

                $scope.clientCoins = [
                    { name: 1, count: 10 },
                    { name: 2, count: 30 },
                    { name: 5, count: 20 },
                    { name: 10, count: 15 },
                ];               

                $scope.clientAccount = calculateAmount($scope.clientCoins);
                $scope.machineAccount = calculateAmount($scope.machineCoins);

                $scope.buy = function (product) {
                    if (product.count == 0) {
                        alert("Товар закончился");
                    }
                    else if (product.price <= $scope.clientAccount) {
                        $scope.clientAccount -= product.price;
                        product.count--;
                        recalculateClientCoins($scope.machineCoins, $scope.clientCoins, $scope.clientAccount);
                        alert("Спасибо!");
                    } else {
                        alert("Недостаточно средств");
                    }
                };

                $scope.insert = function (coin) {
                    $scope.clientAccount += coin.name;
                    $scope.machineAccount += coin.name;
                    addCoin($scope.machineCoins, coin);
                    addCoin($scope.clientCoins, coin);
                };

                $scope.getChange = function () {
                    message = "Мы выдали вам сдачу: \n";
                    var i = $scope.machineCoins.length - 1;
                    while ($scope.clientAccount > 0) {
                        var count = Math.floor($scope.clientAccount / $scope.machineCoins[i].name);
                        if (count > $scope.machineCoins[i].count) {
                            count = $scope.machineCoins[i].count;
                        }
                        $scope.clientAccount -= count * $scope.machineCoins[i].name;
                        $scope.machineAccount -= count * $scope.machineCoins[i].name;
                        $scope.machineCoins[i].count -= count;
                        if (count > 0) {
                            message += (count + " x " + $scope.machineCoins[i].name + " руб" + "\n");
                        }
                        i--;
                    }

                    $scope.clientCoins[0].count =
                    $scope.clientCoins[1].count =
                    $scope.clientCoins[2].count =
                    $scope.clientCoins[3].count = 0;

                    alert(message);
                };
            });