import { EmailGeneratorAgent } from "../src/agents/email-generator/agent.ts"

const main = async () => {
    const response = await EmailGeneratorAgent.invoke({
        messages: [
            {
                "role": "user",
                "content": 
                        `
                            **Product Info**
                            productName: "AI-powered books analytics software",
                            productDescription: "Analytics software that helps books vendors to plug a AI bot on to their landing page.",
                            targetPersona: "Mid-sized book vendors on Karnataka, India"
                        `
            },
            {
                "role": "user",
                "content": 
                        `
                            **Lead Data**
                            "companyName": "Samskruthi Book House",
                            "website": "samskruthibookhouse@yahoo.com",
                            "relevanceReason": "Listed as a distributor in Karnataka by the National Book Trust.",
                            "confidenceScore": 0.6,
                            "sourceUrl": "https://www.nbtindia.gov.in/writereaddata/attachment/tuesday-august-11-20152-42-11-pmsro-distribution-and-ajent.pdf",
                            "industry": "Book Distribution",
                            "annualRevenue": "Unknown",
                            "employeeCount": "Unknown",
                            "recentActivity": "Unknown"
                        `
            }
        ]
    });

    console.log(response.structuredResponse);
}

await main()
    .finally(() => {
        console.warn(`\nBye!\n`);
    });