# Fjolle Murtezi - Architecture Portfolio

A modern, minimalist architecture portfolio website built with Next.js, React, and Tailwind CSS.

## Features

- 🏠 Full-screen hero with overlay text
- 📸 Project gallery with lightbox
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design
- ⚡ Optimized images with next/image
- 🔍 SEO optimized with dynamic metadata
- ✨ Smooth fade-in animations

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout with Navbar & Footer
│   ├── page.tsx            # Home page
│   ├── about/page.tsx      # About page
│   ├── contact/page.tsx    # Contact page
│   ├── projects/
│   │   ├── page.tsx        # Projects grid
│   │   └── [slug]/page.tsx # Dynamic project detail
│   └── not-found.tsx       # 404 page
├── components/
│   ├── navbar.tsx          # Navigation component
│   ├── footer.tsx          # Footer component
│   ├── hero.tsx            # Hero section component
│   ├── project-card.tsx    # Project card component
│   ├── project-gallery.tsx # Gallery with lightbox
│   ├── section-title.tsx   # Section title component
│   ├── animated-section.tsx # Animation wrapper
│   ├── theme-provider.tsx  # Theme context provider
│   └── theme-toggle.tsx    # Dark/light mode toggle
├── data/
│   ├── content.json        # Site content (editable)
│   └── projects.json       # Project data (editable)
└── public/
    └── projects/           # Project images folder
\`\`\`

## How to Add/Edit Content

### Adding a New Project

1. Open \`data/projects.json\`
2. Add a new project object:

\`\`\`json
{
  "title": "Project Name",
  "slug": "project-name",
  "year": "2024",
  "location": "City, Country",
  "coverImage": "/projects/project-name/cover.jpg",
  "gallery": [
    "/projects/project-name/1.jpg",
    "/projects/project-name/2.jpg"
  ],
  "description": "Project description here.",
  "category": "Residential"
}
\`\`\`

3. Add images to \`public/projects/project-name/\`

### Editing Site Content

Open `data/content.json` to edit (or use the Admin Dashboard when Supabase is configured):
- Hero text
- Hero background image (upload via Admin Dashboard)
- Home "Creating Spaces" image (upload via Admin Dashboard)
- About section text and About image
- Services (editable JSON list for the Services section)
- Contact information

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Theme**: next-themes
- **Images**: next/image

## Getting Started

1. Install dependencies: \`npm install\`
2. Run development server: \`npm run dev\`
3. Open [http://localhost:3000](http://localhost:3000)

## Deployment

Deploy to Vercel with one click or run \`npm run build\` for production build.

## Customization

- **Colors**: Edit CSS variables in \`app/globals.css\`
- **Typography**: Modify fonts in \`app/layout.tsx\`
- **Layout**: Adjust spacing in individual components
\`\`\`
