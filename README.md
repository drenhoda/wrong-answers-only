# Wrong Answers Only

A quiz game where users choose any topic and Claude generates a factual question with four plausible but completely incorrect answers.

## Features

* Topic-based question generation
* Four wrong answers only
* Humorous explanations
* Score and streak tracking using localStorage
* Responsive web interface

## Tech Stack

* Node.js
* Express
* Anthropic Claude API
* HTML/CSS/JavaScript

## Running Locally

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Create a `.env` file

```env
ANTHROPIC_API_KEY=your_api_key_here
```

4. Start the server

```bash
npm start
```

5. Open `http://localhost:3000`

## Prompt Design

The prompt instructs Claude to:

* Ask a real factual question
* Generate exactly four answers
* Ensure every answer is incorrect
* Never include the real answer
* Provide a witty explanation for the selected answer

## What I Tried First

I initially called the Anthropic API directly from the browser. After discovering the API key should not be exposed, I moved the API call to a backend Express server.

## Future Improvements

* Difficulty settings
* Leaderboards
* Shareable scores
* Additional game modes
