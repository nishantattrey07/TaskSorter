import { ChangeEvent, memo } from 'react';


const InputBox = memo(({ placeholder, type = "text", onchange, className, label, value }: { placeholder?: string, type?: string, onchange?: (e: ChangeEvent<HTMLInputElement>) => void, className?: string, label?: string, value?: string }) =>
{ 
    return (
        <div>
            <label className='block mb-2 text-charcol'>{label}</label>
            <input type={type} value={value} className={`rounded w-full ${className}`} placeholder={placeholder} onChange={onchange} />
        </div>
    )
})

InputBox.displayName = "InputBox";

export default InputBox;