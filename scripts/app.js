const gridContainer = document.getElementById('app-grid-container');
const packageEntryBox = document.getElementById('package-entry-box');
const confirmAppLayoutButton = document.getElementById('confirm-app-layout');
const addAppButton = document.getElementsByClassName("add-app-button");
const pageContainer = document.getElementById("page-container");

document.addEventListener("click", function() {
  const buttonId = event.target.id;

  if (event.target.classList.contains('add-app-button')) {
    openAppEntry(buttonId);
  }
});

// Function that creates the JSON while the rest goes on
function createJson() {

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
};

// Function to open the window for entering apps for adding
function openAppEntry(buttonNumber) {
    console.log("Recieved: " + buttonNumber);

    // Input window parent
    const inputWindow = document.createElement("div");
    inputWindow.id = "input-window-parent";

    // Input box
    const inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.id = "add-app-input";
    inputWindow.append(inputBox);

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

    // close on close button click
    closeButton.addEventListener("click", function() {
      inputWindow.style.display = "none";
    })

    // On confirm, entered data will replace the button
    confirmButton.addEventListener("click", function() {

      // Store the entered package name
      const givenPackage = inputBox.value;
      
      // Create the new element to replace the button with
      const packageDisplayBox = document.createElement("div");
      packageDisplayBox.textContent = givenPackage;

      // Replace the add buttons position with the package name
      console.log(document.getElementById(buttonNumber).textContent);
      document.getElementById(buttonNumber).replaceWith(packageDisplayBox);
    })
}