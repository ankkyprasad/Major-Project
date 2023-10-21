const MessageCard = ({ type, errorMessage, setErrorMessage }) => {
  const parentClass =
    type === "error"
      ? "bg-red-50 text-red-800 border-red-100"
      : "bg-green-50 text-green-800 border-green-100";

  const buttonClass =
    type === "error"
      ? "bg-red-50 text-red-500 focus:ring-red-400 hover:bg-red-200"
      : "bg-green-50 text-green-500 focus:ring-green-400 hover:bg-green-200";

  const closeButtonClickHandler = () => {
    setErrorMessage("");
  };

  return (
    <>
      <div
        className={`w-full flex items-center p-4 mb-4 rounded-lg border shadow-sm ${parentClass}`}
        role="alert"
      >
        <svg
          className="flex-shrink-0 w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div className="ml-3 text-sm font-medium">{errorMessage}</div>
        <button
          type="button"
          className={`ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 ${buttonClass}`}
          data-dismiss-target="#alert-2"
          aria-label="Close"
          onClick={closeButtonClickHandler}
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default MessageCard;
