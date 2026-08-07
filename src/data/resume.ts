export const profile = {
  name: 'MOHITH S',
  brand: 'MOHITH S',
  role: 'AI Software Engineer — ML · Data · Systems',
  tagline: 'Building AI agents, ML diagnostic engines, and backend systems that ship from data to production.',
  location: 'Bengaluru, India',
  phone: '+91-9880975146',
  email: 'mohithnaik002@gmail.com',
  linkedin: 'https://linkedin.com/in/mohith-naik-121235234',
  github: 'https://github.com/naik1805',
  summary:
    'B.E. graduate (AI & Data Science) with hands-on backend development experience building REST APIs (FastAPI, Node.js), ML-driven diagnostic engines, and AI agents integrated with automated test equipment (ATE) systems. Comfortable across the stack — Python backend services, SQL/NoSQL databases, and Next.js/React front ends — with a strong foundation in system design, data pipelines, and applied ML. Dual published researcher (ICAIH 2025 & IEEE).',
}

export const skills = {
  backend: [
    'FastAPI',
    'Node.js',
    'REST APIs',
    'Pydantic v2',
    'Uvicorn',
    'Docker',
    'Microservices',
    'System Design',
  ],
  languages: ['Python', 'Java', 'JavaScript/TypeScript', 'C', 'SQL'],
  databases: ['MongoDB', 'PostgreSQL', 'MySQL'],
  frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  ml: [
    'Machine Learning',
    'Deep Learning',
    'NLP',
    'LLMs',
    'GenAI & Agents',
    'scikit-learn',
    'TensorFlow',
    'LangChain',
    'FAISS',
    'Ollama',
  ],
  tools: ['Git/GitHub', 'pytest', 'Pandas', 'NumPy', 'PyArrow', 'Jupyter', 'Power BI', 'DAX'],
}

export const skillRadar = [
  { label: 'Backend APIs', value: 92 },
  { label: 'ML / AI', value: 88 },
  { label: 'System Design', value: 80 },
  { label: 'Data Pipelines', value: 85 },
  { label: 'Frontend', value: 72 },
  { label: 'DevOps', value: 78 },
]

export const experience = [
  {
    company: 'Verileumen Labs',
    focus: 'Semiconductor & AI',
    role: 'AI Engineer Intern',
    location: 'Bengaluru',
    period: 'May 2026 – Present',
    current: true,
    accent: '#C23B22',
    tags: ['FastAPI', 'scikit-learn', 'Next.js', 'Docker', 'ATE', 'ML'],
    highlights: [
      'Building AI agents integrated with Automated Test Equipment (ATE) workflows, plus an AI-powered diagnostics dashboard used by semiconductor test engineers.',
      'Developed a Python (pandas, NumPy) diagnosis engine that parses ATE scan-test fail logs (STIL/topology) to localize failed chains/cells and classify shift vs. capture faults.',
      'Trained and calibrated ML models (Random Forest, Isolation Forest, Gradient Boosting) to predict root cause with confidence scores, served through FastAPI + Pydantic v2.',
      'Shipped a Next.js/React/TypeScript dashboard (12 KPI cards, Recharts) and automated generation of 10 failure-report types; containerized with Docker and pytest coverage.',
    ],
  },
  {
    company: 'Global Logica Technologies',
    focus: 'AI Products',
    role: 'AI Engineer Intern',
    location: 'Bengaluru',
    period: 'Feb 2026 – Apr 2026',
    current: false,
    accent: '#1A5F4A',
    tags: ['NLP', 'Recommendation', 'Anomaly Detection', 'REST APIs', 'Pipelines'],
    highlights: [
      'Built an AI-driven product recommendation engine (collaborative filtering + NLP semantic search) and an ML-based anomaly detection module for fraudulent transactions.',
      'Engineered real-time data pipelines for inventory forecasting, dynamic pricing, and customer segmentation, cutting processing latency by 40%.',
      'Integrated AI modules via REST APIs; collaborated cross-functionally and delivered weekly stakeholder insights.',
    ],
  },
]

export const projects = [
  {
    title: 'Scan Chain Diagnosis Agent',
    acronym: 'SCDA',
    stack: ['FastAPI', 'Next.js/React', 'scikit-learn', 'Docker'],
    accent: '#C23B22',
    description:
      'Full-stack diagnostic tool: Python engine analyzes chip scan-test fail logs to detect chain/cell failures, classify shift vs. capture issues, and predict root cause with ML.',
    details: [
      'FastAPI backend with Pydantic v2 & Uvicorn',
      'Next.js 15 / React 19 dashboard with 12 KPI cards',
      '10 auto-generated FR reports (JSON/HTML)',
      'PyArrow/Parquet caching + Docker deployment',
    ],
  },
  {
    title: 'Offline Personal AI Assistant',
    acronym: 'OPAA',
    stack: ['Ollama', 'FAISS', 'LangChain', 'RAG'],
    accent: '#1A5F4A',
    description:
      'Fully offline, privacy-first AI assistant powered by quantized LLMs (LLaMA, Mistral) via Ollama, with a RAG pipeline for document-grounded responses.',
    details: [
      'Whisper STT + Piper TTS voice interface',
      '<2s response latency via 4-bit GGUF quantization',
      '3–5x speed improvement over baseline',
      'Local RAG with FAISS + LangChain',
    ],
  },
  {
    title: 'Deepfake Detection System',
    acronym: 'DFS',
    stack: ['CNN + RNN', 'TensorFlow', 'OpenCV'],
    accent: '#2F3B4A',
    description:
      'End-to-end deepfake detection pipeline using CNNs + RNNs, optimized for near-real-time inference on benchmark datasets.',
    details: [
      'CNN + RNN hybrid architecture',
      'Near-real-time inference optimization',
      'Peer-reviewed at ICAIH 2025',
      'Published research contribution',
    ],
  },
]

export const education = {
  degree: 'B.E. – Artificial Intelligence & Data Science',
  school: 'BGSCET (VTU), Bengaluru',
  period: '2022 – 2026',
}

export const publications = [
  {
    title: 'Deepfake Detection with Advanced CNN and RNN Techniques',
    venue: 'ICAIH 2025, St Aloysius (Deemed University), Mangalore',
    type: 'Peer-reviewed',
  },
  {
    title: 'Corrupt Watch: AI & Blockchain Integrated City',
    venue: 'IEEE International Conference, Ghousia College of Engineering, Ramanagara',
    type: 'Peer-reviewed',
  },
]

export const achievements = [
  '1st Prize — FPV Drone Project, BGS College Techno-Cultural Fest (30+ teams)',
  '4+ Hackathon Participant — AI, ML & civic tech',
]
