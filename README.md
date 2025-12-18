Project name : ClubSphere

Live URL: https://moonlit-fairy-36f102.netlify.app/

Admin Email : mdkamrulhasantanbir0005@gmail.com
Admin Password : 1234As
Club Manager Email : mdkamrulhasantanbir0002@gmail.com
Club Manager Password : 1234As

Project Purpose :

ClubSphere is a full-stack web application designed to help people discover, join, and manage local clubs and events.
The platform enables members, club managers, and admins to interact through a role-based system with secure authentication, payments, and dashboards.

It solves real-world problems such as:

Managing club memberships (free & paid)
Organizing and registering for events
Role-based access control
Secure payment handling
Admin-level platform monitoring

Key Features :

1/Authentication & Authorization :

Firebase Authentication (Email/Password & Google Login)
Role-based protected routes (Admin, Club Manager, Member)
Persistent login state on page reload

2: User Roles & Dashboards :

2.1/Admin :
Manage all users (change roles)
Approve or reject club requests
View platform-wide statistics
Monitor payments and activities

2.2/ Club Manager :
Create and manage clubs
Set membership fees
Create, update, and delete events
View members and event registrations

2.3/ Member :
Browse and join clubs
Register for events
View memberships and registrations
Track payment history

3/Clubs & Events :
Server-side search and filtering
Category-based club browsing
Sorting by fee, date, and creation time
Public club & event detail pages
Dynamic featured sections on the home page

4/Payment Integration :
Stripe payment integration (test mode)
Secure membership and event payments
Automatic membership creation after payment
Payment records stored and tracked

5/Performance & UX:
TanStack Query for efficient data fetching & caching
React Hook Form for clean and validated forms
Framer Motion animations for smooth UI experience
Fully responsive design (mobile, tablet, desktop)
Friendly loaders and error handling

Important npm Packages Used :

Frontend :
react
react-router-dom
@tanstack/react-query
react-hook-form
firebase
sweetalert2
react-toastify
react-icons
framer-motion
daisyui
tailwindcss

Backend :
express
mongodb
cors
dotenv
jsonwebtoken
firebase-admin
stripe
