
import "./index.css"

export default function Button ({text, type, onClick}) {
    const buttonClassName = type === 'transparent' ? 'button-transparent' : 'button';
    return (
            <button className={buttonClassName} onClick={onClick}>{text}</button>
    )
}