import React, { useMemo, useState } from 'react'
import type { Lead } from '../mockLeads'

type Props = {
    leads: Lead[]
    pageSize?: number
}

export default function LeadsTable({ leads, pageSize = 5 }: Props) {
    const [page, setPage] = useState(1)

    const totalPages = Math.max(1, Math.ceil(leads.length / pageSize))

    const pageLeads = useMemo(() => {
        const start = (page - 1) * pageSize
        return leads.slice(start, start + pageSize)
    }, [leads, page, pageSize])

    function handleSendMail(lead: Lead) {
        const body = `Hi ${lead.companyName},\n\nI thought you might be interested in ${lead.industry} solutions.\n\nReason: ${lead.relevanceReason}\n\nRegards,\nYour Team`;
        const ok = window.confirm(`Preview:\n\n${body}\n\nSend mail to ${lead.companyName}?`)
        if (ok) {
            // Simulate send
            alert(`Mail sent to ${lead.companyName} (mock)`)
        }
    }

    return (
        <div className="card">
            <h2>Leads</h2>
            <table className="leads-table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Website</th>
                        <th>Industry</th>
                        <th>Confidence</th>
                        <th>Reason</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pageLeads.map((l, idx) => (
                        <tr key={idx}>
                            <td>{l.companyName}</td>
                            <td><a href={l.website} target="_blank" rel="noreferrer">{l.website}</a></td>
                            <td>{l.industry}</td>
                            <td>{l.confidenceScore}</td>
                            <td>{l.relevanceReason}</td>
                            <td><button onClick={() => handleSendMail(l)}>Send Mail</button></td>
                        </tr>
                    ))}
                    {pageLeads.length === 0 && (
                        <tr><td colSpan={6}>No leads</td></tr>
                    )}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
                {Array.from({ length: totalPages }).map((_, i) => (
                    <button key={i} className={page === i + 1 ? 'active' : ''} onClick={() => setPage(i + 1)}>{i + 1}</button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
            </div>
        </div>
    )
}
