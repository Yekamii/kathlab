let photosynthesisData = {};

async function loadData() {
  try {
    const response = await fetch('data/data.json'); 
    photosynthesisData = await response.json();
    console.log("მონაცემები ჩატვირთულია:", photosynthesisData);
  } catch (error) {
    console.error("მონაცემების ჩატვირთვა ვერ მოხერხდა:", error);
  }
}


export { loadData, photosynthesisData };
