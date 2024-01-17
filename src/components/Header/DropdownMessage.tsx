import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => {
            alert("logout")
        }}
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0] border-stroke hover:text-primary dark:bg-stroke dark:text-white"
        href="#"
      >
        <span
          className={`absolute -top-0.5 -right-0.5 z-1 h-2 w-2 rounded-full bg-meta-1 ${
            notifying === false ? "hidden" : "inline"
          }`}
        >
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
        </span>

        <svg
          className="fill-current duration-300 ease-in-out"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.0625 16.875C9.0625 17.1236 8.96373 17.3621 8.78791 17.5379C8.6121 17.7137 8.37364 17.8125 8.125 17.8125H3.75C3.3356 17.8125 2.93817 17.6479 2.64515 17.3549C2.35212 17.0618 2.1875 16.6644 2.1875 16.25V3.75C2.1875 3.3356 2.35212 2.93817 2.64515 2.64515C2.93817 2.35212 3.3356 2.1875 3.75 2.1875H8.125C8.37364 2.1875 8.6121 2.28627 8.78791 2.46209C8.96373 2.6379 9.0625 2.87636 9.0625 3.125C9.0625 3.37364 8.96373 3.6121 8.78791 3.78791C8.6121 3.96373 8.37364 4.0625 8.125 4.0625H4.0625V15.9375H8.125C8.37364 15.9375 8.6121 16.0363 8.78791 16.2121C8.96373 16.3879 9.0625 16.6264 9.0625 16.875ZM17.5383 9.33672L14.4133 6.21172C14.2372 6.0356 13.9983 5.93665 13.7492 5.93665C13.5001 5.93665 13.2613 6.0356 13.0852 6.21172C12.909 6.38784 12.8101 6.62671 12.8101 6.87578C12.8101 7.12485 12.909 7.36372 13.0852 7.53984L14.6094 9.0625H8.125C7.87636 9.0625 7.6379 9.16127 7.46209 9.33709C7.28627 9.5129 7.1875 9.75136 7.1875 10C7.1875 10.2486 7.28627 10.4871 7.46209 10.6629C7.6379 10.8387 7.87636 10.9375 8.125 10.9375H14.6094L13.0844 12.4617C12.9083 12.6378 12.8093 12.8767 12.8093 13.1258C12.8093 13.3749 12.9083 13.6137 13.0844 13.7898C13.2605 13.966 13.4994 14.0649 13.7484 14.0649C13.9975 14.0649 14.2364 13.966 14.4125 13.7898L17.5375 10.6648C17.625 10.5778 17.6944 10.4743 17.7417 10.3604C17.7891 10.2465 17.8136 10.1243 17.8136 10.0009C17.8137 9.87755 17.7894 9.75537 17.7422 9.64138C17.6949 9.5274 17.6256 9.42387 17.5383 9.33672Z" fill="#6D758F"/>
        </svg>
      </Link>
    </li>
  );
};

export default DropdownMessage;
