
export function Button  ({ label, onClick,classname }: { label?: string; onClick?: () => void,classname?:string }) {

    return (

        <button onClick={onClick} className={`bg-charcol text-white ${classname} `}>

            {label || "Button"}

        </button>

    );

};
