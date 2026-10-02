'use client';
import React, { useState } from 'react';
import { useLang } from "@/context/LangContext";
import StatCard from "@/components/dashboard/StatCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSliders, faStore, faShieldHalved, faCreditCard, 
  faBell, faGlobe, faFloppyDisk, faCheck, faKey, faLock
} from '@fortawesome/free-solid-svg-icons';

export default function SettingsPage() {
  const { translate } = useLang();
  const [activeTab, setActiveTab] = useState<'general' | 'ecommerce' | 'security' | 'integrations'>('general');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Settings State
  const [generalSettings, setGeneralSettings] = useState({
    storeName: 'Brand Commerce Inc.',
    supportEmail: 'support@brand-mongo.com',
    defaultCurrency: 'USD',
    timezone: 'UTC+03:00 (Riyadh/Cairo)',
    defaultLanguage: 'en'
  });

  const [ecommerceSettings, setEcommerceSettings] = useState({
    guestCheckout: true,
    autoArchiveOrders: true,
    lowStockThreshold: 5,
    enableTaxCalculation: true,
    taxPercentage: 15
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeoutMinutes: 60,
    enforceStrongPasswords: true,
    maxLoginAttempts: 5
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    stripeKey: 'pk_live_51Nw28xALkdIwHu7ix91z4wLA****************',
    stripeWebhookSecret: 'whsec_9918237461908234****************',
    cloudinaryCloudName: 'brand-cloudinary-prod',
    enableLiveStripePayments: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="dashboard-page" style={{ paddingBottom: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1e293b', margin: '0 0 6px 0' }}>
            Store & System Configuration
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
            Fine-tune store telemetry, payment gateways, checkout parameters, and auth policies.
          </p>
        </div>

        {savedSuccess && (
          <div style={{ background: '#e6f7eb', color: '#00b517', padding: '10px 16px', borderRadius: '8px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #bbf7d0' }}>
            <FontAwesomeIcon icon={faCheck} /> Changes Saved Successfully
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #e2e8f0', marginBottom: '28px', overflowX: 'auto', paddingBottom: '2px' }}>
        {[
          { key: 'general', label: 'General Info', icon: faStore },
          { key: 'ecommerce', label: 'E-Commerce & Checkout', icon: faSliders },
          { key: 'security', label: 'Security & Access', icon: faShieldHalved },
          { key: 'integrations', label: 'API & Gateways', icon: faCreditCard },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.key ? '3px solid #0D6EFD' : '3px solid transparent',
              padding: '12px 18px',
              color: activeTab === tab.key ? '#0D6EFD' : '#64748b',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap'
            }}
          >
            <FontAwesomeIcon icon={tab.icon} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <form onSubmit={handleSave} style={{ maxWidth: '900px' }}>
        {activeTab === 'general' && (
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: 0 }}>General Store Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Store Brand Name</label>
                <input type="text" value={generalSettings.storeName} onChange={(e) => setGeneralSettings({ ...generalSettings, storeName: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Customer Support Email</label>
                <input type="email" value={generalSettings.supportEmail} onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Base Currency</label>
                <select value={generalSettings.defaultCurrency} onChange={(e) => setGeneralSettings({ ...generalSettings, defaultCurrency: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="SAR">SAR (ر.س)</option>
                  <option value="AED">AED (د.إ)</option>
                  <option value="EGP">EGP (ج.م)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Store Timezone</label>
                <input type="text" value={generalSettings.timezone} onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ecommerce' && (
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: 0 }}>E-Commerce Checkout & Inventory</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155', cursor: 'pointer' }}>
                <input type="checkbox" checked={ecommerceSettings.guestCheckout} onChange={(e) => setEcommerceSettings({ ...ecommerceSettings, guestCheckout: e.target.checked })} style={{ width: '18px', height: '18px', accentColor: '#0D6EFD' }} />
                Enable Guest Checkout (Allow buyers to purchase without registering)
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155', cursor: 'pointer' }}>
                <input type="checkbox" checked={ecommerceSettings.autoArchiveOrders} onChange={(e) => setEcommerceSettings({ ...ecommerceSettings, autoArchiveOrders: e.target.checked })} style={{ width: '18px', height: '18px', accentColor: '#0D6EFD' }} />
                Automatically archive completed orders after 30 days
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155', cursor: 'pointer' }}>
                <input type="checkbox" checked={ecommerceSettings.enableTaxCalculation} onChange={(e) => setEcommerceSettings({ ...ecommerceSettings, enableTaxCalculation: e.target.checked })} style={{ width: '18px', height: '18px', accentColor: '#0D6EFD' }} />
                Enable Automated VAT / Sales Tax Calculation (15%)
              </label>
            </div>

            <div style={{ maxWidth: '300px', marginTop: '10px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Low Stock Alert Threshold</label>
              <input type="number" value={ecommerceSettings.lowStockThreshold} onChange={(e) => setEcommerceSettings({ ...ecommerceSettings, lowStockThreshold: Number(e.target.value) })} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Administrative Security & Sessions</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155', cursor: 'pointer' }}>
                <input type="checkbox" checked={securitySettings.twoFactorAuth} onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })} style={{ width: '18px', height: '18px', accentColor: '#0D6EFD' }} />
                Enforce 2-Factor Authentication (2FA) for all Administrator Accounts
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155', cursor: 'pointer' }}>
                <input type="checkbox" checked={securitySettings.enforceStrongPasswords} onChange={(e) => setSecuritySettings({ ...securitySettings, enforceStrongPasswords: e.target.checked })} style={{ width: '18px', height: '18px', accentColor: '#0D6EFD' }} />
                Enforce Strong Passwords (Minimum 8 chars, symbols & numbers)
              </label>
            </div>

            <div style={{ maxWidth: '300px', marginTop: '10px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Session Inactivity Timeout (Minutes)</label>
              <input type="number" value={securitySettings.sessionTimeoutMinutes} onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeoutMinutes: Number(e.target.value) })} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Payment Gateways & Cloud Storage</h3>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Stripe Publishable Key</label>
              <input type="text" value={integrationSettings.stripeKey} onChange={(e) => setIntegrationSettings({ ...integrationSettings, stripeKey: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontFamily: 'monospace' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Stripe Webhook Secret</label>
              <input type="password" value={integrationSettings.stripeWebhookSecret} onChange={(e) => setIntegrationSettings({ ...integrationSettings, stripeWebhookSecret: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontFamily: 'monospace' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Cloudinary Cloud Name</label>
              <input type="text" value={integrationSettings.cloudinaryCloudName} onChange={(e) => setIntegrationSettings({ ...integrationSettings, cloudinaryCloudName: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
        )}

        <div style={{ marginTop: '24px' }}>
          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #0D6EFD 0%, #0052cc 100%)',
              color: '#fff',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '15px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(13, 110, 253, 0.25)'
            }}
          >
            <FontAwesomeIcon icon={faFloppyDisk} />
            Save Configuration Changes
          </button>
        </div>
      </form>
    </div>
  );
}
