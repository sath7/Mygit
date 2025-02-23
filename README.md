# MyGit - A Simple Git Implementation

MyGit is a minimalistic version control system inspired by Git, built using Node.js and Rust.

## 🚀 Features
- Initialize a repository (`mygit init`)
- Add files to the repository (`mygit add <file>`)
- Commit changes (`mygit commit -m "message"`)

Archetecture overview
📂 mygit-project/
│── 📂 git-core/          # Rust library (handles hashing, storage, commits, etc.)
│   │── src/
│   │   ├── lib.rs        # Implements hashing, object storage, diffs
│   │── Cargo.toml        # Rust dependencies
│
│
│── 📂 .mygit/            # Local Git repository (similar to .git/)
│   │── 📂 objects/       # Stores hashed file contents
│   │── 📂 refs/          # Stores branches
│   │── HEAD              # Tracks the current branch
│
│── file.txt              
│── mygit.js            
│── rust.js         
│── package.json          # Node.js dependencies
│── index.js              # Main entry point
│── README.md             # Documentation

