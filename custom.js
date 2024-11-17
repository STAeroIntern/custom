const dscc = require('@google/dscc');

// Function to draw the visualization
function drawViz(data, style) {
  // Select the container element
  const container = document.getElementById('viz-container');
  container.innerHTML = ''; // Clear previous content

  // Set background color from style settings
  container.style.backgroundColor = style.backgroundColor || '#ffffff';

  // Render Base64 images
  const size = style.imageSize || 100; // Image size from style settings
  data.tables.default.forEach(row => {
    const base64String = row.image_base64; // Assuming the 4th column is named `image_base64`

    // Validate that the Base64 string starts with the "data:image/png;base64," prefix
    if (base64String.startsWith('data:image/')) {
      const imgElement = document.createElement('img');
      imgElement.src = base64String; // Directly use the Base64 string as the image source
      imgElement.style.width = `${size}px`;
      imgElement.style.height = `${size}px`;
      imgElement.style.margin = '10px';
      container.appendChild(imgElement);
    } else {
      // If the string is not a valid Base64 image, render a placeholder
      const placeholder = document.createElement('div');
      placeholder.textContent = 'Invalid image data';
      placeholder.style.color = 'red';
      placeholder.style.margin = '10px';
      container.appendChild(placeholder);
    }
  });
}

// Subscribe to data and listen for changes
dscc.subscribeToData(data => {
  drawViz(data, dscc.getSettings());
});
