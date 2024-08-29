
# Gate Access Manager - Web Application

![Gate Access Manager](https://github.com/ciaran-finnegan/gate-controller/blob/master/redacted_gate_access_manager.jpg)

## Overview

The Gate Access Manager is a web-based front end application that allows users to manage access to a vehicle gate system. The application is built using Refine and Ant Design for the front end, with Supabase serving as the backend for database management and authentication. Netlify is used for hosting the application, ensuring seamless and fast deployment.

A separate project [Gate Controller](https://github.com/ciaran-finnegan/gate-controller/blob/master/README.md) which is designed to run on a raspberry pi or equivalent device is used to process images received from a CCTV cameras, control the gate system and communicate with the web application database. The Gate Controller project is designed to be used in conjunction with the Gate Access Manager web application.

An alternative AWS hosted version can be found [here](https://github.com/ciaran-finnegan/License-Plate-Recognition-Notifier). This version requires a GSM Gate Opening Relay device, and may introduce some additional network latency resulting in the gate opening more slowly for authorised vehicles.

### Key Features

- **Vehicle Access Log**: View a detailed log of all vehicle entries, including licence plate recognition and timestamps.
- **Manage Vehicles**: Add, update, or remove authorised vehicles directly through the application interface.y 
- **Manage Schedules**: Configure access schedules for specific times or days to control when vehicles can enter.
- **Analytics**: Gain insights into gate usage with detailed analytics, including patterns of vehicle access.

## How It Works

1. **User Authentication**: The application uses Supabase for user authentication, allowing secure access to manage vehicles, schedules, and view logs.

2. **Database Management**: All vehicle data, schedules, and access logs are stored in a Supabase PostgreSQL database. Changes made in the application are reflected instantly in the backend.

3. **Frontend Interaction**: The application uses Refine and Ant Design to provide a user-friendly and responsive interface. Users can manage vehicle access easily through a series of intuitive menus and options.

4. **Deployment and Hosting**: The application is hosted on Netlify, which handles continuous deployment directly from the GitHub repository. Every push to the repository triggers a new build and deploys the latest version of the application.

## Prerequisites

To set up the application, you need:

- A Supabase account with access to a PostgreSQL database for storing vehicle data, access logs, and user information.
- A Netlify account for hosting and deploying the front end of the application.
- API keys and environment variables configured in both Supabase and Netlify.

## Installation and Setup

### 1. Clone the Repository

Clone the web application repository to your local machine:

```bash
git clone https://github.com/ciaran-finnegan/gate-controller-refine-front-end
cd gate-controller-refine-front-end
```

### 2. Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project to configure the necessary environment variables. These typically include:

```plaintext
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

Make sure you replace the placeholder values with your actual Supabase credentials.

### 4. Start the Development Server

To start the application in development mode, run:

```bash
npm run dev
```

The application will open in your default web browser at `http://localhost:5173`.

### 5. Deploying to Netlify

1. Push the repository to GitHub (or your preferred Git provider).
2. Log in to your Netlify account and click "New site from Git."
3. Connect your GitHub repository to Netlify.
4. Configure the build settings (usually, the default settings are sufficient).
5. Click "Deploy Site."

Netlify will automatically build and deploy your application. Any future changes pushed to the GitHub repository will trigger a new build and deploy.

## Maintenance

- **Regular Updates**: Keep the front end dependencies up to date to benefit from the latest features and security patches.
- **Monitor Logs**: Regularly check application logs in Supabase and Netlify to monitor for errors or unusual activity.
- **Manage Access**: Use the web application's admin features to keep the authorised vehicle list and access schedules current.

## Useful Resources

- [Refine Documentation](https://refine.dev/docs) - Learn more about building applications with Refine.
- [Ant Design](https://ant.design/) - Ant Design components used in the application.
- [Supabase](https://supabase.io/) - Backend services for database and authentication.
- [Netlify](https://www.netlify.com/) - Hosting platform for continuous deployment and hosting.


## Acknowledgements and thanks
- [Kaja](https://github.com/kaja-osojnik) for web application styling.
- The [IPCamTalk Forum](https://ipcamtalk.com) community for guidance on configuring Hikvision smart event detection policies.
- The folks at [Plate Recognizer](https://platerecognizer.com/) for providing free access to their API for personal use
- The folks at [Supabase](https://supabase.io/) for providing a free tier for their services
- The folks at [Netlify](https://netlify.com) for providing a free tier for their services
- Civan Özseyhan and the team at [Refine](https://refine.dev/about/) for their commitment to open source and simplifying web application development for admin panels and CRUD applications.
- And a special thanks to the awesome [Ryan Glover](http://www.ryanglover.net/information) for his guidance and encouragement on earlier projects and imparting his pragmatic philosophy on independent software development, his many open source contributions and switching me on to the fun of hobby software development.

