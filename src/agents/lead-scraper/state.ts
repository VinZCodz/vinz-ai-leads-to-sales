import { Annotation, MessagesAnnotation } from "@langchain/langgraph";
import z from 'zod'

// const contactEmails = JSON.parse(process.env.CONTACT_EMAILS!);

/**
 * Individual Lead Schema (Core Lead Data + ICP Context)
 * Defines the strict schema for a single qualified lead object.
 * This structure includes essential contact/company details and ICP fields
 * critical for validation and email personalization (Step 3).
 */
export const LeadSchema = z.object({
    // leadId: z.uuid("Lead ID must be a valid UUID or unique string.").default(() => crypto.randomUUID()),

    companyName: z.string().min(3, "Company name is required."),
    website: z.url("Website must be a valid URL."),

    relevanceReason: z.string().min(10, "A concise reason for relevance is required (min 10 chars)."),
    confidenceScore: z.number().min(0.0).max(1.0, "Score must be between 0.0 and 1.0."),
    sourceUrl: z.url("Source URL must be a valid URL."),

    industry: z.string().describe("Specific industry segment (e.g., 'Luxury E-commerce Fashion')."),
    annualRevenue: z.string().optional().describe("Estimated annual revenue or range (e.g., '$5M - $20M')."),
    employeeCount: z.string().optional().describe("Estimated employee headcount or range (e.g., '50-200 employees')."),
    recentActivity: z.string().optional().describe("A concise note on a recent relevant company event (e.g., 'Launched new Spring line', 'Announced Q3 funding')."),

    // contactEmail: z.email().default(() => contactEmails[Math.floor(Math.random() * contactEmails.length)]),
}).describe("Single qualified lead object");

/**
 * Output Schema (Wrapping the Lead Array)
 * Defines the strict top-level output structure required from the AI Agent.
 */
export const LeadsOutputSchema = z.object({
    leads: z.array(LeadSchema).length(3, "Return exactly 3 leads by obtaining data"),
}).describe("Multiple leads obtained from data");

export type LeadsOutputType = z.infer<typeof LeadsOutputSchema>;
export type LeadType = z.infer<typeof LeadSchema>;

/**
 * Custom State
 * Defines the Messages array.
 */
export const LeadScraperState = Annotation.Root({
    ...MessagesAnnotation.spec,

    productName: Annotation<string>,
    productDescription: Annotation<string>,
    targetPersona: Annotation<string>,

    outputLeads: Annotation<LeadsOutputType>,
});