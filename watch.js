const watches = [
    {
        img: "watch1.jpg",
        title: "Classic Steel",
        desc: "A timeless stainless steel watch designed with precision engineering and luxury finishing."
    },
    {
        img: "watch2.jpg",
        title: "Sport Chronograph",
        desc: "Built for performance with rugged durability and advanced chronograph features."
    },
    {
        img: "watch3.jpg",
        title: "Luxury Gold",
        desc: "Premium gold-finished timepiece crafted for elegance and sophistication."
    }
];

let index = 0;

function updateWatch() {
    document.getElementById("watchImg").src = watches[index].img;
    document.getElementById("watchTitle").textContent = watches[index].title;
    document.getElementById("watchDesc").textContent = watches[index].desc;
}

function nextWatch() {
    index = (index + 1) % watches.length;
    updateWatch();
}

function prevWatch() {
    index = (index - 1 + watches.length) % watches.length;
    updateWatch();
}