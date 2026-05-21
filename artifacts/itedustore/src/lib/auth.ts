export interface Score {
  id: string;
  subject: string; // 'all' or specific subject
  score: number;
  total: number;
  percentage: number;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  hasPaid: boolean;
  isAdmin: boolean;
  scores: Score[];
}

const USERS_KEY = 'itedu_users';
const CURRENT_USER_KEY = 'itedu_current_user';

function initializeAdmin() {
  const users = getUsers();
  if (!users.find(u => u.email === 'admin@itedu.rs')) {
    users.push({
      id: 'admin',
      name: 'Admin',
      email: 'admin@itedu.rs',
      password: 'admin123',
      hasPaid: true,
      isAdmin: true,
      scores: []
    } as any);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
}

export function getUsers(): User[] {
  const stored = localStorage.getItem(USERS_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function getCurrentUser(): User | null {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function register(name: string, email: string, password: string): User | null {
  const users = getUsers();
  if (users.find(u => u.email === email)) {
    return null; // already exists
  }
  
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    hasPaid: false,
    isAdmin: false,
    scores: []
  };
  
  const userWithAuth = { ...newUser, password };
  users.push(userWithAuth as any);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  return newUser;
}

export function login(email: string, password: string): User | null {
  initializeAdmin();
  const users = getUsers() as any[];
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const safeUser = { ...user };
    delete safeUser.password;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
    return safeUser;
  }
  return null;
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function hasPaid(): boolean {
  const user = getCurrentUser();
  return user?.hasPaid || false;
}

export function markPaid() {
  const user = getCurrentUser();
  if (!user) return;
  
  user.hasPaid = true;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  
  const users = getUsers();
  const index = users.findIndex(u => u.id === user.id);
  if (index !== -1) {
    users[index].hasPaid = true;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
}

export function addScore(subject: string, score: number, total: number) {
  const user = getCurrentUser();
  if (!user) return;
  
  const newScore: Score = {
    id: Date.now().toString(),
    subject,
    score,
    total,
    percentage: Math.round((score / total) * 100),
    date: new Date().toISOString()
  };
  
  user.scores = [...(user.scores || []), newScore];
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  
  const users = getUsers();
  const index = users.findIndex(u => u.id === user.id);
  if (index !== -1) {
    users[index].scores = user.scores;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
}

export function resetScores(userId: string) {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    users[index].scores = [];
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    const currentUser = getCurrentUser();
    if (currentUser?.id === userId) {
      currentUser.scores = [];
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    }
  }
}

export function getScoreboard() {
  const users = getUsers();
  const allScores = users.flatMap(u => 
    (u.scores || []).map(s => ({
      userId: u.id,
      userName: u.name,
      ...s
    }))
  );
  
  return allScores.sort((a, b) => b.percentage - a.percentage);
}

initializeAdmin();
