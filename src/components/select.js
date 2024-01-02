import React from 'react'

export default function select({data,onSelect,selectOption}) {
  return (
    <div>
      <select onChange={(e) => onSelect(e.target.value)}>
          <option value="">{selectOption}</option>
          {data.map((data) => (
            <option key={data.id} value={data.id}>
            {data.name} / {data.name_km}
            </option>
          ))}
      </select>
    </div>
  )
}
