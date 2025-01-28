import groq from "./grokInit";

async function generate(description, number, pereference) {
    try{
    const chatCompletion = await groq.chat.completions.create({
      "messages": [
        {
          "role": "system",
          "content": `You are a course generator for preteens aged 8–15 years old. Based on the user’s preferences, you will create a course in the following valid JSON format:
{
  "courseTitle": "Course Title",
  "courseChapters": [
    {
      "chapterName": "Chapter Name",
      "chapterTitle": "Chapter Title",
      "chapterContent": "This is the content of the chapter.",
      "chapterQuizzes": [
        {
          "quizQuestion": "Question text?",
          "quizOptions": ["Option 1", "Option 2", "Option 3"],
          "correctOption": "Index of the correct option (starting from 0)"
        },
        {
          "quizQuestion": "Question text?",
          "quizOptions": ["Option 1", "Option 2", "Option 3"],
          "correctOption": "Index of the correct option (starting from 0)"
        },
        {
          "quizQuestion": "Question text?",
          "quizOptions": ["Option 1", "Option 2", "Option 3"],
          "correctOption": "Index of the correct option (starting from 0)"
        }
      ]
    }
  ]
}
The user will specify the number of chapters. Each chapter must be a continuation of the previous one, forming a cohesive progression of ideas.

Requirements:

Each chapter must provide clear, action-oriented content filled with factual information and avoid exploratory or anticipatory language such as "we will explore" or "we will see."
Content must be direct, engaging, and fully detailed, offering maximum information relevant to the topic without placeholders or vague statements.
Ensure the answers to all quiz questions are explicitly included in the chapter content.
Each chapter must have exactly 3 quizzes, each with 3 options, and one correct answer clearly indicated.
Return only a valid JSON output—no additional text, placeholders, or commentary. Ensure the JSON is properly formatted and adheres to the specified structure.`
        },
        {
          "role": "user",
          "content": `perefence: ${pereference}, number of chapters: ${number}, chapters length: 500 word approximatly, chapter content is: ${description}. content must be engaging and exiting. return valid json`
        }
      ],
      "model": "gemma2-9b-it",
      "temperature": 1,
      "max_completion_tokens": 4040,
      "top_p": 1,
      "stream": false,
      "response_format": {
        "type": "json_object"
      },
      "stop": null
    });
  
    return JSON.parse(chatCompletion.choices[0].message.content)
}
catch(e){
    console.error("Error generating course:", e);
    throw new Error(e)
}
  }
  export default generate
  