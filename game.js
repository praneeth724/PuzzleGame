let table = document.querySelector(".table");
let stepsNumber = document.querySelector(".steps-number");

let stepMessage = document.querySelector(".step-message");

table.addEventListener("click", (event) => {
  // Existing logic...

  // After the existing logic that handles the movement and checking for completion
  // Add this code to evaluate the steps and display a message
  if (Number(stepsNumber.innerText) < 10) {
    stepMessage.innerText = "You are clever!";
  } else if (Number(stepsNumber.innerText) < 15) {
    stepMessage.innerText = "You are good!";
  } else if (Number(stepsNumber.innerText) > 20) {
    stepMessage.innerText = "You are bad. Try to grow your thinking capacity!";
  }
});

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
let initialNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
shuffle(numbers);

let emptyIndex = numbers.findIndex((item) => {
  return item === 9;
});
//alert(emptyIndex);
const reset = function () {
  for (let i = 0; i < 3; i++) {
    first = 3 * i;
    second = 3 * i + 1;
    third = 3 * i + 2;
    table.innerHTML += `<tr class="row"><td class=${
      first === emptyIndex ? "white" : "col"
    }>${numbers[first]}</td><td class=${
      second === emptyIndex ? "white" : "col"
    }>${numbers[second]}</td><td class=${
      third === emptyIndex ? "white" : "col"
    }>${numbers[third]}</td></tr>`;
  }
};
reset();

table.addEventListener("click", (event) => {
  let target = Number(event.target.innerText);
  let index = numbers.findIndex((item) => item === target);
  if (checkAdjusency(index, emptyIndex)) {
    switch (emptyIndex) {
      case index - 1:
        event.target.style = "transform:translateX(-200px);";

        break;
      case index + 1:
        event.target.style = "transform:translateX(200px);";
        break;
      case index + 3:
        event.target.style = "transform:translateY(200px);";
        break;
      case index - 3:
        event.target.style = "transform:translateY(-200px);";
        break;
    }
    let temp;
    temp = numbers[index];
    numbers[index] = numbers[emptyIndex];
    numbers[emptyIndex] = temp;
    emptyIndex = index;
    setTimeout(() => {
      stepsNumber.innerHTML = Number(stepsNumber.innerText) + 1;
      table.innerHTML = "";
      reset();
      if (JSON.stringify(numbers) === JSON.stringify(initialNumbers)) {
        alert("You Won!");
        location.reload();
      }
    }, 1000);
  }
});

let checkAdjusency = function (currentIndex, emptyIndex) {
  let list = [0, 1, 2, 3, 4, 5, 6, 7, 8].filter(
    (item) =>
      item + 3 === emptyIndex ||
      item - 3 === emptyIndex ||
      (item - 1 === emptyIndex && ![0, 3, 6].includes(item)) ||
      (item + 1 === emptyIndex && ![2, 5, 8].includes(item))
  );
  //alert(list);
  return list.includes(currentIndex);
};
