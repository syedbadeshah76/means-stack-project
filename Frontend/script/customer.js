myApp.controller("customerController", function ($scope, $http) {
    $scope.customerCode = "";
    $scope.customerName = "";
    $scope.welcome = "Welcome to Customer";
    $scope.editingIndex = null;
    $scope.buttonLabel = "SAVE";

    // Save function
    $scope.save = function () {
        if(!$scope.customerCode || !$scope.customerName){
            alert("Please fill CustomerCode & CustomerName.");
            return;
        } 


        let saveObject = {
            customerCode: $scope.customerCode,
            customerName: $scope.customerName,
        };
        if ($scope.buttonLabel === "SAVE") {
            $http({
                method: 'POST',
                url: 'http://localhost:3000/createUser',
                data: saveObject,
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(
                function (response) {
                    console.log('Response:', response.data);
                    $scope.welcome = response.data.message.data;
                    location.reload();
                },
                function (error) {
                    console.error('Error:', error);
                }
            );
        } else {
            $http({
                method: 'PUT',
                url: 'http://localhost:3000/customerput',
                data: saveObject,
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(
                function (response) {
                    console.log('Response:', response.data);
                    $scope.welcome = response.data.message;
                    location.reload();
                },
                function (error) {
                    console.error('Error:', error);
                }
            );
        }
    };

    // Edit function
    $scope.editCustomer = function (code) {
        var temp = $scope.customers.find(customer => customer.customerCode === code);
        $scope.buttonLabel = "Update";
        $scope.customerCode = temp.customerCode;
        $scope.customerName = temp.customerName;
    };

    // Fetch users
    function getusers() {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/displayUser',
        }).then(
            function (response) {
                console.log('Response:', response.data);
                $scope.customers = response.data.data;
            },
            function (error) {
                console.error('Error:', error);
            }
        );
    }                        
    getusers();
});
