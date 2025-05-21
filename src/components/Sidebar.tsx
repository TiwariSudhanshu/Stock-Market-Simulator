"use client";
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Menu,
  X,
  Leaf,
  LayoutDashboard,
  BarChart2,
  BookOpen,
  TrendingUp,
  Trophy,
  LogOut,
  Settings,
  Users,
  HelpCircle
} from 'lucide-react';

type SidebarProps = {
  userName?: string;
  userAvatar?: string;
};
  // const user = JSON.parse(localStorage.getItem('user') || '{}');


export default function Sidebar({ userName = "hey", userAvatar = "https://i.pinimg.com/736x/59/af/9c/59af9cd100daf9aa154cc753dd58316d.jpg" }: SidebarProps) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
    const pathname = usePathname();


    useEffect(()=>{
      if(localStorage.getItem('user') === null){
        router.push('/login');
      }
    },[])

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window !== 'undefined') {
      const checkIfMobile = () => {
        setIsMobileView(window.innerWidth < 1024);
      };
      
      // Initial check
      checkIfMobile();
      
      // Add event listener for window resize
      window.addEventListener('resize', checkIfMobile);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', checkIfMobile);
      };
    }
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobileView) {
      setIsSidebarOpen(false);
    }
  }, [pathname, isMobileView]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: LayoutDashboard, 
      current: pathname === '/dashboard' 
    },

    { 
      name: 'Trade', 
      href: '/trade', 
      icon: TrendingUp, 
      current: pathname === '/trade' 
    },
    { 
      name: 'Companies', 
      href: '/companies', 
      icon: BookOpen, 
      current: pathname === '/companies' 
    },
    // { 
    //   name: 'Leaderboard', 
    //   href: '/leaderboard', 
    //   icon: Trophy, 
    //   current: pathname === '/leaderboard' 
    // },
  ];



  return (
    <>
      {/* Mobile hamburger button */}
      <div className="fixed top-0 left-0 z-50 lg:hidden">
        <button
          type="button"
          className="p-3 m-2 text-gray-600 rounded-md hover:bg-gray-100 focus:outline-none"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Mobile overlay */}
      {isSidebarOpen && isMobileView && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-white border-r border-gray-200 pt-5 pb-4 transform transition-transform ease-in-out duration-300 ${
          isSidebarOpen || !isMobileView ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:h-screen`}
      >
        {/* Header and close button for mobile */}
        <div className="flex items-center justify-between px-4 mb-6">
          <div className="flex items-center">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">Imprenditore</span>
          </div>
          {isMobileView && (
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              onClick={toggleSidebar}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>
        
        {/* User profile */}
        <div className="flex items-center px-4 mb-6">
          <img 
            className="h-8 w-8 rounded-full bg-gray-200"
            src={userAvatar}
            alt="User avatar"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            <p className="text-xs font-medium text-gray-500">Active Trader</p>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 space-y-1">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    item.current 
                      ? 'bg-green-50 text-green-700 border-l-4 border-green-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors`}
                  aria-current={item.current ? 'page' : undefined}
                >
                  <item.icon 
                    className={`${
                      item.current ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 flex-shrink-0 h-5 w-5 transition-colors`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

      
        </div>
        
        {/* Logout */}
        <div className="mt-6 px-2">
          <button
            type="button"
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
            onClick={() => router.push('/logout')}
          >
            <LogOut
              className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}