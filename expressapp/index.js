const CognitiveServicesCredentials = require("@azure/ms-rest-js");
const TextAnalyticsAPIClient = require("@azure/cognitiveservices-textanalytics");

const cors = require('cors')

const express = require('express')
const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

//app.get('/', (req, res) => res.send('Hello World!'))

app.post('/analyze', async (req, res) => {
    const documents = req.body

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

    const inputLanguage = { documents };


    // Sentiment Analysis
    let sentimentResult = await client.sentiment({ multiLanguageBatchInput: inputLanguage })
    let keyPhrasesResult = await client.keyPhrases({ multiLanguageBatchInput: inputLanguage })

    let result = {
        sentiment: sentimentResult,
        keyPhrases: keyPhrasesResult
    }

    res.json(result)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
