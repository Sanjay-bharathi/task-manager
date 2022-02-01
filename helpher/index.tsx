interface inputWithError { value: string, error: boolean, message: string }

export const destructureInputState = (state: inputWithError) => ({ value: state.value, error: state.error, message: state.message })

export const RequiredValidation = ({ value = '', error = false, message = '' }, setState: React.Dispatch<React.SetStateAction<inputWithError>>) => {
    if (!value || (!!value && value.trim() === '')) { !error && setState(prev => ({ ...prev, error: true, message: 'This field is required' })); return false; }
    else { !!error && setState(prev => ({ ...prev, error: false, message: '' })); return true; }
};

export const CheckValidations = (log: boolean[]) => { if (!!log && !!log.length) return !log.some(d => d === false); else return false; }
