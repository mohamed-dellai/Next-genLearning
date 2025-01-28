const Groq = require('groq-sdk');
console.log( process.env.GROQ_API_KEY)
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export default groq;