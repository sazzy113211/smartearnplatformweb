<script>
    const storedUser = localStorage.getItem("smartEarnUser") || "User";
    document.getElementById("userName").textContent = storedUser;

    // --- 100 NAMES & AMOUNTS DATA ---
    const names = [
        "Obi", "Musa", "Chidi", "Amina", "Blessing", "Emeka", "Fatima", "Samuel", "Grace", "Ibrahim", 
        "Tunde", "Chioma", "Zainab", "Victor", "Joy", "Uche", "Abubakar", "Precious", "Okon", "Yusuf",
        "Ade", "Bisi", "Chinedu", "Dada", "Efe", "Femi", "Gideon", "Hassan", "Ifeanyi", "Jide",
        "Kalu", "Ladi", "Modupe", "Ngozi", "Olu", "Patience", "Quasim", "Ralia", "Seyi", "Taiwo",
        "Usman", "Vicky", "Wale", "Xavier", "Yemi", "Zack", "Amaka", "Buchi", "Cynthia", "Danjuma",
        "Ebele", "Favour", "Gloria", "Hauwa", "Isah", "Janet", "Kunle", "Linda", "Mimi", "Nuhu",
        "Osas", "Philip", "Queen", "Rose", "Segun", "Titilayo", "Umar", "Vivian", "Williams", "Yaro",
        "Zubairu", "Anietie", "Bassey", "Collins", "Doris", "Ekaette", "Friday", "Godwin", "Hope", "Idris",
        "Junior", "Kingsley", "Loveth", "Monday", "Nosa", "Ogechi", "Peter", "Rachael", "Sunday", "Tope",
        "Ujunwa", "Verity", "Wisdom", "Yakubu", "Zita", "Abiodun", "Buhari", "Clara", "Daniel", "Ezekiel"
    ];

    // --- REQUEST PERMISSION ON LOAD ---
    window.addEventListener('load', () => {
        if ("Notification" in window) {
            Notification.requestPermission();
        }
        
        // Restore balance if claimed
        if(localStorage.getItem("reversed") === "true") {
            document.getElementById("balance").innerText = "₦100,000";
            document.getElementById("claimBtn").disabled = true;
            document.getElementById("claimBtn").innerText = "Claimed";
        }
    });

    // --- IMAGE SLIDER LOGIC ---
    let currentSlide = 0;
    const slider = document.getElementById('mainSlider');
    function nextSlide() {
        currentSlide = (currentSlide + 1) % 4;
        slider.style.transform = `translateX(-${currentSlide * 25}%)`;
    }
    setInterval(nextSlide, 4000);

    // --- DUAL NOTIFICATION ENGINE (Every 20 Seconds) ---
    function triggerUniversalNotification() {
        const name = names[Math.floor(Math.random() * names.length)];
        const amt = Math.floor(Math.random() * (100000 - 5000 + 1) + 5000).toLocaleString();
        const msg = `${name} successful withdrawal ₦${amt}`;

        // 1. Show Top Notification (Yellow Bar)
        const notify = document.getElementById("notify");
        notify.innerHTML = `💸 ${msg}`;
        notify.style.top = "20px";
        setTimeout(() => { notify.style.top = "-120px"; }, 5000);

        // 2. Show Bottom Toast (Dark Bubble)
        const toast = document.getElementById('live-toast');
        toast.innerHTML = `✅ ${name} successful withdrawal <b>₦${amt}</b>`;
        toast.style.bottom = "25px";
        setTimeout(() => { toast.style.bottom = "-100px"; }, 5000);

        // 3. Show System Notification (Browser/Phone Center)
        if (Notification.permission === "granted") {
            new Notification("Smart Earn Payout", {
                body: msg,
                icon: "https://cdn-icons-png.flaticon.com/512/3135/3135706.png" // Replace with your logo URL
            });
        }
    }

    // Set the loop to 20 seconds
    setInterval(triggerUniversalNotification, 20000);


    // --- CLAIM LOGIC ---
    function claimBonus() {
        const btn = document.getElementById("claimBtn");
        btn.disabled = true; btn.innerText = "Wait...";
        setTimeout(() => {
            document.getElementById("balance").innerText = "₦100,000";
            localStorage.setItem("reversed", "true");
            btn.innerText = "Claimed";
            const notify = document.getElementById("notify");
            notify.innerHTML = `₦100,000 Bonus Added!`;
            notify.style.top = "20px";
            setTimeout(() => { notify.style.top = "-120px"; }, 4000);
        }, 1500);
    }

    function logout() { localStorage.clear(); window.location.href = "dashboard.html"; }
</script>
