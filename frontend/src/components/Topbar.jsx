import React from "react";
import { Search, Bell, User, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Topbar = () => {
    const navigate = useNavigate(); // Initialize the hook

    const handleAlertClick = () => {
        navigate('/alerts'); // Navigate to the /alerts route
    };

    return (
        <div className="topbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="topbar-logo">S</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b' }}>
                    SupplySense AI
                </div>
            </div>
            <div className="topbar-search">
                <Search size={16} />
                <input placeholder="Search suppliers, routes, analytics..." />
            </div>
            <div className="topbar-icons">
                <div
                    className="topbar-icon"
                    style={{ position: 'relative' }}
                    onClick={handleAlertClick} // Add the click handler here
                >
                    <Bell size={20} />
                    <div className="notification-badge"></div>
                </div>
                <div className="topbar-icon">
                    <User size={20} />
                </div>
                <div className="topbar-icon">
                    <Settings size={20} />
                </div>
            </div>
        </div>
    );
};

export default Topbar;
