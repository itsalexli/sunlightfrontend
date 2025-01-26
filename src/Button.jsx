export default function Button({ name, state, width, onClick, content }) {
  const isActive = state === name.toLowerCase();
  const buttonStyle = isActive
    ? "bg-[#013946] text-white font-bold"
    : "bg-[#E6ECED] text-[#013946] font-bold";

  return (
    <button
      onClick={onClick}
      className={`mr-4 w-${width || "auto"} px-6 py-3 ${buttonStyle} rounded`}
    >
      {content}
    </button>
  );
}
