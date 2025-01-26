import Logo from "./assets/sunlife_logo.jpg";
import Menu from "./assets/menu.png";

export default function Header() {
  return (
    <>
      <div className="p-0 m-0 bg-[#F0B627] h-6 w-full"></div>

      <img src={Logo} className="w-50 ml-10 inline-flex" alt="Sunlife Logo" />
      <img src={Menu} className=" ml-260 w-100  inline-flex" alt="Menu Icon" />
    </>
  );
}
