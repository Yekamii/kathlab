    const startBtn = document.getElementById("startBtn");
    const experimentContainer = document.getElementById("experimentContainer");

    startBtn.addEventListener("click", () => {
      experimentContainer.classList.remove("hidden");
      document.querySelector(".start-container").classList.add("hidden");
    });