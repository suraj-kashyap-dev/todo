import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  Children,
  isValidElement,
  cloneElement,
  MouseEvent as ReactMouseEvent,
} from 'react';

interface DropdownProps {
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  children: [
    React.ReactElement<DropdownToggleProps>,
    React.ReactElement<DropdownContentProps>,
  ]; // Expecting Toggle and Content as children
}

interface DropdownToggleProps {
  children: ReactNode;
  onClick?: () => void;
}

interface DropdownContentProps {
  children: ReactNode;
}

const DropdownToggle = React.forwardRef<HTMLDivElement, DropdownToggleProps>(
  ({ children, onClick }, ref) => (
    <div ref={ref} onClick={onClick} className="cursor-pointer">
      {children}
    </div>
  ),
);

const DropdownContent: React.FC<DropdownContentProps> = ({ children }) => (
  <>{children}</>
);

const Dropdown: React.FC<DropdownProps> & {
  Toggle: typeof DropdownToggle;
  Content: typeof DropdownContent;
} = ({ position = 'bottom-right', children }) => {
  const [isActive, setIsActive] = useState(false);
  const toggleBlockRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (toggleBlockRef.current) {
        setDimensions({
          width: toggleBlockRef.current.offsetWidth,
          height: toggleBlockRef.current.offsetHeight,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive]);

  const toggleDropdown = (e: ReactMouseEvent) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };

  const closeDropdown = () => {
    setIsActive(false);
  };

  const getPositionStyles = (): React.CSSProperties => {
    const baseStyles = {
      minWidth: `${dimensions.width}px`,
      position: 'absolute' as const,
      zIndex: 20,
    };

    switch (position) {
      case 'bottom-left':
        return {
          ...baseStyles,
          top: `${dimensions.height}px`,
          left: 0,
        };
      case 'bottom-right':
        return {
          ...baseStyles,
          top: `${dimensions.height}px`,
          right: 0,
        };
      case 'top-left':
        return {
          ...baseStyles,
          bottom: `${dimensions.height}px`,
          left: 0,
        };
      case 'top-right':
        return {
          ...baseStyles,
          bottom: `${dimensions.height}px`,
          right: 0,
        };
      default:
        return baseStyles;
    }
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          if (child.type === DropdownToggle) {
            return cloneElement(child, {
              ref: toggleBlockRef,
              onClick: toggleDropdown,
            });
          }

          if (child.type === DropdownContent) {
            return (
              isActive && (
                <div
                  className="absolute transform overflow-hidden rounded-sm bg-white shadow-[0px_10px_84px_rgba(0,0,0,0.1)] transition-all duration-200 ease-out"
                  style={getPositionStyles()}
                >
                  {Children.map(child.props.children, (item) => {
                    if (isValidElement(item)) {
                      return cloneElement(item, {
                        onClick: () => {
                          item.props.onClick?.();
                          closeDropdown();
                        },
                      });
                    }
                    return item;
                  })}
                </div>
              )
            );
          }
        }
        return null;
      })}
    </div>
  );
};

Dropdown.Toggle = DropdownToggle;
Dropdown.Content = DropdownContent;

export default Dropdown;
