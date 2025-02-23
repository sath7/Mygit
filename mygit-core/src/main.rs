use std::env;
use std::fs;
use std::path::Path;
use sha1::{Sha1, Digest};

fn main() {
    let args: Vec<String> = env::args().collect();

    // Ensure a file path argument is passed
    if args.len() < 2 {
        eprintln!("Usage: mygit_core <file_path>");
        std::process::exit(1);
    }

    let file_path = &args[1];

    // Read the file content
    let content = fs::read_to_string(file_path)
        .expect("Failed to read file");

    // Compute the SHA-1 hash
    let mut hasher = Sha1::new();
    hasher.update(content.as_bytes());
    let hash = format!("{:x}", hasher.finalize());

    // Define storage location in `.mygit/objects/`
    let repo_dir = ".mygit";
    let object_dir = format!("{}/objects/{}", repo_dir, &hash[..2]); // First 2 characters of hash
    let object_path = format!("{}/{}", object_dir, &hash[2..]); // Remaining hash

    // Create the object directory if it doesn't exist
    if !Path::new(&object_dir).exists() {
        fs::create_dir_all(&object_dir).expect("Failed to create object directory");
    }

    // Store the file contents in `.mygit/objects/`
    fs::write(&object_path, content).expect("Failed to write object file");

    // Print the hash (this will be captured by Node.js)
    println!("{}", hash);
}
