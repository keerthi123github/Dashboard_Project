import React from "react";

const FilterBar = ({ onFilterChange }) => {
  const handleChange = (e) => {
    onFilterChange({ [e.target.name]: e.target.value });
  };

  return (
    <div className="filter-bar">
      <label>
        End Year:
        <input type="number" name="end_year" onChange={handleChange} />
      </label>
      <label>
        Topics:
        <input type="text" name="topics" onChange={handleChange} />
      </label>
      <label>
        Sector:
        <input type="text" name="sector" onChange={handleChange} />
      </label>
      <label>
        Region:
        <input type="text" name="region" onChange={handleChange} />
      </label>
      <label>
        PEST:
        <input type="text" name="pest" onChange={handleChange} />
      </label>
      <label>
        Source:
        <input type="text" name="source" onChange={handleChange} />
      </label>
      <label>
        SWOT:
        <input type="text" name="swot" onChange={handleChange} />
      </label>
      <label>
        Country:
        <input type="text" name="country" onChange={handleChange} />
      </label>
      <label>
        City:
        <input type="text" name="city" onChange={handleChange} />
      </label>
    </div>
  );
};

export default FilterBar;
