import React from 'react';

interface optionType {
    value: string,
    label: string
}

const CommonSelect = ({
    placeholder = "" as string,
    className = "" as string,
    name = "" as string,
    value = '' as string,
    onChange = (event: React.ChangeEvent<HTMLSelectElement>): React.ChangeEvent<HTMLSelectElement> => event,
    error = false as boolean,
    message = '' as string,
    disabled = false as boolean,
    label = "" as string,
    required = false as boolean,
    options = [] as optionType[]
}) => {
    return <div className="common-select-container">
        {!!label && <label>{label} {!!required && <span> *</span>}</label>}
        <select name={name} value={value} placeholder={placeholder} onChange={onChange}>
            <option value={''} defaultChecked hidden>-- Select --</option>
            {
                options.length && options.map(({ value, label }) => <option key={value} value={value}>{label}</option>)
            }
        </select>
        {!!error && <span className="error-message">{message}</span>}
    </div>
}

export default CommonSelect;