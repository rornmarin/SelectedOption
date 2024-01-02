import React from 'react'

export default function select({data,onSelect,selectOption}) {
  return (
    <div>
      <select onChange={(e) => onSelect(e.target.value)}>
          <option value="">{selectOption}</option>
          {data.map((data) => (
            <option key={data.id} value={data.id}>
            {data.name.latin} / {data.name.km}
            </option>
          ))}
      </select>
    </div>
  )
}

