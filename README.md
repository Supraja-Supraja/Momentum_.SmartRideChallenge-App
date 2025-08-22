# **🚀 Momentum – Smart Ride Challenge App**

## **Momentum is a Flutter-based multi-platform app (Web + Mobile) designed to gamify user engagement with weekly challenges and rewards. The app demonstrates how to track progress, motivate users with streak-based challenges, and enhance retention through modern UI/UX.**

🔗 Live Demo / Preview: Momentum on Lovable

### **📌 Features**
### **🔑 Authentication & User Profile**

Mock login system (email & password).

User profile with editable details (name, picture).

Persistent data storage using shared_preferences.

### **🏆 Smart Weekly Challenges**

Main feature: “Complete 5 rides this week → Earn Double Rewards!”

Dynamic progress bar showing completed rides out of 5.

Ride simulation button (“Start Ride”).

Automatic success celebration with confetti & animations.

Challenge reset after completion with countdown for next week.

### **👤 Profile Section**

View total rides completed.

Track challenge history & achievements.

### **⚙️ Settings**

Dark/Light mode toggle.

Reset progress option.

About app section.

### **🎨 UI/UX**

Built with Material 3 design system.

Smooth page transitions and animations.

Mobile + Web responsive.

### **🛠️ Tech Stack**

Framework: Flutter 3.x (Web + Mobile support)

Language: Dart

State Management: Provider / setState (depending on build)

Storage: Shared Preferences (local persistence)

UI Enhancements: Material 3, flutter_animate, rive animations

### **📂 Project Structure**
lib/
 ┣ screens/
 ┃ ┣ login_screen.dart
 ┃ ┣ home_screen.dart
 ┃ ┣ profile_screen.dart
 ┃ ┣ settings_screen.dart
 ┣ widgets/
 ┃ ┣ progress_bar.dart
 ┃ ┣ ride_button.dart
 ┃ ┗ confetti_animation.dart
 ┣ main.dart

### **🚀 Getting Started**
Prerequisites

Install Flutter SDK

Any IDE (VS Code / Android Studio)

Run Locally
```sh
git clone https://github.com/<your-username>/momentum.git
cd momentum
flutter pub get
flutter run -d chrome   # for web
flutter run             # for mobile
```
Build Web Release
flutter build web

Deploy on Firebase Hosting or GitHub Pages.

### **🌟 Demo Flow**

Login with any credentials.

Start rides → track progress → watch the progress bar fill.

On completing 5 rides → enjoy Congratulations screen + Rewards.

Explore Profile & Settings.

### **📸 Screenshots (Optional if you add)**

Login Screen

Weekly Challenge Screen

Reward Celebration Screen

Profile & Settings

### **📌 Future Enhancements**

Backend integration (Firebase / Supabase).

Real ride tracking via GPS.

Leaderboard with social engagement.

Push notifications for reminders.
