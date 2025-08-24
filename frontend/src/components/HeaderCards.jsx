import React from "react";
import { BarChart3, DollarSign, AlertTriangle, CheckCircle, Truck, Clock, MapPin, Package } from "lucide-react";

const DonutProgress = ({ value = 0, size = 120, stroke = 12, label = "", color = "#667eea" }) => {
  const radius = (size - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (value / 100) * circumference;
  
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          strokeDashoffset={0}
          style={{ transition: 'stroke-dasharray 0.3s ease' }}
        />
      </svg>
      <div style={{ 
        position: 'absolute', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b' }}>{value}%</div>
        {label && <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>{label}</div>}
      </div>
    </div>
  );
};

const Badge = ({ children, tone = "amber", icon }) => {
  const colors = {
    green: { bg: '#dcfce7', text: '#166534', border: '#bbf7d0' },
    amber: { bg: '#fef3c7', text: '#92400e', border: '#fde68a' },
    red: { bg: '#fee2e2', text: '#991b1b', border: '#fecaca' },
    blue: { bg: '#dbeafe', text: '#1e40af', border: '#bfdbfe' },
  };
  
  const color = colors[tone];
  
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      padding: '0.25rem 0.75rem',
      fontSize: '0.75rem',
      fontWeight: '600',
      borderRadius: '9999px',
      backgroundColor: color.bg,
      color: color.text,
      border: `1px solid ${color.border}`,
    }}>
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
};

const Card = ({ title, children, className = "", icon }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      animation: 'fadeIn 0.3s ease-out'
    }} className={className}>
      {title && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          marginBottom: '1rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
        }}>
          {icon && <span style={{ color: '#667eea' }}>{icon}</span>}
          <h3 style={{ 
            margin: 0, 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            color: '#1e293b' 
          }}>{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
};

const HeaderCards = () => {
  // Sample data based on your schema
  const supplierData = {
    user: "68aa3ec4d164d8099df17f77",
    companyName: "TechFlow Electronics Pvt Ltd",
    leadTime: 15, // days
    transportMode: "road",
    cost: {
      amount: 25275,
      currency: "INR"
    },
    route: {
      origin: "Mumbai, Maharashtra",
      destination: "Indore, Madhya Pradesh",
      estimatedDays: 3
    },
    inventory: [
      { product: "Microcontrollers", quantity: 500 },
      { product: "Sensors", quantity: 200 },
      { product: "Resistors", quantity: 1000 }
    ],
    reliability: 86
  };

  // Calculate risk based on reliability
  const riskScore = 100 - supplierData.reliability;
  const riskLevel = riskScore <= 20 ? "Low" : riskScore <= 50 ? "Medium" : "High";
  const riskTone = riskScore <= 20 ? "green" : riskScore <= 50 ? "amber" : "red";
  const riskColor = riskScore <= 20 ? "#10b981" : riskScore <= 50 ? "#f59e0b" : "#ef4444";

  const transportIcons = {
    road: <Truck size={16} />,
    air: "✈️",
    sea: "🚢"
  };

  return (
    <div style={{ 
      padding: '2rem', 
      backgroundColor: '#f8fafc', 
      minHeight: '100vh',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <Card title="Supplier Analysis" icon={<BarChart3 size={20} />}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ 
                fontSize: '1.875rem', 
                fontWeight: '700', 
                color: '#1e293b', 
                margin: '0 0 1rem 0' 
              }}>
                {supplierData.companyName}
              </h1>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <span style={{ fontWeight: '600', color: '#475569', fontSize: '0.875rem' }}>User ID:</span>
                  <div style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '2px' }}>
                    {supplierData.user}
                  </div>
                </div>
                <div>
                  <span style={{ fontWeight: '600', color: '#475569', fontSize: '0.875rem' }}>Lead Time:</span>
                  <div style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '2px' }}>
                    {supplierData.leadTime} days
                  </div>
                </div>
                <div>
                  <span style={{ fontWeight: '600', color: '#475569', fontSize: '0.875rem' }}>Transport Mode:</span>
                  <div style={{ 
                    color: '#64748b', 
                    fontSize: '0.875rem', 
                    marginTop: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    {transportIcons[supplierData.transportMode]}
                    {supplierData.transportMode.charAt(0).toUpperCase() + supplierData.transportMode.slice(1)}
                  </div>
                </div>
                <div>
                  <span style={{ fontWeight: '600', color: '#475569', fontSize: '0.875rem' }}>Reliability Score:</span>
                  <div style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '2px' }}>
                    {supplierData.reliability}/100
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <Badge tone={riskTone} icon={<AlertTriangle size={12} />}>
                  {riskLevel.toUpperCase()} RISK
                </Badge>
              </div>
            </div>
            
            <DonutProgress 
              value={supplierData.reliability} 
              label="Reliability" 
              color={riskColor} 
            />
          </div>
        </Card>

        <Card title="Cost & Delivery" icon={<DollarSign size={20} />}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: '1.5rem' 
          }}>
            <div>
              <div style={{ 
                fontSize: '0.75rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em', 
                color: '#64748b', 
                marginBottom: '0.25rem' 
              }}>
                Total Cost
              </div>
              <div style={{ 
                fontSize: '1.875rem', 
                fontWeight: '700', 
                color: '#1e293b' 
              }}>
                ₹{supplierData.cost.amount.toLocaleString("en-IN")}
              </div>
            </div>
            <DonutProgress value={100 - riskScore} color="#10b981" size={80} />
          </div>
          
          <div style={{ 
            backgroundColor: '#f1f5f9', 
            borderRadius: '0.5rem', 
            padding: '1rem' 
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              marginBottom: '0.5rem' 
            }}>
              <Clock size={16} style={{ color: '#667eea' }} />
              <span style={{ fontWeight: '600', color: '#334155', fontSize: '0.875rem' }}>
                Delivery Timeline
              </span>
            </div>
            <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
              {supplierData.route.estimatedDays} days transit + {supplierData.leadTime} days processing
            </div>
          </div>
        </Card>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '1.5rem' 
      }}>
        <Card title="Route Information" icon={<MapPin size={20} />}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ 
                fontSize: '0.75rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em', 
                color: '#64748b', 
                marginBottom: '0.25rem' 
              }}>
                Origin
              </div>
              <div style={{ fontWeight: '600', color: '#1e293b' }}>
                {supplierData.route.origin}
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              padding: '0.5rem 0'
            }}>
              <div style={{ 
                width: '100%', 
                height: '1px', 
                backgroundColor: '#e2e8f0',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: '#667eea',
                  color: 'white',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px'
                }}>
                  {transportIcons[supplierData.transportMode]}
                </div>
              </div>
            </div>
            
            <div>
              <div style={{ 
                fontSize: '0.75rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em', 
                color: '#64748b', 
                marginBottom: '0.25rem' 
              }}>
                Destination
              </div>
              <div style={{ fontWeight: '600', color: '#1e293b' }}>
                {supplierData.route.destination}
              </div>
            </div>
          </div>
        </Card>

        <Card title="Inventory Overview" icon={<Package size={20} />}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {supplierData.inventory.slice(0, 3).map((item, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '0.75rem',
                backgroundColor: '#f8fafc',
                borderRadius: '0.5rem'
              }}>
                <span style={{ fontWeight: '600', color: '#334155' }}>
                  {item.product}
                </span>
                <span style={{ 
                  fontSize: '0.875rem', 
                  color: '#64748b',
                  backgroundColor: '#e2e8f0',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem'
                }}>
                  {item.quantity.toLocaleString()} units
                </span>
              </div>
            ))}
            
            <div style={{ 
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: '#ecfdf5',
              borderRadius: '0.5rem',
              border: '1px solid #bbf7d0'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem' 
              }}>
                <CheckCircle size={16} style={{ color: '#10b981' }} />
                <span style={{ fontWeight: '600', color: '#065f46', fontSize: '0.875rem' }}>
                  Stock Status
                </span>
              </div>
              <div style={{ color: '#047857', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                All items available with {supplierData.reliability}% reliability score
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HeaderCards;