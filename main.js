const firebaseConfig = {
  apiKey: "AIzaSyCA_H8mTHSPGKZxmadwDAHZfEcS3pqvLMY",
  authDomain: "swadeshi-84d03.firebaseapp.com",
  databaseURL: "https://swadeshi-84d03-default-rtdb.firebaseio.com",
  projectId: "swadeshi-84d03",
  storageBucket: "swadeshi-84d03.firebasestorage.app",
  messagingSenderId: "1047926315874",
  appId: "1:1047926315874:web:1a20eca775794903aaaa3b"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
let PRODUCTS_FROM_DB = {};

async function loadall() {
    const snap = await db.ref("products").get();
    PRODUCTS_FROM_DB = snap.val();
}


async function smartLocalSearch(query, products) {
    const productList = Object.entries(products).map(([id, p]) => ({
        id,
        ...p
    }));

    const q = query.toLowerCase().trim();
    const words = q.split(" ").filter(Boolean);

    return productList
        .map(p => {
            const cat = (p.category || "").toLowerCase();
            const title = (p.title || "").toLowerCase();
            const desc = (p.description || "").toLowerCase();
            const tags = (p.tags || []).map(t => t.toLowerCase());

            const tagMatch = words.every(w =>
                tags.some(tag => tag.includes(w))
            );

            const categoryMatch = cat.includes(q);
            const textMatch = title.includes(q) || desc.includes(q);

            const qualifies = tagMatch || categoryMatch || textMatch;
            if (!qualifies) return null;

            let score = 0;
            if (categoryMatch) score += 3;
            if (tagMatch) score += 5;
            if (textMatch) score += 2;

            return { ...p, score };
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)
        .map(p => p.id);
}

async function handleSearchClick() {
    const q = document.getElementById("searchInput").value.trim();
    if (!q) return;

    const ids = await smartLocalSearch(q, PRODUCTS_FROM_DB);

    localStorage.setItem("searchResults", JSON.stringify(ids));

    window.location.href = "searched_results.html?ids=" + ids.join(",");
}


async function categoryMatch(cat) {
    const ids = await smartLocalSearch(cat, PRODUCTS_FROM_DB);

    localStorage.setItem("searchResults", JSON.stringify(ids));

    window.location.href = "searched_results.html?ids=" + ids.join(",");
}

loadall();
