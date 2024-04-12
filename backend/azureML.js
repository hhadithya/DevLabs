require('dotenv').config();

async function predictUsingAzureML(data) {
    const endpointUrl = `${process.env.MODEL_URL}`;
    const apiKey = `${process.env.AZURE_ML_API_KEY}`; // If authentication is required
    
    const response = await fetch(endpointUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to get prediction from Azure ML');
    }

    const result = await response.json();
    return result;
}

// Example usage
const inputData = {
    "Inputs": { 
        "data": [
          {
            "day": 1,
            "mnth": 1,   
            "year": 2022,
            "season": 2,
            "holiday": 0,
            "weekday": 1,
            "workingday": 1,
            "weathersit": 2, 
            "temp": 0.3, 
            "atemp": 0.3,
            "hum": 0.3,
            "windspeed": 0.3 
           }
        ]    
    },   
    "GlobalParameters": 1.0
};

predictUsingAzureML(inputData)
    .then(prediction => {
        console.log('Prediction:', prediction);
        // Do something with the prediction
    })
    .catch(error => {
        console.error('Error:', error);
    });
