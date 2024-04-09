export const ToggleButton = ({ label, isActive, onClick, testId }) => (
  <button
    data-testid={testId}
    className={`text-sm font-bold w-max px-4 py-1 rounded focus:outline-none relative hover:bg-bright-blue hover:text-white ${
      isActive && "bg-pale-blue text-indigo"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);
