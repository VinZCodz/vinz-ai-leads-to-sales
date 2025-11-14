import { LeadScraperAgent } from "../src/agents/lead-scraper/graph.ts"

const main = async () => {
    const response = await LeadScraperAgent.stream({
        productName: "AI-powered books analytics software",
        productDescription: "Analytics software that helps books vendors to plug a AI bot on to their landing page.",
        targetPersona: "Mid-sized book vendors on Karnataka, India",

        messages: [{ role: "human", content: "Please give 3 leads only" }],
    });

    for await (const chunk of response) {
        console.log(chunk);

        if (chunk.FormLeads?.outputLeads)
            console.log(`Output:\n ${JSON.stringify(chunk.FormLeads?.outputLeads)}`);
    }

    // const response = await LeadScraperAgent.invoke({
    //     productName: "AI-powered e-commerce analytics software",
    //     productDescription: "Analytics software that helps e-commerce vendors to plug a AI bot on to their landing page.",
    //     targetPersona: "Mid-sized online fashion retailer in India",

    //     messages: [{ role: "human", content: "Please give 3 leads only" }]
    // });

    // console.log(`Output:\n ${JSON.stringify(response.outputLeads)}`);
}

await main()
    .finally(() => {
        console.warn(`\nBye!\n`);
    });