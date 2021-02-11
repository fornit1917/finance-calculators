import React from "react";

interface Props {
    id: string;
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField(props: Props) {
    return (
        <div className="row mb-3">
            <label htmlFor={props.id} className="col-sm-4 col-form-label">
                {props.label}
            </label>
            <div className="col-sm-3">
                <input type="text" className="form-control" id={props.id} onChange={props.onChange}/>
            </div>
        </div>
    );
}
