export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-sm font-semibold tracking-wide transition-colors duration-300 ease-in-out ` +
                className
            }
            style={{ color: '#E6EDF3' }}
        >
            {value ? value : children}
        </label>
    );
}