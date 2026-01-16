KHADKA PHOTO BOOTH

A professional-grade, web-based photo booth application featuring real-time hand gesture tracking, high-definition captures, and automated photo strip generation.

📸 Overview

KHADKA PHOTO BOOTH is designed to provide a seamless "Studio" experience directly in your browser. It uses machine learning to track hand landmarks in real-time while allowing users to capture a sequence of 5 poses, which are then compiled into a classic, vertically-oriented physical-style photo strip.

🚀 Features

Real-time AI Tracking: Integrated with Google MediaPipe for high-fidelity hand landmark detection and skeletal overlays.

Cinematic Workflow: Automated 3-second countdown for each of the 5 poses to ensure perfect timing.

Visual Feedback: Includes a "Studio Flash" animation and mirror-effect rendering for a natural posing experience.

High-Resolution Exports: Generates a custom-branded .jpg photo strip (680px x 2590px) featuring a classic white border and elegant typography.

Fully Responsive: Optimized for desktop, tablet, and mobile devices with a "Mobile-First" architectural approach.

Privacy Centric: All processing happens locally on the device; no images are stored on a server.

🛠️ Technology Stack

Frontend: HTML5, CSS3 (Tailwind CSS for modern UI design).

Computer Vision: MediaPipe Hands for hand tracking.

Camera Handling: MediaPipe Camera Utilities for optimized frame-rate processing.

Graphics: HTML5 Canvas API for real-time video manipulation and final image compositing.

📖 How to Use

Permissions: Grant the browser access to your camera when prompted.

Setup: Position yourself in front of the camera until you see the hand-tracking skeletal overlay.

Capture: - Click the "Start Session" button.

Follow the countdown (3... 2... 1...) for each of the 5 poses.

Preview: Once the session ends, a preview of your strip will appear on the right (or bottom on mobile).

Download: Click "Download Strip" to save your high-resolution photo strip to your device.

🔧 Technical Notes

Mirror Effect: The video feed and captured images are automatically flipped horizontally to match the "Mirror" intuition users expect from a photo booth.

Final Canvas: The hidden final_strip_canvas element handles the heavy lifting of stitching five 800x600 images into a single vertical strip with consistent padding and footer branding.

⚖️ License

© 2026 KHADKA SHARAD. All rights reserved.
Designed for fun
