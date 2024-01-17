import { useState, useEffect } from 'react';

const Additional: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            setToken(storedToken);
            console.log(storedToken);
        }
    }, []);

  return (
    <div className={"flex justify-center items-center bg-whiter text-graydark py-1.5 px-2"}>
      <span className={"text-sm pr-2"}>Борлуулалт</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M14.8312 8.555L12.165 12.555C12.0737 12.6919 11.9499 12.8041 11.8048 12.8818C11.6597 12.9594 11.4977 13 11.3331 13H1.49999C1.40877 13 1.31929 12.975 1.24124 12.9278C1.16318 12.8806 1.09953 12.813 1.05717 12.7322C1.01482 12.6514 0.995367 12.5605 1.00093 12.4695C1.0065 12.3784 1.03686 12.2907 1.08874 12.2156L3.99999 8L1.08874 3.78437C1.03686 3.70935 1.0065 3.62155 1.00093 3.5305C0.995367 3.43945 1.01482 3.34861 1.05717 3.26783C1.09953 3.18704 1.16318 3.11937 1.24124 3.07217C1.31929 3.02496 1.40877 3 1.49999 3H11.3331C11.4977 3 11.6597 3.04061 11.8048 3.11823C11.9499 3.19586 12.0737 3.3081 12.165 3.445L14.8312 7.445C14.9409 7.60933 14.9994 7.80245 14.9994 8C14.9994 8.19755 14.9409 8.39067 14.8312 8.555Z" fill="#6D758F"/>
      </svg>
    </div>
  );
};

export default Additional;
