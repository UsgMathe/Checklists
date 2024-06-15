# React + TypeScript + Vite + JSON Server

A simple To-Do List project using React, TypeScript, Vite, and JSON Server.

## Overview

This project is a basic To-Do List application built with modern web development technologies. It includes a React front-end written in TypeScript, powered by Vite, and uses JSON Server to simulate a REST API for managing to-do items.

## Prerequisites

Make sure you have the following software installed on your system:
- [Node.js](https://nodejs.org/) (which includes npm)
- [Git](https://git-scm.com/)

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/UsgMathe/To-Do-List.git
cd Checklists
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

Start the Vite development server:

```bash
npm run dev
```

This will start the development server and you can view the application by navigating to `http://localhost:5173` in your browser.

### 4. Run the JSON Server

In a separate terminal, start the JSON Server to simulate a REST API:

```bash
npx json-server db.json
```

The JSON Server will run on `http://localhost:3000`.

## db.json

Here is an example of the structure of the db.json file used by JSON Server:

```json
{
  "checklists": [
    {
      "id": "example-id",
      "title": "Example Checklist",
      "items": [
        {
          "id": "item-id-1",
          "description": "Example item 1",
          "checked": true
        },
        {
          "id": "item-id-2",
          "description": "Example item 2",
          "checked": false
        }
      ]
    }
  ]
}
```

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [JSON Server](https://github.com/typicode/json-server/tree/v0)
