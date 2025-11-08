fetch('medication_doses.json')
  .then(response => response.json())
  .then(doses => {
    document.getElementById('doseForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const medication = document.getElementById('medication').value;
      const weight = parseFloat(document.getElementById('weight').value);
      let doseMgPerKg = doses[medication]?.mg_per_kg || 0;
      let totalDose;
      if (medication === 'ketamin' && doses.ketamin.table) {
        const roundedWeight = Math.round(weight / 10) * 10;
        if (doses.ketamin.table[roundedWeight]) {
          totalDose = doses.ketamin.table[roundedWeight];
        } else {
          totalDose = doseMgPerKg * weight;
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
  });