import React from 'react';


const CommonInput = ({
    type = "text" as string,
    placeholder = "" as string,
    className = "" as string,
    name = "" as string,
    value = '' as string,
    onChange = (event: React.ChangeEvent<HTMLInputElement>): React.ChangeEvent<HTMLInputElement> => event,
    error = false as boolean,
    message = '' as string,
    disabled = false as boolean,
    label = "" as string,
    required = false as boolean,
}) => {
    return <div className="common-input-container">
        {!!label && <label>{label} {!!required && <span> *</span>}</label>}
        <input value={value} onChange={onChange} name={name} placeholder={placeholder} />
        {!!error && <span className="error-message">{message}</span>}
    </div>
}

export default CommonInput;