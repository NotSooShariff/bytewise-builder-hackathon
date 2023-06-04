# ByteWise
AI-powered Website Builder: Empowering non-coders to effortlessly create stunning websites using GPT 3.5 AI and NodeJS with Express.

This repository contains an AI-powered website builder application that aims to empower non-coders to effortlessly create stunning websites. The project utilizes the Ada text model and follows a specific flow to generate website ideas and options based on user prompts.

## Disclaimer
Please note that this project was built with a time constraint for a hackathon and is very slow in generating outputs due to not being time optimised and running the headless browser implementation locally. It is a work in progress and may have limitations and performance issues. To understand how the project works and monitor the progress, please check the console logs. The script may also be slow due to the usage of an older model of ChatGPT and the data scraping.

## Overview
The WebDev Prompts Chatbot is a web application that leverages OpenAI's ChatGPT model to generate responses to web development prompts. It provides an interactive platform for users to enter prompts related to web development and receive code-based responses. The application consists of a frontend component that collects user input and a backend component that utilizes a headless browser to interact with the ChatGPT model and generate the responses.

## Flow

1. **index.html**: The landing page of the application consists of a single input field. Users can enter their website prompt, which serves as the main input for the AI model.
2. **options.html**: After submitting the prompt, users are redirected to the options page. This page features a multi-step form where users can customize various aspects of their website, such as signature style, color scheme, tags, and more.
3. **response.html**: Once users have completed the options form, the AI model generates ideas and options for the website based on the provided prompt and customization choices. This information is displayed on the response page, allowing users to explore the generated content.

## Design Process

The design process of this project was thoughtful and aimed at creating a user-friendly experience for non-coders. The flow of the application was carefully crafted to ensure a seamless journey from prompt entry to website generation. By using a multi-step form on the options page, users can customize their website according to their preferences and requirements.

## Technologies Used
- Node.js
- Express.js
- Puppeteer
- HTML
- CSS
- JavaScript

## How It Works
1. User enters a web development prompt through the frontend form.
2. The form data is sent to the backend server.
3. The backend uses a headless browser to navigate to a chat platform where the prompt is entered and a response is generated using the ChatGPT model.
4. The response is extracted from the headless browser and processed.
5. The processed response is modified with separators for readability and converted into a JSON format.
6. The JSON response is sent back to the frontend and displayed on the lastpage.html.
7. Users can view the conversation and the generated code response.

## Dialogue Separation Algorithm
Due to the nature of the rendered text from the headless browser, which is not in a legible format, a dialogue separation algorithm is used to break down the conversation into individual dialogues. The algorithm identifies the speaker (AI, You, System, or Error) and separates the dialogues accordingly. This algorithm ensures that the conversation is presented in a structured and readable format.

## Usage
1. Clone the repository.
2. Install the required dependencies using the package manager of your choice.
3. Start the server by running the command: `node index.js`.
4. Access the application in your browser at [http://localhost:3069](http://localhost:3069).
5. Enter web development prompts and explore the generated code responses.

## License
This project is licensed under the [MIT License](LICENSE).




