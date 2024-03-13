// eslint-disable-next-line react/prop-types
const Button = ({buttonLabel , clickHandler}) => {
    return <button onClick={clickHandler}>{buttonLabel}</button>
}

export default Button;