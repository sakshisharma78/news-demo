/* 
 * NewsHub - Main Application Script 
 * Simulates a backend with localStorage and drives complex UI states.
 */

document.addEventListener('DOMContentLoaded', () => {

    const defaultData = [
        {
            id: 'n1',
            title: "Apple Announces New AR Hardware for 2026",
            desc: "The tech giant showcases its completely redesigned glasses, blending digital and physical worlds in a lightweight frame.",
            img: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=800&auto=format&fit=crop",
            time: "2 hours ago",
            category: "Tech",
            type: "manual",
            content: "In a highly anticipated keynote, Apple today unveiled its next-generation augmented reality hardware, aiming to transition spatial computing from bulky headsets to an everyday wearable format. The new 'Apple Glasses' feature microscopic micro-LED displays integrated seamlessly into the lenses, offering a high-resolution field of view without the form factor of traditional AR goggles."
        },
        {
            id: 'n2',
            title: "The Rise of Solo Entrepreneurs",
            desc: "How new asynchronous tools and AI are empowering single founders to build million-dollar businesses without employees.",
            img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
            time: "5 hours ago",
            category: "Business",
            type: "manual",
            content: "A fundamental shift is occurring in the startup ecosystem. Historically, building a multi-million dollar business meant scaling headcount rapidly. Today, an emerging class of 'solopreneurs' is demonstrating that code, automation, and AI agents can replace entire departments. Armed with a suite of SaaS tools, individual founders are achieving scale previously thought impossible without a large workforce."
        },
        {
            id: 'n3',
            title: "Why 'Dumb Phones' Are Making a Massive Comeback",
            desc: "Gen Z is ditching smartphones for flip phones to reclaim their attention span and escape relentless notifications.",
            img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
            time: "1 day ago",
            category: "Lifestyle",
            type: "manual",
            content: "The smartphone revolution brought us unparalleled convenience, but also the 'always-on' economy. Now, a growing counter-movement, largely driven by Gen Z, is seeing a surge in sales of classic 'dumb phones' — devices capable only of calls and basic texts. This trend represents a deliberate choice to disconnect from infinite scrolls, algorithmic feeds, and the anxiety of constant connectivity."
        },
        {
            id: 'n4',
            title: "Crypto Markets Stabilize After Regulatory Clarity",
            desc: "New frameworks provide a clear path forward for institutional adoption of digital assets globally.",
            img: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800&auto=format&fit=crop",
            time: "1 day ago",
            category: "Finance",
            type: "manual",
            content: "Following a period of prolonged volatility, cryptocurrency markets have shown marked stabilization this week after major financial regulators worldwide agreed on a unified framework for digital assets. This clarity is expected to unlock trillions in institutional capital that had previously remained sidelined due to compliance uncertainties."
        }
    ];

    const autoPool = [
        {
            id: 'auto1',
            title: "SpaceX Starship Completes First Manned Orbital Flight",
            desc: "A historic moment as the mega-rocket successfully transports a crew of four around the earth and lands safely.",
            img: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=800&auto=format&fit=crop",
            time: "Just now",
            category: "Tech",
            type: "auto",
            content: "SpaceX has just achieved a monumental milestone. For the first time, human passengers have ridden aboard the enormous Starship launch vehicle. The spacecraft orbited the Earth for several hours before conducting a flawless landing back at the Texas launch facility. This success brings the dream of manned missions to Mars one crucial step closer to reality."
        },
        {
            id: 'auto2',
            title: "Major Breakthrough in Quantum Computing Efficiency",
            desc: "Researchers have reduced quantum error rates by 90%, paving the way for commercially viable quantum computers.",
            img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
            time: "Just now",
            category: "Tech",
            type: "auto",
            content: "In a stunning leap forward for physics and computer science, a coalition of international researchers has announced a new method for stabilizing qubits, reducing error rates by over 90%. This breakthrough effectively solves one of the biggest bottlenecks in quantum computing, bringing commercial applications in cryptography and drug discovery significantly closer."
        },
        {
            id: 'auto3',
            title: "New AI Model Writes Code 10x Faster",
            desc: "The latest update to autonomous agents is fundamentally shifting how software is built around the world.",
            img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
            time: "Just now",
            category: "Tech",
            type: "auto",
            content: "The software engineering landscape is undergoing a tectonic shift. A recently released AI coding assistant has demonstrated the ability to generate complex, production-ready code blocks at ten times the speed of previous models. This advancement is prompting companies to rethink their development cycles, focusing human efforts on high-level architecture rather than boilerplate implementation."
        }
    ];

    // Data Management layer
    const getPosts = () => {
        let posts = localStorage.getItem('newsHubPosts');
        if (!posts) {
            posts = defaultData;
            localStorage.setItem('newsHubPosts', JSON.stringify(posts));
        } else {
            posts = JSON.parse(posts);
        }
        return posts;
    };

    const savePosts = (posts) => {
        localStorage.setItem('newsHubPosts', JSON.stringify(posts));
    };

    const getPostById = (id) => {
        return getPosts().find(p => p.id === id);
    };

    // Shared UI Helpers
    const createCardHTML = (data) => {
        let badgeHTML = '';
        if (data.type === 'manual') badgeHTML = `<span class="card-label manual">Editorial</span>`;
        if (data.type === 'auto') badgeHTML = `<span class="card-label auto"><i class="ph-bold ph-robot"></i> Auto Gen</span>`;

        return `
            <div class="card-img-wrapper">
                ${badgeHTML}
                <img src="${data.img}" alt="${data.title}">
            </div>
            <div class="card-meta">
                <span>${data.category}</span> • <span class="time">${data.time}</span>
            </div>
            <h3 class="card-title">${data.title}</h3>
            <p class="card-desc">${data.desc}</p>
        `;
    };

    // Routing Logic based on page
    const pathname = window.location.pathname;
    const isHomePage = pathname.includes('index.html') || pathname.endsWith('/') || pathname.endsWith('\\news demo\\');
    const isArticlePage = pathname.includes('article.html');
    const isAdminPage = pathname.includes('admin.html');
    const isCategoryPage = pathname.includes('category.html');

    // Global Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', () => {
            navbar.classList.toggle('mobile-open');
            const icon = mobileMenuBtn.querySelector('i');
            if (navbar.classList.contains('mobile-open')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });
    }

    // Advanced Scroll Animations setup (Intersection Observer)
    window.scrollObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-in').forEach(el => {
        window.scrollObserver.observe(el);
    });

    // ==========================================
    // HOMEPAGE LOGIC
    // ==========================================
    if (document.getElementById('news-feed')) {
        const newsFeed = document.getElementById('news-feed');
        const searchInput = document.getElementById('site-search');
        let currentFilter = 'All';

        const renderFeed = (filterText = '') => {
            newsFeed.innerHTML = '';
            let posts = getPosts();

            // Category Filter
            if (currentFilter !== 'All') {
                posts = posts.filter(p => p.category.toLowerCase() === currentFilter.toLowerCase());
            }

            // Search Filter
            if (filterText) {
                posts = posts.filter(p => p.title.toLowerCase().includes(filterText.toLowerCase()));
            }

            if (posts.length === 0) {
                newsFeed.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No articles found matching criteria.</p>`;
                return;
            }

            posts.forEach((news, idx) => {
                const article = document.createElement('a');
                article.href = `article.html?id=${news.id}`; // Navigation
                article.className = 'news-card animate-in';
                article.style.transitionDelay = `${(idx % 10) * 0.05}s`;
                article.innerHTML = createCardHTML(news);
                newsFeed.appendChild(article);
                if (window.scrollObserver) window.scrollObserver.observe(article);
            });
        };

        // Initialize Feed
        renderFeed();

        // Category Filter Logic
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                currentFilter = e.target.textContent;

                // Show skeleton loading effect briefly
                newsFeed.innerHTML = `
                    <div class="skeleton skeleton-card"></div>
                    <div class="skeleton skeleton-card"></div>
                `;
                setTimeout(() => renderFeed(searchInput ? searchInput.value : ''), 400);
            });
        });

        // Search Logic
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                renderFeed(e.target.value);
            });
        }

        // Hero Slider Logic
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;

        if (slides.length > 0) {
            const nextBtn = document.getElementById('slider-next');
            const prevBtn = document.getElementById('slider-prev');

            const showSlide = (index) => {
                slides.forEach(s => s.classList.remove('active'));
                slides[index].classList.add('active');
            };

            const nextSlide = () => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            };

            const prevSlide = () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            };

            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);

            // Auto slide
            setInterval(nextSlide, 5000);
        }
    }

    // ==========================================
    // ARTICLE LOGIC
    // ==========================================
    if (isArticlePage) {
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');
        const post = getPostById(articleId);

        if (post) {
            document.title = post.title + " | NewsHub";
            document.getElementById('art-title').textContent = post.title;
            document.getElementById('art-category').textContent = post.category;
            document.getElementById('art-date').textContent = "Published: " + post.time;
            document.getElementById('art-cover').src = post.img;
            document.getElementById('art-cover-img').alt = post.title;

            // Content formatting
            const contentHTML = post.content.split('\n').map(p => `<p>${p}</p>`).join('');
            document.getElementById('art-content').innerHTML = contentHTML;
        } else {
            // Document not found
            document.getElementById('art-title').textContent = "Article Not Found";
            document.getElementById('art-content').innerHTML = "<p>The requested article does not exist or has been removed.</p>";
            document.getElementById('art-cover').style.display = 'none';
        }
    }

    // ==========================================
    // ADMIN DASHBOARD LOGIC
    // ==========================================
    if (isAdminPage) {
        const adminTableBody = document.getElementById('admin-table-body');
        const publishBtn = document.getElementById('publish-btn');
        const autoNewsBtn = document.getElementById('auto-news-btn');
        const titleInput = document.getElementById('admin-title');
        const categoryInput = document.getElementById('admin-category');
        const descInput = document.getElementById('admin-desc');

        const renderAdminTable = () => {
            const posts = getPosts();
            adminTableBody.innerHTML = '';

            posts.forEach(post => {
                const tr = document.createElement('tr');
                tr.className = 'animate-in';
                const badgeClass = post.type === 'auto' ? 'badge-auto' : 'badge-manual';
                const typeText = post.type === 'auto' ? 'Auto Mined' : 'Editorial';

                tr.innerHTML = `
                    <td><strong>${post.title}</strong></td>
                    <td>${post.category}</td>
                    <td><span style="font-size:0.8rem; padding: 4px 8px; border-radius: 4px; background: ${post.type === 'auto' ? '#eff6ff' : '#fefce8'}; color: ${post.type === 'auto' ? '#2563eb' : '#a16207'}; font-weight: 600;">${typeText}</span></td>
                    <td>${post.time}</td>
                    <td class="actions">
                        <button class="edit-btn" title="Edit"><i class="ph ph-pencil-simple"></i></button>
                        <button class="delete-btn" data-id="${post.id}" title="Delete"><i class="ph ph-trash"></i></button>
                    </td>
                `;
                adminTableBody.appendChild(tr);
                if (window.scrollObserver) window.scrollObserver.observe(tr);
            });

            // Delete event listeners
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = e.currentTarget.getAttribute('data-id');
                    const updatedPosts = getPosts().filter(p => p.id !== id);
                    savePosts(updatedPosts);
                    renderAdminTable();
                });
            });
        };

        // Initial Render
        renderAdminTable();

        // Publish Manual Article
        publishBtn.addEventListener('click', () => {
            const title = titleInput.value.trim();
            const category = categoryInput.value.trim();
            const desc = descInput.value.trim();

            if (!title || !desc) {
                alert("Please provide at least a title and description.");
                return;
            }

            const originalText = publishBtn.innerHTML;
            publishBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Publishing...';
            publishBtn.disabled = true;

            setTimeout(() => {
                const newPost = {
                    id: 'n' + Date.now(),
                    title: title,
                    desc: desc,
                    img: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=800&auto=format&fit=crop", // Simulated editorial upload
                    time: "Just now",
                    category: category || "General",
                    type: "manual",
                    content: desc + " (Full article simulated content...)"
                };

                const posts = getPosts();
                posts.unshift(newPost);
                savePosts(posts);

                // Reset UI
                titleInput.value = '';
                descInput.value = '';
                publishBtn.innerHTML = originalText;
                publishBtn.disabled = false;

                renderAdminTable();
            }, 800);
        });

        // Trigger Auto Engine Mined Content
        autoNewsBtn.addEventListener('click', () => {
            // Retrieve simulated auto pool internally
            const _internalPool = JSON.parse(localStorage.getItem('newsHubAutoPool')) || autoPool;

            if (_internalPool.length === 0) {
                autoNewsBtn.textContent = "Engine Exhausted (No new feeds)";
                return;
            }

            const originalText = autoNewsBtn.innerHTML;
            autoNewsBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Engine Mining...';
            autoNewsBtn.disabled = true;

            setTimeout(() => {
                const minedPost = _internalPool.shift(); // take first
                localStorage.setItem('newsHubAutoPool', JSON.stringify(_internalPool)); // Save back

                const posts = getPosts();
                posts.unshift(minedPost);
                savePosts(posts);

                autoNewsBtn.innerHTML = originalText;
                autoNewsBtn.disabled = false;

                renderAdminTable();
            }, 1500);
        });
    }
});
