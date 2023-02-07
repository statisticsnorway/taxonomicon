
const TextContext = ({textContext}) => {
    const renderContext = (textContext) => {
        if(Array.isArray(textContext)) {
            return (<ul>
                {textContext.map((con) => <li>{renderContext(con)}</li>)}
            </ul>)
        }
        else if(typeof textContext === 'object' && textContext !== null) {
             return (<p>{Object.keys(textContext).map((key, index) => {
              return (<> {key} = {renderContext(textContext[key])} {index === Object.keys(textContext).length-1 ? '' : ','} </>)
             })}</p>)
        }
        else {
            return <>{textContext}</>
        }
    }
    return (<div>
        {renderContext(textContext)}
    </div>)
}

export default TextContext