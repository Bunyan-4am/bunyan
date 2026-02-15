"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageTransition, FadeIn } from "@/components/ui/animations";
import { mockUser } from "@/lib/mock-data";
import {
  User,
  Building2,
  Bell,
  Shield,
  Palette,
  Globe,
  KeyRound,
  Mail,
  Phone,
  Save,
  Camera,
} from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "company", label: "Company", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({
    fullName: mockUser.full_name,
    email: mockUser.email,
    phone: mockUser.phone,
    company: mockUser.company_name,
    role: mockUser.role,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <PageTransition>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Settings</h1>
        <p className="text-sm text-secondary mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <FadeIn>
          <Card>
            <CardContent className="p-2">
              <div className="space-y-0.5">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-accent/10 text-accent"
                        : "text-secondary hover:text-primary hover:bg-gray-50"
                    }`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Content */}
        <FadeIn delay={0.1} className="lg:col-span-3">
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center text-accent text-2xl font-bold">
                      AR
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center shadow-sm">
                      <Camera size={14} />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary">{profile.fullName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="accent">{profile.role}</Badge>
                      <Badge variant="success">Active</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                  <Input
                    label="Phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                  <Input
                    label="Role"
                    value={profile.role}
                    disabled
                  />
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saving...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Save size={14} /> Save Changes
                      </span>
                    )}
                  </Button>
                  {saved && (
                    <span className="text-sm text-accent font-medium animate-pulse">✓ Saved successfully</span>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "company" && (
            <Card>
              <CardHeader>
                <CardTitle>Company Details</CardTitle>
                <CardDescription>Manage your organization information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input label="Company Name" value={profile.company} onChange={(e) => setProfile({ ...profile, company: e.target.value })} />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Industry" value="Construction" disabled />
                  <Input label="Company Size" value="50-200 employees" disabled />
                </div>
                <Input label="Address" value="Nasr City, Cairo, Egypt" disabled />
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <Button onClick={handleSave}><Save size={14} /> Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what you want to be notified about</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Project Updates", description: "When project milestones are reached", enabled: true },
                    { title: "AI Insights", description: "New AI recommendations and analyses", enabled: true },
                    { title: "Bill Alerts", description: "When new bills are scanned or processed", enabled: true },
                    { title: "Marketplace Deals", description: "Price drops on saved materials", enabled: false },
                    { title: "Weekly Reports", description: "Weekly sustainability and cost summary", enabled: true },
                    { title: "System Updates", description: "Platform maintenance and new features", enabled: false },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center justify-between p-3 rounded-xl border border-border/50">
                      <div>
                        <p className="text-sm font-medium text-primary">{item.title}</p>
                        <p className="text-xs text-muted mt-0.5">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={item.enabled}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your password and security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Input label="Current Password" type="password" placeholder="Enter current password" />
                  <Input label="New Password" type="password" placeholder="Enter new password" />
                  <Input label="Confirm New Password" type="password" placeholder="Confirm new password" />
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <Button><KeyRound size={14} /> Update Password</Button>
                </div>

                <div className="p-4 rounded-xl bg-background border border-border/50 mt-4">
                  <h4 className="text-sm font-semibold text-primary mb-2">Two-Factor Authentication</h4>
                  <p className="text-xs text-muted mb-3">Add an extra layer of security to your account</p>
                  <Button variant="outline" size="sm">
                    <Shield size={14} /> Enable 2FA
                  </Button>
                </div>

                <div className="p-4 rounded-xl border border-danger/20 bg-red-50/50">
                  <h4 className="text-sm font-semibold text-danger mb-1">Danger Zone</h4>
                  <p className="text-xs text-muted mb-3">Permanently delete your account and all data</p>
                  <Button variant="danger" size="sm">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </FadeIn>
      </div>
    </PageTransition>
  );
}
