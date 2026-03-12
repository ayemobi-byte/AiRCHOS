export interface InstalledModule {
  id: string;
  name: string;
  iconName: string;
  color: string;
}

export interface UserProfile {
  username: string;
  language: string;
  notificationsEnabled: boolean;
  usageGoals: string[];
  installedModules: InstalledModule[];
}

export type AppState = 'onboarding' | 'desktop' | 'app';
