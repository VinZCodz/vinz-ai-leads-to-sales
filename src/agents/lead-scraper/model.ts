import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {availableTools} from "./tools";

export const Model = new ChatGoogleGenerativeAI({
    model: process.env.LEAD_SCRAPER_MODEL!,
    maxRetries: 2,
});