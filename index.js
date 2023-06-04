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




// OLD EXPRESS NODEX SERVER

// const express = require('express');
// const app = express();
// const path = require('path');

// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// // Route for the index.html page
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // Route for options.html page
// app.get('/options', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'options.html'));
// });

// app.get('/lastpage', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'lastpage.html'));
// });

// // Route for handling the form submission from index.html
// app.post('/submit-query', (req, res) => {
//   const name = req.body.name;
//   res.redirect('/options?name=' + name);
// });

// // Route for handling the form submission from options.html
// app.post('/submit-options', (req, res) => {
//   const option1 = req.body.option1;
//   const option2 = req.body.option2;
//   const name = req.query.name;
//   res.redirect('/response?name=' + name + '&option1=' + option1 + '&option2=' + option2);
// });

// // Route for displaying the response.html page
// app.get('/response', (req, res) => {
//   const name = req.query.name;
//   const option1 = req.query.option1;
//   const option2 = req.query.option2;
//   const response = `Name: ${name}<br>Option 1: ${option1}<br>Option 2: ${option2}`;
//   res.send(response);
// });

// // Start the server
// app.listen(4000, () => {
//   console.log('Server is running on http://localhost:4000');
// });











// Trial 1


// const express = require('express');
// const session = require('express-session');
// const puppeteer = require('puppeteer');
// const app = express();
// const path = require('path');

// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));

// // // Initialize express session
// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: true
// }));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.post('/options', (req, res) => {
//   const data = req.body.data;
  
//   // // Store the data in session
//   req.session.data = data;

//   res.redirect('/options.html');
// });

// app.post('/submit', async (req, res) => {
//   // Logic to pass to function
//   const input = req.body.input;

//   try {
//     const response = await generateResponse(input);
//     const modifiedResponse = addSeparator(response);
//     const conversationJSON = convertConversationToJSON(modifiedResponse);
//     res.redirect(`/response?output=${encodeURIComponent(conversationJSON)}`);
//   } catch (error) {
//     console.error('Error generating response:', error);
//     res.redirect('/response');
//   }
// });

// // Serve response.html
// app.get('/response', (req, res) => {
//   const output = req.query.output || '';
//   res.send(`<pre>${output}</pre>`);
// });

// // Start the server
// // app.listen(port, () => {
// //   console.log(`Server running on port ${port}`);
// // });

// // Function to generate response using headless browser
// async function generateResponse(input) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Navigate to the chat page
//   await page.goto('https://chatgptonline.ai/chat/');

//   // Wait for the textarea to be available
//   await page.waitForSelector('textarea[placeholder="Type your message..."]');

//   // Enter input in the textarea
//   await page.type('textarea[placeholder="Type your message..."]', input);

//   // Press the Enter key
//   await page.keyboard.press(String.fromCharCode(13));
//   console.log('Input entered:', input);

//   // Wait for 30 seconds
//   await page.waitForTimeout(30 * 1000);

//   // Continue the loop 5 times
//   for (let i = 0; i < 2; i++) {
//     // Find the input field
//     const inputField = await page.$('textarea[placeholder="Type your message..."]');

//     // Clear the input field
//     await inputField.click({ clickCount: 3 });
//     await inputField.press('Backspace');

//     // Type "Continue Writing" in the input field
//     await inputField.type('Continue Writing');

//     // Press the Enter key
//     await page.keyboard.press(String.fromCharCode(13));
//     console.log('Continue Writing');

//     // Wait for 30 seconds
//     await page.waitForTimeout(30 * 1000);
//   }

//   // Extract the plain text from elements with classes "mwai-text", "mwai-reply", and "mwai-ai"
//   const response = await page.evaluate(() => {
//     const elements = Array.from(document.querySelectorAll('.mwai-text, .mwai-reply, .mwai-ai'));

//     const plainTextContent = elements
//       .map(element => element.textContent.trim())
//       .filter(content => content !== '');

//     return plainTextContent;
//   });

//   console.log('Response:', response);

//   // Close the browser
//   await browser.close();

//   return response;
// }

// // Function to add separators to the response text
// function addSeparator(response) {
//   const separator = '##########################';
//   const modifiedResponse = [separator, ...response, separator];
//   return modifiedResponse.join('\n');
// }

// // Function to convert conversation text to JSON format
// function convertConversationToJSON(conversationText) {
//   const dialogue = {};
//   let currentSpeaker = '';
//   let dialogueIndex = 1;
//   let currentDialogue = '';

//   for (let i = 0; i < conversationText.length; i++) {
//     const char = conversationText[i];

//     // Speaker detection
//     if (char === 'A' && conversationText.substr(i, 2) === 'AI') {
//       if (currentSpeaker !== 'AI') {
//         currentSpeaker = 'AI';
//         dialogueIndex = 1;
//         dialogue[currentSpeaker + 'Dialogue' + dialogueIndex] = '';
//       }
//       currentDialogue += 'AI';
//       i++; // Skip the next letter ('I') to avoid duplicate detection
//     } else if (char === 'Y' && conversationText.substr(i, 3) === 'You') {
//       currentSpeaker = 'You'; // Skip the 'You' dialogues
//       currentDialogue = '';
//       i += 2; // Skip the next two letters ('ou') to avoid duplicate detection
//     } else if (char === 'S' && conversationText.substr(i, 6) === 'System') {
//       currentSpeaker = 'System'; // Skip the 'System' dialogues
//       currentDialogue = '';
//       i += 5; // Skip the next five letters ('ystem') to avoid duplicate detection
//     } else if (char === 'E' && conversationText.substr(i, 5) === 'Error') {
//       currentSpeaker = 'Error'; // Skip the 'Error' dialogues
//       currentDialogue = '';
//       i += 4; // Skip the next four letters ('rror') to avoid duplicate detection
//     } else {
//       currentDialogue += char;
//     }

//     // Dialogue separation
//     if (i < conversationText.length - 1) {
//       const nextChar = conversationText[i + 1];
//       if (nextChar === '\n') {
//         if (currentSpeaker === 'AI') {
//           dialogue[currentSpeaker + 'Dialogue' + dialogueIndex] = currentDialogue.trim();
//           dialogueIndex++;
//         }
//         currentDialogue = '';
//         i++; // Skip the next character ('\n') to avoid duplication
//       }
//     }
//   }

//   // Store the last dialogue if it exists
//   if (currentSpeaker === 'AI' && currentDialogue) {
//     dialogue[currentSpeaker + 'Dialogue' + dialogueIndex] = currentDialogue.trim();
//   }

//   return JSON.stringify(dialogue, null, 2);
// }


// app.get('/lastpage', (req, res) => {
//   // Retrieve the data from session
//   const data = req.session.data;
//   // res.redirect('/options.html');
//   // Render the lastpage.html template with the retrieved data
//   res.send(`The text you displayed on the first page was: ${data}`);
// });

// app.listen(8085, () => {
//   console.log('Server is running on port 8085');
// });

















const express = require('express');
const session = require('express-session');
const puppeteer = require('puppeteer');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Initialize express session
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/options', (req, res) => {
  const data = req.body.data;
  
  // Store the data in session
  req.session.data = data;

  res.redirect('/options.html');
});

// app.post('/submit', async (req, res) => {
//   // Logic to pass to function
//   const input = req.body.input;

//   try {
//     const response = await generateResponse(input);
//     const modifiedResponse = addSeparator(response);
//     const conversationJSON = convertConversationToJSON(modifiedResponse);
//     res.redirect(`/response?output=${encodeURIComponent(conversationJSON)}`);
//   } catch (error) {
//     console.error('Error generating response:', error);
//     res.redirect('/response');
//   }
// });

// app.post('/submit', async (req, res) => {
//   // Logic to pass to function
//   const input = req.body.input;

//   try {
//     const response = await generateResponse(input);
//     const modifiedResponse = addSeparator(response);
//     const conversationJSON = convertConversationToJSON(modifiedResponse);
//     res.redirect(`/response?output=${encodeURIComponent(conversationJSON)}`);
//   } catch (error) {
//     console.error('Error generating response:', error);
//     res.redirect('/response');
//   }
// });

app.post('/submit', async (req, res) => {
  // Logic to pass to function
  const input = req.body.input;

  try {
    const response = await generateResponse(input);
    const modifiedResponse = addSeparator(response);
    const conversationJSON = convertConversationToJSON(modifiedResponse);
    res.redirect(`/response?output=${encodeURIComponent(conversationJSON)}`); // Include the JSON output as a query parameter
  } catch (error) {
    console.error('Error generating response:', error);
    res.redirect('/response');
  }
});


// Serve response.html
// app.get('/response', (req, res) => {
//   const output = req.query.output || '';
//   res.send(`<pre>${output}</pre>`);
// });

// app.get('/response', (req, res) => {
//   const output = req.query.output || '';
//   res.render('response', { output }); // Render response.html template and pass output as a parameter
// });
app.get('/response', (req, res) => {
  const output = req.query.output || '';
  res.sendFile(path.join(__dirname, 'public', 'response.html'), { output });
});


// Start the server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// Function to generate response using headless browser
async function generateResponse(input) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the chat page
  await page.goto('https://chatgptonline.ai/chat/');

  // Wait for the textarea to be available
  await page.waitForSelector('textarea[placeholder="Type your message..."]');

  // Enter input in the textarea
  await page.type('textarea[placeholder="Type your message..."]', String(input));

  // Press the Enter key
  await page.keyboard.press('Enter');
  console.log('Input entered:', input);

  // Wait for 30 seconds
  await page.waitForTimeout(30 * 1000);

  // Continue the loop 5 times
  for (let i = 0; i < 1; i++) {
    // Find the input field
    const inputField = await page.$('textarea[placeholder="Type your message..."]');

    // Clear the input field
    await inputField.click({ clickCount: 3 });
    await inputField.press('Backspace');

    // Type "Continue Writing" in the input field
    await inputField.type('Continue Writing');

    // Press the Enter key
    await page.keyboard.press(String.fromCharCode(13));
    console.log('Continue Writing');

    // Wait for 30 seconds
    await page.waitForTimeout(30 * 1000);
  }

  // Extract the plain text from elements with classes "mwai-text", "mwai-reply", and "mwai-ai"
  const response = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('.mwai-text, .mwai-reply, .mwai-ai'));

    const plainTextContent = elements
      .map(element => element.textContent.trim())
      .filter(content => content !== '');

    return plainTextContent;
  });

  console.log('Response:', response);

  // Close the browser
  await browser.close();

  return response;
}

// Function to add separators to the response text
function addSeparator(response) {
  const separator = '##########################';
  const modifiedResponse = [separator, ...response, separator];
  return modifiedResponse.join('\n');
}

// Function to convert conversation text to JSON format
function convertConversationToJSON(conversationText) {
  const dialogue = {};
  let currentSpeaker = '';
  let dialogueIndex = 1;
  let currentDialogue = '';

  for (let i = 0; i < conversationText.length; i++) {
    const char = conversationText[i];

    // Speaker detection
    if (char === 'A' && conversationText.substr(i, 2) === 'AI') {
      if (currentSpeaker !== 'AI') {
        currentSpeaker = 'AI';
        dialogueIndex = 1;
        dialogue[currentSpeaker + 'Dialogue' + dialogueIndex] = '';
      }
      currentDialogue += 'AI';
      i++; // Skip the next letter ('I') to avoid duplicate detection
    } else if (char === 'Y' && conversationText.substr(i, 3) === 'You') {
      currentSpeaker = 'You'; // Skip the 'You' dialogues
      currentDialogue = '';
      i += 2; // Skip the next two letters ('ou') to avoid duplicate detection
    } else if (char === 'S' && conversationText.substr(i, 6) === 'System') {
      currentSpeaker = 'System'; // Skip the 'System' dialogues
      currentDialogue = '';
      i += 5; // Skip the next five letters ('ystem') to avoid duplicate detection
    } else if (char === 'E' && conversationText.substr(i, 5) === 'Error') {
      currentSpeaker = 'Error'; // Skip the 'Error' dialogues
      currentDialogue = '';
      i += 4; // Skip the next four letters ('rror') to avoid duplicate detection
    } else {
      currentDialogue += char;
    }

    // Dialogue separation
    if (i < conversationText.length - 1) {
      const nextChar = conversationText[i + 1];
      if (nextChar === '\n') {
        if (currentSpeaker === 'AI') {
          dialogue[currentSpeaker + 'Dialogue' + dialogueIndex] = currentDialogue.trim();
          dialogueIndex++;
        }
        currentDialogue = '';
        i++; // Skip the next character ('\n') to avoid duplication
      }
    }
  }

  // Store the last dialogue if it exists
  if (currentSpeaker === 'AI' && currentDialogue) {
    dialogue[currentSpeaker + 'Dialogue' + dialogueIndex] = currentDialogue.trim();
  }

  return JSON.stringify(dialogue, null, 2);
}


app.get('/lastpage', (req, res) => {
  // Retrieve the data from session
  const data = req.session.data;
  // res.redirect('/options.html');
  // Render the lastpage.html template with the retrieved data
  res.send(`The text you displayed on the first page was: ${data}`);
});

app.listen(8085, () => {
  console.log('Server is running on port 8085');
});
