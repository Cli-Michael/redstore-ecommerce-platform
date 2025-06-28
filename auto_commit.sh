#!/bin/bash

echo "⚙️  Starting Git cleanup and auto commit process..."

# Step 1: Remove nested .git folders
if [ -d "frontend/.git" ]; then
    rm -rf frontend/.git
    echo "🧹 Removed .git from frontend"
fi

if [ -d "backend/.git" ]; then
    rm -rf backend/.git
    echo "🧹 Removed .git from backend"
fi

# Step 2: Init Git in root if not done
if [ ! -d ".git" ]; then
    git init
    echo "✅ Initialized git repository in root"
else
    echo "✔️ Git already initialized at root"
fi

##############
# BACKEND
##############
if [ -d "backend" ]; then
    cd backend || exit 1

    git add .env .gitignore package.json package-lock.json README.md LICENSE .pnp.loader.mjs 2>/dev/null
    git commit -m "chore(backend): update env and project configuration files" 2>/dev/null

    [ -f src/server.js ] && git add src/server.js && git commit -m "feat(backend): update main server entry point"

    [ -d src/config ] && git add src/config/* && git commit -m "chore(backend): update configuration (cloudinary, db, JWT, etc.)"
    [ -d src/controllers ] && git add src/controllers/* && git commit -m "feat(backend): update and organize route controllers"
    [ -d src/middleware ] && git add src/middleware/* && git commit -m "feat(backend): update custom middlewares for auth, session, logging"
    [ -d src/models ] && git add src/models/* && git commit -m "feat(backend): update mongoose models (User, Product, Order, etc.)"
    [ -d src/routes ] && git add src/routes/* && git commit -m "feat(backend): update API route definitions"
    [ -d src/utils ] && git add src/utils/* && git commit -m "chore(backend): update utility modules (mailer, etc.)"
    [ -d src/data ] && git add src/data/* && git commit -m "chore(backend): update data scripts (mock products, etc.)"

    cd ..
    [ -d testscripts ] && git add testscripts/* && git commit -m "chore(backend): update dev/test scripts (migration, schema, etc.)"
else
    echo "❌ backend folder not found"
fi

##############
# FRONTEND
##############
if [ -d "frontend" ]; then
    cd frontend || exit 1

    # Ensure dist/ is ignored
    if ! grep -qx "dist/" .gitignore; then
        echo "dist/" >> .gitignore
        echo "📄 Added dist/ to .gitignore"
    fi

    git add .env .gitignore package.json package-lock.json README.md LICENSE vite.config.js eslint.config.js index.html favicon.svg 2>/dev/null
    git commit -m "chore(frontend): update env, config, and setup files" 2>/dev/null

    git add src/App.css src/index.css src/main.jsx src/App.jsx 2>/dev/null
    git commit -m "style(frontend): update global styles and entry files" 2>/dev/null

    [ -f src/api/axiosInstance.js ] && git add src/api/axiosInstance.js && git commit -m "feat(frontend): configure axios instance for API calls"
    [ -d src/context ] && git add src/context/* && git commit -m "feat(frontend): add React Contexts for state management"
    [ -d src/utils ] && git add src/utils/* && git commit -m "feat(frontend): add utility functions (auth, scroll, etc.)"
    [ -d src/assets/css ] && git add src/assets/css/* && git commit -m "style(frontend): update component-level CSS-in-JS styles"
    [ -d src/components ] && git add src/components/* && git commit -m "feat(frontend): update reusable UI components"
    [ -d src/pages ] && git add src/pages/* && git commit -m "feat(frontend): implement or update route-level pages"
    [ -d public ] && git add public/* && git commit -m "chore(frontend): add/update public images and assets"

    # Don't commit dist/ even if it exists — it's ignored
    cd ..
else
    echo "❌ frontend folder not found"
fi

echo "✅ Auto commit complete for both backend and frontend"
