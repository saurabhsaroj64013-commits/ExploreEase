/* ExploreEase - script.js
   Contains data store, UI wiring, modal and navigation logic.
   Works offline with embedded sample data.
*/

document.getElementById('year').innerText = new Date().getFullYear();

// Config (no external API by default)
const USE_GOOGLE = false; // keep false unless you set up a server proxy

// Allowed cities
const allowedCities = ["delhi","goa","kolkata","agra","bengaluru","bangaluru"];
let currentCity = null, currentCategory = null;

/* --- DATASTORE
   Each city contains 5 hotels, 5 places, 5 restaurants.
   Each item has: name, rating, img, desc, details { address, entryFee, hours, longDesc }
   Images from Unsplash (hotlink).
*/
const dataStore = {
  delhi: {
    hotels: [
      { name: "The Taj Palace, Delhi", rating: "4.8", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=60", desc: "Luxury hotel near diplomatic area.", details:{ address:"Sardar Patel Marg, Diplomatic Enclave, New Delhi", entryFee:"N/A", hours:"24 hours", longDesc:"A five-star property offering elegant rooms, multiple dining options and a lush pool. Ideal for business and leisure." } },
      { name: "Imperial Delhi", rating: "4.7", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=60", desc:"Historic property with modern amenities.", details:{ address:"Janpath Ln, Connaught Place, New Delhi", entryFee:"N/A", hours:"24 hours", longDesc:"A heritage hotel that blends colonial charm with modern comfort, renowned for its service and architecture." } },
      { name: "Le Meridien, New Delhi", rating: "4.6", img: "https://images.unsplash.com/photo-1545051238-9bf6f7e8b6b8?auto=format&fit=crop&w=1200&q=60", desc:"Contemporary rooms and poolside dining.", details:{ address:"Bhikaiji Cama Place, New Delhi", entryFee:"N/A", hours:"24 hours", longDesc:"Upscale property with contemporary design, popular for social events and conferences." } },
      { name: "The Lodhi", rating: "4.7", img: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=1200&q=60", desc:"Boutique luxury close to city attractions.", details:{ address:"Lodhi Rd, New Delhi", entryFee:"N/A", hours:"24 hours", longDesc:"Intimate luxury hotel known for its refined dining and peaceful garden setting." } },
      { name: "Andaz Delhi", rating: "4.5", img: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1200&q=60", desc:"Stylish hotel with rooftop bar.", details:{ address:"Aerocity, New Delhi", entryFee:"N/A", hours:"24 hours", longDesc:"Contemporary lifestyle hotel with a lively rooftop bar and modern amenities." } }
    ],
    places: [
      { name: "India Gate", rating: "4.6", img: "https://images.unsplash.com/photo-1602916149870-3f8cde9abf34?auto=format&fit=crop&w=1200&q=60", desc:"Iconic war memorial and popular evenings spot.", details:{ address:"Rajpath, India Gate, New Delhi", entryFee:"Free", hours:"24 hours", longDesc:"A national monument dedicated to soldiers, with gardens and evening food stalls. Best visited at sunset." } },
      { name: "Qutub Minar", rating: "4.7", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=60", desc:"UNESCO World Heritage site.", details:{ address:"Mehrauli, New Delhi", entryFee:"~₹35 (Indian); ₹550 (foreign) approx", hours:"Sunrise - Sunset (approx 7:00 - 17:00)", longDesc:"A 73-meter tapering tower built in the 12th century, surrounded by ruins and an archaeological complex." } },
      { name: "Humayun's Tomb", rating: "4.6", img: "https://images.unsplash.com/photo-1505765052290-7feca0d7c99f?auto=format&fit=crop&w=1200&q=60", desc:"Beautiful Mughal-era garden tomb.", details:{ address:"Nizamuddin, New Delhi", entryFee:"~₹40 (Indian); ₹600 (foreign) approx", hours:"Sunrise - Sunset (approx 7:00 - 17:30)", longDesc:"An early Mughal architecture masterpiece with well-kept gardens, marble cenotaph and historical displays." } },
      { name: "Red Fort", rating: "4.5", img: "https://images.unsplash.com/photo-1588092351336-5d6b2d2050e8?auto=format&fit=crop&w=1200&q=60", desc:"Historic fort and national monument.", details:{ address:"Netaji Subhash Marg, Chandni Chowk, New Delhi", entryFee:"~₹35 (Indian); ₹550 (foreign) approx", hours:"9:30 - 16:30 (check local listings)", longDesc:"A massive Mughal fort complex and UNESCO site with museums and historical exhibits." } },
      { name: "Lotus Temple", rating: "4.4", img: "https://images.unsplash.com/photo-1579546928686-21e6be1a0d53?auto=format&fit=crop&w=1200&q=60", desc:"Architectural marvel for calm reflection.", details:{ address:"Lotus Temple Rd, Kalkaji, New Delhi", entryFee:"Free", hours:"9:00 - 18:00 (varies by season)", longDesc:"Bahá'í House of Worship shaped like a lotus flower, open to all for silent prayer and reflection." } }
    ],
    restaurants: [
      { name: "Paranthe Wali Gali", rating: "4.4", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=60", desc:"Famous street food lane.", details:{ address:"Chandni Chowk, Old Delhi", entryFee:"N/A", hours:"8:00 - 23:00", longDesc:"A narrow lane famous for layered parathas and vibrant Old Delhi culinary experience." } },
      { name: "Bukhara", rating: "4.8", img: "https://images.unsplash.com/photo-1543352634-68b3c6b2f0de?auto=format&fit=crop&w=1200&q=60", desc:"Legendary north-west frontier cuisine.", details:{ address:"ITC Maurya, Chanakyapuri, New Delhi", entryFee:"N/A (restaurant)", hours:"12:30 - 15:00, 19:00 - 23:00 (approx)", longDesc:"Renowned for its robust flavors and open-tandoor cooking. Reservation recommended." } },
      { name: "Indian Accent", rating: "4.7", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=60", desc:"Modern Indian fine dining.", details:{ address:"The Lodhi, Lodhi Road, New Delhi", entryFee:"N/A", hours:"12:00 - 15:00, 19:00 - 23:00", longDesc:"Acclaimed for creative modern interpretations of Indian cuisine; great for special occasions." } },
      { name: "Karim's", rating: "4.5", img: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1200&q=60", desc:"Historic Mughlai flavors in Old Delhi.", details:{ address:"Jama Masjid Rd, Old Delhi", entryFee:"N/A", hours:"11:00 - 23:00", longDesc:"A legacy eatery famous for kebabs, mutton dishes and traditional Mughlai fare." } },
      { name: "SodaBottleOpenerWala", rating: "4.3", img: "https://images.unsplash.com/photo-1526318472351-c75fcf0702d9?auto=format&fit=crop&w=1200&q=60", desc:"Irani café inspired Parsi & Bombay food.", details:{ address:"Khan Market / multiple locations", entryFee:"N/A", hours:"10:00 - 23:00", longDesc:"Casual retro-inspired café serving Bombay- Irani café dishes and comfort food." } }
    ]
  },

  // GOA (5 each)
  goa: {
    hotels: [
      { name:"Marriott Resort, Goa", rating:"4.7", img:"https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=60", desc:"Beachfront resort with ocean views.", details:{ address:"Vainguinim Beach, Cansaulim, Goa", entryFee:"N/A", hours:"24 hours", longDesc:"Large resort with pools, beach access and multiple restaurants." } },
      { name:"Alila Diwa Goa", rating:"4.6", img:"https://images.unsplash.com/photo-1576675781305-8b6b5ff07b3b?auto=format&fit=crop&w=1200&q=60", desc:"Resort in Goa's serene settings.", details:{ address:"Majorda, Goa", entryFee:"N/A", hours:"24 hours", longDesc:"Upscale resort known for rice-paddy surroundings and quiet luxury." } },
      { name:"Taj Exotica", rating:"4.8", img:"https://images.unsplash.com/photo-1501117716987-c8e5b4ccf4b1?auto=format&fit=crop&w=1200&q=60", desc:"Luxury property on a private bay.", details:{ address:"Benaulim, Goa", entryFee:"N/A", hours:"24 hours", longDesc:"High-end beachfront resort favored for its calm bay and private beach." } },
      { name:"W Goa", rating:"4.5", img:"https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1200&q=60", desc:"Vibrant beachfront lifestyle hotel.", details:{ address:"Vagator, Goa", entryFee:"N/A", hours:"24 hours", longDesc:"Trendy property with lively nightlife and modern rooms." } },
      { name:"Ahilya by the Sea", rating:"4.4", img:"https://images.unsplash.com/photo-1541753866388-0b0c0fbf1c84?auto=format&fit=crop&w=1200&q=60", desc:"Cozy boutique stays near the beach.", details:{ address:"Varca / South Goa area", entryFee:"N/A", hours:"24 hours", longDesc:"Small boutique property with personalized services and beach proximity." } }
    ],
    places: [
      { name:"Baga Beach", rating:"4.6", img:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=60", desc:"Lively beach with water sports.", details:{ address:"Baga, North Goa", entryFee:"Free", hours:"Sunrise - Sunset", longDesc:"Popular beach with water activities, shacks and nightlife nearby." } },
      { name:"Fort Aguada", rating:"4.5", img:"https://images.unsplash.com/photo-1584467735867-5d2d5d6c5d61?auto=format&fit=crop&w=1200&q=60", desc:"17th-century Portuguese fort.", details:{ address:"Sinquerim, North Goa", entryFee:"Small fee/Free (varies)", hours:"9:00 - 18:00", longDesc:"Historic fort with lighthouse and scenic views of the Arabian Sea." } },
      { name:"Anjuna Flea Market", rating:"4.3", img:"https://images.unsplash.com/photo-1536619419570-5d7e2f5b15c2?auto=format&fit=crop&w=1200&q=60", desc:"Colorful marketplace.", details:{ address:"Anjuna, North Goa", entryFee:"Free", hours:"Wed mornings (market day) & daily stalls", longDesc:"Iconic flea market selling crafts, clothing and food; best in late morning." } },
      { name:"Calangute Beach", rating:"4.2", img:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=60", desc:"Family beach.", details:{ address:"Calangute, North Goa", entryFee:"Free", hours:"Sunrise - Sunset", longDesc:"Large beach popular with families, shops and water sports." } },
      { name:"Chapora Fort", rating:"4.1", img:"https://images.unsplash.com/photo-1545060894-7ce9e6c9e6d1?auto=format&fit=crop&w=1200&q=60", desc:"Scenic fort with coastal views.", details:{ address:"Chapora, North Goa", entryFee:"Free", hours:"Sunrise - Sunset", longDesc:"A scenic fort offering panoramic views, great for photos and sunset spots." } }
    ],
    restaurants: [
      { name:"Martin's Corner", rating:"4.6", img:"https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=60", desc:"Seafood favorites.", details:{ address:"Betalbatim / South Goa", entryFee:"N/A", hours:"12:00 - 23:00", longDesc:"Beloved seafood restaurant known for friendly service and coastal flavors." } },
      { name:"Gunpowder", rating:"4.7", img:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=60", desc:"Goan and South Indian fusion.", details:{ address:"Assagao / near Mapusa", entryFee:"N/A", hours:"12:00 - 23:00", longDesc:"Cozy spot for regional Indian dishes with a homey atmosphere." } },
      { name:"Thalassa", rating:"4.5", img:"https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=60", desc:"Greek taverna with sunset views.", details:{ address:"Vagator Beach, North Goa", entryFee:"N/A", hours:"18:00 - 23:30", longDesc:"Famous for sunset dining, lively ambiance and Mediterranean menu." } },
      { name:"Vinayak Family Restaurant", rating:"4.3", img:"https://images.unsplash.com/photo-1526312426976-55fc4a6e3e2d?auto=format&fit=crop&w=1200&q=60", desc:"Local Goan delicacies.", details:{ address:"Assagao / Mapusa area", entryFee:"N/A", hours:"11:00 - 23:00", longDesc:"Popular with locals for authentic Goan home-cooked dishes." } },
      { name:"Cafe Alchemia", rating:"4.2", img:"https://images.unsplash.com/photo-1496412705862-e0088f16f791?auto=format&fit=crop&w=1200&q=60", desc:"Trendy café and live music.", details:{ address:"Arpora / Anjuna area", entryFee:"N/A", hours:"10:00 - 23:00", longDesc:"Hip cafe with events and a relaxed vibe, great for brunch and music nights." } }
    ]
  },

  // KOLKATA
  kolkata: {
    hotels: [
      { name:"The Oberoi Grand", rating:"4.6", img:"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=60", desc:"Heritage luxury hotel.", details:{ address:"15 Jawaharlal Nehru Rd, Kolkata", entryFee:"N/A", hours:"24 hours", longDesc:"A landmark colonial-era luxury hotel with old-world charm." } },
      { name:"Hyatt Regency Kolkata", rating:"4.5", img:"https://images.unsplash.com/photo-1553440564-969c9f0ffb2b?auto=format&fit=crop&w=1200&q=60", desc:"Comfortable modern stay.", details:{ address:"EC-1, Sector III, Salt Lake City, Kolkata", entryFee:"N/A", hours:"24 hours", longDesc:"Popular choice for business travelers with modern amenities." } },
      { name:"The Park Kolkata", rating:"4.4", img:"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=60", desc:"Stylish central hotel.", details:{ address:"17 Park St, Chowringhee, Kolkata", entryFee:"N/A", hours:"24 hours", longDesc:"Central boutique hotel close to nightlife and shopping." } },
      { name:"Novotel Kolkata", rating:"4.3", img:"https://images.unsplash.com/photo-1558494949-d40b9f9a3f6b?auto=format&fit=crop&w=1200&q=60", desc:"Good business hotel with pool.", details:{ address:"JBS Haldane Ave, Salt Lake, Kolkata", entryFee:"N/A", hours:"24 hours", longDesc:"Modern facilities and comfortable rooms, good for conferences." } },
      { name:"Alsisar Haveli (Kolkata)", rating:"4.2", img:"https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=60", desc:"Heritage-style comforts.", details:{ address:"Elgin Rd area, Kolkata", entryFee:"N/A", hours:"24 hours", longDesc:"Heritage property with classical interiors and boutique experience." } }
    ],
    places: [
      { name:"Victoria Memorial", rating:"4.7", img:"https://images.unsplash.com/photo-1563371356-0de7b9b3b1fc?auto=format&fit=crop&w=1200&q=60", desc:"Stately monument & museum.", details:{ address:"Victoria Memorial Hall, Kolkata", entryFee:"~₹30-50", hours:"10:00 - 18:00 (closed Mon)", longDesc:"Impressive memorial and museum showcasing colonial-era artifacts." } },
      { name:"Dakshineswar Kali Temple", rating:"4.5", img:"https://images.unsplash.com/photo-1545420331-6b4a28a5075b?auto=format&fit=crop&w=1200&q=60", desc:"Famous riverside temple.", details:{ address:"Dakshineswar, Kolkata", entryFee:"Free", hours:"5:00 - 22:00", longDesc:"A major pilgrimage site on the Hooghly river known for its spiritual atmosphere." } },
      { name:"Howrah Bridge", rating:"4.4", img:"https://images.unsplash.com/photo-1523254959083-3b3a8f0884d2?auto=format&fit=crop&w=1200&q=60", desc:"Iconic cantilever bridge.", details:{ address:"Howrah, Kolkata", entryFee:"Free", hours:"24 hours", longDesc:"A city landmark linking Kolkata and Howrah over the Hooghly River." } },
      { name:"Princep Ghat", rating:"4.3", img:"https://images.unsplash.com/photo-1525128248930-1e6f7e66b0ee?auto=format&fit=crop&w=1200&q=60", desc:"Riverside promenade.", details:{ address:"Princep Ghat, Kolkata", entryFee:"Free", hours:"6:00 - 20:00", longDesc:"Pleasant riverside promenade with boat rides and sunset views." } },
      { name:"Park Street", rating:"4.2", img:"https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=1200&q=60", desc:"Historic street with restaurants.", details:{ address:"Park St, Kolkata", entryFee:"Free", hours:"All day (shops vary)", longDesc:"Famous nightlife, eateries and colonial-era establishments." } }
    ],
    restaurants: [
      { name:"Peter Cat", rating:"4.4", img:"https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=60", desc:"Kolkata’s iconic restaurant.", details:{ address:"Park St area, Kolkata", entryFee:"N/A", hours:"12:00 - 23:00", longDesc:"Legendary for Chelo Kebab and classic menu items." } },
      { name:"6 Ballygunge Place", rating:"4.5", img:"https://images.unsplash.com/photo-1555992336-03a23c6e9b7b?auto=format&fit=crop&w=1200&q=60", desc:"Bengali specialties.", details:{ address:"Ballygunge, Kolkata", entryFee:"N/A", hours:"12:00 - 15:00, 19:00 - 23:00", longDesc:"Famous for regional Bengali dishes in a comfortable setting." } },
      { name:"Oh! Calcutta", rating:"4.3", img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=60", desc:"Classic Bengali fine dining.", details:{ address:"Multiple locations", entryFee:"N/A", hours:"12:00 - 23:00", longDesc:"Upscale chain focusing on Bengali culinary traditions." } },
      { name:"Flurys", rating:"4.2", img:"https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=60", desc:"Historic tearoom and bakery.", details:{ address:"Park St, Kolkata", entryFee:"N/A", hours:"8:00 - 21:00", longDesc:"Beloved tearoom for pastries, breakfasts and classic afternoon tea." } },
      { name:"Bhojohori Manna", rating:"4.4", img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=60", desc:"Comforting Bengali meals.", details:{ address:"Various locations, Kolkata", entryFee:"N/A", hours:"12:00 - 22:00", longDesc:"Casual restaurant serving homestyle Bengali cuisine at good value." } }
    ]
  },

  // AGRA
  agra: {
    hotels: [
      { name:"ITC Mughal", rating:"4.7", img:"https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=1200&q=60", desc:"Luxurious stay near the Taj.", details:{ address:"Taj Nagari Phase II, Agra", entryFee:"N/A", hours:"24 hours", longDesc:"Elegant property with Mughal-inspired gardens, luxury rooms and multiple dining options." } },
      { name:"Tajview Hotel", rating:"4.6", img:"https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1200&q=60", desc:"Rooms with Taj views.", details:{ address:"NH 2, Agra", entryFee:"N/A", hours:"24 hours", longDesc:"Near the Taj Mahal with rooms offering direct views of the monument." } },
      { name:"Hotel Clarks Shiraz", rating:"4.4", img:"https://images.unsplash.com/photo-1549887534-3f1a7dfd9e4d?auto=format&fit=crop&w=1200&q=60", desc:"Comfortable central accommodation.", details:{ address:"Near Agra Cantt, Agra", entryFee:"N/A", hours:"24 hours", longDesc:"Reliable mid-range hotel with good service and location." } },
      { name:"DoubleTree by Hilton Agra", rating:"4.3", img:"https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1200&q=60", desc:"Modern hotel with amenities.", details:{ address:"Taj Nagari, Agra", entryFee:"N/A", hours:"24 hours", longDesc:"Comfortable international brand hotel with modern services." } },
      { name:"Howard Plaza The Fern", rating:"4.2", img:"https://images.unsplash.com/photo-1501117716987-c8e5b4ccf4b1?auto=format&fit=crop&w=1200&q=60", desc:"Comfortable business hotel.", details:{ address:"Taj Ganj, Agra", entryFee:"N/A", hours:"24 hours", longDesc:"Good option for business travelers and tour groups." } }
    ],
    places: [
      { name:"Taj Mahal", rating:"4.9", img:"https://images.unsplash.com/photo-1549897462-1f9b151e7d1d?auto=format&fit=crop&w=1200&q=60", desc:"The world-famous monument.", details:{ address:"Dharmapuri, Tajganj, Agra", entryFee:"~₹50-250 (varies)", hours:"Sunrise - Sunset (closed Fri)", longDesc:"A UNESCO world heritage site, built by Shah Jahan in memory of Mumtaz Mahal; best visited at sunrise." } },
      { name:"Agra Fort", rating:"4.6", img:"https://images.unsplash.com/photo-1526406915892-1e8e3b8f2b9e?auto=format&fit=crop&w=1200&q=60", desc:"Historic Mughal fort.", details:{ address:"Agra Fort Rd, Rakabganj, Agra", entryFee:"~₹40-550 (varies)", hours:"Sunrise - Sunset", longDesc:"Fortress of the Mughal emperors with palaces, halls and museums." } },
      { name:"Mehtab Bagh", rating:"4.3", img:"https://images.unsplash.com/photo-1496412705862-e0088f16f791?auto=format&fit=crop&w=1200&q=60", desc:"Gardens opposite the Taj.", details:{ address:"Near Yamuna River, Agra", entryFee:"Small fee", hours:"Sunrise - Sunset", longDesc:"Garden complex on the opposite bank of the Yamuna offering excellent Taj views." } },
      { name:"Itmad-ud-Daulah", rating:"4.2", img:"https://images.unsplash.com/photo-1531306728370-6f9e49b67d73?auto=format&fit=crop&w=1200&q=60", desc:"'Baby Taj' smaller marble tomb.", details:{ address:"Agra", entryFee:"Small fee", hours:"Sunrise - Sunset", longDesc:"Often called the 'Baby Taj' — fine pietra dura inlay work and peaceful gardens." } },
      { name:"Jama Masjid, Agra", rating:"4.1", img:"https://images.unsplash.com/photo-1505874306313-1f3d7b6b9b6f?auto=format&fit=crop&w=1200&q=60", desc:"Historic mosque near city center.", details:{ address:"Sadar Bazar, Agra", entryFee:"Free", hours:"Open for prayers (varies)", longDesc:"Large mosque serving the local community, visible from streets around the city." } }
    ],
    restaurants: [
      { name:"Pinch of Spice", rating:"4.4", img:"https://images.unsplash.com/photo-1555992336-03a23c6e9b7b?auto=format&fit=crop&w=1200&q=60", desc:"Popular multi-cuisine option.", details:{ address:"Near Taj Ganj, Agra", entryFee:"N/A", hours:"12:00 - 23:00", longDesc:"Well-known local chain serving a variety of North Indian and Mughlai dishes." } },
      { name:"Peshawri (ITC)", rating:"4.6", img:"https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=1200&q=60", desc:"Northwest frontier specialties.", details:{ address:"ITC Mughal, Agra", entryFee:"N/A", hours:"19:00 - 23:00", longDesc:"Fine dining focusing on robust tandoori and kebab specialties." } },
      { name:"The Skyline Restaurant", rating:"4.2", img:"https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=60", desc:"Rooftop dining with city views.", details:{ address:"Multiple rooftop locations near Taj", entryFee:"N/A", hours:"18:00 - 23:00", longDesc:"Good for evening meals with a panoramic view of the city." } },
      { name:"Esphahan", rating:"4.3", img:"https://images.unsplash.com/photo-1543352634-68b3c6b2f0de?auto=format&fit=crop&w=1200&q=60", desc:"Fine dining with Mughlai influences.", details:{ address:"The Oberoi Amarvilas, Agra", entryFee:"N/A", hours:"19:00 - 23:00", longDesc:"Upscale dining with refined Mughlai and North Indian dishes." } },
      { name:"Mama Chicken Mama Franky", rating:"4.0", img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=60", desc:"Quick and tasty local eats.", details:{ address:"Near tourist area", entryFee:"N/A", hours:"10:00 - 22:00", longDesc:"Casual spot for quick bites and popular local street-style foods." } }
    ]
  },

  // BENGALURU
  bengaluru: {
    hotels: [
      { name:"The Leela Palace, Bengaluru", rating:"4.8", img:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=60", desc:"Luxury with city convenience.", details:{ address:"Old Airport Road, Bengaluru", entryFee:"N/A", hours:"24 hours", longDesc:"High-end palace-style hotel with spacious grounds and fine dining." } },
      { name:"Taj West End", rating:"4.7", img:"https://images.unsplash.com/photo-1549887534-3f1a7dfd9e4d?auto=format&fit=crop&w=1200&q=60", desc:"Historic lush property.", details:{ address:"Race Course Rd, Bengaluru", entryFee:"N/A", hours:"24 hours", longDesc:"A lush colonial-era property with gardens and a calm atmosphere." } },
      { name:"ITC Gardenia", rating:"4.6", img:"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=60", desc:"Upscale property with great service.", details:{ address:"Residency Road, Bengaluru", entryFee:"N/A", hours:"24 hours", longDesc:"Popular luxury hotel with acclaimed restaurants and service." } },
      { name:"JW Marriott Bengaluru", rating:"4.5", img:"https://images.unsplash.com/photo-1560448204-9f90d8c6d0c4?auto=format&fit=crop&w=1200&q=60", desc:"Business-friendly luxury hotel.", details:{ address:"Vittal Mallya Rd area", entryFee:"N/A", hours:"24 hours", longDesc:"Large hotel with conference facilities and modern amenities." } },
      { name:"The Ritz-Carlton", rating:"4.6", img:"https://images.unsplash.com/photo-1553440564-969c9f0ffb2b?auto=format&fit=crop&w=1200&q=60", desc:"Premium stay with urban views.", details:{ address:"MG Road area", entryFee:"N/A", hours:"24 hours", longDesc:"Premium brand offering luxury rooms, spa and skyline views." } }
    ],
    places: [
      { name:"Lalbagh Botanical Garden", rating:"4.6", img:"https://images.unsplash.com/photo-1529253355930-1e0f85a7d51a?auto=format&fit=crop&w=1200&q=60", desc:"Beautiful botanical garden.", details:{ address:"Lalbagh Rd, Bengaluru", entryFee:"~₹20-30", hours:"6:00 - 18:00", longDesc:"Historic botanical garden with glasshouse and seasonal flower shows." } },
      { name:"Bangalore Palace", rating:"4.4", img:"https://images.unsplash.com/photo-1524008277660-5a0f6d6a0a2c?auto=format&fit=crop&w=1200&q=60", desc:"Palace with interesting tours.", details:{ address:"Vasanth Nagar, Bengaluru", entryFee:"~₹230 (varies)", hours:"10:00 - 17:00", longDesc:"A Tudor-style palace with guided tours showcasing chandeliers and murals." } },
      { name:"Cubbon Park", rating:"4.5", img:"https://images.unsplash.com/photo-1520975915309-6a8d3d1b4b6f?auto=format&fit=crop&w=1200&q=60", desc:"Large green space in the city center.", details:{ address:"Mahatma Gandhi Rd, Bengaluru", entryFee:"Free", hours:"5:00 - 18:00", longDesc:"Popular park for morning walks, greenery and monuments." } },
      { name:"Nandi Hills (day trip)", rating:"4.7", img:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60", desc:"Popular sunrise viewpoint.", details:{ address:"Chikkaballapur district (near Bengaluru)", entryFee:"Small parking fees", hours:"4:30 - 18:00", longDesc:"A scenic hilltop destination famous for sunrise views and hikes." } },
      { name:"Innovative Film City", rating:"4.0", img:"https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=60", desc:"Entertainment complex & theme park.", details:{ address:"Bidadi, Bengaluru", entryFee:"Varies by attraction", hours:"10:00 - 18:00", longDesc:"Family entertainment park with rides, studio sets and attractions." } }
    ],
    restaurants: [
      { name:"Toit", rating:"4.5", img:"https://images.unsplash.com/photo-1555992336-03a23c6e9b7b?auto=format&fit=crop&w=1200&q=60", desc:"Brewery and great food.", details:{ address:"Indiranagar, Bengaluru", entryFee:"N/A", hours:"12:00 - 23:00", longDesc:"Popular microbrewery with vibrant atmosphere and diverse menu." } },
      { name:"Karavalli", rating:"4.7", img:"https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=60", desc:"Southwest coastal cuisine.", details:{ address:"Gateway Hotel Residency Rd, Bengaluru", entryFee:"N/A", hours:"12:00 - 15:00, 19:00 - 23:00", longDesc:"Renowned restaurant specializing in coastal and regional flavors." } },
      { name:"MTR", rating:"4.4", img:"https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1200&q=60", desc:"Historic Karnataka meals.", details:{ address:"Multiple locations (e.g., Lalbagh Rd)", entryFee:"N/A", hours:"7:00 - 22:00", longDesc:"Classic local institution known for hearty South Indian breakfasts and meals." } },
      { name:"Corner House", rating:"4.3", img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=60", desc:"Famed for ice creams & desserts.", details:{ address:"Multiple locations, Bengaluru", entryFee:"N/A", hours:"11:00 - 23:00", longDesc:"Beloved dessert chain known for sundaes and ice cream treats." } },
      { name:"The Fatty Bao", rating:"4.2", img:"https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=60", desc:"Asian-inspired small plates.", details:{ address:"Indiranagar, Bengaluru", entryFee:"N/A", hours:"12:00 - 23:00", longDesc:"Trendy spot for inventive Asian small plates and cocktails." } }
    ]
  }
}; // end dataStore


/* --------- Utilities --------- */
function normalizeCity(c){
  if(!c) return '';
  c = c.trim().toLowerCase();
  if(c === 'bangalore' || c === 'bangaluru') c = 'bengaluru';
  return c;
}

/* --- Search / UI wiring --- */
const heroInput = document.getElementById('cityInputHero');
const heroBtn = document.getElementById('heroSearchBtn');
const quickBtns = Array.from(document.querySelectorAll('.quick-btn'));
const resultsArea = document.getElementById('resultsArea');
const citySection = document.getElementById('citySection');
const cityTitle = document.getElementById('cityTitle');
const citySubtitle = document.getElementById('citySubtitle');

heroBtn.addEventListener('click', onSearchHero);
heroInput.addEventListener('keydown', (e)=>{ if(e.key==='Enter') onSearchHero(); });
quickBtns.forEach(b => b.addEventListener('click', ()=> quick(b.dataset.city) ));

document.querySelectorAll('#cat-hotels, #cat-places, #cat-restaurants').forEach(btn=>{
  btn.addEventListener('click', ()=> selectCategory(btn.dataset.cat || btn.getAttribute('data-cat')));
});

/* search handlers */
function onSearchHero(){
  handleSearch(heroInput.value);
}
function quick(city){
  handleSearch(city);
}
function handleSearch(raw){
  const key = normalizeCity(raw);
  if(!key){
    alert('Please enter a city name.');
    return;
  }
  if(!allowedCities.includes(key)){
    alert('No city found.');
    return;
  }
  currentCity = key;
  currentCategory = null;
  citySection.classList.remove('hidden');
  const pretty = key.charAt(0).toUpperCase() + key.slice(1);
  cityTitle.innerText = `Explore ${pretty}`;
  citySubtitle.innerText = `What would you like to discover in ${pretty}?`;
  resultsArea.innerHTML = `<div class="muted">Select a category to load results.</div>`;
  citySection.scrollIntoView({behavior:'smooth', block:'start'});
}

/* select category and render */
function selectCategory(cat){
  if(!currentCity){
    alert('Please search a city first.');
    return;
  }
  currentCategory = cat;
  const items = (dataStore[currentCity] && dataStore[currentCity][cat]) || [];
  renderResults(items, cat);
}

function renderResults(items, cat){
  if(!items || items.length === 0){
    resultsArea.innerHTML = `<div class="text-gray-400">No results found.</div>`;
    return;
  }
  let html = `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
  items.forEach((it, idx) => {
    html += `
      <div class="card-dark p-4 rounded-lg hover-lift cursor-pointer flex gap-4" data-index="${idx}" onclick="openModal(${idx})">
        <div class="w-36 h-24 flex-shrink-0 overflow-hidden rounded-md">
          <img src="${it.img}" alt="${it.name}" class="w-full h-full object-cover">
        </div>
        <div class="flex-1">
          <div class="flex items-start justify-between">
            <h4 class="text-lg font-semibold text-white">${it.name}</h4>
            <div class="text-sm font-medium text-white">${it.rating}</div>
          </div>
          <p class="muted text-sm mt-1">${it.desc || ''}</p>
          <div class="mt-3 text-sm">
            <button class="px-3 py-1 rounded-full text-sm font-semibold" style="background:var(--primary);color:#fff" onclick="openModal(${idx}); event.stopPropagation();">View</button>
          </div>
        </div>
      </div>
    `;
  });
  html += `</div>`;
  resultsArea.innerHTML = html;
  resultsArea.dataset.cat = cat;
}

/* --- Modal & Navigation logic --- */
const infoModal = document.getElementById('infoModal');
const infoCard = document.getElementById('infoCard');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalAddress = document.getElementById('modalAddress');
const modalRating = document.getElementById('modalRating');
const modalFee = document.getElementById('modalFee');
const modalHours = document.getElementById('modalHours');
const navigateBtn = document.getElementById('navigateBtn');
const closeModalBtn = document.getElementById('closeModal');
const closeBtn = document.getElementById('closeBtn');

async function openModal(index){
  const cat = resultsArea.dataset.cat;
  if(!currentCity || !cat) return;
  const items = dataStore[currentCity][cat] || [];
  const item = items[index];
  if(!item) return;

  // fill with local data immediately
  modalImg.src = item.img;
  modalTitle.innerText = item.name;
  modalRating.innerText = `Rating: ${item.rating}`;
  modalDesc.innerText = (item.details && item.details.longDesc) ? item.details.longDesc : (item.desc || '');
  modalAddress.innerText = item.details && item.details.address ? item.details.address : '';
  modalFee.innerText = item.details && item.details.entryFee ? item.details.entryFee : 'N/A';
  modalHours.innerText = item.details && item.details.hours ? item.details.hours : 'N/A';

  // navigate link - use a maps search query (safe, works without API)
  const mapsQuery = encodeURIComponent(`${item.name} ${item.details && item.details.address ? item.details.address : currentCity}`);
  navigateBtn.href = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  // show modal (fade-in)
  infoModal.classList.remove('hidden');
  setTimeout(()=> infoCard.classList.add('show'), 20);

  // optional: if you enable Google integration and proxy, attempt to fetch updated details
  if(USE_GOOGLE){
    // Implementation placeholder - currently disabled by default for safety
    // You can implement the proxy as described in previous instructions.
  }
}

// close: fade-out + hide
function closeModal(){
  infoCard.classList.remove('show');
  setTimeout(()=> infoModal.classList.add('hidden'), 220);
}

closeModalBtn.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);

// close on backdrop click (only if clicking outside the card)
infoModal.addEventListener('click', (e)=>{
  if(e.target === infoModal) closeModal();
});

// keyboard escape to close
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && !infoModal.classList.contains('hidden')) closeModal(); });

// mobile toggle (simple placeholder)
document.getElementById('mobileToggle').addEventListener('click', ()=> {
  alert('Mobile menu: use the quick buttons in the hero or search bar to navigate.');
});

/* Expose some fn for inline onclick handlers (the render uses global openModal) */
window.openModal = openModal;
window.selectCategory = selectCategory;
window.quick = quick;
window.onSearch = onSearchHero;
window.onSearchHero = onSearchHero;
