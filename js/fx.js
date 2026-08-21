(function () {
    const fxLayer = document.getElementById("fx");
    if (!fxLayer) {
        return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const fragment = document.createDocumentFragment();
    const orbColors = [
        "radial-gradient(circle at 35% 35%, rgba(254,81,134,0.35), rgba(254,81,134,0.05) 65%, rgba(254,81,134,0))",
        "radial-gradient(circle at 40% 30%, rgba(169,169,179,0.35), rgba(169,169,179,0.05) 62%, rgba(169,169,179,0))",
        "radial-gradient(circle at 40% 40%, rgba(103,205,204,0.35), rgba(103,205,204,0.06) 63%, rgba(103,205,204,0))"
    ];

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const orbCount = isCoarse ? 5 : 8;
    const sparkCount = isCoarse ? 12 : 26;

    for (let i = 0; i < orbCount; i += 1) {
        const orb = document.createElement("div");
        const size = 120 + Math.random() * 240;
        orb.className = "orb";
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        orb.style.left = `${Math.random() * 100}%`;
        orb.style.top = `${Math.random() * 100}%`;
        orb.style.background = orbColors[i % orbColors.length];
        orb.style.setProperty("--dur", `${18 + Math.random() * 20}s`);
        orb.style.setProperty("--delay", `${Math.random() * 12}s`);
        fragment.appendChild(orb);
    }

    for (let i = 0; i < sparkCount; i += 1) {
        const spark = document.createElement("div");
        const size = 2 + Math.random() * 6;
        spark.className = "spark";
        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;
        spark.style.left = `${Math.random() * 100}%`;
        spark.style.setProperty("--dur", `${14 + Math.random() * 22}s`);
        spark.style.setProperty("--delay", `${Math.random() * 24}s`);
        spark.style.opacity = `${0.15 + Math.random() * 0.35}`;
        fragment.appendChild(spark);
    }

    fxLayer.appendChild(fragment);
})();
