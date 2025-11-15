import { ChatGroq } from "@langchain/groq";

export const Model=new ChatGroq({
    model: process.env.EMAIL_MODEL!,
    maxRetries: 2
});