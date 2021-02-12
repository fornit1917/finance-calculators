import React, { ReactElement } from "react";

interface Props {
    id: string;
    label: string;
    additionalText?: string;
    value: string;
    error?: string;
    renderAdditionalControl?: () => ReactElement;
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
                <div className="input-group">
                    <input
                        type="text"
                        className={inputClassName}
                        id={props.id}
                        onChange={props.onChange}
                        value={props.value}
                    />
                    {props.additionalText ? (
                        <span className="field-additional-text">{props.additionalText}</span>
                    ) : null}
                    {props.error ? <div className="invalid-feedback">{props.error}</div> : null}
                </div>
            </div>
            {props.renderAdditionalControl ? <div className="col-sm-2">{props.renderAdditionalControl()}</div> : null}
        </div>
    );
}
