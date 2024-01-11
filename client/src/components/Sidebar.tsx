import React, { useState, useEffect } from 'react';

const Sidebar = () => {
  //Making the design reposnsive by adding custom styles
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  const sidebarStyle: React.CSSProperties = {
    width: '240px',
    backgroundColor: '#202123',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '25px',
    cursor: 'pointer',
  };

  const fixedSidebarStyle: React.CSSProperties = {
    ...sidebarStyle,
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '60px',
    zIndex: 1000, // Ensure it is above other elements
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <aside style={isSmallScreen ? fixedSidebarStyle : sidebarStyle}>
      ChatterBotX
    </aside>
  );
};

export default Sidebar;
