import classes from './Card.module.css'

const Card : React.FC<{style : string }> = ( props ) => {
    return <div className={`${classes.card} ${props.style}`}> { props.children } </div>
}

export default Card