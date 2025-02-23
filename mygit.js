#!/usr/bin/env node

const { hashFile } = require('./rust');
const fs = require('fs');
const path = require('path');
const { program } = require('commander');



program.version('1.0.0');


program
    .command('init')
    .description('Initalize the new repository')
    .action(() => {
        const repopath = path.join(process.cwd(),'.mygit');

        if (fs.existsSync(repopath)) {
            console.log('repository already initalized.');
        } else {
            fs.mkdirSync(repopath);
            fs.mkdirSync(path.join(repopath,'objects'));
            fs.mkdirSync(path.join(repopath,'refs'));
            fs.writeFileSync(path.join(repopath,'HEAD'), 'ref: refs/heads/main\n');

            console.log('Initalized empty repository in .mygit/');
        }
    });


    program 
    .command('add <file>')
    .description('Add a file to the staging area')
    .action((file) => {
        const repoPath = path.join(process.cwd(),'.mygit');
        if(!fs.existsSync(repoPath)) {
            console.log('Not a mygit  repository');
            return;
        }

        const filePath = path.resolve(file);
        if (!fs.existsSync(filePath)) {
        console.log('File not found');
        return;
        }

        const hash = hashFile(filePath);
        console.log(`File added  with hash: ${hash}`);

    });

    program
    .command('commit')
    .description('Commit changes')
    .option('-m, --message <message>', 'Commit message')
    .action((options) => {
      if (!options.message) {
        console.log('Error: Commit message is required. Use -m "message".');
        return;
      }
  
      const repoPath = path.join(process.cwd(), '.mygit');
      const commitPath = path.join(repoPath, 'commits.log');
  
      if (!fs.existsSync(repoPath)) {
        console.log('Not a mygit repository');
        return;
      }
  
      const timestamp = new Date().toISOString();
      const commitData = `Commit: ${timestamp}\nMessage: ${options.message}\n\n`;
  
      fs.appendFileSync(commitPath, commitData);
      console.log('Commit saved.');
    });


    program.parse(process.argv);
