# Changelog

All notable changes to this project will be documented in this file.

This project follows **Semantic Versioning (SemVer)**.

---

## [2.4.0] - 2026-03-10

### Added

* Integrated **EmailJS** for the contact form, replacing Supabase.
* Implemented a dual email system (Notification to Admin & Thank-you to User).
* Added spam prevention:
  * **Honeypot field** (`botField`) to silently reject automated bot submissions.
  * **Rate limiting** via `localStorage` (1-hour cooldown) to prevent abuse.
* Installed `@emailjs/browser` dependency and configured environment variables.

---
## [2.3.0] - 2026-03-08

### Added

* Implemented LiveKit controller for enhanced real-time voice conversation management.
* Added `useLiveKitController` hook to manage:

  * LiveKit room state
  * Agent interactions
  * UI conversation controls.

### Updated

* Ticket modal UI improvements.
* Updated student fields inside the ticket modal.

### Configuration

* Configured avatar resources for MGR University.

### Changes

* Replaced **support bot flow** with **courses bot flow**.

---

## [2.2.0] - 2026-02-27

### Added

* Core application structure with routing.
* Smooth scrolling support.
* Theme handling (Dark / Light mode).
* New pages including:

  * Blogs
  * Contact page.

### UI / UX

* Added futuristic **VoiceDots spotlight text section** with mouse-follow effect.
* Implemented interactive animated background.
* Updated navigation and footer structure.

### Improvements

* Lenis scroll configuration tweaks.
* Navbar and footer logo updates.
* Fixed broken links across sections.
* Removed unused dashboard preview section.

---

## [2.1.0] - 2026-02-21

### Added

* New **marketing website architecture**.
* Landing page and navigation system.
* Secure data page.
* Website preview functionality.
* Try-On-Website feature for testing widget on external URLs.

### Features

* Industry selection and bot count configuration for widget preview.
* Interactive capabilities section with scroll-driven SVG animations.
* Futuristic UI sections and demo components.

---

## [2.0.0] - 2026-02-17

### Added

* Live widget preview system.
* Multi-avatar demo environment.
* Voice bot demo configurations.

### Bots & Integrations

* Added bots for:

  * Chitkara University
  * Balaji Medical College
  * DMK demo page.

### Media

* Added Lottie animation assets for avatars and conversation demos.

### Improvements

* Updated avatar images.
* Improved Try-On-Website UI.

---

## [1.1.0] - 2026-02-10

### Added

* AI demo flow improvements.
* Conversation animation controllers.
* Avatar group interactions.

### Improvements

* Widget responsiveness improvements.
* Added minimize button for widget.
* Fixed talking animation triggers.

### UI

* Updated button UI across components.

---

## [1.0.0] - 2026-02-05

### Initial Release

* Initial project setup.
* Basic website structure.
* Try-on website prototype.
* Core widget interaction concept.
