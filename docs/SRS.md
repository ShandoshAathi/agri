# System Requirements Specification (SRS) - AgriSense AI

## 1. Introduction
This document outlines the functional and non-functional requirements for AgriSense AI, an integrated smart farming IoT and AI platform.

## 2. User Classes
- **Farm Manager**: Oversees multi-farm operations, configures automated irrigation policies, and analyzes yield trends.
- **Farmer**: Monitors assigned field plots, receives crop recommendations, and executes manual irrigation tasks.

## 3. Functional Requirements
- **FR-1**: System shall sample microclimate telemetry (Moisture, Temp, pH, Rain) at 2-second intervals.
- **FR-2**: System shall provide AI crop recommendations with >= 90% confidence scores based on soil conditions.
- **FR-3**: System shall diagnose plant diseases from leaf uploads and generate treatment advice.
- **FR-4**: System shall shut off irrigation pumps automatically when rain is detected.

## 4. Non-Functional Requirements
- **NFR-1 Latency**: Telemetry WebSocket updates delivered within < 500ms.
- **NFR-2 Availability**: 99.9% uptime for core API endpoints.
- **NFR-3 Responsiveness**: Mobile and desktop responsive layout using Tailwind CSS.
