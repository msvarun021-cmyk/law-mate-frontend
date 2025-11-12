import React from 'react';

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

export default FIROutput;