import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
          <div className="flex h-screen bg-gray-100 overflow-hidden">
            {/* Sidebar */}
                <Sidebar isOpen={sidebarOpen} />
          
            {/* Main content */}
                <div className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
                  {/* Header */}
                        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                
                  {/* Page content */}
                        <main className="flex-1 overflow-y-auto p-6">
                                  <Outlet />
                        </main>main>
                </div>div>
          </div>div>
        );
};

export default Layout;</div>
