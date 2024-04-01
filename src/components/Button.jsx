// eslint-disable-next-line react/prop-types
const Button = ({buttonLabel , clickHandler, classes, disabled }) => {
    return <button disabled={disabled} className={`${classes}`} onClick={clickHandler}>{buttonLabel}</button>
}

export default Button;