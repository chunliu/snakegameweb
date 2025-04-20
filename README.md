# Snake Game Web

A simple web-based Snake game built with HTML, CSS, and JavaScript, served using Node.js and Express.

## Project Structure

```
.
├── Dockerfile
├── index.html
├── package-lock.json
├── package.json
├── script.js
├── server.js
└── style.css
```

## Setup and Run Locally

1.  **Prerequisites:**
    *   Node.js (version 18 or later recommended)
    *   npm (usually comes with Node.js)

2.  **Clone the repository (if applicable):**
    ```bash
    git clone <your-repository-url>
    cd snakegameweb
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Start the server:**
    ```bash
    node server.js
    ```

5.  Open your web browser and navigate to `http://localhost:3000`.

## Build and Run with Docker

1.  **Prerequisites:**
    *   Docker

2.  **Build the Docker image:**
    From the project root directory (`snakegameweb`), run:
    ```bash
    docker build -t snake-game-web .
    ```

3.  **Run the Docker container:**
    ```bash
    docker run -p 3000:3000 snake-game-web
    ```

4.  Open your web browser and navigate to `http://localhost:3000`.