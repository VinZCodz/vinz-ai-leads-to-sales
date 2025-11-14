import { StateGraph } from "@langchain/langgraph"
import { LeadsOutputSchema, LeadScraperState, LeadSchema } from "./state.ts"
import { Model } from "./model.ts"
import { PromptTemplate } from "@langchain/core/prompts";
import * as prompt from "./prompt.ts";
import { availableTools } from "./tools";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import type { AIMessage } from "langchain";

const FindLeads = async (state: typeof LeadScraperState.State) => {
    console.log(`\n\n------------LeadFinder--------------`);

    const template = PromptTemplate.fromTemplate(prompt.LEAD_FINDER_PROMPT);
    const formattedPrompt = await template.format({
        PRODUCT_NAME: state.productName,
        PRODUCT_DESCRIPTION: state.productDescription,
        TARGET_PERSONA: state.targetPersona,
        KEY_FIELDS: Object.keys(LeadSchema.def.shape),
        TIME: new Date()
    });

    const response = await Model.bindTools(availableTools).invoke([
        { role: "system", content: formattedPrompt },
        ...state.messages
    ]);

    return { messages: [response] };
}

const search = new ToolNode(availableTools);

const doSearch = (state: typeof LeadScraperState.State) => {
    const lastMessages = state.messages.at(-1) as AIMessage;

    if (lastMessages.tool_calls?.length)
        return "search";
    else
        return "FormLeads"
}

const FormLeads = async (state: typeof LeadScraperState.State) => {
    console.log(`\n\n------------FormLeads--------------`);

    const modelWithStructure = Model.withStructuredOutput(LeadsOutputSchema);

    const structuredOutput = await modelWithStructure.invoke([
        { role: "system", content: prompt.LEAD_FORM_PROMPT },
        ...state.messages
    ]);

    return { outputLeads: structuredOutput };
}

const graph = new StateGraph(LeadScraperState)
    .addNode("FindLeads", FindLeads)
    .addNode("search", search)
    .addNode("FormLeads", FormLeads)

    .addEdge("__start__", "FindLeads")
    .addConditionalEdges("FindLeads", doSearch)
    .addEdge("search", "FindLeads")

    .addEdge("FormLeads", "__end__");

export const LeadScraperAgent = graph.compile();