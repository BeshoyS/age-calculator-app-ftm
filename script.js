// inputs
const daysInput = document.getElementById("day");
const monthsInput = document.getElementById("month");
const yearsInput = document.getElementById("year");
// buttons
const submitBtn = document.getElementById("submitBtn");
// Results
const daysCount = document.getElementById("daysCount");
const monthsCount = document.getElementById("monthsCount");
const yearsCount = document.getElementById("yearsCount");

const monthsArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let inputDate = {
  y: 1984,
  m: 12,
  d: 7,
};
let now = new Date();
let dateNow = {
  y: now.getFullYear(),
  m: now.getMonth() + 1,
  d: now.getDate(),
};

function getInputDate(e) {
  if (e.target.id === "year") {
    inputDate.y = +this.value;
  } else if (e.target.id === "month") {
    inputDate.m = +this.value;
  } else if (e.target.id === "day") {
    inputDate.d = +this.value;
  }
}

function leapYear(year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

function validate() {
  const inputs = document.querySelectorAll("input");
  let valid = true;
  inputs.forEach((input) => {
    if (input.value === "") {
      input.style.borderColor = "hsl(0, 100%, 67%)";
      input.parentElement.getElementsByClassName("input-label")[0].style.color =
        "hsl(0, 100%, 67%)";
      input.parentElement.querySelector(".input-error").innerHTML =
        "This field is required";
      valid = false;
    } else if (yearsInput.value > dateNow.y) {
      yearsInput.style.borderColor = "hsl(0, 100%, 67%)";
      yearsInput.parentElement.getElementsByClassName(
        "input-label"
      )[0].style.color = "hsl(0, 100%, 67%)";
      yearsInput.parentElement.querySelector(".input-error").innerHTML =
        "Must be in the past";
      valid = false;
    } else if (monthsInput.value > 12) {
      monthsInput.style.borderColor = "hsl(0, 100%, 67%)";
      monthsInput.parentElement.getElementsByClassName(
        "input-label"
      )[0].style.color = "hsl(0, 100%, 67%)";
      monthsInput.parentElement.querySelector(".input-error").innerHTML =
        "Must be a valid month";
      valid = false;
    } else if (daysInput.value > 31) {
      daysInput.style.borderColor = "hsl(0, 100%, 67%)";
      daysInput.parentElement.getElementsByClassName(
        "input-label"
      )[0].style.color = "hsl(0, 100%, 67%)";
      daysInput.parentElement.querySelector(".input-error").innerHTML =
        "Must be a valid day";
      valid = false;
    } else if (
      monthsArr[monthsInput.value - 1] < daysInput.value ||
      (leapYear(yearsInput.value) &&
        monthsInput.value == 2 &&
        daysInput.value > 29)
    ) {
      input.style.borderColor = "hsl(0, 100%, 67%)";
      input.parentElement.getElementsByClassName("input-label")[0].style.color =
        "hsl(0, 100%, 67%)";
      daysInput.parentElement.querySelector(".input-error").innerHTML =
        "Must be a valid date";
      valid = false;
    } else {
      input.style.borderColor = "hsl(0, 0%, 86%)";
      input.parentElement.getElementsByClassName("input-label")[0].style.color =
        "hsl(0, 1%, 44%)";
      input.parentElement.querySelector(".input-error").innerHTML = "";
      valid = true;
    }
  });
  return valid;
}

function calculatingAge() {
  let age = {
    y: 0,
    m: 0,
    d: 0,
  };
  age.y = dateNow.y - inputDate.y;
  if (inputDate.m > dateNow.m) {
    age.y--;
    age.m = 12 - (inputDate.m - dateNow.m);
  } else {
    age.m = dateNow.m - inputDate.m;
  }
  if (inputDate.d > dateNow.d) {
    age.m--;
    age.d = 30 - (inputDate.d - dateNow.d);
  } else {
    age.d = dateNow.d - inputDate.d;
  }
  yearsCount.textContent = age.y;
  monthsCount.textContent = age.m;
  daysCount.textContent = age.d;
}
function displayAge(e) {
  e.preventDefault();
  if (validate()) {
    calculatingAge();
  }
}

yearsInput.addEventListener("input", getInputDate);
monthsInput.addEventListener("input", getInputDate);
daysInput.addEventListener("input", getInputDate);
submitBtn.addEventListener("click", displayAge);
