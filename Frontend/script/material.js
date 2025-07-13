myApp.controller("myMaterialCtrl", function ($scope, $http) {
    $scope.materialCode = "";
    $scope.materialName = "";
    $scope.materialPrice = "";
    $scope.materialTax = "";
    $scope.buttonLabel = "Save";
    $scope.editIndex = null;

    $scope.saveMaterial = function () {
        if (!$scope.materialCode || !$scope.materialName || !$scope.materialPrice || !$scope.materialTax) {
            alert("Fill all the fields: Material Code, Name, Price, and Tax");
            return;
        }

        let materialObj = {
            code: $scope.materialCode,
            name: $scope.materialName,
            price: $scope.materialPrice,
            tax: $scope.materialTax,
        };

        if ($scope.buttonLabel === "Save") {
            $http.post("http://localhost:3000/material", materialObj)
                .then(function (response) { (response.data.message);
                
                    location.reload();
                })
                .catch(function (error) {
                    console.error("Error adding material:", error);
                });
        } else {
            $http.put("http://localhost:3000/materialput", materialObj)
                .then(function (response) {
                    (response.data.message);
                    location.reload(); 
                })
                .catch(function (error) {
                    console.error("Error updating material:", error);
                });
        }
    };

    $scope.editMaterial = function (code) {
        let material = $scope.materials.find((mat) => mat.code === code);
        if (material) {
            $scope.materialCode = material.code;
            $scope.materialName = material.name;
            $scope.materialPrice = material.price;
            $scope.materialTax = material.tax;
            $scope.buttonLabel = "Update";
        }
    };

    function getMaterials() {
        $http.get("http://localhost:3000/materialdisplay")
            .then(function (response) {
                console.log("Fetched materials:", response.data.data);
                $scope.materials = response.data.data;
            })
            .catch(function (error) {
                console.error("Error fetching materials:", error);
            });
    }

    function clearMaterial() {
        $scope.materialCode = "";
        $scope.materialName = "";
        $scope.materialPrice = "";
        $scope.materialTax = "";
        $scope.buttonLabel = "Save";
    }

    getMaterials();
});
