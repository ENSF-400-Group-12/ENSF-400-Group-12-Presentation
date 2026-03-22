# ClosetAI — Group 12 presentation

**ClosetAI** is a web application that helps people **digitize the clothes they already own**, keep everything in a **personal digital wardrobe**, and get **outfit suggestions** grounded in that closet—not a generic catalog. Users sign in, add items (with photos and metadata), then generate looks using inputs like **occasion** and **style or vibe**. The experience is **dashboard-first**: one home base for the wardrobe, generation, and (in the full product vision) saved favourites and richer context.

The app is built as a **full-stack** project for **ENSF 400** (Software Engineering): **React** on the client, **Express** with **session-based auth** on the server, **SQLite-style persistence** (sql.js), and **local image storage** so wardrobes survive restarts. Outfit logic is designed to be **transparent and runnable locally** first, with room to grow toward optional **LLM** support and **context-aware** generation described in the team’s SRS.

This repository hosts the **slide deck** used for the course presentation: a small **React + Vite** experience styled to match the ClosetAI brand (logos, typography, and palette). The live deck is deployed for viewing in the browser; it is not a substitute for the ClosetAI application itself.

**Live presentation:** [https://closetai-presentation.vercel.app/](https://closetai-presentation.vercel.app/)

**Course:** ENSF 400 · **Section:** L01 · **Group:** 12  
