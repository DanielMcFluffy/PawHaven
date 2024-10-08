export type RowCardProps = {
  label: string;
  onClick?: () => void;
}

export const RowCard = ({label, onClick}: RowCardProps) => {

  return (
    <button
      onClick={onClick} 
      className="px-4 py-2 rounded-md font-2 bg-[#3D52A0] w-full text-left ">
        {label}
    </button>
  )
}