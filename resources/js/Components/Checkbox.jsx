export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-[#2A2F36] bg-[#1E242D] text-[#3B82F6] shadow-sm transition-all duration-200 focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#161B22] hover:border-[#3A414B] ' +
                className
            }
            style={{
                backgroundColor: props.checked ? '#3B82F6' : '#1E242D',
                borderColor: props.checked ? '#3B82F6' : '#2A2F36',
            }}
        />
    );
}