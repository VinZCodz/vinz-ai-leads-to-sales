import React, { useState } from 'react'
import type { Lead } from '../mockLeads'

type Props = {
    onGenerate: (leads: Lead[]) => void
}

export default function LeadForm({ onGenerate }: Props) {
    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [targetPersona, setTargetPersona] = useState('')

    function handleGenerate(e: React.FormEvent) {
        e.preventDefault()
        // For now, generate three mock leads derived from the inputs
        const base = {
            companyName: productName || 'ProductCorp',
            website: `https://www.${(productName || 'productcorp').replace(/\s+/g, '').toLowerCase()}.com`,
            relevanceReason: `Because ${productName || 'the product'} targets ${targetPersona || 'the persona'}. ${productDescription || ''}`,
            confidenceScore: 0.85,
            sourceUrl: 'https://source.mock',
            industry: 'SaaS',
            annualRevenue: '$5M - $20M',
            employeeCount: '50-200',
            recentActivity: 'Launched new feature'
        }

        const leads: Lead[] = [0, 1, 2].map(i => ({
            ...base,
            companyName: `${base.companyName} ${i + 1}`,
            website: base.website.replace('.com', `-${i + 1}.com`),
            confidenceScore: Math.max(0.4, Math.min(0.99, base.confidenceScore - 0.1 * i))
        }))

        onGenerate(leads)
    }

    return (
        <form className="card" onSubmit={handleGenerate}>
            <h2>Generate Leads</h2>
            <label>
                Product Name
                <input value={productName} onChange={e => setProductName(e.target.value)} placeholder="Product name" />
            </label>

            <label>
                Product Description
                <textarea value={productDescription} onChange={e => setProductDescription(e.target.value)} placeholder="Short description" />
            </label>

            <label>
                Target Persona
                <input value={targetPersona} onChange={e => setTargetPersona(e.target.value)} placeholder="e.g. Head of Marketing" />
            </label>

            <div className="actions">
                <button type="submit">Generate Leads</button>
            </div>
        </form>
    )
}
