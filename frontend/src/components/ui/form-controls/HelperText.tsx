interface HelperTextProps {
  helperText?: string;
}

export const HelperText: React.FC<HelperTextProps> = ({ helperText }) => {
  if (!helperText) return null;
  return <p className="text-sm text-gray-500">{helperText}</p>;
};
