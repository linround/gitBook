import React from "React/proj/react";
export class MyComponent extends React.Component{
    render() {
        const [value,setValue] = React.useState(9)
        const handleClick = ()=>{
            setValue(value++)
        }
        return (
            <div>
                myComponent
                <div onClick={handleClick}>{value}</div>
            </div>
        )
    }
}