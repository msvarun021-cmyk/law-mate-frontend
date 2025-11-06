// This file matches the screenshot: `Screenshot 2025-11-06 094706.png`
import React, { useState } from 'react';
import { draftFIR as apiDraftFIR } from '../../services/policeService';
import LoadingSpinner from '../../components/LoadingSpinner';
import './DraftFIR.css';

const DraftFIR = () => {
  const [complaintText, setComplaintText] = useState('');
  const [activeTab, setActiveTab] = useState('text');
  const [firDraft, setFirDraft] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateDraft = async () => {
    if (!complaintText) {
      setError('Please enter complaint details.');
      return;
    }
    setLoading(true);
    setError(null);
    setFirDraft(null);
    try {
      const data = await apiDraftFIR(complaintText);
      if (data.error) {
        setError(data.error);
      } else {
        setFirDraft(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <h1>Draft First Information Report (FIR)</h1>
        <p>Use AI to analyze complaints and generate structured FIRs.</p>
      </div>

      <div className="fir-draft-container">
        <div className="card complaint-input-card">
          <h3>Complaint Input</h3>
          <p className="subtitle">Provide the complaint details below.</p>
          
          <div className="input-tabs">
            <button 
              className={`tab-btn ${activeTab === 'text' ? 'active' : ''}`}
              onClick={() => setActiveTab('text')}
            >
              Text
            </button>
            <button 
              className={`tab-btn ${activeTab === 'file' ? 'active' : ''}`}
              onClick={() => setActiveTab('file')}
            >
              File
            </button>
            <button 
              className={`tab-btn ${activeTab === 'voice' ? 'active' : ''}`}
              onClick={() => setActiveTab('voice')}
            >
              Voice
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'text' && (
              <textarea
                className="form-input"
                placeholder="Enter complaint details here. The more specific, the better the AI's suggestions will be."
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
              />
            )}
            {activeTab === 'file' && <p>File upload not yet implemented.</p>}
            {activeTab === 'voice' && <p>Voice input not yet implemented.</p>}
          </div>

          <button 
            className="btn btn-primary" 
            onClick={handleGenerateDraft} 
            disabled={loading || !complaintText}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            {loading ? <LoadingSpinner /> : 'Generate FIR Draft'}
          </button>
        </div>

        <div className="card fir-output-card">
          <h3>Generated FIR Draft</h3>
          <p className="subtitle">Review the AI-generated draft and suggested sections.</p>
          
          <div className="generated-draft-area">
            {loading && <LoadingSpinner large={true} />}
            {error && <div className="error-message">{error}</div>}
            
            {!loading && !error && !firDraft && (
              <div className="placeholder-text">
                The generated FIR draft will appear here after analysis.
              </div>
            )}
            
            {firDraft && <FIROutput draft={firDraft} />}
          </div>
        </div>
      </div>
    </>
  );
};

// This component can be moved to /components/FIROutput.js
const FIROutput = ({ draft }) => {
  return (
    <div className="fir-output-content">
      <h4>AI-Generated Summary</h4>
      <p>{draft.summary}</p>

      <h4>Suggested Legal Sections</h4>
      <ul className="sections-list">
        {draft.suggested_sections.map((section, index) => (
          <li key={index}>
            <strong>{section}</strong>
            <p>{draft.reasoning[index]}</p>
          </li>
        ))}
      </ul>

      <h4>Full Draft (Editable)</h4>
      <textarea 
        className="form-input draft-textarea" 
        defaultValue={draft.generated_fir_draft} 
      />
      
      <div className="output-actions">
        <button className="btn btn-secondary">Save Draft</button>
        <button className="btn btn-primary">Export as PDF</button>
      </div>
    </div>
  );
};

export default DraftFIR;