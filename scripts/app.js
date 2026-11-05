const gridContainer = document.getElementById('app-grid-container');
const packageEntryBox = document.getElementById('package-entry-box');
const packageEntryConfirmButton = document.getElementById('confirm-package-entry');
const confirmAppLayoutButton = document.getElementById('confirm-app-layout');
const addAppButton = document.getElementsByClassName("add-app-button");
const pageContainer = document.getElementById("page-container");

// Create an event listner for each add button
for (let i = 0; i < addAppButton.length; i++) {
    addAppButton[i].addEventListener("click", function() {
        openAppEntry();
    })
}

// Function to create a grid item
packageEntryConfirmButton.addEventListener("click", function() {
  const givenPackage = packageEntryBox.value;
  let newGridItem = document.createElement('div');
  newGridItem.textContent = givenPackage;

  gridContainer.append(newGridItem);
});

// Function that creates the JSON while the rest goes on
confirmAppLayoutButton.addEventListener("click", function() {
  // Define the object
  const appLayout = {
    managedProperty: [],
  };

  for (let i = 0; i < gridContainer.children.length; i++) {
    // Create an object from info on page
    optionObject = {key: "package", valueString: gridContainer.children[i].textContent};
    appLayout.managedProperty.push(optionObject);
  }
  appLayout.managedProperty.push();
  
  console.log(appLayout);
});

// Function to open the window for entering apps for adding
function openAppEntry() {
    // Input window parent
    const inputWindow = document.createElement("div");
    inputWindow.id = "input-window-parent";

    // Input box
    const inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.id = "add-app-input";
    inputWindow.append("inputBox");

    // Close button
    const closeButton = document.createElement("button");
    closeButton.id = "close-input-page-button";
    closeButton.textContent = "Close";
    inputWindow.append(closeButton);

    // Confirm Button
    const confirmButton = document.createElement("button");
    confirmButton.id = "confirm-input-button";
    confirmButton.textContent = "Confirm";
    inputWindow.append(confirmButton);
    
    // Append the input window to the page
    pageContainer.append(inputWindow);
}

// Add the package to the grid when the button is clicked
confirmButton.addEventListener("click", function() {
    const givenPackageName = document.getElementById("add-app-input").textContent;
    

    pageContainer.append()
})