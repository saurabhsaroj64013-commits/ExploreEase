// ----------------------------------------
// CITY DATA: HOTELS, RESTAURANTS, PLACES
// ----------------------------------------

const cityData = {
  delhi: {
    places: [
      {
        name: "Red Fort",
        img: "https://upload.wikimedia.org/wikipedia/commons/7/75/Red_Fort_in_Delhi_03-2016.jpg",
        desc: "A UNESCO World Heritage Site and an iconic symbol of India's rich history.",
        fee: "₹35 (Indians), ₹550 (Foreigners)",
        time: "9:30 AM – 4:30 PM",
        maps: "https://maps.app.goo.gl/ETK7Ebsrk1kVt2Lr8"
      },
      {
        name: "India Gate",
        img: "https://upload.wikimedia.org/wikipedia/commons/4/4d/India_Gate_in_New_Delhi_03-2016.jpg",
        desc: "A war memorial dedicated to Indian soldiers, popular for evening visits.",
        fee: "Free",
        time: "Open 24 hours",
        maps: "https://maps.app.goo.gl/7GiCLZVbkz2r8jE97"
      },
      {
        name: "Lotus Temple",
        img: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Lotus_temple_Delhi.jpg",
        desc: "A Baháʼí worship house famous for its lotus-shaped architecture.",
        fee: "Free",
        time: "9 AM – 5 PM",
        maps: "https://maps.app.goo.gl/9xZGLjfJXJswNVFj9"
      },
      {
        name: "Qutub Minar",
        img: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Qutub_Minar_and_its_monuments.jpg",
        desc: "The world’s tallest brick minaret and a UNESCO heritage site.",
        fee: "₹40 (Indians), ₹600 (Foreigners)",
        time: "7 AM – 5 PM",
        maps: "https://maps.app.goo.gl/Ahv4rdmHakV7Kbyh8"
      },
      {
        name: "Akshardham Temple",
        img: "https://upload.wikimedia.org/wikipedia/commons/0/00/Akshardham_Temple%2C_Delhi.jpg",
        desc: "A spiritual-cultural campus showcasing Indian culture & architecture.",
        fee: "Free (Temple). Exhibition charges apply",
        time: "10 AM – 6 PM",
        maps: "https://maps.app.goo.gl/4g2iN8sW2PcwQ34r5"
      }
    ],

    hotels: [
      {
        name: "The Leela Palace",
        img: "https://www.theleela.com/prod/content/assets/styles/gallery_thumbnail/public/2023-08/exterior-leela-palace-delhi.jpeg",
        desc: "Luxury hotel with royal architecture and premium services.",
        fee: "₹18,000/night",
        time: "Check-in 2 PM, Check-out 12 PM",
        maps: "https://maps.app.goo.gl/8fDtpE6N8p6S5smW8"
      },
      {
        name: "Taj Palace Delhi",
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/5f/8f/67/exterior.jpg",
        desc: "World-class luxury hotel known for its hospitality.",
        fee: "₹15,500/night",
        time: "Check-in 2 PM, Check-out 12 PM",
        maps: "https://maps.app.goo.gl/URPjbW2B7LbZh9xaa"
      },
      {
        name: "ITC Maurya",
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/72/88/08/exterior.jpg",
        desc: "A premium luxury hotel famous for exquisite dining.",
        fee: "₹13,000/night",
        time: "Check-in 3 PM, Check-out 12 PM",
        maps: "https://maps.app.goo.gl/HMJuPqFy5Qx7xqQ8A"
      },
      {
        name: "The Imperial Delhi",
        img: "https://upload.wikimedia.org/wikipedia/commons/4/4e/The_Imperial_New_Delhi.jpg",
        desc: "Historic luxury hotel with colonial charm.",
        fee: "₹17,000/night",
        time: "Check-in 2 PM, Check-out 12 PM",
        maps: "https://maps.app.goo.gl/V1L92tX2xVQ5zKmv9"
      },
      {
        name: "Roseate House",
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/ae/0d/30/roseate-house-new-delhi.jpg",
        desc: "A contemporary luxury hotel near Delhi airport.",
        fee: "₹10,000/night",
        time: "Check-in 2 PM, Check-out 12 PM",
        maps: "https://maps.app.goo.gl/Su2bJ5Uv6qg4AQk46"
      }
    ],

    restaurants: [
      {
        name: "Bukhara",
        img: "https://media-cdn.tripadvisor.com/media/photo-s/1a/72/87/ef/bukhara.jpg",
        desc: "Legendary North Indian restaurant in ITC Maurya.",
        fee: "₹3,000/person",
        time: "12 PM – 12 AM",
        maps: "https://maps.app.goo.gl/uwbH4wAArSADQoUe9"
      },
      {
        name: "Olive Bar & Kitchen",
        img: "https://media-cdn.tripadvisor.com/media/photo-s/1a/40/b8/9e/olive-bar-kitchen.jpg",
        desc: "Romantic restaurant known for its ambiance & European dishes.",
        fee: "₹2,500/person",
        time: "12 PM – 11 PM",
        maps: "https://maps.app.goo.gl/qU6YxjQpFN1rZJGX7"
      },
      {
        name: "Indian Accent",
        img: "https://media-cdn.tripadvisor.com/media/photo-s/14/e1/9e/c6/indian-accent.jpg",
        desc: "India’s top-rated fine dining restaurant.",
        fee: "₹4,000+/person",
        time: "12 PM – 2:30 PM, 7 PM – 10:30 PM",
        maps: "https://maps.app.goo.gl/7Y7Ub7hsCGHGX2sB6"
      },
      {
        name: "Karim's",
        img: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Karim%27s%2C_Old_Delhi.jpg",
        desc: "Historic Mughlai restaurant near Jama Masjid.",
        fee: "₹500/person",
        time: "9 AM – 12 AM",
        maps: "https://maps.app.goo.gl/t2pydr5RVM1cZjbC6"
      },
      {
        name: "Khao Galli CP",
        img: "https://media-cdn.tripadvisor.com/media/photo-s/16/f6/08/58/khao-gali.jpg",
        desc: "Street food heaven in Connaught Place.",
        fee: "₹300/person",
        time: "11 AM – 11 PM",
        maps: "https://maps.app.goo.gl/FTZQirH1Xk5EqCAf9"
      }
    ]
  },

  // ----------------------------------------
  // REPEAT FOR: goa, kolkata, agra, bengaluru
  // ----------------------------------------

  goa: {
    places: [
      {
        name: "Baga Beach",
        img: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Baga_Beach_Goa.jpg",
        desc: "Most famous beach in Goa with nightlife & water sports.",
        fee: "Free",
        time: "Open 24 hours",
        maps: "https://maps.app.goo.gl/ATCpV2S6BbLb88jF8"
      },
      {
        name: "Aguada Fort",
        img: "https://upload.wikimedia.org/wikipedia/commons/9/92/Fort_Aguada_Goa.jpg",
        desc: "17th-century Portuguese fort overlooking the Arabian Sea.",
        fee: "₹25",
        time: "9:30 AM – 6 PM",
        maps: "https://maps.app.goo.gl/49Yc6FVkVy8cP1BZ6"
      },
      {
        name: "Chapora Fort",
        img: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Chapora_Fort.jpg",
        desc: "The Dil Chahta Hai fort known for scenic sunsets.",
        fee: "Free",
        time: "Open 24 hours",
        maps: "https://maps.app.goo.gl/Gv2oHq1M7ZVnXNqg9"
      },
      {
        name: "Dudhsagar Falls",
        img: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Dudhsagar_Falls.jpg",
        desc: "One of India's tallest waterfalls.",
        fee: "₹100",
        time: "7 AM – 5 PM",
        maps: "https://maps.app.goo.gl/gjKtkWR4eZtTtG1BA"
      },
      {
        name: "Calangute Beach",
        img: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Calangute_beach.jpg",
        desc: "Large golden-sand beach popular with tourists.",
        fee: "Free",
        time: "Open 24 hours",
        maps: "https://maps.app.goo.gl/Nh6xe8e9vrwN43ag7"
      }
    ],

    hotels: [
      {
        name: "Taj Fort Aguada",
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/10/e5/38/exterior.jpg",
        desc: "Luxury seaside resort with breathtaking ocean views.",
        fee: "₹20,000/night",
        time: "Check-in 2 PM, Check-out 12 PM",
        maps: "https://maps.app.goo.gl/C9f7ZwZRKZSDvZoD6"
      },
      {
        name: "Grand Hyatt Goa",
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/9a/75/3c/grand-hyatt-goa.jpg",
        desc: "Lavish property featuring pools & spa services.",
        fee: "₹18,500/night",
        time: "Check-in 2 PM, Check-out 12 PM",
        maps: "https://maps.app.goo.gl/2HQZp7aYBR9bKiQj9"
      },
      {
        name: "The Leela Goa",
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/36/bd/ce/the-leela-goa.jpg",
        desc: "Beachside luxury resort with stunning lagoons.",
        fee: "₹25,000/night",
        time: "Check-in 2 PM, Check-out 12 PM",
        maps: "https://maps.app.goo.gl/AbFrbTW3P7zof2eN8"
      },
      {
        name: "ITC Grand Goa",
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/c0/5e/44/itc-grand-goa-a-luxury.jpg",
        desc: "Balinese-style resort beside Arossim Beach.",
        fee: "₹19,000/night",
        time: "Check-in 3 PM, Check-out 12 PM",
        maps: "https://maps.app.goo.gl/E1oCXwZqGRn5yHnXA"
      },
      {
        name: "Planet Hollywood Goa",
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/07/40/21/planet-hollywood-beach.jpg",
        desc: "Hollywood-themed stylish resort.",
        fee: "₹14,000/night",
        time: "Check-in 2 PM, Check-out 11 AM",
        maps: "https://maps.app.goo.gl/AyXqM5WnHhZFDLxn9"
      }
    ],

    restaurants: [
      {
        name: "Thalassa",
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/7b/f0/69/thalassa.jpg",
        desc: "Goa’s iconic Greek restaurant overlooking the sea.",
        fee: "₹1,800/person",
        time: "12 PM – 11 PM",
        maps: "https://maps.app.goo.gl/dpW7hA5t25h1ekHPA"
      },
      {
        name: "Fisherman’s Wharf",
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/87/79/33/fishermans-wharf.jpg",
        desc: "Famous Goan seafood restaurant.",
        fee: "₹1,500/person",
        time: "12 PM – 11 PM",
        maps: "https://maps.app.goo.gl/5Yq9mY8j8C6FbGJx6"
      },
      {
        name: "Gunpowder",
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/cd/44/7b/gunpowder.jpg",
        desc: "South Indian coastal cuisine.",
        fee: "₹1,200/person",
        time: "12 PM – 10:30 PM",
        maps: "https://maps.app.goo.gl/fVnbaunHhQrfADK49"
      },
      {
        name: "Antares",
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/e6/e1/62/antares.jpg",
        desc: "Australian beach club style restaurant.",
        fee: "₹2,000/person",
        time: "1 PM – 11 PM",
        maps: "https://maps.app.goo.gl/YbKH1A3UnP6UuHvg8"
      },
      {
        name: "Beach House",
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/08/52/44/photo2jpg.jpg",
        desc: "Goan fine dining with sunset view.",
        fee: "₹2,200/person",
        time: "12 PM – 11 PM",
        maps: "https://maps.app.goo.gl/jG8EX1TQkhqa3apB9"
      }
    ]
  },

  // ------------------------------------------
  // Kolkata, Agra, Bengaluru LEFT OUT DUE TO LENGTH
  // You can say “send remaining cities” and I’ll add all!
  // ------------------------------------------
};

// ----------------------------------------
// SEARCH HANDLER
// ----------------------------------------

function searchCity() {
  const input = document.getElementById("cityInput").value.toLowerCase();
  if (cityData[input]) {
    window.location.href = `city.html?city=${input}`;
  } else {
    alert("No city found!");
  }
}

// ----------------------------------------
// LOAD CITY DATA ON CITY PAGE
// ----------------------------------------

function loadCity() {
  const urlParams = new URLSearchParams(window.location.search);
  const city = urlParams.get("city");

  if (!city || !cityData[city]) return;

  document.getElementById("cityName").innerText =
    city.charAt(0).toUpperCase() + city.slice(1);

  loadCategory("places");
}

// ----------------------------------------
// CATEGORY SELECTION
// ----------------------------------------

function loadCategory(category) {
  const urlParams = new URLSearchParams(window.location.search);
  const city = urlParams.get("city");

  const data = cityData[city][category];

  document.getElementById("categoryTitle").innerText =
    category.charAt(0).toUpperCase() + category.slice(1);

  const container = document.getElementById("cardsContainer");
  container.innerHTML = "";

  data.forEach((item) => {
    container.innerHTML += `
      <div class="bg-[#171922] border border-gray-700 rounded-xl p-4 hover:scale-[1.03] transition cursor-pointer"
           onclick='openModal(${JSON.stringify(item)})'>
        <img src="${item.img}" class="rounded-lg h-40 w-full object-cover" />
        <h3 class="text-xl mt-3 font-semibold">${item.name}</h3>
        <p class="text-gray-400 text-sm mt-1">${item.desc.substring(0, 60)}...</p>
      </div>`;
  });
}

// ----------------------------------------
// MODAL POPUP
// ----------------------------------------

function openModal(item) {
  document.getElementById("modalImg").src = item.img;
  document.getElementById("modalName").innerText = item.name;
  document.getElementById("modalDesc").innerText = item.desc;
  document.getElementById("modalFee").innerText = item.fee;
  document.getElementById("modalTime").innerText = item.time;

  document.getElementById("navigateBtn").onclick = () => {
    window.open(item.maps, "_blank");
  };

  document.getElementById("infoModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("infoModal").classList.add("hidden");
}
