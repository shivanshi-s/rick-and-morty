// eslint-disable-next-line react/prop-types
const Input = ({type, placeholder, changeHandler}) => {
    return <input type={type}  placeholder={placeholder} onChange={changeHandler}   />
}

export default Input;