import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Create path to posts.js from current working directory
const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file name under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove '.md' from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Create full path to a given file
    const fullPath = path.join(postsDirectory, fileName);
    // Read file contents
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}
