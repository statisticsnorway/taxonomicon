import React from 'react'
const CodeLineContext = ({textContext}) => {
    const renderContext = (textContext) => {
        if(Array.isArray(textContext)) {
            return (<ul>
                {textContext.map((con, index) => <li key={index}>{renderContext(con)}</li>)}
            </ul>)
        }
        else if(typeof textContext === 'object' && textContext !== null) {
             return (<p>{Object.keys(textContext).map((key, index) => {
                 return (<React.Fragment key={key}> {key} = {renderContext(textContext[key])} {index === Object.keys(textContext).length-1 ? '' : ','} </React.Fragment>)
             })}</p>)
        }
        else {
            return <React.Fragment>{textContext}</React.Fragment>
        }
    }
    return (<div>
        {renderContext(textContext)}
    </div>)
}

export default CodeLineContext