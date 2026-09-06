# AgriSense AI - Developer Installation Guide

## Prerequisites
- Node.js v18+ and npm v9+
- Python 3.10+
- Git

---

## 1. Clone Repository & Setup Frontend
```bash
git clone https://github.com/AgriSense-AI/AgriSense-AI.git
cd AgriSense-AI

# Install Node dependencies
npm install

# Start Vite Development Server
npm run dev
```
Frontend application will be accessible at: `http://localhost:5173`

---

## 2. Setup FastAPI Backend & AI Models
```bash
# Navigate to backend directory
cd backend

# Create Python virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install Python requirements
pip install -r requirements.txt

# Start FastAPI server
python main.py
```
Backend API documentation available at: `http://localhost:8000/docs`

---

## 3. Run IoT Telemetry Simulator
```bash
python iot/simulator/telemetry_simulator.py --dry-run
```
