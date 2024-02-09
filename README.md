## Expense Tracker App

Overview
The Expense Tracker is a web application designed to help users manage their expenses efficiently. This application utilizes modern web technologies, including Next.js for the frontend, Firebase for backend services, and various React libraries for an enhanced user experience.

Features
User Authentication: Utilizes Firebase for secure user authentication, ensuring user data privacy and personalized experiences.

Expense Tracking: Allows users to record and categorize their expenses, providing an overview of spending patterns over time.

Interactive Charts: Integrates Chart.js and React Chartjs-2 for visually appealing charts that present expense data in an easy-to-understand format.

Form Handling: Leverages React Hook Form for efficient and flexible form handling, making it easy for users to input and edit expense details.

Responsive Design: Utilizes React Responsive and Tailwind CSS for a responsive and mobile-friendly design, ensuring a seamless experience across devices.

## Before you start

Node.js
npm or yarn
Firebase account (for backend services)
Getting Started
Clone the repository:

git clone https://github.com/robin-sevelin/expense-tracker
cd expense-tracker
Install dependencies:

npm install
Set up Firebase:

Create a Firebase project and obtain the configuration details.

Create a .env file in the project root and add the Firebase configuration:

NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
Run the development server:

npm run dev
Open http://localhost:3000 in your browser to view the application.

## Scripts

npm run dev: Start the development server.
npm run build: Build the production-ready application.
npm start: Start the production server.
npm run lint: Run linting using Next.js lint.
npm test: Run Jest tests.
npm run test:watch: Run Jest tests in watch mode.
Technologies Used
Next.js
React
Firebase
Chart.js
React Hook Form
Jest
Tailwind CSS

## Images

![image](/documentation/image-1.png)
![image](/documentation/image-2.png)
![image](/documentation/image-3.png)
![image](/documentation/image-4.png)
![image](/documentation/image-5.png)

## Live Demo

[Demo](https://expense-tracker-robin-sevelins-projects.vercel.app/)
