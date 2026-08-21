(function () {
    const NAMES = {
        ae: "United Arab Emirates", af: "Afghanistan", al: "Albania", am: "Armenia",
        ao: "Angola", ar: "Argentina", at: "Austria", au: "Australia", az: "Azerbaijan",
        ba: "Bosnia and Herzegovina", bd: "Bangladesh", be: "Belgium", bf: "Burkina Faso",
        bg: "Bulgaria", bi: "Burundi", bj: "Benin", bn: "Brunei", bo: "Bolivia",
        br: "Brazil", bs: "Bahamas", bt: "Bhutan", bw: "Botswana", by: "Belarus",
        bz: "Belize", ca: "Canada", cd: "Democratic Republic of the Congo", cf: "Central African Republic",
        cg: "Republic of the Congo", ch: "Switzerland", ci: "Côte d'Ivoire", cl: "Chile",
        cm: "Cameroon", cn: "China", co: "Colombia", cr: "Costa Rica", cu: "Cuba",
        cv: "Cabo Verde", cy: "Cyprus", cz: "Czechia", de: "Germany", dj: "Djibouti",
        dk: "Denmark", dm: "Dominica", do: "Dominican Republic", dz: "Algeria",
        ec: "Ecuador", ee: "Estonia", eg: "Egypt", eh: "Western Sahara", er: "Eritrea",
        es: "Spain", et: "Ethiopia", fi: "Finland", fj: "Fiji", fk: "Falkland Islands",
        fr: "France", ga: "Gabon", gb: "United Kingdom", ge: "Georgia", gh: "Ghana",
        gl: "Greenland", gm: "Gambia", gn: "Guinea", gq: "Equatorial Guinea", gr: "Greece",
        gt: "Guatemala", gw: "Guinea-Bissau", gy: "Guyana", hn: "Honduras", hr: "Croatia",
        ht: "Haiti", hu: "Hungary", id: "Indonesia", ie: "Ireland", il: "Israel",
        in: "India", iq: "Iraq", ir: "Iran", is: "Iceland", it: "Italy", jm: "Jamaica",
        jo: "Jordan", jp: "Japan", ke: "Kenya", kg: "Kyrgyzstan", kh: "Cambodia",
        km: "Comoros", kp: "North Korea", kr: "South Korea", kw: "Kuwait", kz: "Kazakhstan",
        la: "Laos", lb: "Lebanon", lc: "Saint Lucia", lk: "Sri Lanka", lr: "Liberia",
        ls: "Lesotho", lt: "Lithuania", lu: "Luxembourg", lv: "Latvia", ly: "Libya",
        ma: "Morocco", md: "Moldova", me: "Montenegro", mg: "Madagascar", mk: "North Macedonia",
        ml: "Mali", mm: "Myanmar", mn: "Mongolia", mr: "Mauritania", mt: "Malta",
        mu: "Mauritius", mv: "Maldives", mw: "Malawi", mx: "Mexico", my: "Malaysia",
        mz: "Mozambique", na: "Namibia", nc: "New Caledonia", ne: "Niger", ng: "Nigeria",
        ni: "Nicaragua", nl: "Netherlands", no: "Norway", np: "Nepal", nz: "New Zealand",
        om: "Oman", pa: "Panama", pe: "Peru", pg: "Papua New Guinea", ph: "Philippines",
        pk: "Pakistan", pl: "Poland", pr: "Puerto Rico", ps: "Palestine", pt: "Portugal",
        py: "Paraguay", qa: "Qatar", ro: "Romania", rs: "Serbia", ru: "Russia",
        rw: "Rwanda", sa: "Saudi Arabia", sb: "Solomon Islands", sc: "Seychelles",
        sd: "Sudan", se: "Sweden", sg: "Singapore", si: "Slovenia", sk: "Slovakia",
        sl: "Sierra Leone", sn: "Senegal", so: "Somalia", sr: "Suriname", ss: "South Sudan",
        st: "São Tomé and Príncipe", sv: "El Salvador", sy: "Syria", sz: "Eswatini",
        td: "Chad", tf: "French Southern Territories", tg: "Togo", th: "Thailand",
        tj: "Tajikistan", tl: "Timor-Leste", tm: "Turkmenistan", tn: "Tunisia",
        tr: "Turkey", tt: "Trinidad and Tobago", tw: "Taiwan", tz: "Tanzania",
        ua: "Ukraine", ug: "Uganda", us: "United States", uy: "Uruguay", uz: "Uzbekistan",
        vc: "Saint Vincent and the Grenadines", ve: "Venezuela", vn: "Vietnam",
        vu: "Vanuatu", xk: "Kosovo", ye: "Yemen", za: "South Africa", zm: "Zambia",
        zw: "Zimbabwe",
        hk: "Hong Kong", ky: "Cayman Islands", tc: "Turks and Caicos Islands",
        va: "Vatican City"
    };

    const ALIASES = {
        usa: "us",
        america: "us",
        "united states": "us",
        "united states of america": "us",
        uk: "gb",
        britain: "gb",
        "great britain": "gb",
        england: "gb",
        scotland: "gb",
        wales: "gb",
        "united kingdom": "gb",
        uae: "ae",
        "south korea": "kr",
        korea: "kr",
        "republic of korea": "kr",
        "north korea": "kp",
        "czech republic": "cz",
        czechia: "cz",
        turkiye: "tr",
        "ivory coast": "ci",
        "cote divoire": "ci",
        "côte d'ivoire": "ci",
        "cote d'ivoire": "ci",
        "democratic republic of congo": "cd",
        "dr congo": "cd",
        drc: "cd",
        congo: "cg",
        vietnam: "vn",
        "viet nam": "vn",
        russia: "ru",
        "holland": "nl",
        "the netherlands": "nl",
        swaziland: "sz",
        "burma": "mm",
        "east timor": "tl",
        "macedonia": "mk",
        "hong kong": "hk",
        "cayman islands": "ky",
        "turks and caicos": "tc",
        "turks and caicos islands": "tc",
        vatican: "va",
        "vatican city": "va",
        "holy see": "va"
    };

    function normalize(entry) {
        if (!entry || typeof entry !== "string") {
            return null;
        }
        const raw = entry.trim();
        if (!raw) {
            return null;
        }
        const lower = raw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (/^[a-z]{2}$/.test(lower) && NAMES[lower]) {
            return lower;
        }
        if (ALIASES[lower]) {
            return ALIASES[lower];
        }
        for (const [code, name] of Object.entries(NAMES)) {
            if (name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === lower) {
                return code;
            }
        }
        return null;
    }

    const entries = Array.isArray(window.VISITED_COUNTRIES) ? window.VISITED_COUNTRIES : [];
    const visited = new Set();
    const unmatched = [];

    entries.forEach((entry) => {
        const code = normalize(entry);
        if (code) {
            visited.add(code);
        } else if (String(entry).trim()) {
            unmatched.push(String(entry).trim());
        }
    });

    const mount = document.getElementById("map-mount");
    const countEl = document.getElementById("visited-count");
    const listEl = document.getElementById("visited-list");
    const hintEl = document.getElementById("map-hint");
    const tooltip = document.getElementById("map-tooltip");
    const unmatchedEl = document.getElementById("unmatched");

    const WORLD_COUNTRIES = 195;
    countEl.textContent = String(visited.size);
    document.getElementById("visited-word").textContent = visited.size === 1 ? "country" : "countries";
    document.getElementById("world-pct").textContent =
        `${Math.round((visited.size / WORLD_COUNTRIES) * 100)}%`;
    countEl.parentElement.classList.toggle("is-empty", visited.size === 0);

    if (visited.size === 0) {
        hintEl.hidden = false;
    } else {
        hintEl.hidden = true;
        [...visited]
            .map((code) => ({ code, name: NAMES[code] || code.toUpperCase() }))
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach(({ code, name }) => {
                const li = document.createElement("li");
                const btn = document.createElement("button");
                btn.type = "button";
                btn.textContent = name;
                btn.dataset.code = code;
                li.appendChild(btn);
                listEl.appendChild(li);
            });
    }

    if (unmatched.length) {
        unmatchedEl.hidden = false;
        unmatchedEl.textContent = "Couldn’t match: " + unmatched.join(", ");
    }

    function showTooltip(name, event) {
        tooltip.textContent = name;
        tooltip.hidden = false;
        moveTooltip(event);
    }

    function moveTooltip(event) {
        const x = event.clientX;
        const y = event.clientY;
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
    }

    function hideTooltip() {
        tooltip.hidden = true;
    }

    fetch("images/world.svg")
        .then((response) => response.text())
        .then((markup) => {
            mount.innerHTML = markup;
            const svg = mount.querySelector("svg");
            if (!svg) {
                return;
            }
            svg.classList.add("world-map");
            svg.setAttribute("viewBox", "0 90 2000 780");

            const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
            defs.innerHTML = `
                <filter id="visited-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#fe5186" flood-opacity="0.65"/>
                </filter>
            `;
            svg.insertBefore(defs, svg.firstChild);

            const ocean = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            ocean.setAttribute("class", "ocean");
            ocean.setAttribute("x", "-200");
            ocean.setAttribute("y", "-200");
            ocean.setAttribute("width", "2400");
            ocean.setAttribute("height", "1400");
            svg.insertBefore(ocean, defs.nextSibling);

            const PIN = {
                hk: [1662, 472],
                va: [1054, 338],
                ky: [545, 472],
                tc: [612, 452]
            };

            const locator = document.createElementNS("http://www.w3.org/2000/svg", "g");
            locator.setAttribute("class", "locator");
            const pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            pulse.setAttribute("class", "locator-pulse");
            pulse.setAttribute("r", "36");
            pulse.setAttribute("cx", "0");
            pulse.setAttribute("cy", "0");
            const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            dot.setAttribute("class", "locator-dot");
            dot.setAttribute("r", "14");
            dot.setAttribute("cx", "0");
            dot.setAttribute("cy", "0");
            locator.appendChild(pulse);
            locator.appendChild(dot);
            svg.appendChild(locator);

            function pointFor(code) {
                if (PIN[code]) {
                    return { x: PIN[code][0], y: PIN[code][1] };
                }
                const path = svg.querySelector(`path#${CSS.escape(code)}`);
                if (!path) {
                    return null;
                }
                const box = path.getBBox();
                return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
            }

            let pinned = null;

            function showPin(code) {
                listEl.querySelectorAll("[data-code]").forEach((chip) => {
                    chip.classList.toggle("is-lit", chip.dataset.code === code);
                });
                const point = pointFor(code);
                if (!point) {
                    locator.classList.remove("is-on");
                    return;
                }
                locator.setAttribute("transform", `translate(${point.x} ${point.y})`);
                locator.classList.add("is-on");
            }

            function hidePin() {
                if (pinned) {
                    return;
                }
                listEl.querySelectorAll(".is-lit").forEach((chip) => {
                    chip.classList.remove("is-lit");
                });
                locator.classList.remove("is-on");
            }

            function pin(code) {
                pinned = code;
                showPin(code);
            }

            function unpin() {
                pinned = null;
                hidePin();
            }

            function isTouch(event) {
                return event.pointerType === "touch" || event.pointerType === "pen";
            }

            function bindRegion(el, code) {
                const name = NAMES[code] || code.toUpperCase();
                const isVisited = visited.has(code);
                if (isVisited) {
                    el.classList.add("visited");
                }
                el.setAttribute("tabindex", isVisited ? "0" : "-1");
                el.setAttribute("role", "img");
                el.setAttribute("aria-label", name + (isVisited ? ", visited" : ""));
                el.addEventListener("pointerenter", (event) => {
                    if (isTouch(event)) {
                        return;
                    }
                    if (isVisited && !pinned) {
                        showPin(code);
                    }
                    showTooltip(name, event);
                });
                el.addEventListener("pointermove", (event) => {
                    if (!isTouch(event)) {
                        moveTooltip(event);
                    }
                });
                el.addEventListener("pointerleave", (event) => {
                    if (isTouch(event)) {
                        return;
                    }
                    hidePin();
                    hideTooltip();
                });
                if (isVisited) {
                    el.addEventListener("pointerup", (event) => {
                        if (!isTouch(event)) {
                            return;
                        }
                        event.preventDefault();
                        event.stopPropagation();
                        if (pinned === code) {
                            unpin();
                        } else {
                            pin(code);
                        }
                    });
                }
            }

            svg.querySelectorAll("path[id]").forEach((path) => {
                const code = path.id.toLowerCase();
                path.classList.add("country");
                bindRegion(path, code);
            });

            listEl.querySelectorAll("[data-code]").forEach((chip) => {
                const code = chip.dataset.code;
                chip.addEventListener("pointerenter", (event) => {
                    if (isTouch(event) || pinned) {
                        return;
                    }
                    showPin(code);
                });
                chip.addEventListener("pointerleave", (event) => {
                    if (isTouch(event)) {
                        return;
                    }
                    hidePin();
                });
                chip.addEventListener("pointerup", (event) => {
                    if (!isTouch(event)) {
                        return;
                    }
                    event.preventDefault();
                    event.stopPropagation();
                    if (pinned === code) {
                        unpin();
                    } else {
                        pin(code);
                    }
                });
            });

            document.addEventListener("pointerdown", (event) => {
                if (event.target.closest("[data-code], .country.visited")) {
                    return;
                }
                unpin();
            });
        })
        .catch(() => {
            mount.textContent = "Couldn’t load the map.";
        });
})();
