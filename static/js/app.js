// Function to set things up initially
function init() {
    // Pick the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
  
    // Get data from a URL and fill the dropdown with sample IDs
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
      data.names.forEach(name => {
        dropdownMenu.append("option").text(name).property("value", name);
      });
  
      // Start with the first sample to make initial charts
      const firstSample = data.names[0];
      buildCharts(firstSample);
      updateDemographicInfo(firstSample);
    });
  }
  
  // Function to create charts for a specific sample
  function buildCharts(sample) {
    // Get data from a URL
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
      // Filter data for the chosen sample
      var sampleData = data.samples.filter(obj => obj.id == sample)[0];
  
      // BAR CHART
      // Sort and slice data for a bar chart
      var topSampleValues = sampleData.sample_values.slice(0, 10).reverse();
      var topOtuIds = sampleData.otu_ids.slice(0, 10).reverse();
      var topOtuLabels = sampleData.otu_labels.slice(0, 10).reverse();
  
      // Create data for the bar chart
      var barTrace = {
        x: topSampleValues,
        y: topOtuIds.map(otuID => `OTU ${otuID}`),
        text: topOtuLabels,
        type: "bar",
        orientation: "h"
      };
  
      var barData = [barTrace];
  
      var barLayout = {
        title: "Top 10 OTUs Found",
        margin: { t: 30, l: 150 }
      };
  
      // Make the bar chart
      Plotly.newPlot("bar", barData, barLayout);
  
      // BUBBLE CHART
      // Create data for a bubble chart
      var bubbleTrace = {
        x: sampleData.otu_ids,
        y: sampleData.sample_values,
        text: sampleData.otu_labels,
        mode: 'markers',
        marker: {
          size: sampleData.sample_values,
          color: sampleData.otu_ids,
          colorscale: 'Earth'
        }
      };
  
      var bubbleData = [bubbleTrace];
  
      var bubbleLayout = {
        title: 'Bacteria Cultures Per Sample',
        showlegend: false,
        height: 600,
        width: 1200,
        xaxis: { title: 'OTU ID' }
      };
  
      // Make the bubble chart
      Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    });
  }
  
  // Function to update demographic info for a specific sample
  function updateDemographicInfo(sample) {
    // Choose the demographic info panel
    var demographicInfoPanel = d3.select("#sample-metadata");
  
    // Clear the current content
    demographicInfoPanel.html("");
  
    // Get data from a URL
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
      // Filter data for the chosen sample's metadata
      var metadata = data.metadata.filter(obj => obj.id == sample)[0];
  
      // Display demographic info
      Object.entries(metadata).forEach(([key, value]) => {
        demographicInfoPanel.append("h6").text(`${key}: ${value}`);
      });
    });
  }
  
  // Function to handle selecting a new sample
  function optionChanged(newSample) {
    // Update the charts
    buildCharts(newSample);
    // Update the demographic info
    updateDemographicInfo(newSample);
  }
  
  // Set up the dashboard when the page loads
  init();
  