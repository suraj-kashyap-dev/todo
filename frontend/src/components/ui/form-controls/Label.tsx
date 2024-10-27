interface LabelProps {
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({
  htmlFor,
  className,
  children,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm mb-2 font-medium text-gray-700 ${className}`}
    >
      {children}
    </label>
  );
};
