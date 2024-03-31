import { Boxes, FileKey2, Gauge, Lightbulb, ShieldHalf } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

type SideBarItem = {
  link: string;
  text: string;
  icon?: React.ReactNode;
};

const SideBarItem = ({ link, text, icon }: SideBarItem) => {
  return (
    <li>
      <NavLink
        to={link}
        className={({ isActive, isPending }) =>
          "flex flex-row items-center pl-4 py-2 space-x-2 rounded-l-full hover:bg-gray-100" +
          (isActive ? " bg-gray-100" : "") +
          (isPending ? " bg-gray-50" : "")
        }
      >
        {icon && <span>{icon}</span>}
        <span>{text}</span>
      </NavLink>
    </li>
  );
};

const SideSection = ({ items }: { items: SideBarItem[] }) => (
  <ul className="flex flex-col py-4 gap-y-1">
    {items.map((item, index) => (
      <SideBarItem key={index} {...item} />
    ))}
  </ul>
);

function Sidebar() {
  return (
    <nav className="py-4 pl-4 w-[280px] border-r border-gray-100">
      <div className="flex flex-col flex-1 divide-y divide-gray-200">
        <SideSection
          items={[
            { link: "home", text: "Dashboard", icon: <Gauge size={18} /> },
            { link: "groups", text: "Groups", icon: <Boxes size={18} /> },
          ]}
        />
        <SideSection
          items={[
            { link: "devices", text: "Devices", icon: <Lightbulb size={18} /> },
          ]}
        />
        <SideSection
          items={[
            {
              link: "certificates",
              text: "Certificates",
              icon: <FileKey2 size={18} />,
            },
            {
              link: "policies",
              text: "Policies",
              icon: <ShieldHalf size={18} />,
            },
          ]}
        />
      </div>
    </nav>
  );
}

export default Sidebar;
