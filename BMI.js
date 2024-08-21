// Add event listeners to change placeholders based on selected unit
document.getElementById("unitSystem").addEventListener("change", updateHeightPlaceholder);
document.getElementById("weight-system").addEventListener("change", updateWeightPlaceholder);

function updateHeightPlaceholder() {
    const heightInput = document.getElementById("inp-height");
    const unit = document.getElementById("unitSystem").value;
    if (unit === "Inches") {
        heightInput.placeholder = "Height in inches";
    } else if (unit === "Meters") {
        heightInput.placeholder = "Height in meters";
    }
}

function updateWeightPlaceholder() {
    const weightInput = document.getElementById("inp-weight");
    const unit = document.getElementById("weight-system").value;
    if (unit === "kg") {
        weightInput.placeholder = "Weight in kilograms";
    } else if (unit === "pounds") {
        weightInput.placeholder = "Weight in pounds";
    }
}

function calculateBMI() {
    // Retrieve and parse input values
    var name = document.getElementById("inp-name").value.trim();
    var height = parseFloat(document.getElementById("inp-height").value);
    var weight = parseFloat(document.getElementById("inp-weight").value);
    var decimal = parseInt(document.getElementById("inp-decimal").value);
    var heightUnit = document.getElementById("unitSystem").value; 
    var weightUnit = document.getElementById("weight-system").value; 

    let errorMessage = "";
    
    // Validate inputs
    if (isNaN(height) || height <= 0) {
        errorMessage += "Please enter a valid height. ";
    }
    if (isNaN(weight) || weight <= 0) {
        errorMessage += "Please enter a valid weight. ";
    }
    if (!name || !isNaN(name)) {
        errorMessage += "Please enter a valid name. ";
    }
    if (isNaN(decimal) || decimal < 0 || decimal > 9) {
        errorMessage += "Please enter a valid number of decimal places (0-9). ";
    }
    if (errorMessage !== "") {
        document.getElementById("p_output").innerHTML = errorMessage;
        return; 
    }

    // Convert height to meters if needed
    if (heightUnit === "Inches") {
        height = height * 0.0254; // Convert inches to meters
    } else if (heightUnit === "Meters") {
        // Already in meters, no conversion needed
    } else {
        document.getElementById("p_output").innerHTML = "Invalid height unit.";
        return;
    }

    // Convert weight to kilograms if needed
    if (weightUnit === "pounds") {
        weight = weight * 0.453592; // Convert pounds to kilograms
    } else if (weightUnit === "kg") {
        // Already in kilograms, no conversion needed
    } else {
        document.getElementById("p_output").innerHTML = "Invalid weight unit.";
        return;
    }

    // Calculate BMI
    var bmi = (weight / (height * height)).toFixed(decimal);
    var bmiClassification = "";

    // Determine BMI classification
    if (bmi < 18.5) {
        bmiClassification = "Underweight - DANGER";
    } else if (bmi < 25) {
        bmiClassification = "Normal Weight - Good to go";
    } else if (bmi < 30) {
        bmiClassification = "Overweight - DANGER";
    } else {
        bmiClassification = "Obese - Eat less dude";
    }

    // Display the result
    var sentence = `Dear ${name}, your BMI is ${bmi} which falls under the ${bmiClassification} category.`;
    document.getElementById("p_output").innerHTML = sentence;
}
