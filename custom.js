const dscc = require('@google/dscc'); // Import the Data Studio Component Connector library

// Function to render the visualization
function drawVisualization(data) {
  // Clear the visualization container
  const container = document.createElement('div');
  container.style.display = 'grid';
  container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(150px, 1fr))';
  container.style.gap = '10px';
  container.style.padding = '10px';

  // Loop through the data rows
  data.tables.DEFAULT.forEach(row => {
    const imageSrc = row['scatter_plot'][0]; // The 4th column containing the base64 image source

    // Create an image element
    const imgElement = document.createElement('img');
    imgElement.src = imageSrc;
    imgElement.alt = 'Scatter Plot';
    imgElement.style.width = '150px'; // Thumbnail width
    imgElement.style.border = '1px solid #ccc';
    imgElement.style.cursor = 'pointer';

    // Make the image clickable
    const link = document.createElement('a');
    link.href = imageSrc; // Set href to the base64 image
    link.target = '_blank'; // Open image in a new tab
    link.appendChild(imgElement);

    // Append the clickable image to the container
    container.appendChild(link);
  });

  // Append the container to the body
  document.body.innerHTML = ''; // Clear previous content
  document.body.appendChild(container);
}

// Listen for data updates and render the visualization
dscc.subscribeToData(drawVisualization);
