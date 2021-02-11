import React from "react";

interface Props {
    id: string;
    label: string;
    value: string;
    options: Array<{ value: string, text: string }>
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function DropdownField(props: Props) {
    return (
        <div className="row mb-3">
            <label htmlFor={props.id} className="col-sm-4 col-form-label">
                {props.label}
            </label>
            <div className="col-sm-5">
                <select className="form-select" onChange={props.onChange}>
                    {props.options.map(x => <option key={x.value} value={x.value}>{x.text}</option>)}
                </select>
            </div>
        </div>
    );
}
