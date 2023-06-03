// const express = require('express')
// const app = express()

// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({extended:true}))

// // const { Configuration, OpenAIApi } = require("openai");

// // const config = new Configuration({
// // 	apiKey: "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",
// // });

// // const openai = new OpenAIApi(config);

// // prompt="";

// // const runPrompt = async () => {
// // 	const prompt = `${prompt}`; 
    
// // 	const response = await openai.createCompletion({
// // 		model: "text-embedding-ada-002",
// // 		prompt: prompt,
// // 		max_tokens: 2048,
// // 		temperature: 1,
// // 	});

// // 	const parsableJSONresponse = response.data.choices[0].text;
// // 	const parsedResponse = JSON.parse(parsableJSONresponse);

// // 	console.log("Question: ", parsedResponse.Q);
// // 	console.log("Answer: ", parsedResponse.A);
// // };

// // runPrompt();

// const port = 3001 || process.env.PORT

// app.use(express.static('public'))

// app.get('/submit', (req, res) => {
//     const query = req.query.query;
//     res.redirect('/options.html');
// });
  

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.listen(port, () => {
//     console.log(`Started listening on port ` + port)
// })

const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Route for the index.html page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for options.html page
app.get('/options', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'options.html'));
});

app.get('/lastpage', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'lastpage.html'));
});

// Route for handling the form submission from index.html
app.post('/submit-query', (req, res) => {
  const name = req.body.name;
  res.redirect('/options?name=' + name);
});

// Route for handling the form submission from options.html
app.post('/submit-options', (req, res) => {
  const option1 = req.body.option1;
  const option2 = req.body.option2;
  const name = req.query.name;
  res.redirect('/response?name=' + name + '&option1=' + option1 + '&option2=' + option2);
});

// Route for displaying the response.html page
app.get('/response', (req, res) => {
  const name = req.query.name;
  const option1 = req.query.option1;
  const option2 = req.query.option2;
  const response = `Name: ${name}<br>Option 1: ${option1}<br>Option 2: ${option2}`;
  res.send(response);
});

// Start the server
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
