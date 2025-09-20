function startLogic() {
    const antigen = document.querySelector('input[name="antigen"]:checked');
    const antibody = document.querySelector('input[name="antibody"]:checked');
    const resultContainer = document.querySelector('#result-container');
    resultContainer.innerHTML = ''; 

    if (!antigen || !antibody) {
        setTimeout(() => {
            resultContainer.innerHTML = `<div class="error-box"><p class="error">Error</p></div>`;
        }, 300);
        return;
    }

    const ag = antigen.value;
    const ab = antibody.value;

    if (
        (ag !== 'none' && !ab) || 
        (!ag && ab) || 
        (['A', 'B', 'none'].includes(ag) && ab === 'none') 
    ) {
        setTimeout(() => {
            resultContainer.innerHTML = `<div class="error-box"><p class="error">Error</p></div>`;
        }, 300);
        return;
    }

    setTimeout(() => {
        if (ag === 'none' && ab === 'Anti-AB') {
            resultContainer.innerHTML = `
            <div class="agroup">
                <h3 class="ah">Type O</h3>
                <video class="video0" src="video/0.mp4" autoplay loop muted playsinline></video>
            </div>`;
        } else if (ag === 'A' && ab === 'Anti-B') {
            resultContainer.innerHTML = `
            <div class="agroup">
                <h3 class="ah">Type A</h3>
                <video class="videoa" src="video/a.mp4" autoplay loop muted playsinline></video>
            </div>`;
        } else if (ag === 'B' && ab === 'Anti-A') {
            resultContainer.innerHTML = `
            <div class="agroup">
                <h3 class="ah">Type B</h3>
                <video class="videob" src="video/b.mp4" autoplay loop muted playsinline></video>
            </div>`;
        } else if (ag === 'AB' && ab === 'none') {
            resultContainer.innerHTML = `
            <div class="agroup">
                <h3 class="ah">Type AB</h3>
                <video class="videoa" src="video/ab.mp4" autoplay loop muted playsinline></video>
            </div>`;
        } else if (ag === 'A' && ab === 'Anti-A') {
            resultContainer.innerHTML = `
            <div class="aagroup">
                <h3 class="aha">Agglutination</h3>
                <video class="videoaa" src="video/aa she.mp4" autoplay loop muted playsinline></video>
            </div>`;
        } else if (ag === 'B' && ab === 'Anti-B') {
            resultContainer.innerHTML = `
            <div class="aagroup">
                <h3 class="aha">Agglutination</h3>
                <video class="videoaa" src="video/bb shew.mp4" autoplay loop muted playsinline></video>
            </div>`;
        } else if (ag === 'AB' && ab === 'Anti-AB') {
            resultContainer.innerHTML = `
            <div class="aagroup">
                <h3 class="aha">Agglutination</h3>
                <video class="videoab" src="video/ab shew.mp4" autoplay loop muted playsinline></video>
            </div>`;
        } else if (ag === 'AB' && ab === 'Anti-B') {
            resultContainer.innerHTML = `
            <div class="aagroup">
                <h3 class="aha">Agglutination</h3>
                <video class="videoab" src="video/abb ag.mp4" autoplay loop muted playsinline></video>
            </div>`;
        } else if (ag === 'AB' && ab === 'Anti-A') {
            resultContainer.innerHTML = `
            <div class="aagroup">
                <h3 class="aha">Agglutination</h3>
                <video class="videoab" src="video/aba  ag.mp4" autoplay loop muted playsinline></video>
            </div>`;
        } else if (ag === 'A' && ab === 'Anti-AB') {
            resultContainer.innerHTML = `
            <div class="aagroup">
                <h3 class="aha">Agglutination</h3>
                <video class="videoab" src="video/aabshe.mp4" type="video/mp4" autoplay loop muted playsinline></video>
            </div>`;
        } else if (ag === 'B' && ab === 'Anti-AB') {
            resultContainer.innerHTML = `
            <div class="aagroup">
                <h3 class="aha">Agglutination</h3>
                <video class="videoab" src="video/babshe.mp4" type="video/mp4" autoplay loop muted playsinline></video>
            </div>`;
        } else {
            resultContainer.innerHTML = `<div class="error-box"><p class="error">Error</p></div>`;
        }
    }, 300); 
}
