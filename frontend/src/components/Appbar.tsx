import { memo } from "react";
const AppBar = memo(({ name, nameFirstLetter, onClick }: {name?:string,nameFirstLetter?:string,onClick?: () => void})=> {
    return (
        
            <div className="shadow-md flex flex-row justify-between sticky top-0 border-b p-2 min-w-[300px] gap-3 bg-primary text-white">
                <div>
                    <h1 className="font-semibold text-xl mx-2">TaskSorter</h1>
                </div>

                <div className="flex  items-center gap-2 mx-2">
                <h1 className="font-medium text-lg">{name}</h1>
                <button className=" bg-charcol rounded-full px-4 py-2 font-bold" onClick={onClick}>{nameFirstLetter}</button>
                </div>
        </div>
        
    )
})
AppBar.displayName = "AppBar";

export default AppBar;