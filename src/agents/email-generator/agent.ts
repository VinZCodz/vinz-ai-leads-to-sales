import * as z from "zod";
import { createAgent, providerStrategy } from "langchain";
import * as prompt from "./prompt.ts";
import { Model } from "./model.ts";

const EMail = z.object({
    subject: z.string().describe("A compelling, personalized subject line"),
    body: z.string().describe("Full email body, including salutation and sign-off"),
});

export const EmailGeneratorAgent = createAgent({
    model: Model,
    systemPrompt: prompt.EMAIL_GENERATOR_PROMPT,
    responseFormat: EMail, //providerStrategy(EMail),
});