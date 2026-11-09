const gridContainer = document.getElementById('app-grid-container');
const packageEntryBox = document.getElementById('package-entry-box');
const confirmAppLayoutButton = document.getElementById('confirm-app-layout');
const addAppButton = document.getElementsByClassName("add-app-button");
const pageContainer = document.getElementById("page-container");
const jsonOutput = document.getElementById("json-output");

// Create and insert the copy button next to the JSON output
const copyButton = document.createElement("button");
copyButton.id = "copy-json-button";
copyButton.textContent = "Copy JSON";
// Insert it right after the jsonOutput element in the DOM
jsonOutput.parentNode.insertBefore(copyButton, jsonOutput.nextSibling);

// Copy button functionality
copyButton.addEventListener("click", function() {
  const jsonText = jsonOutput.textContent;
  
  if (!jsonText) {
    copyButton.textContent = "Nothing to copy!";
    setTimeout(() => { copyButton.textContent = "Copy JSON"; }, 2000);
    return;
  }

  navigator.clipboard.writeText(jsonText).then(() => {
    copyButton.textContent = "Copied!";
    setTimeout(() => {
      copyButton.textContent = "Copy JSON";
    }, 2000);
  }).catch(err => {
    console.error("Failed to copy text: ", err);
  });
});

// Global click listener to check ID if on a button and open the entry window if a button and pass the button's ID
document.addEventListener("click", function(event) {
  const buttonId = event.target.id;

  if (event.target.classList.contains('add-app-button')) {
    openAppEntry(buttonId);
  }
});

confirmAppLayoutButton.addEventListener("click", function() {
  createJson();
});

// Function that creates the JSON while the rest goes on
function createJson() {

  // Objects for JSON
  const finalJsonObj = {
    managedProperty: [],
  };
  const overallAppBundle = {
    key: "com.microsoft.launcher.HomeScreen.Applications",
    valueBundleArray: [],
  }

  // Iterate through the on screen elements to add the apps to the JSON
  for (let i = 0; i < gridContainer.children.length; i++) {

    // IF statement stops the JSON from collecting the '+' in the buttons
    if (!(gridContainer.children[i].textContent == "+")) {
      // Create an object from info on page
      const optionObject = {
        managedProperty: [
          {
            key: "type", 
            valueString: "app"
          },
          {
            key: "package",
            valueString: gridContainer.children[i].textContent
          },
          {
            key: "position",
            valueString: gridContainer.children[i].id
          }
        ]
      };

      overallAppBundle.valueBundleArray.push(optionObject);
    }
  }
  jsonOutput.textContent = (JSON.stringify(overallAppBundle, null, 2));
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
    const packageDisplayBox = document.createElement("button");
    packageDisplayBox.textContent = givenPackage;
    packageDisplayBox.id = buttonNumber;
    packageDisplayBox.classList = "add-app-button";

    // Replace the add buttons position with the package name
    document.getElementById(buttonNumber).replaceWith(packageDisplayBox);

    // Close window when done
    inputWindow.style.display = "none";
  })
}