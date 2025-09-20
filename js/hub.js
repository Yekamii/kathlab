
const facts = [
    "The central dogma of molecular biology is DNA → RNA → protein.",
    "The speed of light is about 300,000 km/s.",
    "Scientists used DNA from three people to prevent mitochondrial disease.",
    "In eukaryotes, DNA is packaged into chromatin and organized into nucleosomes.",
    "Octopuses have three hearts",
    "Synaptic plasticity underlies learning and memory.",
    "The action potential is an all-or-none event.",
    "Neurons can transmit signals at speeds over 250 mph (400 km/h).",
    "Mirror neurons help us understand others' actions and emotions.",
];
setInterval(() => {
    const factPopup = document.getElementById('factPopup');
    factPopup.innerText = facts[Math.floor(Math.random() * facts.length)];
    factPopup.style.display = 'block';
    setTimeout(() => factPopup.style.display = 'none', 5000);
}, 12000);