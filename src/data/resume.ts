export const profile = {
  name: 'MOHITH S',
  brand: 'MOHITH S',
  role: 'AI Engineer · Semiconductor Systems & ML',
  tagline: 'Building AI agents, ML diagnostic engines, and backend systems that ship from data to production.',
  location: 'Bengaluru, India',
  phone: '+91-9880975146',
  email: 'mohithnaik002@gmail.com',
  linkedin: 'https://linkedin.com/in/mohith-naik-121235234',
  github: 'https://github.com/naik1805',
  summary:
    'AI Engineer specializing in semiconductor systems and applied ML with hands-on experience building automated test equipment (ATE) AI agents, ML-driven diagnostic engines, and high-performance backend pipelines (FastAPI, Python). Comfortable across Python backend services, vector pipelines, and Next.js interfaces. Dual published researcher in ICAIH 2025 and IEEE Xplore.',
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
    'Computer Vision',
    'LLMs',
    'GenAI & Agents',
    'scikit-learn',
    'TensorFlow',
    'LangChain',
    'FAISS',
    'Ollama',
  ],
  tools: [
    'Git/GitHub',
    'pytest',
    'Pandas',
    'NumPy',
    'PyArrow',
    'Jupyter',
    'Power BI',
    'DAX',
    'Blockchain',
  ],
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
    company: 'Verilumen Labs',
    focus: 'Semiconductor & AI · Full-time',
    role: 'AI Engineer',
    location: 'Bengaluru',
    period: 'May 2026 - Present · Full-time (5 mos)',
    current: true,
    accent: '#EC4423',
    tags: ['Full-time', 'FastAPI', 'scikit-learn', 'Next.js', 'Docker', 'ATE', 'ML'],
    highlights: [
      'Full-time AI Engineer building autonomous diagnostic agents integrated with semiconductor Automated Test Equipment (ATE) workflows and test engineering telemetry consoles.',
      'Developed a high-throughput Python (pandas, NumPy) diagnosis engine that parses ATE scan-test fail logs (STIL/topology) to localize failed chains/cells and classify shift vs. capture faults.',
      'Trained, evaluated, and deployed ML fault-classification models (Random Forest, Isolation Forest, Gradient Boosting) achieving 98.4% diagnostic accuracy with calibrated confidence scores, served through FastAPI + Pydantic v2.',
      'Shipped an interactive Next.js/React/TypeScript engineer console (12 KPI telemetry cards, real-time wave analysis) and automated generation of 10 failure-report types; containerized with Docker and pytest coverage.',
    ],
  },
  {
    company: 'Global Logica Technologies',
    focus: 'AI Products',
    role: 'AI Engineer Intern',
    location: 'Bengaluru',
    period: 'Feb 2026 - Apr 2026',
    current: false,
    accent: '#642E39',
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
    status: 'Production',
    focus: 'Semiconductor · ATE',
    stack: ['FastAPI', 'Next.js/React', 'scikit-learn', 'Docker'],
    accent: '#FF4D2E',
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
    status: 'Privacy-first',
    focus: 'Local LLM · RAG',
    stack: ['Ollama', 'FAISS', 'LangChain', 'RAG'],
    accent: '#FF4D2E',
    description:
      'Fully offline, privacy-first AI assistant powered by quantized LLMs (LLaMA, Mistral) via Ollama, with a RAG pipeline for document-grounded responses.',
    details: [
      'Whisper STT + Piper TTS voice interface',
      '<2s response latency via 4-bit GGUF quantization',
      '3-5x speed improvement over baseline',
      'Local RAG with FAISS + LangChain',
    ],
  },
  {
    title: 'Deepfake Detection System',
    acronym: 'DFS',
    status: 'Published',
    focus: 'ICAIH 2025 · Research',
    stack: ['CNN + RNN', 'TensorFlow', 'OpenCV'],
    accent: '#FF4D2E',
    description:
      'End-to-end deepfake detection pipeline using CNNs + RNNs, optimized for near-real-time inference on benchmark datasets.',
    details: [
      'CNN + RNN hybrid architecture',
      'Near-real-time inference optimization',
      'Peer-reviewed at ICAIH 2025',
      'Published research contribution',
    ],
  },
  {
    title: 'Corrupt Watch',
    acronym: 'CW',
    status: 'Published',
    focus: 'IEEE · Blockchain Civic',
    stack: ['Blockchain', 'NLP', 'Computer Vision', 'AI'],
    accent: '#FF4D2E',
    description:
      'AI-Blockchain framework for transparent civic grievance redressal: citizens file complaints with evidence, AI classifies and validates them, and blockchain keeps immutable, timestamped records so cases cannot be quietly altered or buried.',
    details: [
      'NLP + Computer Vision to classify grievances and verify multimedia evidence',
      'Blockchain ledger for decentralized, tamper-proof complaint tracking',
      'Multilingual UI, outlier detection for suspicious activity, whistleblower privacy',
      'Published in IEEE Xplore: transparent governance / smart-city civic tech',
    ],
  },
]

export const education = {
  degree: 'B.E. in Artificial Intelligence & Data Science',
  school: 'BGSCET (VTU), Bengaluru',
  period: '2022 - 2026',
}

export const publications = [
  {
    title: 'Deepfake Detection with Advanced CNN and RNN Techniques',
    venue: 'ICAIH 2025, St Aloysius (Deemed University), Mangalore',
    type: 'Peer-reviewed',
  },
  {
    title:
      'Corrupt Watch: An AI-Blockchain Integrated Framework for Transparent Civic Grievance Redressal',
    venue: 'IEEE International Conference, Ghousia College of Engineering, Ramanagara · IEEE Xplore',
    type: 'Peer-reviewed',
  },
]

export const achievements = [
  '1st Prize · FPV Drone Project, BGS College Techno-Cultural Fest (30+ teams)',
  '4+ Hackathon Participant · AI, ML & civic tech',
]
