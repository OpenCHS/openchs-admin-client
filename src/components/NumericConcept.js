import React from 'react';

const NumericConcept = ({concept}) =>
  <div className="form-row">
    <div className="form-group col-md-2">
      <label htmlFor="lowAbsolute">Low Absolute</label>
      <input type="text" className="form-control" id="lowAbsolute"
        value={concept.lowAbsolute} />
    </div>
    <div className="form-group col-md-2">
      <label htmlFor="highAbsolute">High Absolute</label>
      <input type="text" className="form-control" id="highAbsolute"
        value={concept.highAbsolute} />
    </div>
    <div className="form-group col-md-2">
      <label htmlFor="lowNormal">Low Normal</label>
      <input type="text" className="form-control" id="lowNormal"
        value={concept.lowNormal} />
    </div>
    <div className="form-group col-md-2">
      <label htmlFor="highNormal">High Normal</label>
      <input type="text" className="form-control" id="highNormal"
        value={concept.highNormal} />
    </div>
    <div className="form-group col-md-4">
      <label htmlFor="unit">Unit</label>
      <select id="unit" className="form-control"
        value={concept.unit}>
        <option defaultValue="">Choose...</option>
        <option>cm</option>
        <option>kg</option>
        <option>mm Hg</option>
        <option>g/dL</option>
        <option>beats/minute</option>
        <option>breaths/minute</option>
        <option>&#8451;</option>
        <option>&#8457;</option>
      </select>
    </div>
  </div>


export default NumericConcept;