# WebP Image Converter

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A modern, client-side web application that converts various image formats to WebP with no server required. Optimize your images directly in the browser to save space and improve website loading times.

## 🌟 Features

- **100% Client-Side Processing**: All conversion happens in your browser - no data is sent to any server
- **Multiple Format Support**: Convert JPG, PNG, GIF, TIFF, BMP, AVIF and even existing WebP files
- **Batch Processing**: Convert multiple images at once
- **Adjustable Quality**: Fine-tune compression with a quality slider (1-100%)
- **Resize Option**: Optionally resize images to specific maximum dimensions
- **Comparison View**: See before/after results with file size reduction stats
- **Batch Download**: Download all converted images as a single ZIP file
- **Multilingual**: Supports 13 languages with auto-detection:
  - English, French, Spanish, Portuguese, German, Italian
  - Polish, Russian, Ukrainian, Chinese, Thai
  - Right-to-left languages: Arabic and Hebrew
- **Responsive Design**: Works on any device from mobile to desktop
- **Dark/Light Mode**: Automatic theme based on system preference with toggle

## 🖥️ Live Demo

Try it now: [WebP Image Converter](https://clh.agency/lab/js-webp-convertor/)

## 📋 How It Works

1. **Upload Images**: Drag & drop or select image files
2. **Configure Settings**: 
   - Adjust quality (higher = better image quality but larger file size)
   - Optionally enable resizing with custom dimensions
3. **Convert**: Process all images with a single click
4. **Review Results**: See comparison between original and WebP versions
5. **Download**: Get individual files or all images as a ZIP

## ⚙️ Technical Details

- Built with vanilla JavaScript - no frameworks or libraries for core functionality
- Uses Canvas API and `toBlob()` for WebP conversion
- Browser-image-compression library for initial optimization
- JSZip for batch downloads
- Tailwind CSS for styling with a clean Apple-inspired design
- Font Awesome for icons
- Supports all modern browsers with WebP capabilities

## 🚀 Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/l3dlp/js-webp-convertor.git
   cd js-webp-convertor
   ```

2. Serve with any static file server:
   ```bash
   # Using Node.js serve (install with: npm install -g serve)
   npx serve
   
   # Or Python's built-in HTTP server
   python -m http.server
   ```

3. Open your browser and navigate to `http://localhost:5000` (or whatever port your server uses)

### Integration

To integrate the converter into your own website:

1. Copy the `src` directory to your project
2. Include the necessary scripts and styles
3. Customize as needed (see the [Customization](#customization) section)

## 🔧 Customization

You can modify the application by:

- Editing the `main.css` file to change styles
- Adding more languages to `translations.json`
- Modifying quality defaults in the JavaScript
- Changing supported file types

## 🌐 Browser Compatibility

Works in all modern browsers that support the WebP format and the Canvas API:
- Chrome (versions 23+)
- Firefox (versions 65+)
- Edge (versions 18+)
- Safari (versions 14+)
- Opera (versions 12.1+)
- Chrome for Android & iOS Safari

## 📊 Benefits of WebP

- **Smaller File Size**: WebP images are typically 25-35% smaller than JPEGs at equivalent quality
- **Faster Loading**: Reduced file size means faster page loading and better user experience
- **SEO Benefits**: Page speed is a ranking factor for search engines
- **Transparency Support**: WebP supports alpha channel transparency like PNG but with smaller file sizes
- **Animation Support**: WebP can replace animated GIFs with much smaller file sizes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

- **l3dlp** - [GitHub](https://github.com/l3dlp)

## 🙏 Acknowledgments

- [browser-image-compression](https://github.com/Donaldcwl/browser-image-compression) for image optimization
- [JSZip](https://stuk.github.io/jszip/) for generating ZIP files
- [Font Awesome](https://fontawesome.com/) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
