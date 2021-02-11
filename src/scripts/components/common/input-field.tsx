import React from "react";

interface Props {
    id: string;
    label: string;
    value: string;
    error?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField(props: Props) {
    const inputClassName = props.error ? "form-control is-invalid" : "form-control";
    return (
        <div className="row mb-3">
            <label htmlFor={props.id} className="col-sm-4 col-form-label">
                {props.label}
            </label>
            <div className="col-sm-3">
                <input type="text" className={inputClassName} id={props.id} onChange={props.onChange} value={props.value}/>
                <Error error={props.error}/>
            </div>
        </div>
    );
}

function Error(props: {error: string | undefined}) {
    if (!props.error) {
        return null;
    }
    return <div className="invalid-feedback">{props.error}</div>
}