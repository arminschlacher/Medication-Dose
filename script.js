const ketaminDoses = {
    10: 1.25,
    20: 2.5,
    30: 3.75,
    40: 5.0,
    50: 6.25,
    60: 7.5,
    70: 8.75,
    80: 10.0,
    90: 11.25,
    100: 12.5
};

// Placeholder for dose calculation logic
document.getElementById('doseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const medication = document.getElementById('medication').value;
    const weight = parseFloat(document.getElementById('weight').value);
    let doseMgPerKg = 10; // Example value
    let totalDose;
    if (medication === 'med2') doseMgPerKg = 5;
    if (medication === 'ketamin') {
        // Runde Gewicht auf nächsten 10er Schritt
        const roundedWeight = Math.round(weight / 10) * 10;
        if (ketaminDoses[roundedWeight]) {
            totalDose = ketaminDoses[roundedWeight];
            doseMgPerKg = 0.125;
        } else {
            totalDose = doseMgPerKg * weight;
            doseMgPerKg = 0.125;
        }
    } else {
        totalDose = doseMgPerKg * weight;
    }
    if (!medication || isNaN(weight) || weight <= 0) {
        document.getElementById('result').textContent = 'Please select a medication and enter a valid weight.';
        return;
    }
    document.getElementById('result').textContent = `Dose: ${totalDose} mg (${doseMgPerKg} mg/kg)`;
});