export interface Badge {
  icon: string;
  label: string;
  earned: boolean;
}

export interface UserProfile {
  name: string;
  xp: number;
  xpToday: number;
  streak: number;
  bestStreak: number;
  classRank: string;
  totalClassRank: number;
  mastery: number;
  focusTime: string;
  badges: Badge[];
}

export interface Course {
  title: string;
  category: string;
  hours: number;
  rating: number;
  students: number;
  level: string;
  new: boolean;
  modules: string;
  progressPercent: number;
  nextLesson: string;
  status: "active" | "review" | "new";
}

export interface ChatMessage {
  role: "user" | "ai";
  text: string;
  createdAt?: string;
}

export interface ForumThread {
  title: string;
  author: string;
  course: string;
  replies: number;
  votes: number;
  tag: string;
  aiModeration?: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  hash: string;
  grade: string;
  minted: boolean;
}

export interface ScheduleBlock {
  day: number;
  start: number;
  len: number;
  t: string;
  tone: string;
  ai?: boolean;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} - ${errorText || response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  // User profile
  getUserProfile: () => request<UserProfile>("/api/user/profile"),
  updateUserProfile: (name: string) =>
    request<UserProfile>("/api/user/profile", {
      method: "PUT",
      body: JSON.stringify({ name }),
    }),
  addXP: (xpToAdd: number) =>
    request<UserProfile>("/api/user/xp", {
      method: "POST",
      body: JSON.stringify({ xpToAdd }),
    }),

  // Courses
  getCourses: () => request<Course[]>("/api/courses"),

  // AI Tutor
  getChatHistory: () => request<ChatMessage[]>("/api/ai-tutor/chat"),
  sendChatMessage: (text: string) =>
    request<{ messages: ChatMessage[]; xpAdded: number }>("/api/ai-tutor/chat", {
      method: "POST",
      body: JSON.stringify({ text }),
    }),

  // Leaderboard
  getLeaderboard: () => request<UserProfile[]>("/api/leaderboard"),

  // Certificates
  getCertificates: () => request<Certificate[]>("/api/certificates"),

  // Peer Forum
  getForumThreads: () => request<ForumThread[]>("/api/forum"),
  createForumThread: (title: string, tag: string, course: string) =>
    request<{ thread: ForumThread; xpAdded: number }>("/api/forum", {
      method: "POST",
      body: JSON.stringify({ title, tag, course }),
    }),

  // Schedule
  getScheduleBlocks: () => request<ScheduleBlock[]>("/api/schedule"),
};
