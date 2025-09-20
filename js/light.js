const lightSelect = document.getElementById("light");
const lampGlow = document.getElementById("lampGlow");

const lightGlowStrength = {
    50: 0.1,
    100: 0.2,
    150: 0.3,
    300: 0.5,
    500: 0.7,
    800: 0.85,
    1000: 1
};

lightSelect.addEventListener("change", function () {
    const selected = lightSelect.value;
    const glow = lightGlowStrength[selected] || 0.1;
    lampGlow.style.opacity = glow;
    
});
lightSelect.value = "50";
lampGlow.style.opacity = lightGlowStrength[50];
