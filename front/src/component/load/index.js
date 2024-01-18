import './index.css';

export const LOAD_STATUS = {
    PROGRESS: 'progress',
    SUCCESS: 'success',
    ERROR: 'error',
};

export function Alert({messaeg, status = 'default'}) {
    return <div className={`alert alert--${status}`}>{messaeg}</div>
}
export function Loader() {
    return <div className='loader'></div>;
}

export function Skeleton() {
    return (
        <div className='skeleton'>
            <div className='skeleton__item'></div>
            <div className='skeleton__item'></div>
            <div className='skeleton__item'></div>
        </div>
    )
}

export default function Component({children, className, style = {}}) {
    return <div style={style} className={`box ${className}`}>
        {children}
        </div>;
}