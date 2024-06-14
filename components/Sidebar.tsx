type SidebarProps = {
  children: React.ReactNode | React.ReactNode[];
  bottom: React.ReactNode;
};

export default function Sidebar(props: SidebarProps) {
  return (
    <div className="sidebar">
      <nav className="sidebar__nav">{props.children}</nav>
      <div className="sidebar__title">{props.bottom}</div>
    </div>
  );
}
