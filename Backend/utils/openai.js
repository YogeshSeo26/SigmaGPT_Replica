
// import "dotenv/config";

// import OpenAI from "openai";

// const openai = new OpenAI({
//     apiKey: process.env.GEMINI_API_KEY,
//     baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions"
// });

// const getOpenAIAPIResponse = async(message) => {
//     // const options = {
//     //     method: "POST",
//     //     headers: {
//     //         "Content-Type": "application/json",
//     //         "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//     //     },
//     //     body: JSON.stringify({
//     //         model: "gpt-4o-mini",
//     //         messages: [{
//     //             role: "user",
//     //             content: message
//     //         }],
//     //     }),
//     // };

//     // try {
//     //     const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//     //     const data = await response.json();

//     //     if (!response.ok) {
//     //         console.log("OpenAI API Error:", data);
//     //         throw new Error(data.error?.message || "OpenAI API request failed");
//     //     };

//     //     return data.choices[0].message.content; // reply
//     // } catch(err) {
//     //     console.log(err);
//     // };

//     // ChatGPT said this followed docs from gemini api
//     // try {
//     //     const response = await openai.chat.completions.create({
//     //         model: "gemini-2.5-flash",
//     //         // reasoning_effort: "low",
//     //         // messages: [
//     //         //     {
//     //         //         role: "user",
//     //         //         content: message,
//     //         //         // content: "Explain to me how AI works",
//     //         //     },
//     //         // ],

//     //         messages: [
//     //             {   role: "system",
//     //                 // content: "You are a helpful assistant."
//     //                 content: message,
//     //             },
//     //             {
//     //                 role: "user",
//     //                 // content: "Explain to me how AI works",
//     //                 content: message,
//     //             },
//     //         ],

//     //         // extra_body: {
//     //         //     "google": {
//     //         //         "thinking_config": {
//     //         //         "thinking_level": "low",
//     //         //         "include_thoughts": true
//     //         //         },
//     //         //     },
//     //         // },
//     //     });

//     //     console.log(response.choices[0].message);
//     //     return response.choices[0].message.content;

//     // } catch (error) {
//     //     console.log(error);
//     //     return undefined;
//     // };
// };

// export default getOpenAIAPIResponse;

// Gemini said this
import "dotenv/config";

const getOpenAIAPIResponse = async(message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`, // 1. Gemini API key variable
        },
        body: JSON.stringify({
            model: "gemini-3.8-flash", // 2. Gemini model name
            messages: [{
                role: "user",
                content: message
            }],
        }),
    };

    try {
        // 3. Gemini OpenAI-compatible Chat Completions endpoint
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", options);
        const data = await response.json();

            if (!response.ok) {
                console.log("OpenAI API Error:", data);
                throw new Error(data.error?.message || "OpenAI API request failed");
            };

        if (!response.ok) {
            console.log("Gemini API Error:", data);
            throw new Error(data.error?.message || "Gemini API request failed");
        };

        return data.choices[0].message.content; // reply
    } catch(err) {
        console.log(err);
    };
};

export default getOpenAIAPIResponse;