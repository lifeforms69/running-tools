document.addEventListener('DOMContentLoaded', () => {
    // --- Title Screen Logic ---
    const titleScreen = document.getElementById('title-screen');
    const appContainer = document.querySelector('.app-container');

    titleScreen.addEventListener('click', () => {
        titleScreen.classList.add('hidden');
        appContainer.classList.remove('hidden');
    });

    // --- Tab Navigation Logic ---
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    const headerTitle = document.getElementById('header-title');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            // Add active class to clicked
            item.classList.add('active');
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');

            // Update Header Title
            headerTitle.textContent = item.getAttribute('data-title');

            // Toggle Theme
            if (targetId === 'tab-gradient') {
                document.body.classList.add('light-theme');
            } else {
                document.body.classList.remove('light-theme');
            }
        });
    });

    // --- Pace Converter Logic ---
    const speedInput = document.getElementById('speed-input');
    const paceMinInput = document.getElementById('pace-min-input');
    const paceSecInput = document.getElementById('pace-sec-input');
    const paceResultMessage = document.getElementById('pace-result-message');
    let isPaceUpdating = false;

    function updateSpeedFromPace() {
        if (isPaceUpdating) return;
        isPaceUpdating = true;

        const min = parseFloat(paceMinInput.value) || 0;
        const sec = parseFloat(paceSecInput.value) || 0;

        if (min === 0 && sec === 0) {
            speedInput.value = '';
            updatePaceMessage('값을 입력해주세요');
            isPaceUpdating = false;
            return;
        }

        const totalMinutes = min + (sec / 60);
        if (totalMinutes > 0) {
            const speed = 60 / totalMinutes;
            speedInput.value = speed.toFixed(2);
            updatePaceMessage(`시속 ${speed.toFixed(2)} km/h`);
        } else {
            speedInput.value = '';
        }
        isPaceUpdating = false;
    }

    function updatePaceFromSpeed() {
        if (isPaceUpdating) return;
        isPaceUpdating = true;

        const speed = parseFloat(speedInput.value) || 0;

        if (speed <= 0) {
            paceMinInput.value = '';
            paceSecInput.value = '';
            updatePaceMessage('값을 입력해주세요');
            isPaceUpdating = false;
            return;
        }

        const paceDecimal = 60 / speed;
        const paceMin = Math.floor(paceDecimal);
        const paceSec = Math.round((paceDecimal - paceMin) * 60);

        if (paceSec === 60) {
            paceMinInput.value = paceMin + 1;
            paceSecInput.value = 0;
        } else {
            paceMinInput.value = paceMin;
            paceSecInput.value = paceSec;
        }

        updatePaceMessage(`페이스 ${paceMinInput.value}'${paceSecInput.value}"`);
        isPaceUpdating = false;
    }

    function updatePaceMessage(msg) {
        paceResultMessage.textContent = msg;
        if (msg !== '값을 입력해주세요') {
            paceResultMessage.classList.add('active-result');
        } else {
            paceResultMessage.classList.remove('active-result');
        }
    }

    speedInput.addEventListener('input', updatePaceFromSpeed);
    paceMinInput.addEventListener('input', updateSpeedFromPace);
    paceSecInput.addEventListener('input', updateSpeedFromPace);


    // --- Gradient Converter Logic ---
    const distanceInput = document.getElementById('distance-input');
    const heightInput = document.getElementById('height-input');
    const gradientValue = document.getElementById('gradient-value');
    const slopePath = document.getElementById('slope-path');
    const runnerMarker = document.getElementById('runner-marker');

    function updateGradient() {
        const distance = parseFloat(distanceInput.value) || 0;
        const height = parseFloat(heightInput.value) || 0;

        let gradient = 0;
        if (distance > 0) {
            gradient = (height / distance) * 100;
            gradientValue.textContent = gradient.toFixed(1);
        } else {
            gradientValue.textContent = '0.0';
        }

        updateVisualizer(gradient);
    }

    function updateVisualizer(gradient) {
        // Visualizer dimensions
        const width = 300;
        const baseHeight = 140; // Y coordinate of the base line

        // Calculate rise based on gradient
        // Limit max visual gradient to 20% for better visualization scaling
        // If gradient is 10%, rise is 10 units per 100 units.
        // In 300px width, 10% gradient means 30px rise.
        // Let's amplify it slightly for visual effect if needed, but accurate is better.

        // Cap visual gradient at 25% to prevent going out of bounds
        const visualGradient = Math.min(gradient, 25);

        const rise = (width * visualGradient) / 100;
        const peakY = baseHeight - rise;

        // Update SVG Path
        // Start bottom-left (0, 140), Go to top-right (300, peakY), Go to bottom-right (300, 140)
        const pathD = `M0,${baseHeight} L${width},${peakY} L${width},${baseHeight} Z`;
        slopePath.setAttribute('d', pathD);

        // Update Runner Position (Animation)
        // Let's place the runner in the middle of the slope
        const runnerX = width / 2;
        const runnerY = baseHeight - (rise / 2);

        // Calculate rotation angle
        // tan(theta) = gradient / 100
        const angleRad = Math.atan(visualGradient / 100);
        const angleDeg = -angleRad * (180 / Math.PI); // Negative for CSS rotation (counter-clockwise)

        // Adjust runner position to sit ON the line
        // The emoji is text, so we need to offset it slightly up
        runnerMarker.style.transform = `translate(${runnerX}px, ${runnerY - 140}px) rotate(${angleDeg}deg)`;
        // Note: translateY is relative to initial position (bottom: 10px which is y=140)
        // So we translate relative to that. 
        // Actually, let's set left/bottom in CSS to 0/0 and use translate for everything or keep it simple.

        // Simplified approach:
        // Runner is at bottom: 10px, left: 0.
        // We want to move it to x=150, y = calculated height.
        // The y in CSS 'bottom' terms is 10 + (rise/2).
        // But we are using transform.

        runnerMarker.style.left = `${runnerX}px`;
        runnerMarker.style.bottom = `${10 + (rise / 2)}px`;
        runnerMarker.style.transform = `translate(-50%, 50%) rotate(${angleDeg}deg)`;
        // translate(-50%, 50%) centers the anchor point roughly at the feet
    }

    distanceInput.addEventListener('input', updateGradient);
    heightInput.addEventListener('input', updateGradient);
});
