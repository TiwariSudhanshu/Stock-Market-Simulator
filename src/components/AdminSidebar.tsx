"use client";
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Menu, X, Shield, LayoutDashboard, Building2, Users, BarChart2,
  Settings, HelpCircle, LogOut, Edit
} from 'lucide-react';

type SidebarProps = {
  adminName?: string;
  adminAvatar?: string;
};

export default function AdminSidebar({
  adminName = "Admin User",
  adminAvatar = "/api/placeholder/32/32"
}: SidebarProps) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
    const pathname = usePathname();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkIfMobile = () => {
        setIsMobileView(window.innerWidth < 1024);
      };
      checkIfMobile();
      window.addEventListener('resize', checkIfMobile);
      return () => window.removeEventListener('resize', checkIfMobile);
    }
  }, []);

  useEffect(() => {
    if (isMobileView) {
      setIsSidebarOpen(false);
    }
  }, [pathname, isMobileView]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

const adminNavigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Manage Users', href: '/admin/users', icon: Users },
  { name: 'Manage Companies', href: '/admin/companies', icon: BarChart2 },
  { name: 'Edit Company Details', href: '/admin/edit', icon: Edit },
  { name: 'Rounds', href: '/admin/rounds', icon: Building2 },
];



  return (
    <>
      {/* Mobile toggle */}
      <div className="fixed top-0 left-0 z-50 lg:hidden">
        <button
          type="button"
          className="p-3 m-2 text-gray-600 rounded-md hover:bg-gray-100"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>
      </div>

      {isSidebarOpen && isMobileView && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-white border-r pt-5 pb-4 transition-transform duration-300 ${
          isSidebarOpen || !isMobileView ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:h-screen`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 mb-6">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">Admin Panel</span>
          </div>
          {isMobileView && (
            <button
              className="text-gray-500 hover:text-gray-600"
              onClick={toggleSidebar}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Admin Profile */}
        <div className="flex items-center px-4 mb-6">
          <img
            className="h-8 w-8 rounded-full bg-gray-200"
            src={adminAvatar}
            alt="Admin avatar"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{adminName}</p>
            <p className="text-xs font-medium text-gray-500">Administrator</p>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
          {adminNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-3 py-2 text-sm font-medium rounded-md`}
              >
                <item.icon
                  className={`${
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 h-5 w-5`}
                />
                {item.name}
              </Link>
            );
          })}

          {/* Support & Settings */}
          <div className="mt-6">
            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Other
            </h3>
         
          </div>
        </nav>

        {/* Logout */}
        <div className="mt-6 px-2">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
