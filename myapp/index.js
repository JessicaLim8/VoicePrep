const CognitiveServicesCredentials = require("@azure/ms-rest-js");
const TextAnalyticsAPIClient = require("@azure/cognitiveservices-textanalytics");

const key_var = 'TEXT_ANALYTICS_SUBSCRIPTION_KEY';
if (!process.env[key_var]) {
    throw new Error('please set/export the following environment variable: ' + key_var);
}
const subscription_key = process.env[key_var];

const endpoint_var = 'TEXT_ANALYTICS_ENDPOINT';
if (!process.env[endpoint_var]) {
    throw new Error('please set/export the following environment variable: ' + endpoint_var);
}
const endpoint = process.env[endpoint_var];

const creds = new CognitiveServicesCredentials.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': subscription_key } });
const client = new TextAnalyticsAPIClient.TextAnalyticsClient(creds, endpoint);

let inputLanguage = {
    documents: [
        {language:"en", id:"1", text:"My cat might need to see a veterinarian."}
    ]
    };


// Sentiment Analysis
const operation = client.sentiment({multiLanguageBatchInput: inputLanguage})
operation
.then(result => {
    console.log('Sentiment Analysis:');
    console.log(result.documents);
})
.catch(err => {
    throw err;
});

// Key Phrases
let operation2 = client.keyPhrases({
    multiLanguageBatchInput: inputLanguage
    });
    operation2
    .then(result => {
        console.log('Key Phrases:');
        console.log(result.documents);
    })
    .catch(err => {
        throw err;
    });