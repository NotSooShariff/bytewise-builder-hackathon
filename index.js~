const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

// const { Configuration, OpenAIApi } = require("openai");

// const config = new Configuration({
// 	apiKey: "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",
// });

// const openai = new OpenAIApi(config);

// prompt="";

// const runPrompt = async () => {
// 	const prompt = `${prompt}`; 
    
// 	const response = await openai.createCompletion({
// 		model: "text-embedding-ada-002",
// 		prompt: prompt,
// 		max_tokens: 2048,
// 		temperature: 1,
// 	});

// 	const parsableJSONresponse = response.data.choices[0].text;
// 	const parsedResponse = JSON.parse(parsableJSONresponse);

// 	console.log("Question: ", parsedResponse.Q);
// 	console.log("Answer: ", parsedResponse.A);
// };

// runPrompt();

const port = 3000 || process.env.PORT

app.use(express.static('public'))

app.get('/submit', (req, res) => {
    const query = req.query.query;
    res.redirect('/options.html');
});
  

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Started listening on port ` + port)
})