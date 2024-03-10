import React from "react";

interface NavItemProps {
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ label }) => {
  return (
    <div className="text-white transition hover:text-gray-300 cursor-pointer">
      {label}
    </div>
  );
};

export default NavItem;
