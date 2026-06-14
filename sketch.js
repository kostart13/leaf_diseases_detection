const streamUrl = 'http://192.168.1.9:81/stream'; 
const modelURL = 'https://teachablemachine.withgoogle.com/models/XMuG2-AFi/';
const body = document.body;

let classifier;
let camStream;
let label = "Loading Model...";
let confidence = 0;
	
function preload() {
// ml5 needs the path to the model.json file specifically
  classifier = ml5.imageClassifier(modelURL + 'model.json');
	}

	function setup() {
	  cnv = createCanvas(640, 480);
	  cnv.style('border', '5px solid white');
  
	  // Create the ESP32 stream
	  camStream = createImg(streamUrl, 'ESP32 Stream', 'anonymous', () => {
	  camStream.hide();
	  // Start classifying once the stream is ready
	  classifyImage();
	  });
	}
	
	function classifyImage() {
	  // ml5 can take the p5 'camStream' element directly
	  classifier.classify(camStream, gotResult);
	}
	
	// When we get a result
	function gotResult(results) {
	  // The results come back as an array of objects
	  label = results[0].label;
	  confidence = results[0].confidence;
	  
	  // Call classify again to create a loop
	  classifyImage();
	}
	
	function draw() {
	  body.style.backgroundColor = '#121212';   // Optional: Black background for a "cinema" feel #121212, #F8FAFC, #020617
	  body.style.display = 'flex';
	  body.style.justifyContent = 'center'; // Horizontal center
	  body.style.alignItems = 'center';     // Vertical center
	  body.style.height = '100vh';           // Fill the whole screen height
	  body.style.margin = '0';               // Remove default browser margins
	  
	  if (camStream) {
	    image(camStream, 0, 0, width, height);
	    
	    // UI overlay
	    fill(255);
	    textSize(32);
	    textAlign(CENTER);
	    text(label, width / 2, height - 50);
	    
	    textSize(16);
	    text("Confidence: " + nf(confidence, 0, 2), width / 2, height - 20);
	  }
	}
