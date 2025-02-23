use sha1::{Sha1,Digest};
use std::fs;
use std::path::Path;

pub fn hash_file(path: &str) -> String {
    let content = fs::read_to_string(path).expect("Failed to read file");
    let mut hasher = Sha1::new();
    hasher.update(content.as_bytes());
    format!("{:x}",hasher.finalize())
}

pub fn store_file(path: &str, repo_dir: &str) {
    let hash = hash_file(path);
    let object_dir = format!("{}/objects/{}",repo_dir, &hash[..2]);
    let object_path = format!("{}/{}",object_dir,&hash[2..]);

    if !Path::new(&object_dir).exists(){
        fs::create_dir_all(&object_dir).expect("Failed to create object directory");

    }

    let content = fs::read_to_string(path).expect("failed to read file");
    fs::write(&object_path,content).expect("failed to write object file");
    println!("File stored with hash: {}",hash);

}



