import { TavilySearch } from "@langchain/tavily";

const searchTool = new TavilySearch({
    maxResults: 3,
    topic: "general",
});

export const availableTools = [
    searchTool
];