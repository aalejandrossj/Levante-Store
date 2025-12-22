// Announcement category type matching Supabase enum
export type AnnouncementCategory = 'announcement' | 'privacy' | 'landing' | 'all';

// Announcement interface matching the Supabase table structure
export interface Announcement {
  id: string;
  title: string;
  full_text: string;
  category: AnnouncementCategory;
  created_at: string;
}

// API Response format for single category
export interface AnnouncementResponse {
  announcement: Announcement | null;
}

// API Response format for multiple categories
export interface AnnouncementsResponse {
  announcements: Announcement[];
  total: number;
}
