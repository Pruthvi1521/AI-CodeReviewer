const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_KEY,
});

async function generateContent(code) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
Review the following code.
Find bugs, suggest improvements, and explain issues:

${code}
`
    });

    console.log(response);
    console.log(response.text);
    console.log(typeof response.text);

    return response.text;
}

module.exports = generateContent;