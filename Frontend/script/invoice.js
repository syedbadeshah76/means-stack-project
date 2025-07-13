myApp.controller("invoiceController", function ($scope, $http) {
    // Initialize scope variables
    $scope.billNo = "";
    $scope.date = "";
    $scope.invoiceItems = []; // Items currently in the invoice table
    $scope.selectedCustomer = null; // Initialize selectedCustomer
    $scope.selectedMaterial = null;
    $scope.quantity = "";
    $scope.buttonLabel = "Add to Invoice";
    $scope.editIndex = null; // To track which item is being edited
    $scope.savedInvoices = []; // To store fetched saved invoices
    $scope.message = ""; // For displaying success/error messages

    // Function to display messages in the UI
    function showMessage(msg, type = 'success') {
        $scope.message = msg;
        // You can add styling here based on type (e.g., 'success', 'error')
        // For example, using a timeout to clear the message after some seconds
        setTimeout(() => {
            $scope.message = "";
        }, 3000);
    }

    // Function to fetch customers from the backend
    function getCustomers() {
        $http({
            method: "GET",
            url: "http://localhost:3000/displayUser",
        }).then(
            function (response) {
                console.log("Fetched customers:", response.data);
                $scope.customers = response.data.data;
                // Do NOT pre-select the first customer automatically
                $scope.selectedCustomer = null; // Ensure it's null to show "-- Select Customer --"
            },
            function (error) {
                console.error("Error fetching customers:", error);
                showMessage("Error fetching customers.", 'error');
            }
        );
    }

    // Function to fetch materials from the backend
    function getMaterials() {
        $http({
            method: "GET",
            url: "http://localhost:3000/materialdisplay",
        }).then(
            function (response) {
                console.log("Fetched materials:", response.data);
                $scope.materials = response.data.data;
                // Do NOT pre-select the first material automatically
                $scope.selectedMaterial = null; // Ensure it's null to show "-- Select Material --"
            },
            function (error) {
                console.error("Error fetching materials:", error);
                showMessage("Error fetching materials.", 'error');
            }
        );
    }

    // Function to add or update an invoice item in the current table
    $scope.addInvoiceItem = function () {
        // Ensure selectedMaterial is not null before accessing its properties
        if (!$scope.selectedCustomer || !$scope.selectedMaterial || !$scope.quantity || $scope.quantity <= 0) {
            showMessage("Please select a customer, material, and provide a valid quantity.", 'error');
            return;
        }

        const grossAmount = $scope.quantity * ($scope.selectedMaterial ? $scope.selectedMaterial.price : 0);
        const tax = parseFloat($scope.selectedMaterial ? $scope.selectedMaterial.tax : 0) || 0;
        const netAmount = grossAmount + (grossAmount * tax) / 100;

        const invoiceItem = {
            customerName: $scope.selectedCustomer.customerName,
            materialName: $scope.selectedMaterial.name,
            quantity: $scope.quantity,
            price: $scope.selectedMaterial.price,
            grossAmount: grossAmount,
            tax: tax,
            netAmount: netAmount,
        };

        if ($scope.editIndex !== null) {
            // Update existing item
            $scope.invoiceItems[$scope.editIndex] = invoiceItem;
            console.log("Invoice item updated:", invoiceItem);
            showMessage("Invoice item updated successfully!", 'success');
            $scope.buttonLabel = "Add to Invoice";
            $scope.editIndex = null;
        } else {
            // Add new item
            $scope.invoiceItems.push(invoiceItem);
            console.log("Invoice item added:", invoiceItem);
            showMessage("Invoice item added successfully!", 'success');
        }

        // Clear item input fields after adding/updating
        $scope.selectedCustomer = null;
        $scope.selectedMaterial = null;
        $scope.quantity = "";
    };

    // Function to populate the form for editing an existing invoice item
    $scope.editInvoice = function (index) {
        $scope.editIndex = index;
        const item = $scope.invoiceItems[index];

        // Find the customer and material objects to pre-select in dropdowns
        $scope.selectedCustomer = $scope.customers.find(
            (customer) => customer.customerName === item.customerName
        );
        $scope.selectedMaterial = $scope.materials.find(
            (material) => material.name === item.materialName
        );
        $scope.quantity = item.quantity;
        $scope.buttonLabel = "Update"; // Change button label to "Update"
    };

    // Function to save the current invoice to the backend
    $scope.saveInvoices = function () {
        if (!$scope.billNo || !$scope.date) {
            showMessage("Please enter a valid Bill Number and Date.", 'error');
            return;
        }

        if ($scope.invoiceItems.length === 0) {
            showMessage("Please add at least one item to the invoice before saving.", 'error');
            return;
        }

        // Extract customer name from the first invoice item for display in saved invoices
        // Assuming all items in one invoice belong to the same customer
        const customerNameForSavedInvoice = $scope.invoiceItems.length > 0 ? $scope.invoiceItems[0].customerName : 'N/A';

        let invoiceData = {
            billnumber: $scope.billNo,
            date: $scope.date,
            customerName: customerNameForSavedInvoice, // Add customerName here for easier display
            invoiceItems: $scope.invoiceItems, // Send all current invoice items
        };

        $http({
            method: "POST",
            url: "http://localhost:3000/saveInvoices", // Endpoint to save invoices
            data: invoiceData,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(
            function (response) {
                console.log("Invoices saved successfully:", response.data);
                showMessage("Invoice saved successfully!", 'success');

                // Clear current invoice form fields and items after successful save
                $scope.billNo = "";
                $scope.date = "";
                $scope.invoiceItems = [];
                $scope.selectedCustomer = null;
                $scope.selectedMaterial = null;
                $scope.quantity = "";
                $scope.buttonLabel = "Add to Invoice";
                $scope.editIndex = null;

                // Reload the list of saved invoices to show the new one
                loadSavedInvoices();
            },
            function (error) {
                console.error("Error saving invoices:", error);
                showMessage("Error saving invoices!", 'error');
            }
        );
    };

    // Helper function to load saved invoices from the backend
    function loadSavedInvoices() {
        $http({
            method: "GET",
            url: "http://localhost:3000/getInvoices", // Endpoint to get saved invoices
        }).then(
            function (response) {
                console.log("Fetched saved invoices:", response.data);
                $scope.savedInvoices = response.data.data;
            },
            function (error) {
                console.error("Error fetching saved invoices:", error);
                showMessage("Error fetching saved invoices.", 'error');
            }
        );
    }

    // Initial data loading when the controller initializes
    getCustomers();
    getMaterials();
    loadSavedInvoices(); // Load saved invoices on page load
});
