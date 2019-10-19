const CognitiveServicesCredentials = require("@azure/ms-rest-js");
const TextAnalyticsAPIClient = require("@azure/cognitiveservices-textanalytics");
require('dotenv').config();

const cors = require('cors')
const express = require('express')

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())


app.post('/analyze', async (req, res) => {
    const documents = req.body

    const key_var = 'TEXT_ANALYTICS_SUBSCRIPTION_KEY';
    if (!process.env[key_var]) {
        throw new Error('Please set/export the following environment variable: ' + key_var);
    }
    const subscription_key = process.env[key_var];

    const endpoint_var = 'TEXT_ANALYTICS_ENDPOINT';
    if (!process.env[endpoint_var]) {
        throw new Error('Please set/export the following environment variable: ' + endpoint_var);
    }
    const endpoint = process.env[endpoint_var];

    const creds = new CognitiveServicesCredentials.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': subscription_key } });
    const client = new TextAnalyticsAPIClient.TextAnalyticsClient(creds, endpoint);

    const inputLanguage = { documents };

    // Analysis
    let sentimentResult = await client.sentiment({ multiLanguageBatchInput: inputLanguage })

    let result = {
        sentiment: sentimentResult,
    }

    res.json(result)
})

app.listen(port, () => console.log(`Server listening on port ${port}!`))
