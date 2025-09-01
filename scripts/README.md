# Image Download Utility

This utility script allows you to download/export all images from the `src/Assets.xcassets/Images` directory for backup, distribution, or analysis purposes.

## Features

- ✅ **Recursive Directory Processing**: Automatically handles nested directories (e.g., `category/` subfolder)
- ✅ **Multiple Image Formats**: Supports PNG, JPG, JPEG, GIF, BMP, WebP, SVG, and PSD files
- ✅ **Directory Structure Preservation**: Maintains the original folder structure in the output
- ✅ **Detailed Reporting**: Generates a comprehensive JSON report with file details
- ✅ **Size Formatting**: Human-readable file sizes in the report
- ✅ **Error Handling**: Graceful handling of file operation errors

## Usage

### Using npm script (Recommended)
```bash
npm run download-images
```

### Direct execution
```bash
node scripts/downloadImages.js
```

## Output

The script will:

1. **Create a `downloaded_images/` directory** in the project root
2. **Copy all image files** from `src/Assets.xcassets/Images/` maintaining folder structure
3. **Generate an inventory report** at `downloaded_images/image_inventory.json`

### Sample Output Structure
```
downloaded_images/
├── image_inventory.json     # Detailed report
├── backIcon.png
├── cartIcon.png
├── couch1.png
├── category/
│   ├── chair.png
│   ├── cupboard.jpg
│   ├── sofas.png
│   └── table.png
└── loginimage/
    └── Sofa -4.jpg
```

## Inventory Report

The generated `image_inventory.json` contains:

- **Timestamp** of the operation
- **Total count** of images copied
- **Total size** in bytes and human-readable format
- **Detailed list** of each image with:
  - Filename and path
  - File size (bytes and formatted)
  - File extension
  - Last modified timestamp

### Sample Report Structure
```json
{
  "timestamp": "2025-09-01T04:57:48.984Z",
  "totalImages": 24,
  "totalSize": 44530527,
  "totalSizeFormatted": "42.47 MB",
  "images": [
    {
      "filename": "cartIcon.png",
      "path": "cartIcon.png",
      "size": 913,
      "sizeFormatted": "913 Bytes",
      "extension": ".png",
      "modified": "2025-09-01T04:57:48.938Z"
    }
    // ... more images
  ]
}
```

## Use Cases

- **Asset Backup**: Create backups of all image assets
- **Asset Distribution**: Share images with designers or team members
- **Asset Analysis**: Analyze file sizes and types for optimization
- **Migration**: Extract images for use in other projects
- **Documentation**: Generate inventory reports for project documentation

## Technical Details

- **Source Directory**: `src/Assets.xcassets/Images/`
- **Output Directory**: `downloaded_images/` (created if doesn't exist)
- **Supported Formats**: `.png`, `.jpg`, `.jpeg`, `.gif`, `.bmp`, `.webp`, `.svg`, `.psd`
- **Node.js Compatibility**: Uses standard Node.js `fs` and `path` modules

## Error Handling

The script includes robust error handling for:
- Missing source directory
- File permission errors
- Disk space issues
- Individual file copy failures (logged but doesn't stop execution)

## Integration

The script can be easily integrated into build processes, CI/CD pipelines, or automated workflows for asset management.