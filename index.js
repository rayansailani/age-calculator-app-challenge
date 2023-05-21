let years = undefined;
let months = undefined;
let day = undefined;
let resultDays;
let resultMonths;
let resultYears;
let errorDay = document.getElementById("error-day");
let errorMonth = document.getElementById("error-month");
let errorYear = document.getElementById("error-year");
let dayElementResult = document.getElementById("result-year");
let monthElementResult = document.getElementById("result-month");
let yearElementResult = document.getElementById("result-day");
let monthInputContainer = document.getElementsByClassName("month")[0];
let yearInputContainer = document.getElementsByClassName("year")[0];
let dayInputContainer = document.getElementsByClassName("day")[0];

let calculateDuration = () => {
  let dateObj = new Date(years, months, day);
  if (day && months && years) {
    if (!isInvalidDate(dateObj)) {
      let duration = Date.now() - dateObj.getTime();

      var millisecondsInDay = 24 * 60 * 60 * 1000;
      var millisecondsInMonth = 30 * 24 * 60 * 60 * 1000;
      var millisecondsInYear = 365 * 24 * 60 * 60 * 1000;

      resultDays = Math.floor(duration / millisecondsInDay);
      resultMonths = Math.floor(
        (duration % millisecondsInDay) / millisecondsInMonth
      );
      resultYears = Math.floor(duration / millisecondsInYear);

      dayElementResult.innerHTML = resultYears;
      monthElementResult.innerHTML = resultMonths;
      yearElementResult.innerHTML = resultDays;
    } else {
      dayElementResult.innerHTML = "- -";
      monthElementResult.innerHTML = "- -";
      yearElementResult.innerHTML = "- -";

      errorDay.innerHTML = "Must be a valid date";
      errorMonth.innerHTML = "";
      errorYear.innerHTML = "";
    }
  }
};

function isInvalidDate(date) {
  return (
    date.getFullYear() !== years &&
    date.getMonth() !== months &&
    date.getDate() !== day
  );
}

function isDayValid(day) {
  if (!day) {
    return false;
  }
  let dayInt = parseInt(day);
  if (dayInt > 31 || dayInt < 1) {
    return false;
  }
  return true;
}

function displayDayError(day) {
  if (!day) {
    dayInputContainer.classList.add("error-state");
    errorDay.innerHTML = "This field is required";
    return;
  }
  let dayInt = parseInt(day);
  if (dayInt > 31 || dayInt < 1) {
    dayInputContainer.classList.add("error-state");
    errorDay.innerHTML = "Must be a valid day";
    return;
  }
}

function isMonthValid(month) {
  if (!month) {
    return false;
  }
  let monthInt = parseInt(month);
  if (monthInt > 12 || monthInt < 1) {
    return false;
  }
  return true;
}

function displayMonthError(month) {
  if (!month) {
    monthInputContainer.classList.add("error-state");
    errorMonth.innerHTML = "This field is required";
    return;
  }
  let monthInt = parseInt(month);
  if (monthInt > 12 || monthInt < 1) {
    monthInputContainer.classList.add("error-state");
    errorMonth.innerHTML = "Must be a valid month";
    return;
  }
}

function isYearValid(year) {
  let yearInt = parseInt(year);
  let presentYear = new Date().getFullYear();
  if (!year || yearInt <= 1900) {
    return false;
  }
  if (yearInt > presentYear) {
    return false;
  }
  return true;
}

function displayYearError(year) {
  let yearInt = parseInt(year);
  let presentYear = new Date().getFullYear();
  if (!year) {
    yearInputContainer.classList.add("error-state");
    errorYear.innerHTML = "This field is required";
    return;
  }
  if (yearInt > presentYear) {
    yearInputContainer.classList.add("error-state");
    errorYear.innerHTML = "Must be in the past";
    return;
  }
  if (yearInt <= 1900) {
    yearInputContainer.classList.add("error-state");
    errorYear.innerHTML = "Must be a valid year";
    return;
  }
}

let inputDayElement = document.getElementById("day");
inputDayElement.addEventListener("input", function (event) {
  day = event.target.value;
  if (isDayValid(day)) {
    errorDay.innerHTML = "";
    dayInputContainer.classList.remove("error-state");
    calculateDuration();
  } else displayDayError(day);
});

let inputMonthElement = document.getElementById("month");
inputMonthElement.addEventListener("input", function (event) {
  months = event.target.value ? event.target.value - 1 : "";
  if (isMonthValid(months)) {
    errorMonth.innerHTML = "";
    monthInputContainer.classList.remove("error-state");
    calculateDuration();
  } else displayMonthError(months);
});

let inputYearElement = document.getElementById("year");
inputYearElement.addEventListener("input", function (event) {
  years = event.target.value;
  if (isYearValid(years)) {
    errorYear.innerHTML = "";
    yearInputContainer.classList.remove("error-state");
    calculateDuration();
  } else displayYearError(years);
});
