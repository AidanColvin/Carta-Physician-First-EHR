"""
Main Application Component.
Handles tab state and layout rendering for the Carta EHR interface.
"""
import React, { useState } from 'react';
import './index.css';

type Tab = 'vitals' | 'history' | 'physical' | 'ems' | 'er' | 'labs' | 'viz' | 'path' | 'progress' | 'meds';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('vitals');

  return (
    <div className="card">
      <div className="header">
        <span className="logo">Carta</span>
      </div>

      <div className="patient-row">
        <div className="avatar">SC</div>
        <div className="patient-info">
          <div className="patient-name">Sarah Chen</div>
          <div className="patient-meta">62F · DOB 03/14/1963 · MRN 0042817 · Admitted 3/20/26</div>
          <div className="patient-meta">Attending: Dr. S. Patel · T2DM · HTN</div>
        </div>
        <div className="badges">
          <span className="badge-pcn">PCN allergy</span>
          <span className="badge-dnr">DNR</span>
          <span className="badge-cap">CAP</span>
        </div>
      </div>

      <div className="tabs-bar">
        <button className={`tab-btn ${activeTab === 'vitals' ? 'active' : ''}`} onClick={() => setActiveTab('vitals')}>Vitals</button>
        <button className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>History</button>
        <button className={`tab-btn ${activeTab === 'physical' ? 'active' : ''}`} onClick={() => setActiveTab('physical')}>Physical</button>
        <button className={`tab-btn ${activeTab === 'ems' ? 'active' : ''}`} onClick={() => setActiveTab('ems')}>EMS Notes</button>
        <button className={`tab-btn ${activeTab === 'er' ? 'active' : ''}`} onClick={() => setActiveTab('er')}>ER Notes</button>
        <div className="tab-break"></div>
        <button className={`tab-btn ${activeTab === 'labs' ? 'active' : ''}`} onClick={() => setActiveTab('labs')}>Labs</button>
        <button className={`tab-btn ${activeTab === 'viz' ? 'active' : ''}`} onClick={() => setActiveTab('viz')}>Visualizations</button>
        <button className={`tab-btn ${activeTab === 'path' ? 'active' : ''}`} onClick={() => setActiveTab('path')}>Pathology</button>
        <button className={`tab-btn ${activeTab === 'progress' ? 'active' : ''}`} onClick={() => setActiveTab('progress')}>Progress Notes</button>
        <button className={`tab-btn ${activeTab === 'meds' ? 'active' : ''}`} onClick={() => setActiveTab('meds')}>Medications</button>
      </div>

      {activeTab === 'vitals' && (
        <div className="tab-panel active" id="tab-vitals">
          <div className="vitals-section">
            <div className="vitals-grid">
              <div className="vital-card"><div className="vital-val">118/76</div><div className="vital-label">BP mmHg</div></div>
              <div className="vital-card"><div className="vital-val warn">101</div><div className="vital-label">HR bpm</div></div>
              <div className="vital-card"><div className="vital-val danger">38.9°</div><div className="vital-label">Temp °C</div></div>
              <div className="vital-card"><div className="vital-val">96%</div><div className="vital-label">SpO₂</div></div>
              <div className="vital-card"><div className="vital-val">18</div><div className="vital-label">RR /min</div></div>
            </div>
          </div>
          <div className="trends-section">
            <div className="trend-card">
              <div className="trend-title">BP Trend</div>
              <div className="trend-row"><span className="trend-date">3/16</span><div className="bar-bg"><div className="bar-fill fill-blue" style={{ width: '82%' }}></div></div><span className="trend-val">122/78</span></div>
              <div className="trend-row"><span className="trend-date">3/18</span><div className="bar-bg"><div className="bar-fill fill-blue" style={{ width: '80%' }}></div></div><span className="trend-val">118/74</span></div>
              <div className="trend-row"><span className="trend-date">3/20</span><div className="bar-bg"><div className="bar-fill fill-blue" style={{ width: '81%' }}></div></div><span className="trend-val">120/76</span></div>
              <div className="trend-row"><span className="trend-date">3/21</span><div className="bar-bg"><div className="bar-fill fill-gold" style={{ width: '78%' }}></div></div><span className="trend-val">116/80</span></div>
              <div className="trend-row"><span className="trend-date">3/22</span><div className="bar-bg"><div className="bar-fill fill-blue" style={{ width: '80%' }}></div></div><span className="trend-val">118/76</span></div>
            </div>
            <div className="trend-card">
              <div className="trend-title">Temp Trend</div>
              <div className="trend-row"><span className="trend-date">3/20 AM</span><div className="bar-bg"><div className="bar-fill fill-red" style={{ width: '90%' }}></div></div><span className="trend-val">39.2°</span></div>
              <div className="trend-row"><span className="trend-date">3/20 PM</span><div className="bar-bg"><div className="bar-fill fill-gold" style={{ width: '82%' }}></div></div><span className="trend-val">38.7°</span></div>
              <div className="trend-row"><span className="trend-date">3/21 AM</span><div className="bar-bg"><div className="bar-fill fill-amber" style={{ width: '76%' }}></div></div><span className="trend-val">38.4°</span></div>
              <div className="trend-row"><span className="trend-date">3/22</span><div className="bar-bg"><div className="bar-fill fill-gold" style={{ width: '83%' }}></div></div><span className="trend-val">38.9°</span></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'labs' && (
        <div className="tab-panel active" id="tab-labs">
          <div className="labs-section">
            <h3>Laboratory Results — 3/22/26</h3>
            <table className="labs-table">
              <thead><tr><th>Test</th><th>Result</th><th>Reference</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td>WBC</td><td className="val-high">14.2 K/µL <span className="lab-flag flag-h">H</span></td><td>4.5 – 11.0</td><td>Elevated</td></tr>
                <tr><td>Hemoglobin</td><td className="val-normal">12.8 g/dL <span className="lab-flag flag-n">N</span></td><td>12.0 – 16.0</td><td>Normal</td></tr>
                <tr><td>Potassium</td><td className="val-low">3.2 mEq/L <span className="lab-flag flag-l">L</span></td><td>3.5 – 5.0</td><td>Low</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="tab-panel active" id="tab-progress">
          <div className="notes-section">
            <h3>Progress Notes</h3>
            <div className="note-entry today">
              <div className="note-meta">3/22/26 · 08:14 · Dr. S. Patel · Attending</div>
              <div className="note-text">Patient is a 62F with T2DM and HTN presenting with CAP. Persistent low-grade fever at 38.9°C overnight.</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'meds' && (
        <div className="tab-panel active" id="tab-meds">
          <div className="meds-section">
            <h3>Active Medications</h3>
            <div className="med-card"><div className="med-dot" style={{ background: '#4B9CD3' }}></div><div><div className="med-name">Ceftriaxone 1g IV</div><div className="med-detail">Every 24h · Started 3/20/26</div></div></div>
            <div className="med-card"><div className="med-dot" style={{ background: '#2e8b57' }}></div><div><div className="med-name">Lisinopril 10mg PO</div><div className="med-detail">Once daily · Chronic — HTN</div></div></div>
          </div>
        </div>
      )}

      {/* Placeholders for remaining empty tabs */}
      {['history', 'physical', 'ems', 'er', 'viz', 'path'].includes(activeTab) && (
        <div className="tab-panel active">
          <div className="placeholder-panel">
            <div className="placeholder-icon">📋</div>
            <div className="placeholder-title">Section Content Pending</div>
            <div className="placeholder-sub">Data for {activeTab} will appear here.</div>
          </div>
        </div>
      )}
    </div>
  );
}
