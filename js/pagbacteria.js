document.addEventListener("DOMContentLoaded", () => {
  const bacteriaStage = document.querySelector(".hc-bacteria-stage");
  const titleInstr = document.createElement("div");
  titleInstr.className = "hc-instruction";
  titleInstr.textContent = "Drag the bacteriophage to a bacterium to infect it";
  titleInstr.style.display = "none";
  titleInstr.style.margin = "-150px 0 35px 90px";
  titleInstr.style.fontWeight = "600";
  titleInstr.style.color = "#fff";
  titleInstr.style.fontSize = "16px"
  bacteriaStage.prepend(titleInstr);

  
  const labeledState = { A: false, B: false };

window.markPhageAsLabeled = function(id) {
  labeledState[id] = true;
  if (labeledState.A && labeledState.B) {
   
    setTimeout(() => {
      bacteriaStage.style.display = "block";
      titleInstr.style.display = "block";
      enablePhageDragging();
    }, 1000); 
  }
};

  bacteriaStage.style.display = "none";

  
  const dnaBtn = document.querySelector('[data-action="label-dna"]');
  const proteinBtn = document.querySelector('[data-action="label-protein"]');

  if (dnaBtn) {
    dnaBtn.addEventListener("click", () => {
      markPhageAsLabeled("A");
    });
  }
  if (proteinBtn) {
    proteinBtn.addEventListener("click", () => {
      markPhageAsLabeled("B");
    });
  }
});
