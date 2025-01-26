export default function Button({ name, state, width }) {
  const buttonStyle =
    state === "fill" ? "bg-[#013946] text-white font-bold" : "bg-[#E6ECED] outline-2 outline-[#013946] text-white font-bold" ;

  return (
    <button className={`mr-4 w-${width} px-6 py-3 ${buttonStyle}`}>
      {name}
    </button>
  );
}

