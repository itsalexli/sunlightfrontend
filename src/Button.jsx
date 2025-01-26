export default function Button({ name, state, width }) {
  const buttonStyle =
    state === "fill" ? "bg-gray-700 text-white" : "bg-gray-200 text-black";

  return (
    <button className={`mr-4 w-${width} px-4 py-2 ${buttonStyle}`}>
      {name}
    </button>
  );
}
