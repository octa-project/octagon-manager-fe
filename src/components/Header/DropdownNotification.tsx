import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

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
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
        }}
        href="#"
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0] border-stroke hover:text-primary dark:bg-meta-4 dark:text-white"
      >
        <span
          className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
            notifying === false ? 'hidden' : 'inline'
          }`}
        >
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
        </span>

        <svg
          className="fill-current duration-300 ease-in-out"
          width="20"
          height="20"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.6007 12.9633C16.9226 11.7969 16.5624 10.1227 16.5624 8.125C16.5624 6.38452 15.871 4.71532 14.6403 3.48461C13.4096 2.2539 11.7404 1.5625 9.9999 1.5625C8.25942 1.5625 6.59022 2.2539 5.35951 3.48461C4.1288 4.71532 3.4374 6.38452 3.4374 8.125C3.4374 10.1234 3.07881 11.7969 2.40068 12.9633C2.26231 13.2012 2.18896 13.4713 2.188 13.7465C2.18704 14.0218 2.2585 14.2924 2.39521 14.5312C2.53106 14.7702 2.72823 14.9687 2.96637 15.106C3.20452 15.2433 3.475 15.3146 3.7499 15.3125H6.57646C6.65398 16.1669 7.04819 16.9614 7.68164 17.54C8.31509 18.1186 9.14199 18.4394 9.9999 18.4394C10.8578 18.4394 11.6847 18.1186 12.3182 17.54C12.9516 16.9614 13.3458 16.1669 13.4233 15.3125H16.2499C16.5244 15.3142 16.7944 15.2427 17.0321 15.1054C17.2698 14.9681 17.4666 14.7699 17.6022 14.5312C17.7395 14.2927 17.8117 14.0223 17.8114 13.7471C17.8111 13.4718 17.7385 13.2015 17.6007 12.9633ZM9.9999 16.5625C9.6397 16.5626 9.29053 16.4382 9.01149 16.2104C8.73246 15.9826 8.54069 15.6654 8.46865 15.3125H11.5312C11.4591 15.6654 11.2673 15.9826 10.9883 16.2104C10.7093 16.4382 10.3601 16.5626 9.9999 16.5625ZM4.27021 13.4375C4.96162 12.0312 5.3124 10.2453 5.3124 8.125C5.3124 6.8818 5.80626 5.68951 6.68534 4.81044C7.56441 3.93136 8.7567 3.4375 9.9999 3.4375C11.2431 3.4375 12.4354 3.93136 13.3145 4.81044C14.1935 5.68951 14.6874 6.8818 14.6874 8.125C14.6874 10.2445 15.0374 12.0312 15.7288 13.4375H4.27021Z" fill="#6D758F"/>
        </svg>
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">Notification</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          <li>
            <Link
              className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="#"
            >
              <p className="text-sm">
                <span className="text-black dark:text-white">
                  Edit your information in a swipe
                </span>{' '}
                Sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim.
              </p>

              <p className="text-xs">12 May, 2025</p>
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default DropdownNotification;
