export type Lead = {
    companyName: string
    website: string
    relevanceReason: string
    confidenceScore: number
    sourceUrl: string
    industry: string
    annualRevenue?: string
    employeeCount?: string
    recentActivity?: string
}

export const MOCK_LEADS: Lead[] = Array.from({ length: 12 }).map((_, i) => ({
    companyName: `Acme Co ${i + 1}`,
    website: `https://www.acme-${i + 1}.com`,
    relevanceReason: `Relevant because they match the target persona and market fit ${i + 1}`,
    confidenceScore: Math.round((0.5 + Math.random() * 0.5) * 100) / 100,
    sourceUrl: `https://source.example.com/company/${i + 1}`,
    industry: ['E-commerce', 'SaaS', 'Fintech', 'Health'][i % 4],
    annualRevenue: ['$1M-$5M', '$5M-$20M', '$20M-$100M'][i % 3],
    employeeCount: ['10-50', '50-200', '200-1000'][i % 3],
    recentActivity: ['Launched new product', 'Raised Series A', 'Expanded to EU'][i % 3]
}))
