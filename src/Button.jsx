export default function Button({ name, state, width }) {
  const buttonStyle =
    state === "fill" ? "bg-[#013946] text-white font-semibold outline-2 outline-[#013946]" : "bg-[#E6ECED] outline-2 outline-[#013946] text-white font-semibold hover:bg-[#436E95]" ;

  return (
    <button className={`mr-4 w-${width} px-6 py-2 ${buttonStyle}`}>
      {name}
    </button>
  );
}

