import React, { useState } from 'react'
import LeadForm from '../components/LeadForm'
import LeadsTable from '../components/LeadsTable'
import { MOCK_LEADS, Lead } from '../mockLeads'

export default function Home() {
    const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS)

    function handleGenerated(newLeads: Lead[]) {
        // Prepend generated leads for visibility
        setLeads(prev => [...newLeads, ...prev])
    }

    return (
        <main className="container">
            <h1>Leads Dashboard (Demo)</h1>
            <div className="grid">
                <div className="col">
                    <LeadForm onGenerate={handleGenerated} />
                </div>
                <div className="col">
                    <LeadsTable leads={leads} pageSize={5} />
                </div>
            </div>
        </main>
    )
}
