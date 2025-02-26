document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const conversionSettings = document.getElementById('conversionSettings');
    const progress = document.getElementById('progress');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const results = document.getElementById('results');
    const imageResults = document.getElementById('imageResults');
    const downloadAllBtn = document.getElementById('downloadAllBtn');
    const convertMoreBtn = document.getElementById('convertMoreBtn');
    const spaceSaved = document.getElementById('spaceSaved');
    const percentSaved = document.getElementById('percentSaved');
    const qualitySlider = document.getElementById('qualitySlider');
    const qualityValue = document.getElementById('qualityValue');
    const resizeToggle = document.getElementById('resizeToggle');
    const resizeOptions = document.getElementById('resizeOptions');
    const themeToggle = document.getElementById('themeToggle');
    const languageSelector = document.getElementById('languageSelector');

    // Language support
    let currentLang = 'fr';
    let translations = {};
    
    // Available languages
    const languages = {
        'en': 'English',
        'fr': 'Français',
        'es': 'Español',
        'pt': 'Português',
        'de': 'Deutsch',
        'it': 'Italiano',
        'pl': 'Polski',
        'ru': 'Русский',
        'uk': 'Українська',
        'zh': '简体中文',
        'th': 'ไทย',
        'ar': 'العربية',
        'he': 'עברית'
    };
    
    // Load translations
    async function loadTranslations() {
        try {
            const response = await fetch('js/translations.json');
            if (!response.ok) {
                throw new Error('Failed to load translations');
            }
            translations = await response.json();
            
            // Detect browser language or use saved preference
            const savedLang = localStorage.getItem('language');
            if (savedLang && translations[savedLang]) {
                currentLang = savedLang;
            } else {
                const browserLang = navigator.language.split('-')[0];
                currentLang = translations[browserLang] ? browserLang : 'en';
            }
            
            // Populate language selector
            populateLanguageSelector();
            
            // Apply translations
            setTimeout(() => {
                // Slight delay to ensure DOM is fully loaded
                applyTranslations();
            }, 0);
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to French translations
            translations = {
                'fr': {
                    title: "Convertisseur d'Images WebP",
                    subtitle: "Optimisez vos images efficacement",
                    dropZoneTitle: "Glissez et déposez vos fichiers ici",
                    dropZoneSubtitle: "Ou cliquez pour sélectionner des fichiers",
                    selectFiles: "Sélectionner des fichiers",
                    settingsTitle: "Paramètres de conversion",
                    quality: "Qualité",
                    resizeImages: "Redimensionner les images",
                    enableResize: "Activer le redimensionnement",
                    maxWidth: "Largeur max",
                    maxHeight: "Hauteur max",
                    convertButton: "Convertir {count} {imageText} en WebP",
                    image: "Image",
                    images: "Images",
                    preparing: "Préparation des fichiers...",
                    converting: "Conversion de {current} sur {total}: {filename}",
                    completed: "Conversion terminée !",
                    resultsTitle: "Résultats de conversion",
                    downloadAll: "Tout télécharger",
                    convertMore: "Convertir plus",
                    spaceSaved: "Espace total économisé",
                    original: "Original",
                    webp: "WebP",
                    reduced: "Réduit de {percent}%",
                    previewTitle: "{filename}",
                    errorUpload: "Veuillez télécharger uniquement des fichiers image",
                    downloadWebp: "Télécharger l'image WebP",
                    footer: "Convertisseur d'images WebP — Économisez de l'espace et améliorez les temps de chargement"
                }
            };
            currentLang = 'fr';
            populateLanguageSelector();
            setTimeout(applyTranslations, 0);
        }
    }
    
    // Populate language selector dropdown
    function populateLanguageSelector() {
        if (!languageSelector) return;
        
        // Clear previous options and event listeners
        languageSelector.innerHTML = '<option>🌍';
        
        // Create new options
        Object.keys(languages).forEach(langCode => {
            const option = document.createElement('option');
            option.value = langCode;
            option.textContent = languages[langCode];
            option.selected = langCode === currentLang;
            languageSelector.appendChild(option);
        });
        
        // Remove previous event listeners to avoid duplicates
        const newSelector = languageSelector.cloneNode(true);
        languageSelector.parentNode.replaceChild(newSelector, languageSelector);
        
        // Update our reference to the selector
        const updatedSelector = document.getElementById('languageSelector');
        
        // Add event listener to the new element
        if (updatedSelector) {
            updatedSelector.addEventListener('change', function() {
                currentLang = this.value;
                localStorage.setItem('language', currentLang);
                
                // Give time for the DOM to update
                setTimeout(() => {
                    // Make sure we have the translations loaded
                    if (translations[currentLang]) {
                        applyTranslations();
                    } else {
                        // Try to reload translations if the selected language is missing
                        loadTranslations();
                    }
                }, 10);
            });
        }
    }
    
    // Apply translations to the page
    function applyTranslations() {
        if (!translations[currentLang]) return;
        
        const t = translations[currentLang];
        
        // Update HTML elements with translated text
        try {
            document.title = t.title;
            const htmlElement = document.querySelector('html');
            htmlElement.setAttribute('lang', currentLang);
            
            // Set direction for RTL languages
            if (currentLang === 'ar' || currentLang === 'he') {
                htmlElement.setAttribute('dir', 'rtl');
                document.body.classList.add('rtl');
            } else {
                htmlElement.setAttribute('dir', 'ltr');
                document.body.classList.remove('rtl');
            }
            
            // Header
            const headerTitle = document.querySelector('header h1');
            const headerSubtitle = document.querySelector('header p');
            if (headerTitle) headerTitle.textContent = t.title.split(' ')[0];
            if (headerSubtitle) headerSubtitle.textContent = t.subtitle;
            
            // Drop zone
            if (dropZone && !dropZone.classList.contains('hidden')) {
                const dropZoneTitle = dropZone.querySelector('h2');
                const dropZoneSubtitle = dropZone.querySelector('p');
                const dropZoneButton = dropZone.querySelector('button');
                
                if (dropZoneTitle) dropZoneTitle.textContent = t.dropZoneTitle;
                if (dropZoneSubtitle) dropZoneSubtitle.textContent = t.dropZoneSubtitle;
                if (dropZoneButton) dropZoneButton.textContent = t.selectFiles;
            }
            
            // Conversion settings
            if (conversionSettings) {
                const settingsTitle = conversionSettings.querySelector('h2');
                const qualityLabel = document.querySelector('label[for="qualitySlider"]');
                const resizeLabel = document.querySelector('#resizeText');
                const maxWidthLabel = document.querySelector('label[for="maxWidth"]');
                const maxHeightLabel = document.querySelector('label[for="maxHeight"]');
                
                if (settingsTitle) settingsTitle.textContent = t.settingsTitle;
                if (qualityLabel) qualityLabel.textContent = t.quality;
                if (resizeLabel) resizeLabel.textContent = t.resizeImages;
                const enableResizeText = document.getElementById('enableResizeText');
                if (enableResizeText) enableResizeText.textContent = t.enableResize;
                if (maxWidthLabel) maxWidthLabel.textContent = t.maxWidth;
                if (maxHeightLabel) maxHeightLabel.textContent = t.maxHeight;
            }
            
            // Update convert button if exists
            const startBtn = document.getElementById('startConversionBtn');
            if (startBtn && files) {
                const imageText = files.length === 1 ? t.image : t.images;
                startBtn.textContent = t.convertButton
                    .replace('{count}', files.length)
                    .replace('{imageText}', imageText);
            }
            
            // Progress section
            if (progress) {
                const progressTitle = progress.querySelector('h2');
                if (progressTitle) {
                    progressTitle.textContent = t.converting.split(':')[0].replace('{current}', i+1).replace('{total}', files.length).trim();
                }
            }
            
            // Results section
            if (results) {
                const resultsTitle = results.querySelector('h2');
                const spaceSavedTitle = results.querySelector('h3');
                
                if (resultsTitle) resultsTitle.textContent = t.resultsTitle;
                if (downloadAllBtn) downloadAllBtn.textContent = t.downloadAll;
                if (convertMoreBtn) convertMoreBtn.textContent = t.convertMore;
                if (spaceSavedTitle) spaceSavedTitle.textContent = t.spaceSaved;
            }
            
            // Footer
            const footerText = document.querySelector('footer p');
            if (footerText) footerText.textContent = t.footer;
        } catch (error) {
            console.error('Error applying translations:', error);
        }
    }
    
    // Load translations at startup
    loadTranslations();

    // Theme handling
    const htmlElement = document.documentElement;
    
    // Apply the saved theme or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.classList.toggle('dark', savedTheme === 'dark');
        themeToggle.checked = savedTheme === 'dark';
    } else {
        // Check for system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        htmlElement.classList.toggle('dark', prefersDark);
        themeToggle.checked = prefersDark;
    }
    
    // Theme toggle functionality
    themeToggle.addEventListener('change', function() {
        htmlElement.classList.toggle('dark', this.checked);
        localStorage.setItem('theme', this.checked ? 'dark' : 'light');
    });

    // Conversion state
    let files = [];
    let convertedFiles = [];
    let totalOriginalSize = 0;
    let totalConvertedSize = 0;

    // Event listeners
    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);
    downloadAllBtn.addEventListener('click', downloadAllImages);
    convertMoreBtn.addEventListener('click', resetConverter);
    qualitySlider.addEventListener('input', updateQualityValue);
    
    // Custom toggle for resize option
    resizeToggle.addEventListener('change', function() {
        const dot = this.parentElement.querySelector('.dot');
        if (this.checked) {
            dot.classList.add('transform', 'translate-x-5');
        } else {
            dot.classList.remove('transform', 'translate-x-5');
        }
        toggleResizeOptions();
    });

    // Settings event listeners
    function updateQualityValue() {
        qualityValue.textContent = `${qualitySlider.value}%`;
    }

    function toggleResizeOptions() {
        resizeOptions.classList.toggle('hidden', !resizeToggle.checked);
    }

    // File handling functions
    function handleDragOver(e) {
        e.preventDefault();
        const dragZoneInner = dropZone.querySelector('div');
        dragZoneInner.classList.add('border-apple-blue', 'dark:border-apple-blue-dark', 'bg-blue-50', 'dark:bg-gray-700');
    }

    function handleDragLeave(e) {
        e.preventDefault();
        const dragZoneInner = dropZone.querySelector('div');
        dragZoneInner.classList.remove('border-apple-blue', 'dark:border-apple-blue-dark', 'bg-blue-50', 'dark:bg-gray-700');
    }

    function handleDrop(e) {
        e.preventDefault();
        const dragZoneInner = dropZone.querySelector('div');
        dragZoneInner.classList.remove('border-apple-blue', 'dark:border-apple-blue-dark', 'bg-blue-50', 'dark:bg-gray-700');
        
        if (e.dataTransfer.files.length > 0) {
            files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
            if (files.length > 0) {
                showConversionSettings();
            } else {
                showErrorNotification(translations[currentLang].errorUpload);
            }
        }
    }

    function handleFileSelect(e) {
        if (e.target.files.length > 0) {
            files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
            if (files.length > 0) {
                showConversionSettings();
            } else {
                showErrorNotification(translations[currentLang].errorUpload);
            }
        }
    }

    function showConversionSettings() {
        dropZone.classList.add('hidden');
        conversionSettings.classList.remove('hidden');
        
        const t = translations[currentLang];
        
        // Add convert button if not already present
        if (!document.getElementById('startConversionBtn')) {
            const startBtn = document.createElement('button');
            startBtn.id = 'startConversionBtn';
            startBtn.className = 'apple-button mt-8 bg-apple-blue dark:bg-apple-blue-dark text-white px-6 py-2.5 rounded-full hover:bg-opacity-90 transition-colors w-full';
            
            const imageText = files.length === 1 ? t.image : t.images;
            startBtn.textContent = t.convertButton
                .replace('{count}', files.length)
                .replace('{imageText}', imageText);
                
            startBtn.addEventListener('click', startConversion);
            conversionSettings.appendChild(startBtn);
        } else {
            const startBtn = document.getElementById('startConversionBtn');
            const imageText = files.length === 1 ? t.image : t.images;
            startBtn.textContent = t.convertButton
                .replace('{count}', files.length)
                .replace('{imageText}', imageText);
        }
    }

    function startConversion() {
        conversionSettings.classList.add('hidden');
        progress.classList.remove('hidden');
        convertFiles();
    }

    async function convertFiles() {
        totalOriginalSize = 0;
        totalConvertedSize = 0;
        convertedFiles = [];
        
        const t = translations[currentLang];
        const quality = parseInt(qualitySlider.value) / 100;
        const useResize = resizeToggle.checked;
        const maxWidth = useResize ? parseInt(document.getElementById('maxWidth').value) : null;
        const maxHeight = useResize ? parseInt(document.getElementById('maxHeight').value) : null;
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            progressText.textContent = t.converting
                .replace('{current}', i + 1)
                .replace('{total}', files.length)
                .replace('{filename}', file.name);
                
            progressBar.style.width = `${Math.round(((i) / files.length) * 100)}%`;
            
            try {
                const options = {
                    maxSizeMB: 10,
                    useWebWorker: true,
                    maxWidthOrHeight: useResize ? Math.max(maxWidth, maxHeight) : undefined,
                    quality: quality
                };
                
                // First compress the image (if needed)
                const compressedBlob = await imageCompression(file, options);
                totalOriginalSize += file.size;
                
                // Then convert to WebP
                const webpBlob = await convertToWebP(compressedBlob, quality);
                totalConvertedSize += webpBlob.size;
                
                // Preserve the original filename but change extension to .webp
                const originalName = file.name;
                const baseName = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
                const webpName = `${baseName}.webp`;
                
                const convertedFile = {
                    original: {
                        name: originalName,
                        size: file.size,
                        type: file.type,
                        url: URL.createObjectURL(file)
                    },
                    converted: {
                        name: webpName,
                        size: webpBlob.size,
                        type: 'image/webp',
                        blob: webpBlob,
                        url: URL.createObjectURL(webpBlob)
                    }
                };
                
                convertedFiles.push(convertedFile);
                
                // Update progress on each file
                await new Promise(resolve => setTimeout(resolve, 50)); // Small delay for UI update
            } catch (error) {
                console.error('Error converting file:', file.name, error);
            }
        }
        
        progressBar.style.width = '100%';
        progressText.textContent = t.completed;
        
        setTimeout(() => {
            progress.classList.add('hidden');
            displayResults();
        }, 500);
    }

    async function convertToWebP(blob, quality) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function() {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    canvas.toBlob(webpBlob => {
                        resolve(webpBlob);
                    }, 'image/webp', quality);
                };
                img.onerror = reject;
                img.src = reader.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    function displayResults() {
        results.classList.remove('hidden');
        imageResults.innerHTML = '';
        
        const t = translations[currentLang];
        const savedBytes = totalOriginalSize - totalConvertedSize;
        const savedPercent = Math.round((savedBytes / totalOriginalSize) * 100);
        
        spaceSaved.textContent = formatBytes(savedBytes);
        percentSaved.textContent = `${savedPercent}%`;
        
        convertedFiles.forEach(file => {
            const reduction = Math.round(((file.original.size - file.converted.size) / file.original.size) * 100);
            
            const resultCard = document.createElement('div');
            resultCard.className = 'apple-card bg-white dark:bg-gray-800 overflow-hidden';
            
            resultCard.innerHTML = `
                <div class="relative group">
                    <img src="${file.converted.url}" alt="${file.converted.name}" class="w-full h-48 object-cover">
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button class="preview-btn bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full p-3 mx-2 shadow-lg transform transition hover:scale-105">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="download-btn bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full p-3 mx-2 shadow-lg transform transition hover:scale-105">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="font-medium truncate" title="${file.converted.name}">${file.converted.name}</h3>
                    <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <div>${t.original}: ${formatBytes(file.original.size)}</div>
                        <div>${t.webp}: ${formatBytes(file.converted.size)}</div>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div class="bg-green-500 h-1.5 rounded-full" style="width: ${reduction}%"></div>
                    </div>
                    <div class="text-right text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                        ${t.reduced.replace('{percent}', reduction)}
                    </div>
                </div>
            `;
            
            const previewBtn = resultCard.querySelector('.preview-btn');
            const downloadBtn = resultCard.querySelector('.download-btn');
            
            previewBtn.addEventListener('click', () => previewImage(file));
            downloadBtn.addEventListener('click', () => downloadImage(file.converted));
            
            imageResults.appendChild(resultCard);
        });
    }

    function previewImage(file) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 p-4 animate-fade-in';
        
        const t = translations[currentLang];
        
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col animate-scale-in">
                <div class="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h3 class="font-semibold text-lg">${file.converted.name}</h3>
                    <button class="close-btn text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="overflow-auto p-6 flex-grow">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-medium mb-3">${t.original} (${formatBytes(file.original.size)})</h4>
                            <img src="${file.original.url}" alt="Original" class="w-full rounded-lg border dark:border-gray-700">
                            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">${file.original.name}</p>
                        </div>
                        <div>
                            <h4 class="font-medium mb-3">${t.webp} (${formatBytes(file.converted.size)})</h4>
                            <img src="${file.converted.url}" alt="WebP" class="w-full rounded-lg border dark:border-gray-700">
                            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">${file.converted.name}</p>
                        </div>
                    </div>
                </div>
                <div class="p-4 border-t dark:border-gray-700 flex justify-end">
                    <button class="apple-button bg-apple-blue dark:bg-apple-blue-dark text-white px-6 py-2.5 rounded-full hover:bg-opacity-90 transition-colors download-modal-btn">
                        ${t.downloadWebp}
                    </button>
                </div>
            </div>
        `;
        
        // Add animation styles to the modal
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes scaleIn {
                from { transform: scale(0.95); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            .animate-fade-in { animation: fadeIn 0.2s ease-out; }
            .animate-scale-in { animation: scaleIn 0.3s ease-out; }
        `;
        modal.appendChild(style);
        
        document.body.appendChild(modal);
        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.classList.add('animate-fade-out');
            setTimeout(() => modal.remove(), 200);
        });
        modal.querySelector('.download-modal-btn').addEventListener('click', () => {
            downloadImage(file.converted);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('animate-fade-out');
                setTimeout(() => modal.remove(), 200);
            }
        });
    }

    function downloadImage(file) {
        const a = document.createElement('a');
        a.href = file.url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    function downloadAllImages() {
        if (convertedFiles.length === 1) {
            downloadImage(convertedFiles[0].converted);
            return;
        }
        
        // Create a zip file if multiple images
        const zip = new JSZip();
        
        convertedFiles.forEach(file => {
            zip.file(file.converted.name, file.converted.blob);
        });
        
        zip.generateAsync({type: 'blob'}).then(content => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = 'images-webp.zip';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }

    function resetConverter() {
        // Reset the UI
        dropZone.classList.remove('hidden');
        results.classList.add('hidden');
        imageResults.innerHTML = '';
        
        // Reset state
        files = [];
        convertedFiles = [];
        fileInput.value = '';
    }

    function showErrorNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center transform transition-transform duration-300 translate-y-0';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        
        notification.innerHTML = `
            <i class="fas fa-exclamation-circle mr-2"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);
        
        // Animation in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Animation out
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    // Load JSZip dynamically for the download all feature
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
    document.head.appendChild(script);
});