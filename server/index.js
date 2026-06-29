import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
import { connectDB, getDbMode } from "./config/db.js";
import { User } from "./models/User.js";
import { Course } from "./models/Course.js";
import { Thread } from "./models/Thread.js";
import { Message } from "./models/Message.js";
import { Certificate } from "./models/Certificate.js";
import { ScheduleBlock } from "./models/ScheduleBlock.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "neuron-secret-key-123456789";
const PASSWORD_SALT = "neuron-salt-key-987654321";

export function hashPassword(password) {
  return crypto.createHmac("sha256", PASSWORD_SALT).update(password).digest("hex");
}

function generateToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${data}`).digest("base64url");
  return `${header}.${data}.${signature}`;
}

function verifyToken(token) {
  try {
    const [header, data, signature] = token.split(".");
    const expectedSignature = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${data}`).digest("base64url");
    if (signature !== expectedSignature) return null;
    return JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
  } catch (e) {
    return null;
  }
}

const defaultUsers = [
  {
    name: "Aisha Khan",
    email: "aisha@neuron.lms",
    password: hashPassword("password123"),
    xp: 3980,
    xpToday: 340,
    streak: 12,
    bestStreak: 28,
    classRank: "#4",
    totalClassRank: 184,
    mastery: 71,
    focusTime: "8h 24m",
    badges: [
      { icon: "🔥", label: "Streak 7", earned: true },
      { icon: "🧠", label: "Mind", earned: true },
      { icon: "⚡", label: "Speed", earned: true },
      { icon: "🎯", label: "Sharp", earned: true },
      { icon: "🏆", label: "Top 10", earned: true },
      { icon: "📚", label: "Reader", earned: true },
      { icon: "🌐", label: "Polyglot", earned: false },
      { icon: "🚀", label: "Launch", earned: false },
    ]
  },
  { name: "Jia Wen", email: "jia@neuron.lms", password: hashPassword("password123"), xp: 4820, streak: 42, focusTime: "12h 15m", mastery: 85, badges: [] },
  { name: "Marcus Tate", email: "marcus@neuron.lms", password: hashPassword("password123"), xp: 4640, streak: 31, focusTime: "10h 30m", mastery: 82, badges: [] },
  { name: "Priya Raman", email: "priya@neuron.lms", password: hashPassword("password123"), xp: 4210, streak: 28, focusTime: "9h 45m", mastery: 79, badges: [] },
  { name: "Diego Luna", email: "diego@neuron.lms", password: hashPassword("password123"), xp: 3720, streak: 19, focusTime: "7h 15m", mastery: 68, badges: [] },
  { name: "Hana Sato", email: "hana@neuron.lms", password: hashPassword("password123"), xp: 3590, streak: 8, focusTime: "6h 50m", mastery: 65, badges: [] },
  { name: "Ethan Brooks", email: "ethan@neuron.lms", password: hashPassword("password123"), xp: 3410, streak: 22, focusTime: "8h 10m", mastery: 63, badges: [] },
  { name: "Sofia Mendez", email: "sofia@neuron.lms", password: hashPassword("password123"), xp: 3220, streak: 15, focusTime: "5h 40m", mastery: 60, badges: [] },
  { name: "Kenji Watanabe", email: "kenji@neuron.lms", password: hashPassword("password123"), xp: 3050, streak: 9, focusTime: "4h 30m", mastery: 55, badges: [] },
  { name: "Lara Petrov", email: "lara@neuron.lms", password: hashPassword("password123"), xp: 2890, streak: 14, focusTime: "5h 15m", mastery: 52, badges: [] }
];

const defaultCourses = [
  {
    title: "Machine Learning Foundations",
    category: "AI",
    hours: 24,
    rating: 4.9,
    students: 12480,
    level: "Intermediate",
    new: false,
    modules: "12 modules",
    progressPercent: 78,
    nextLesson: "Gradient descent — interactive notebook",
    status: "active"
  },
  {
    title: "Quantum Computing 101",
    category: "Physics",
    hours: 18,
    rating: 4.8,
    students: 5210,
    level: "Advanced",
    new: true,
    modules: "8 modules",
    progressPercent: 42,
    nextLesson: "Superposition & qubits — AR lab",
    status: "active"
  },
  {
    title: "Linear Algebra · Visual",
    category: "Math",
    hours: 12,
    rating: 4.9,
    students: 22100,
    level: "Beginner",
    new: false,
    modules: "10 modules",
    progressPercent: 100,
    nextLesson: "Final certificate ready to mint",
    status: "review"
  },
  {
    title: "Systems Design Interview",
    category: "CS",
    hours: 30,
    rating: 4.7,
    students: 18420,
    level: "Advanced",
    new: false,
    modules: "15 modules",
    progressPercent: 0,
    nextLesson: "Load balancers & consistent hashing",
    status: "new"
  },
  {
    title: "Spanish for Builders",
    category: "Lang",
    hours: 40,
    rating: 4.6,
    students: 9080,
    level: "Beginner",
    new: true,
    modules: "20 modules",
    progressPercent: 0,
    nextLesson: "Essential nouns for project syncs",
    status: "new"
  },
  {
    title: "Cellular Biology · AR",
    category: "Bio",
    hours: 16,
    rating: 4.9,
    students: 4310,
    level: "Intermediate",
    new: true,
    modules: "10 modules",
    progressPercent: 0,
    nextLesson: "Mitosis in 3D space",
    status: "new"
  },
  {
    title: "Behavioral Economics",
    category: "Econ",
    hours: 20,
    rating: 4.7,
    students: 7720,
    level: "Beginner",
    new: false,
    modules: "12 modules",
    progressPercent: 0,
    nextLesson: "Loss aversion & choices",
    status: "new"
  },
  {
    title: "Modern Cryptography",
    category: "Security",
    hours: 28,
    rating: 4.8,
    students: 6190,
    level: "Advanced",
    new: false,
    modules: "14 modules",
    progressPercent: 0,
    nextLesson: "Diffie-Hellman Key Exchange math",
    status: "new"
  },
  {
    title: "Generative Music with AI",
    category: "Arts",
    hours: 14,
    rating: 4.8,
    students: 3920,
    level: "Beginner",
    new: true,
    modules: "8 modules",
    progressPercent: 0,
    nextLesson: "Suno & Udio prompt modeling",
    status: "new"
  }
];

const defaultThreads = [
  {
    title: "Intuition behind backpropagation chain rule",
    author: "Marcus Tate",
    course: "ML Foundations",
    replies: 24,
    votes: 87,
    tag: "question",
    aiModeration: "Top answer verified by AI moderator · 3 references cited"
  },
  {
    title: "Why does superposition collapse on measurement?",
    author: "Lara Petrov",
    course: "Quantum 101",
    replies: 41,
    votes: 132,
    tag: "discussion",
    aiModeration: "Active AI tutor in thread"
  },
  {
    title: "Study group for Systems Design — Thursdays?",
    author: "Diego Luna",
    course: "Systems Design",
    replies: 12,
    votes: 38,
    tag: "meetup"
  },
  {
    title: "Stuck on eigenvector derivation — visual proof?",
    author: "Aisha Khan",
    course: "Linear Algebra",
    replies: 8,
    votes: 22,
    tag: "question",
    aiModeration: "AI suggested AR module · 14 min"
  },
  {
    title: "Resources for behavioral economics field studies?",
    author: "Sofia Mendez",
    course: "Behavioral Econ",
    replies: 6,
    votes: 17,
    tag: "resources"
  }
];

const defaultMessages = [
  {
    role: "ai",
    text: "Hey Aisha — I've read your last 6 quizzes. Want to revisit gradient descent, or jump into eigenvectors with a visual proof?"
  },
  {
    role: "user",
    text: "Eigenvectors please — visual."
  },
  {
    role: "ai",
    text: "Perfect. Imagine stretching a rubber sheet: most arrows you draw on it will rotate AND scale when you stretch. But a few special arrows — the eigenvectors — only scale, never rotating. The scale factor is the eigenvalue. Want me to launch the AR lab where you can grab and stretch one yourself?"
  }
];

const defaultCertificates = [
  {
    title: "Linear Algebra · Visual",
    issuer: "Neuron Academy",
    date: "Mar 14, 2026",
    hash: "0x8f3a…b21c",
    grade: "A+",
    minted: true
  },
  {
    title: "Intro to Statistics",
    issuer: "Neuron Academy",
    date: "Jan 02, 2026",
    hash: "0x4d9e…a002",
    grade: "A",
    minted: true
  },
  {
    title: "Python for Science",
    issuer: "Neuron Academy",
    date: "Nov 18, 2025",
    hash: "0x1c2b…f74e",
    grade: "A",
    minted: true
  }
];

const defaultBlocks = [
  { day: 0, start: 9, len: 2, t: "ML lecture", tone: "bg-primary/80 text-primary-foreground" },
  { day: 0, start: 14, len: 1, t: "Deep focus: gradient descent", tone: "bg-violet/70 text-foreground", ai: true },
  { day: 1, start: 10, len: 1, t: "Quiz prep", tone: "bg-coral/70 text-foreground" },
  { day: 1, start: 15, len: 2, t: "AR lab — eigenvectors", tone: "bg-sky/70 text-foreground", ai: true },
  { day: 2, start: 11, len: 2, t: "Group project", tone: "bg-violet/70 text-foreground" },
  { day: 3, start: 9, len: 1, t: "Quantum lecture", tone: "bg-primary/80 text-primary-foreground" },
  { day: 3, start: 17, len: 2, t: "Forum mentor hour", tone: "bg-coral/70 text-foreground" },
  { day: 4, start: 10, len: 3, t: "Deep work block", tone: "bg-violet/70 text-foreground", ai: true },
  { day: 5, start: 11, len: 2, t: "Optional: AR cellular biology", tone: "bg-sky/70 text-foreground" }
];

// Initialize in-memory DB arrays
let memUsers = [...defaultUsers];
let memCourses = [...defaultCourses];
let memThreads = [...defaultThreads];
let memMessages = [...defaultMessages];
let memCertificates = [...defaultCertificates];
let memBlocks = [...defaultBlocks];

// Authentication Middleware
const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: "Invalid token." });
  }

  const dbMode = getDbMode();
  try {
    if (dbMode.isInMemory) {
      const user = memUsers.find(u => u.email === decoded.email);
      if (!user) return res.status(401).json({ error: "User not found." });
      req.user = user;
    } else {
      const user = await User.findById(decoded.userId);
      if (!user) return res.status(401).json({ error: "User not found." });
      req.user = user;
    }
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Register Route
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const dbMode = getDbMode();
  try {
    if (dbMode.isInMemory) {
      const exists = memUsers.some(u => u.email === email);
      if (exists) return res.status(400).json({ error: "Email already registered" });

      const newUser = {
        name,
        email,
        password: hashPassword(password),
        xp: 50,
        xpToday: 50,
        streak: 1,
        bestStreak: 1,
        classRank: "#100",
        totalClassRank: memUsers.length + 1,
        mastery: 0,
        focusTime: "0h 0m",
        badges: [
          { icon: "🔥", label: "Streak 1", earned: true },
          { icon: "🧠", label: "Mind", earned: false },
          { icon: "⚡", label: "Speed", earned: false },
        ]
      };
      memUsers.push(newUser);
      const token = generateToken({ email: newUser.email });
      return res.json({ token, user: newUser });
    } else {
      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ error: "Email already registered" });

      const newUser = await User.create({
        name,
        email,
        password: hashPassword(password),
        xp: 50,
        xpToday: 50,
        streak: 1,
        bestStreak: 1,
        classRank: "#100",
        totalClassRank: (await User.countDocuments({})) + 1,
        mastery: 0,
        focusTime: "0h 0m",
        badges: [
          { icon: "🔥", label: "Streak 1", earned: true },
          { icon: "🧠", label: "Mind", earned: false },
          { icon: "⚡", label: "Speed", earned: false },
        ]
      });
      const token = generateToken({ userId: newUser._id, email: newUser.email });
      return res.json({ token, user: newUser });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Login Route
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const dbMode = getDbMode();
  try {
    if (dbMode.isInMemory) {
      const user = memUsers.find(u => u.email === email);
      if (!user || user.password !== hashPassword(password)) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const token = generateToken({ email: user.email });
      return res.json({ token, user });
    } else {
      const user = await User.findOne({ email });
      if (!user || user.password !== hashPassword(password)) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const token = generateToken({ userId: user._id, email: user.email });
      return res.json({ token, user });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// API Endpoints

// 1. GET User profile
app.get("/api/user/profile", requireAuth, async (req, res) => {
  return res.json(req.user);
});

// 1b. PUT User profile
app.put("/api/user/profile", requireAuth, async (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }
  const dbMode = getDbMode();
  try {
    if (dbMode.isInMemory) {
      req.user.name = name;
      return res.json(req.user);
    } else {
      const u = await User.findByIdAndUpdate(
        req.user._id,
        { name },
        { new: true }
      );
      return res.json(u);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 2. POST increment XP
app.post("/api/user/xp", requireAuth, async (req, res) => {
  const { xpToAdd } = req.body;
  const dbMode = getDbMode();
  try {
    if (dbMode.isInMemory) {
      req.user.xp += (xpToAdd || 0);
      req.user.xpToday += (xpToAdd || 0);
      return res.json(req.user);
    } else {
      const u = await User.findByIdAndUpdate(
        req.user._id,
        { $inc: { xp: xpToAdd || 0, xpToday: xpToAdd || 0 } },
        { new: true }
      );
      return res.json(u);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 3. GET Courses catalog
app.get("/api/courses", requireAuth, async (req, res) => {
  const dbMode = getDbMode();
  try {
    if (dbMode.isInMemory) {
      return res.json(memCourses);
    } else {
      const cList = await Course.find({});
      return res.json(cList);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 4. GET AI Tutor chat history
app.get("/api/ai-tutor/chat", requireAuth, async (req, res) => {
  const dbMode = getDbMode();
  try {
    if (dbMode.isInMemory) {
      return res.json(memMessages);
    } else {
      const mList = await Message.find({}).sort({ createdAt: 1 });
      return res.json(mList);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 5. POST AI Tutor chat message
app.post("/api/ai-tutor/chat", requireAuth, async (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Text is required" });
  }

  const dbMode = getDbMode();
  try {
    // Generate AI simulated response
    let aiResponse = "";
    if (text.toLowerCase().includes("gradient descent")) {
      aiResponse = "Gradient descent is an optimization algorithm used to minimize a loss function by iteratively moving in the direction of steepest descent. Let's look at the mathematical formula: θ = θ - α * ∇J(θ). Want me to load a visual graph showing how step size impacts convergence?";
    } else if (text.toLowerCase().includes("eigenvalue") || text.toLowerCase().includes("eigenvector")) {
      aiResponse = "Excellent question! An eigenvector of a square matrix A is a non-zero vector v such that Av = λv. The scalar λ is the eigenvalue. Visually, it means the vector's direction remains unchanged after transformation, only its magnitude scales. Would you like a practice quiz on this?";
    } else {
      aiResponse = `That's a fascinating learning path! Regarding "${text}", I've analyzed your current progress and recommend connecting it with visual examples. I'll load relevant materials to your course view now. What specific area should we zoom into?`;
    }

    if (dbMode.isInMemory) {
      const userMsg = { role: "user", text, createdAt: new Date() };
      const aiMsg = { role: "ai", text: aiResponse, createdAt: new Date() };
      memMessages.push(userMsg);
      memMessages.push(aiMsg);

      // Give 50 XP to user for asking a question!
      req.user.xp += 50;
      req.user.xpToday += 50;

      return res.json({ messages: memMessages, xpAdded: 50 });
    } else {
      const userMsg = await Message.create({ role: "user", text });
      const aiMsg = await Message.create({ role: "ai", text: aiResponse });

      // Give 50 XP
      await User.findByIdAndUpdate(
        req.user._id,
        { $inc: { xp: 50, xpToday: 50 } }
      );

      const mList = await Message.find({}).sort({ createdAt: 1 });
      return res.json({ messages: mList, xpAdded: 50 });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 6. GET Leaderboard
app.get("/api/leaderboard", requireAuth, async (req, res) => {
  const dbMode = getDbMode();
  try {
    if (dbMode.isInMemory) {
      // sort memUsers by XP descending
      const sorted = [...memUsers].sort((a, b) => b.xp - a.xp);
      return res.json(sorted);
    } else {
      const list = await User.find({}).sort({ xp: -1 });
      return res.json(list);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 7. GET Certificates
app.get("/api/certificates", requireAuth, async (req, res) => {
  const dbMode = getDbMode();
  try {
    if (dbMode.isInMemory) {
      return res.json(memCertificates);
    } else {
      const list = await Certificate.find({});
      return res.json(list);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 8. GET Forum threads
app.get("/api/forum", requireAuth, async (req, res) => {
  const dbMode = getDbMode();
  try {
    if (dbMode.isInMemory) {
      return res.json(memThreads);
    } else {
      const list = await Thread.find({}).sort({ createdAt: -1 });
      return res.json(list);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 9. POST Create Forum thread
app.post("/api/forum", requireAuth, async (req, res) => {
  const { title, tag, course } = req.body;
  if (!title || !tag || !course) {
    return res.status(400).json({ error: "Title, tag, and course are required" });
  }

  const dbMode = getDbMode();
  try {
    const newThreadObj = {
      title,
      author: req.user.name,
      course,
      replies: 0,
      votes: 1,
      tag: tag.toLowerCase(),
      aiModeration: "AI reviewing post content for compliance...",
      createdAt: new Date()
    };

    if (dbMode.isInMemory) {
      memThreads.unshift(newThreadObj); // put at top

      // 100 XP for posting a thread!
      req.user.xp += 100;
      req.user.xpToday += 100;

      return res.json({ thread: newThreadObj, xpAdded: 100 });
    } else {
      const dbThread = await Thread.create(newThreadObj);
      await User.findByIdAndUpdate(
        req.user._id,
        { $inc: { xp: 100, xpToday: 100 } }
      );
      return res.json({ thread: dbThread, xpAdded: 100 });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 10. GET Schedule blocks
app.get("/api/schedule", requireAuth, async (req, res) => {
  const dbMode = getDbMode();
  try {
    if (dbMode.isInMemory) {
      return res.json(memBlocks);
    } else {
      const list = await ScheduleBlock.find({});
      return res.json(list);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

// Connect to DB, then start Express Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Express Backend running on port ${PORT}`);
  });
});
