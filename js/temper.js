const temperatureSelect = document.getElementById("temperature");
const mercury = document.querySelector(".mercury");

const tempHeights = {
    0: "10%",
    10: "20%",
    15: "30%",
    20: "50%",
    30: "70%",
    40: "90%"
};

temperatureSelect.addEventListener("change", function () {
    const selected = temperatureSelect.value;
    const newHeight = tempHeights[selected] || "10%";
    mercury.style.height = newHeight;
});
temperatureSelect.value = "0";
mercury.style.height = tempHeights[0];
