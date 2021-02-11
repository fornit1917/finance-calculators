import React from "react";

interface Props {
    id: string;
    label: string;
    value: string;
    options: Array<{ value: string; text: string }>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadoibuttonsField(props: Props) {
    return (
        <div className="row mb-3">
            <label htmlFor={props.id} className="col-sm-4 col-form-label">
                {props.label}
            </label>
            <div className="col-sm-3">
                {props.options.map((x) => {
                    const optionId = props.id + "_" + x.value; 
                    return (
                        <div className="form-check" key={x.value}>
                            <input
                                className="form-check-input"
                                type="radio"
                                name={props.id}
                                id={optionId}
                                checked={props.value === x.value}
                                onChange={props.onChange}
                                data-value={x.value}
                            />
                            <label className="form-check-label" htmlFor={optionId}>
                                {x.text}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
