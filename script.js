document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const fernPreloader = document.getElementById('fernPreloader');
    const mainContent = document.getElementById('mainContent');
    const galleryContainer = document.getElementById('galleryContainer');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const navBtns = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const submitBtn = document.getElementById('submitArt');

    // Данные галереи с реальными изображениями
    let galleryData = [
        {
            id: 1,
            type: 'dark',
            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
            title: 'Теневой волк',
            description: 'Дух ночного леса, хранитель древних секретов',
            author: 'MoonHunter',
            date: 'Ночь кровавой луны'
        },
        {
            id: 2,
            type: 'mystic',
            url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
            title: 'Пророческий сон',
            description: 'Видение, пришедшее в лунную ночь',
            author: 'DreamWeaver',
            date: 'Время серебряных снов'
        },
        {
            id: 3,
            type: 'nocturnal',
            url: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=400&fit=crop',
            title: 'Танец теней',
            description: 'Ритуальный танец под покровом тьмы',
            author: 'ShadowDancer',
            date: 'Сумерки древних'
        },
        {
            id: 4,
            type: 'dark',
            url: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=400&fit=crop',
            title: 'Охотник в ночи',
            description: 'Одинокий страж темного леса',
            author: 'NightStalker',
            date: 'Час теней'
        },
        {
            id: 5,
            type: 'mystic',
            url: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=400&fit=crop',
            title: 'Хранитель руин',
            description: 'Древний дух забытых мест',
            author: 'RuinKeeper',
            date: 'Эпоха забытия'
        },
        {
            id: 6,
            type: 'nocturnal',
            url: 'https://images.unsplash.com/photo-1574870111867-089730e5a72b?w=400&h=400&fit=crop',
            title: 'Лунный призыв',
            description: 'Магия, рожденная под светом луны',
            author: 'MoonCaller',
            date: 'Зов ночи'
        }
    ];

    let currentFilter = 'all';

    // Инициализация
    init();

    function init() {
        initParticles();
        startFernAnimation();
        setupEventListeners();
        loadGallery();
    }

    function startFernAnimation() {
        // Анимация папоротников длится 2 секунды, потом показываем основной контент
        setTimeout(() => {
            fernPreloader.style.opacity = '0';
            setTimeout(() => {
                fernPreloader.style.display = 'none';
                mainContent.classList.remove('hidden');
            }, 1000);
        }, 2000);
    }

    function initParticles() {
        const canvas = document.getElementById('particleCanvas');
        const ctx = canvas.getContext('2d');

        // Устанавливаем размер canvas
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Создаем частицы
        const particles = [];
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                color: `rgba(139, 92, 246, ${Math.random() * 0.3 + 0.1})`
            });
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                // Обновляем позицию
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Возвращаем частицы на canvas
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

                // Рисуем частицу
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
            });

            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }

    function loadGallery() {
        const filteredData = currentFilter === 'all'
            ? galleryData
            : galleryData.filter(item => item.type === currentFilter);

        renderGallery(filteredData);
    }

    function renderGallery(items) {
        if (items.length === 0) {
            galleryContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                    <h3 style="color: #8b5cf6; margin-bottom: 1rem;">🌑 Безмолвие</h3>
                    <p>Тени еще не проявились... Будь первым, кто призовет видение!</p>
                </div>
            `;
            return;
        }

        galleryContainer.innerHTML = items.map(item => `
            <div class="gallery-item" data-id="${item.id}">
                <img src="${item.url}" alt="${item.title}" loading="lazy">
                <div class="item-info">
                    <h4 style="color: #8b5cf6;">${item.title}</h4>
                    <p style="font-size: 0.9rem; margin: 0.5rem 0;">${item.description}</p>
                    <div style="font-size: 0.8rem; opacity: 0.7;">
                        <span>by ${item.author}</span> |
                        <span>${item.date}</span>
                    </div>
                </div>
            </div>
        `).join('');

        // Добавляем обработчики клика
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const itemId = parseInt(item.dataset.id);
                const galleryItem = galleryData.find(i => i.id === itemId);
                openModal(galleryItem);
            });
        });
    }

    function openModal(item) {
        modalImage.src = item.url;
        modalImage.alt = item.title;
        modalImage.style.display = 'block';

        // Обновляем информацию в модальном окне
        document.getElementById('modalTitle').textContent = item.title;
        document.getElementById('modalDescription').textContent = item.description;
        document.getElementById('modalAuthor').textContent = `Призвал: ${item.author}`;
        document.getElementById('modalDate').textContent = `В ночь: ${item.date}`;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function setupEventListeners() {
        // Фильтрация
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                currentFilter = filter;

                // Обновляем активную кнопку
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Фильтруем галерею
                loadGallery();
            });
        });

        // Навигация
        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const section = btn.dataset.section;

                // Обновляем активную кнопку
                navBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Показываем нужную секцию
                contentSections.forEach(s => s.classList.remove('active'));
                document.getElementById(section).classList.add('active');
            });
        });

        // Модальное окно
        closeModal.addEventListener('click', closeModalHandler);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModalHandler();
        });

        // Загрузка файлов
        uploadArea.addEventListener('click', () => fileInput.click());
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#8b5cf6';
            uploadArea.style.background = 'rgba(139, 92, 246, 0.1)';
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = 'rgba(139, 92, 246, 0.5)';
            uploadArea.style.background = 'transparent';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'rgba(139, 92, 246, 0.5)';
            uploadArea.style.background = 'transparent';

            const files = e.dataTransfer.files;
            handleFiles(files);
        });

        fileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            handleFiles(files);
        });

        submitBtn.addEventListener('click', handleArtSubmit);

        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModalHandler();
            }
        });
    }

    function closeModalHandler() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    uploadArea.innerHTML = `
                        <img src="${e.target.result}" style="max-width: 200px; max-height: 200px; border-radius: 10px; border: 2px solid #8b5cf6;">
                        <p style="margin-top: 1rem;">${file.name}</p>
                        <small>Видение готово к призыву!</small>
                    `;
                };
                reader.readAsDataURL(file);
            } else {
                alert('Только изображения могут быть призваны в наше логово!');
            }
        }
    }

    function handleArtSubmit() {
        const title = document.getElementById('artTitle').value;
        const category = document.getElementById('artCategory').value;
        const description = document.getElementById('artDescription').value;

        if (!title) {
            alert('Твое видение должно иметь имя!');
            return;
        }

        // В реальном приложении здесь был бы AJAX запрос
        alert(`Видение "${title}" успешно призвано в логово! 🌙\n\nСила твоего искусства пополнила archives теней.`);

        // Сбрасываем форму
        document.getElementById('artTitle').value = '';
        document.getElementById('artDescription').value = '';
        uploadArea.innerHTML = `
            <div class="upload-icon">🌌</div>
            <p>Брось сюда свой свиток с изображением</p>
            <small>Только для посвященных: PNG, JPG, WEBP</small>
        `;
    }
});