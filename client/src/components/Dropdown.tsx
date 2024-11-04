import { Column } from "@tanstack/react-table";

type DropdownProps = {
    columns: Column<any, unknown>[]
};

export const Dropdown = ({ columns }: DropdownProps) => {
    return (
        <>
            <div
                className="max-h-[120px] w-auto overflow-auto absolute top-[2rem] left-0 sm:left-[unset] sm:right-0 shadow-md bg-white text-nowrap flex flex-col rounded-md">
                {columns.map(x => 
                    <DropdownButton 
                        key={x.id}
                        checked={x.getIsVisible()}
                        callback={x.getToggleVisibilityHandler()}
                        label={x.columnDef.header as string} />)}
            </div>
        </>
    );
};

type DropdownButtonProps = {
    label: string;
    checked: boolean;
    callback: (event: unknown) => void;
};

const DropdownButton = ({ label, checked, callback }: DropdownButtonProps) => {
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="pl-4 pr-2 py-2 hover:bg-slate-200 flex justify-between gap-4 w-full cursor-default">
            <div>
                <input 
                    type="checkbox"
                    checked={checked}
                    onChange={callback}
                />
            </div>
            <div>
                {label}
            </div>
        </div>
    );
};
