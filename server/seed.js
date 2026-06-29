import mongoose from "mongoose";
import dotenv from "dotenv";
import crypto from "crypto";
import { User } from "./models/User.js";
import { Course } from "./models/Course.js";
import { Thread } from "./models/Thread.js";
import { Message } from "./models/Message.js";
import { Certificate } from "./models/Certificate.js";
import { ScheduleBlock } from "./models/ScheduleBlock.js";

dotenv.config();

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/neuron_lms";
const PASSWORD_SALT = "neuron-salt-key-987654321";

function hashPassword(password) {
  return crypto.createHmac("sha256", PASSWORD_SALT).update(password).digest("hex");
}

const usersData = [
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

const coursesData = [
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

const threadsData = [
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

const messagesData = [
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

const certificatesData = [
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

const blocksData = [
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

async function seed() {
  try {
    console.log("Seeding process started. Connecting to MongoDB at " + mongoUri + "...");
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000
    });
    console.log("Connected to MongoDB for seeding.");

    // Clear old data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Thread.deleteMany({});
    await Message.deleteMany({});
    await Certificate.deleteMany({});
    await ScheduleBlock.deleteMany({});
    console.log("Cleared existing data.");

    // Seed User
    await User.insertMany(usersData);
    console.log("Seeded " + usersData.length + " users.");

    // Seed Courses
    await Course.insertMany(coursesData);
    console.log("Seeded " + coursesData.length + " courses.");

    // Seed Threads
    await Thread.insertMany(threadsData);
    console.log("Seeded " + threadsData.length + " threads.");

    // Seed Messages
    await Message.insertMany(messagesData);
    console.log("Seeded " + messagesData.length + " messages.");

    // Seed Certificates
    await Certificate.insertMany(certificatesData);
    console.log("Seeded " + certificatesData.length + " certificates.");

    // Seed Schedule blocks
    await ScheduleBlock.insertMany(blocksData);
    console.log("Seeded " + blocksData.length + " schedule blocks.");

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database: ", error);
    process.exit(1);
  }
}

seed();
