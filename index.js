const result = document.getElementById("result");
const buttons = document.querySelectorAll(".btn");

function factorial(n) {
  n = Number(n);
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let fact = 1;
  for (let i = 2; i <= n; i++) {
    fact *= i;
  }
  return fact;
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    let value = button.value.trim();

    if (value === "C") {
      result.value = "";
    } else if (value === "DEL") {
      result.value = result.value.slice(0, -1);
    } else if (value === "+/-") {
      if (result.value.startsWith("-")) {
        result.value = result.value.slice(1);
      } else {
        result.value = "-" + result.value;
      }
    } else if (value === "=") {
      try {
        let expression = result.value
          .replace(/x/g, "*")
          .replace(/%/g, "/100")  
          .replace(/sin\(([^)]+)\)/g, 'Math.sin(($1)*Math.PI/180)')
          .replace(/cos\(([^)]+)\)/g, 'Math.cos(($1)*Math.PI/180)')
          .replace(/tan\(([^)]+)\)/g, 'Math.tan(($1)*Math.PI/180)')
          .replace(/cot\(([^)]+)\)/g, '(1/Math.tan(($1)*Math.PI/180))')
          .replace(/sec\(([^)]+)\)/g, '(1/Math.cos(($1)*Math.PI/180))')
          .replace(/cosec\(([^)]+)\)/g, '(1/Math.sin(($1)*Math.PI/180))')
          // লগারিদম
          .replace(/log\(/g, 'Math.log10(')
          .replace(/ln\(/g, 'Math.log(')
          // e^ পাওয়ার রূপান্তর
          .replace(/e\^(\(?[^)]+\)?)/g, 'Math.exp($1)')
          // factorial
          .replace(/(\d+)!/g, 'factorial($1)');

        result.value = eval(expression);
      } catch {
        result.value = "Error";
      }
    } else {
      result.value += value;
    }
  });
});
