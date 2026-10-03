// Staybee — small progressive enhancements. The page works without this file.
(function () {
    // Sample occupancy calendar in the hero card: 27 of 30 nights booked
    var grid = document.getElementById('calGrid');
    if (grid) {
        var free = { 6: true, 13: true, 22: true }; // open nights
        var html = '';
        for (var d = 1; d <= 30; d++) {
            var on = !free[d];
            html += '<i class="' + (on ? 'on' : '') + '" style="animation-delay:' + (0.3 + d * 0.025).toFixed(3) + 's"></i>';
        }
        grid.innerHTML = html;
    }

    // Nav border once the page scrolls
    var nav = document.querySelector('.nav');
    if (nav) {
        var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // Copy phone number
    var copyBtn = document.getElementById('copyBtn');
    var copyText = document.getElementById('copyText');
    var number = document.getElementById('phoneNumber');
    if (copyBtn && number) {
        copyBtn.addEventListener('click', function () {
            var value = '+919833506755';
            var done = function () {
                copyBtn.classList.add('done');
                copyText.textContent = 'Copied';
                setTimeout(function () {
                    copyBtn.classList.remove('done');
                    copyText.textContent = 'Copy';
                }, 1800);
            };
            var fallback = function () {
                var range = document.createRange();
                range.selectNodeContents(number);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                copyText.textContent = 'Selected';
            };
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(value).then(done, fallback);
                } else {
                    fallback();
                }
            } catch (e) {
                fallback();
            }
        });
    }

    // Count-up for the stats strip (values are already correct in the HTML)
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var nums = document.querySelectorAll('.stat-num[data-count]');
    if (!reduce && 'IntersectionObserver' in window && nums.length) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                io.unobserve(el);
                var target = parseFloat(el.dataset.count);
                var suffix = el.dataset.suffix || '';
                var decimals = target % 1 !== 0 ? 1 : 0;
                var start = performance.now();
                var dur = 1100;
                var tick = function (now) {
                    var t = Math.min(1, (now - start) / dur);
                    var eased = 1 - Math.pow(1 - t, 3);
                    el.textContent = (target * eased).toFixed(decimals) + suffix;
                    if (t < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            });
        }, { threshold: 0.6 });
        nums.forEach(function (n) { io.observe(n); });
    }

    // Footer year
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
})();
