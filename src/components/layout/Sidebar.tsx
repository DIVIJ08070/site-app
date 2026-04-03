import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const DISLogoSmall: React.FC = () => (
  <img src="/dis-logo.png" alt="DIS Logo" width="36" height="36" />
);

// SVG Icons
const DashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const AuditorsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const QuestionnaireIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const SitesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="10" r="3" />
    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
  </svg>
);

const iconMap: Record<string, React.FC> = {
  dashboard: DashboardIcon,
  auditors: AuditorsIcon,
  questionnaire: QuestionnaireIcon,
  sites: SitesIcon,
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', iconKey: 'dashboard' },
    { label: 'Manage Auditors', path: '/auditors', iconKey: 'auditors' },
    { label: 'Questionnaire', path: '/questionnaire', iconKey: 'questionnaire' },
    { label: 'Manage Sites', path: '/sites', iconKey: 'sites' },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative left-0 top-0 lg:top-0 h-screen w-64 bg-[#005f56] text-white shadow-lg transform transition-transform duration-300 z-40 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo Area */}
        <div className="px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DISLogoSmall />
            <div className="leading-tight flex flex-col">
              <span className="text-[9px] font-medium text-white tracking-widest uppercase">Disability Inclusion</span>
              <span className="text-[17px] font-bold tracking-widest uppercase text-white leading-none mt-[2px]">Solutions</span>
            </div>
          </div>
          <button onClick={onClose} className="text-white hover:opacity-80">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="18" x2="12" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Menu */}
        <nav className="flex flex-col flex-1 mt-6">
          <div className="text-[11px] font-bold text-white uppercase tracking-wider mb-3 px-6">
            SIDEBAR MENU
          </div>
          <div className="flex flex-col">
            {menuItems.map((item) => {
              const Icon = iconMap[item.iconKey];
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3.5 px-6 py-3.5 transition-colors text-[14px] font-medium ${
                    active
                      ? 'bg-[#f4fcf9] text-[#005f56]'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <div className={`flex items-center justify-center ${active ? 'text-[#005f56]' : 'text-white'}`}>
                    <Icon />
                  </div>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
};
