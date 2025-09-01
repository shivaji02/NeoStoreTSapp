/**
 * Image Download Utility
 * Downloads/exports all images from src/Assets.xcassets/Images directory
 */

const fs = require('fs');
const path = require('path');

// Source and destination paths
const SOURCE_DIR = path.join(__dirname, '..', 'src', 'Assets.xcassets', 'Images');
const DOWNLOAD_DIR = path.join(__dirname, '..', 'downloaded_images');

/**
 * Creates directory if it doesn't exist
 * @param {string} dirPath - Directory path to create
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

/**
 * Copies a file from source to destination
 * @param {string} sourcePath - Source file path
 * @param {string} destPath - Destination file path
 */
function copyFile(sourcePath, destPath) {
  try {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied: ${path.basename(sourcePath)}`);
    return true;
  } catch (error) {
    console.error(`Error copying ${sourcePath}:`, error.message);
    return false;
  }
}

/**
 * Recursively processes directory and copies image files
 * @param {string} sourceDir - Source directory path
 * @param {string} destDir - Destination directory path
 * @param {string} relativePath - Relative path for maintaining structure
 */
function processDirectory(sourceDir, destDir, relativePath = '') {
  const items = fs.readdirSync(sourceDir);
  let copiedCount = 0;

  items.forEach(item => {
    const sourcePath = path.join(sourceDir, item);
    const stats = fs.statSync(sourcePath);

    if (stats.isDirectory()) {
      // Process subdirectory
      const newRelativePath = path.join(relativePath, item);
      const newDestDir = path.join(destDir, newRelativePath);
      ensureDirectoryExists(newDestDir);
      copiedCount += processDirectory(sourcePath, destDir, newRelativePath);
    } else if (stats.isFile()) {
      // Check if it's an image file
      const ext = path.extname(item).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp', '.svg', '.psd'].includes(ext)) {
        const destPath = path.join(destDir, relativePath, item);
        if (copyFile(sourcePath, destPath)) {
          copiedCount++;
        }
      }
    }
  });

  return copiedCount;
}

/**
 * Generates a report of all copied images
 * @param {string} destDir - Destination directory path
 */
function generateImageReport(destDir) {
  const reportPath = path.join(destDir, 'image_inventory.json');
  const images = [];

  function scanDirectory(dir, basePath = '') {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        scanDirectory(fullPath, path.join(basePath, item));
      } else {
        const ext = path.extname(item).toLowerCase();
        if (['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp', '.svg', '.psd'].includes(ext)) {
          images.push({
            filename: item,
            path: path.join(basePath, item).replace(/\\/g, '/'),
            size: stats.size,
            sizeFormatted: formatBytes(stats.size),
            extension: ext,
            modified: stats.mtime.toISOString()
          });
        }
      }
    });
  }

  scanDirectory(destDir);

  const report = {
    timestamp: new Date().toISOString(),
    totalImages: images.length,
    totalSize: images.reduce((sum, img) => sum + img.size, 0),
    totalSizeFormatted: formatBytes(images.reduce((sum, img) => sum + img.size, 0)),
    images: images.sort((a, b) => a.path.localeCompare(b.path))
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`Generated report: ${reportPath}`);
  return report;
}

/**
 * Formats bytes to human readable format
 * @param {number} bytes - Number of bytes
 * @returns {string} Formatted size string
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Main download function
 */
function downloadImages() {
  console.log('🖼️  Image Download Utility');
  console.log('============================');
  
  // Check if source directory exists
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Source directory not found: ${SOURCE_DIR}`);
    process.exit(1);
  }

  // Create destination directory
  ensureDirectoryExists(DOWNLOAD_DIR);

  console.log(`📂 Source: ${SOURCE_DIR}`);
  console.log(`📁 Destination: ${DOWNLOAD_DIR}`);
  console.log('');

  // Process and copy images
  const startTime = Date.now();
  const copiedCount = processDirectory(SOURCE_DIR, DOWNLOAD_DIR);
  const endTime = Date.now();

  console.log('');
  console.log(`✅ Successfully copied ${copiedCount} image files`);
  console.log(`⏱️  Time taken: ${endTime - startTime}ms`);

  // Generate report
  const report = generateImageReport(DOWNLOAD_DIR);
  
  console.log('');
  console.log('📊 Summary Report:');
  console.log(`   Total images: ${report.totalImages}`);
  console.log(`   Total size: ${report.totalSizeFormatted}`);
  console.log(`   Report saved: image_inventory.json`);
  console.log('');
  console.log('✨ Image download completed successfully!');
}

// Run the download if script is executed directly
if (require.main === module) {
  downloadImages();
}

module.exports = {
  downloadImages,
  processDirectory,
  generateImageReport
};