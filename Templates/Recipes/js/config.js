/**
 * PengSites Recipe Demo — creator config
 * Edit ONLY this file to customize a demo for a creator.
 */
window.PENG_CONFIG = {
  brand: {
    name: '[Creator Name]',
    handle: '@handle',
    initials: '[C]',
    bio: 'Home cook turned recipe creator. I share weeknight dinners, weekend baking, and everything in between — tested in a real kitchen for real people.',
    heroTitle: 'Recipes worth cooking twice',
    heroSubtitle: 'Digital recipes & bundles from my kitchen to yours. Instant access after checkout.',
    followerStats: [
      { label: 'Instagram', value: '85K' },
      { label: 'TikTok', value: '120K' },
      { label: 'Recipes', value: '40+' },
      { label: 'Subscribers', value: '12K' }
    ],
    socials: [
      { label: 'Instagram', url: '#' },
      { label: 'TikTok', url: '#' },
      { label: 'YouTube', url: '#' }
    ],
    supportEmail: 'support@creatorname.com',
    avatarImage: 'images/creator.jpg',
    heroImage: 'images/hero.jpg',
    aboutStory:
      'I started sharing recipes from a tiny apartment kitchen. What began as weekend experiments became a community of home cooks who want food that feels special without the fuss. Every recipe here is tested until it works the first time you make it.',
    funFacts: [
      { title: 'Always testing', text: 'Every recipe is cooked at least three times before it goes live.' },
      { title: 'Weeknight first', text: 'Most dinners clock in under 40 minutes, start to plate.' },
      { title: 'No gatekeeping', text: 'Techniques are explained plainly — no chef-speak required.' }
    ]
  },

  theme: {
    colors: {
      bg: '#FDFBF7',
      bgAlt: '#F4EFE6',
      primary: '#3B4F3C',
      primarySoft: '#526D53',
      accent: '#C85A32',
      accentHover: '#B24B25',
      sand: '#EAE3D2',
      text: '#2D3732',
      muted: '#6B756E'
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Plus Jakarta Sans'
    }
  },

  currency: { code: 'USD', symbol: '$' },

  fees: {
    platformFeePercent: 15,
    processingFeePercent: 2.9,
    processingFeeFixed: 0.3,
    payoutCadenceDays: 14
  },

  categories: [
    { id: 'dinner', label: 'Dinner' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'quick', label: 'Quick' },
    { id: 'healthy', label: 'Healthy' },
    { id: 'comfort', label: 'Comfort' }
  ],

  recipes: [
    {
      id: 'garlic-herb-pasta',
      title: 'Garlic Herb Butter Pasta',
      shortDescription: 'Silky spaghetti tossed in garlic-herb butter with lemon and parmesan.',
      categoryIds: ['dinner', 'quick'],
      price: 9,
      badges: ['Vegetarian'],
      nutrition: { calories: 420, protein: '14g', carbs: '52g', fat: '18g' },
      image: 'images/recipes/garlic-herb-pasta.jpg',
      servingsBase: 4,
      time: '20 min',
      difficulty: 'Easy',
      featured: true,
      ingredients: [
        { amount: 400, unit: 'g', name: 'spaghetti', scalable: true },
        { amount: 6, unit: 'tbsp', name: 'unsalted butter', scalable: true },
        { amount: 5, unit: 'cloves', name: 'garlic, minced', scalable: true },
        { amount: 2, unit: 'tbsp', name: 'fresh parsley, chopped', scalable: true },
        { amount: 1, unit: '', name: 'lemon, zested and juiced', scalable: true },
        { amount: 50, unit: 'g', name: 'parmesan, grated', scalable: true },
        { amount: 0.5, unit: 'tsp', name: 'salt', scalable: false },
        { amount: 0.25, unit: 'tsp', name: 'black pepper', scalable: false }
      ],
      steps: [
        'Boil pasta in salted water until al dente. Reserve 1 cup pasta water, then drain.',
        'Melt butter in a wide pan over medium heat. Add garlic and cook 60 seconds until fragrant.',
        'Toss in pasta, lemon zest, juice, parsley, and a splash of pasta water.',
        'Add parmesan and toss until glossy. Season and serve immediately.'
      ],
      reviews: [
        { name: 'Sara M.', stars: 5, text: 'Weeknight hero. My kids asked for seconds.', date: '2026-08-12' },
        { name: 'Jon P.', stars: 5, text: 'Restaurant-level with pantry staples.', date: '2026-09-01' }
      ]
    },
    {
      id: 'rainbow-bowl',
      title: 'Rainbow Grain Bowl',
      shortDescription: 'A free colorful bowl with roasted veg, quinoa, and tahini drizzle.',
      categoryIds: ['healthy', 'quick'],
      price: 0,
      badges: ['Vegan', 'Dairy Free', 'Gluten Free'],
      nutrition: { calories: 380, protein: '12g', carbs: '48g', fat: '16g' },
      image: 'images/recipes/rainbow-bowl.jpg',
      servingsBase: 2,
      time: '30 min',
      difficulty: 'Easy',
      featured: true,
      ingredients: [
        { amount: 1, unit: 'cup', name: 'cooked quinoa', scalable: true },
        { amount: 1, unit: '', name: 'sweet potato, cubed', scalable: true },
        { amount: 1, unit: 'cup', name: 'chickpeas, drained', scalable: true },
        { amount: 2, unit: 'cups', name: 'mixed greens', scalable: true },
        { amount: 1, unit: '', name: 'avocado, sliced', scalable: true },
        { amount: 3, unit: 'tbsp', name: 'tahini', scalable: true },
        { amount: 1, unit: 'tbsp', name: 'lemon juice', scalable: true },
        { amount: 1, unit: 'tbsp', name: 'olive oil', scalable: true }
      ],
      steps: [
        'Roast sweet potato and chickpeas at 425°F with oil, salt, and pepper for 20 minutes.',
        'Whisk tahini, lemon juice, and a splash of water into a pourable sauce.',
        'Build bowls with quinoa, greens, roasted veg, avocado, and tahini drizzle.'
      ],
      reviews: [
        { name: 'Aisha K.', stars: 5, text: 'Finally a free recipe that feels complete.', date: '2026-07-20' },
        { name: 'Mike T.', stars: 4, text: 'Great meal prep base. I double the tahini.', date: '2026-08-03' }
      ]
    },
    {
      id: 'truffle-pizza',
      title: 'Truffle Mushroom Pizza',
      shortDescription: 'Crispy homemade crust, roasted mushrooms, mozzarella, and truffle oil.',
      categoryIds: ['dinner', 'comfort'],
      price: 12,
      badges: ['Vegetarian'],
      nutrition: { calories: 540, protein: '22g', carbs: '58g', fat: '24g' },
      image: 'images/recipes/truffle-pizza.jpg',
      servingsBase: 2,
      time: '45 min',
      difficulty: 'Medium',
      featured: true,
      ingredients: [
        { amount: 250, unit: 'g', name: 'pizza dough', scalable: true },
        { amount: 200, unit: 'g', name: 'mixed mushrooms', scalable: true },
        { amount: 150, unit: 'g', name: 'fresh mozzarella', scalable: true },
        { amount: 2, unit: 'tbsp', name: 'olive oil', scalable: true },
        { amount: 1, unit: 'tsp', name: 'truffle oil', scalable: true },
        { amount: 2, unit: 'cloves', name: 'garlic, sliced', scalable: true },
        { amount: 1, unit: 'handful', name: 'fresh thyme', scalable: false }
      ],
      steps: [
        'Preheat oven (and stone/steel if you have one) to 500°F.',
        'Sauté mushrooms with garlic until browned; season well.',
        'Stretch dough, top with mozzarella and mushrooms, bake 8–12 minutes.',
        'Finish with truffle oil and thyme.'
      ],
      reviews: [
        { name: 'Elena R.', stars: 5, text: 'Date-night worthy. The truffle tip is perfect.', date: '2026-06-14' }
      ]
    },
    {
      id: 'chocolate-lava',
      title: 'Molten Chocolate Lava Cakes',
      shortDescription: 'Individual cakes with a gooey chocolate center — ready in under 30 minutes.',
      categoryIds: ['desserts', 'quick'],
      price: 8,
      badges: ['Vegetarian'],
      nutrition: { calories: 390, protein: '6g', carbs: '36g', fat: '26g' },
      image: 'images/recipes/chocolate-lava.jpg',
      servingsBase: 4,
      time: '25 min',
      difficulty: 'Medium',
      featured: true,
      ingredients: [
        { amount: 120, unit: 'g', name: 'dark chocolate', scalable: true },
        { amount: 120, unit: 'g', name: 'butter', scalable: true },
        { amount: 2, unit: '', name: 'eggs', scalable: true },
        { amount: 2, unit: '', name: 'egg yolks', scalable: true },
        { amount: 60, unit: 'g', name: 'sugar', scalable: true },
        { amount: 40, unit: 'g', name: 'flour', scalable: true },
        { amount: 1, unit: 'pinch', name: 'salt', scalable: false }
      ],
      steps: [
        'Butter and flour four ramekins. Preheat oven to 425°F.',
        'Melt chocolate and butter together until smooth.',
        'Whisk eggs, yolks, and sugar until thick; fold in chocolate and flour.',
        'Bake 10–12 minutes until edges set and centers jiggle. Invert and serve.'
      ],
      reviews: [
        { name: 'Priya S.', stars: 5, text: 'Worked first try. Guests thought I ordered dessert.', date: '2026-09-18' }
      ]
    },
    {
      id: 'green-goddess',
      title: 'Green Goddess Salad',
      shortDescription: 'Crunchy chopped salad with a creamy herb dressing.',
      categoryIds: ['healthy', 'quick'],
      price: 7,
      badges: ['Vegetarian', 'Gluten Free'],
      nutrition: { calories: 280, protein: '8g', carbs: '18g', fat: '20g' },
      image: 'images/recipes/green-goddess.jpg',
      servingsBase: 4,
      time: '15 min',
      difficulty: 'Easy',
      featured: false,
      ingredients: [
        { amount: 1, unit: 'head', name: 'romaine, chopped', scalable: true },
        { amount: 1, unit: 'cup', name: 'cucumber, diced', scalable: true },
        { amount: 1, unit: 'cup', name: 'cabbage, shredded', scalable: true },
        { amount: 0.5, unit: 'cup', name: 'greek yogurt', scalable: true },
        { amount: 1, unit: 'handful', name: 'basil and chives', scalable: true },
        { amount: 1, unit: '', name: 'lemon, juiced', scalable: true },
        { amount: 2, unit: 'tbsp', name: 'olive oil', scalable: true }
      ],
      steps: [
        'Blend yogurt, herbs, lemon, oil, salt, and pepper into a dressing.',
        'Toss chopped vegetables with dressing until coated.',
        'Serve cold with extra herbs on top.'
      ],
      reviews: [
        { name: 'Chris L.', stars: 4, text: 'Bright and crunchy. I add grilled chicken.', date: '2026-05-22' }
      ]
    },
    {
      id: 'avocado-toast',
      title: 'Chili-Lime Avocado Toast',
      shortDescription: 'The upgraded avocado toast with chili oil, lime, and soft egg.',
      categoryIds: ['breakfast', 'quick'],
      price: 5,
      badges: ['Vegetarian'],
      nutrition: { calories: 320, protein: '12g', carbs: '28g', fat: '18g' },
      image: 'images/recipes/avocado-toast.jpg',
      servingsBase: 2,
      time: '10 min',
      difficulty: 'Easy',
      featured: false,
      ingredients: [
        { amount: 2, unit: 'slices', name: 'sourdough', scalable: true },
        { amount: 1, unit: '', name: 'ripe avocado', scalable: true },
        { amount: 2, unit: '', name: 'eggs', scalable: true },
        { amount: 1, unit: 'tsp', name: 'chili oil', scalable: true },
        { amount: 0.5, unit: '', name: 'lime, juiced', scalable: true },
        { amount: 1, unit: 'pinch', name: 'flaky salt', scalable: false }
      ],
      steps: [
        'Toast bread until deeply golden.',
        'Mash avocado with lime and salt; spread thickly.',
        'Top with soft-boiled or fried eggs and chili oil.'
      ],
      reviews: [
        { name: 'Nora H.', stars: 5, text: 'Simple but the chili oil changes everything.', date: '2026-04-09' }
      ]
    },
    {
      id: 'fluffy-pancakes',
      title: 'Buttermilk Cloud Pancakes',
      shortDescription: 'Extra-fluffy weekend pancakes with vanilla and a crisp edge.',
      categoryIds: ['breakfast', 'comfort'],
      price: 8,
      badges: ['Vegetarian', 'Halal'],
      nutrition: { calories: 350, protein: '10g', carbs: '48g', fat: '12g' },
      image: 'images/recipes/fluffy-pancakes.jpg',
      servingsBase: 4,
      time: '25 min',
      difficulty: 'Easy',
      featured: true,
      ingredients: [
        { amount: 2, unit: 'cups', name: 'flour', scalable: true },
        { amount: 2, unit: 'tbsp', name: 'sugar', scalable: true },
        { amount: 2, unit: 'tsp', name: 'baking powder', scalable: true },
        { amount: 0.5, unit: 'tsp', name: 'baking soda', scalable: true },
        { amount: 2, unit: 'cups', name: 'buttermilk', scalable: true },
        { amount: 2, unit: '', name: 'eggs', scalable: true },
        { amount: 3, unit: 'tbsp', name: 'melted butter', scalable: true },
        { amount: 1, unit: 'tsp', name: 'vanilla', scalable: true }
      ],
      steps: [
        'Whisk dry ingredients. In another bowl whisk buttermilk, eggs, butter, and vanilla.',
        'Combine gently — lumps are fine. Rest 5 minutes.',
        'Cook on a buttered griddle until bubbles form, flip once, and serve.'
      ],
      reviews: [
        { name: 'Dana W.', stars: 5, text: 'Tallest pancakes I have ever made at home.', date: '2026-03-30' }
      ]
    },
    {
      id: 'miso-salmon',
      title: 'Miso Glazed Salmon',
      shortDescription: 'Sticky-sweet miso salmon with sesame and scallions.',
      categoryIds: ['dinner', 'healthy', 'quick'],
      price: 11,
      badges: ['Dairy Free', 'Halal'],
      nutrition: { calories: 410, protein: '34g', carbs: '12g', fat: '24g' },
      image: 'images/recipes/miso-salmon.jpg',
      servingsBase: 2,
      time: '25 min',
      difficulty: 'Easy',
      featured: true,
      ingredients: [
        { amount: 2, unit: 'fillets', name: 'salmon', scalable: true },
        { amount: 2, unit: 'tbsp', name: 'white miso', scalable: true },
        { amount: 1, unit: 'tbsp', name: 'honey', scalable: true },
        { amount: 1, unit: 'tbsp', name: 'soy sauce', scalable: true },
        { amount: 1, unit: 'tsp', name: 'sesame oil', scalable: true },
        { amount: 2, unit: '', name: 'scallions, sliced', scalable: true },
        { amount: 1, unit: 'tsp', name: 'sesame seeds', scalable: true }
      ],
      steps: [
        'Whisk miso, honey, soy, and sesame oil into a glaze.',
        'Brush salmon and broil or roast at 400°F for 10–12 minutes.',
        'Finish with scallions and sesame seeds.'
      ],
      reviews: [
        { name: 'Omar F.', stars: 5, text: 'Better than takeout. On repeat in our house.', date: '2026-10-02' }
      ]
    },
    {
      id: 'tomato-soup',
      title: 'Roasted Tomato Soup',
      shortDescription: 'Deep roasted tomato soup finished with cream and basil.',
      categoryIds: ['dinner', 'comfort'],
      price: 7,
      badges: ['Vegetarian', 'Gluten Free'],
      nutrition: { calories: 220, protein: '5g', carbs: '22g', fat: '12g' },
      image: 'images/recipes/tomato-soup.jpg',
      servingsBase: 4,
      time: '50 min',
      difficulty: 'Easy',
      featured: false,
      ingredients: [
        { amount: 1.2, unit: 'kg', name: 'ripe tomatoes', scalable: true },
        { amount: 1, unit: '', name: 'onion, quartered', scalable: true },
        { amount: 4, unit: 'cloves', name: 'garlic', scalable: true },
        { amount: 3, unit: 'tbsp', name: 'olive oil', scalable: true },
        { amount: 2, unit: 'cups', name: 'vegetable stock', scalable: true },
        { amount: 0.5, unit: 'cup', name: 'cream', scalable: true },
        { amount: 1, unit: 'handful', name: 'fresh basil', scalable: true }
      ],
      steps: [
        'Roast tomatoes, onion, and garlic with oil at 425°F for 35 minutes.',
        'Blend with stock until smooth; simmer 10 minutes.',
        'Stir in cream and basil. Season to taste.'
      ],
      reviews: [
        { name: 'Hannah B.', stars: 5, text: 'Cozy and rich. Pair with grilled cheese.', date: '2026-01-15' }
      ]
    },
    {
      id: 'lemon-tart',
      title: 'Sunny Lemon Tart',
      shortDescription: 'Buttery crust, sharp lemon curd, and a dusting of sugar.',
      categoryIds: ['desserts'],
      price: 10,
      badges: ['Vegetarian', 'Halal'],
      nutrition: { calories: 360, protein: '5g', carbs: '42g', fat: '18g' },
      image: 'images/recipes/lemon-tart.jpg',
      servingsBase: 8,
      time: '90 min',
      difficulty: 'Advanced',
      featured: false,
      ingredients: [
        { amount: 200, unit: 'g', name: 'flour', scalable: true },
        { amount: 100, unit: 'g', name: 'cold butter', scalable: true },
        { amount: 4, unit: '', name: 'eggs', scalable: true },
        { amount: 150, unit: 'g', name: 'sugar', scalable: true },
        { amount: 120, unit: 'ml', name: 'lemon juice', scalable: true },
        { amount: 2, unit: '', name: 'lemons, zested', scalable: true },
        { amount: 100, unit: 'ml', name: 'cream', scalable: true }
      ],
      steps: [
        'Make and blind-bake a shortcrust shell until golden.',
        'Whisk eggs, sugar, lemon juice, zest, and cream for the filling.',
        'Bake until just set with a slight wobble. Chill before slicing.'
      ],
      reviews: [
        { name: 'Grace Y.', stars: 5, text: 'Bakery quality. Worth every minute.', date: '2026-02-28' }
      ]
    },
    {
      id: 'steak-fries',
      title: 'Garlic Butter Steak & Fries',
      shortDescription: 'Pan-seared steak with garlic butter and crispy oven fries.',
      categoryIds: ['dinner', 'comfort'],
      price: 14,
      badges: ['Halal', 'Dairy Free Option'],
      nutrition: { calories: 680, protein: '42g', carbs: '48g', fat: '34g' },
      image: 'images/recipes/steak-fries.jpg',
      servingsBase: 2,
      time: '40 min',
      difficulty: 'Medium',
      featured: true,
      ingredients: [
        { amount: 2, unit: '', name: 'ribeye or sirloin steaks', scalable: true },
        { amount: 500, unit: 'g', name: 'potatoes, cut into fries', scalable: true },
        { amount: 3, unit: 'tbsp', name: 'butter', scalable: true },
        { amount: 4, unit: 'cloves', name: 'garlic', scalable: true },
        { amount: 2, unit: 'tbsp', name: 'oil', scalable: true },
        { amount: 1, unit: 'sprig', name: 'rosemary', scalable: false },
        { amount: 1, unit: 'tsp', name: 'salt', scalable: false }
      ],
      steps: [
        'Toss fries with oil and salt; roast at 425°F until crisp.',
        'Season steaks and sear hard in a hot pan; baste with butter, garlic, rosemary.',
        'Rest steaks 5 minutes. Plate with fries and pan butter.'
      ],
      reviews: [
        { name: 'Leo C.', stars: 5, text: 'Steakhouse vibe without leaving home.', date: '2026-09-25' }
      ]
    }
  ],

  bundles: [
    {
      id: 'weeknight-trio',
      title: 'Weeknight Dinner Trio',
      description: 'Three fast dinners for busy evenings — pasta, salmon, and a grain bowl upgrade path.',
      recipeIds: ['garlic-herb-pasta', 'miso-salmon', 'green-goddess'],
      price: 22,
      compareAtPrice: 27,
      image: 'images/bundles/weeknight.jpg'
    },
    {
      id: 'brunch-bundle',
      title: 'Weekend Brunch Bundle',
      description: 'Pancakes, avocado toast, and a sweet finish for lazy mornings.',
      recipeIds: ['fluffy-pancakes', 'avocado-toast', 'chocolate-lava'],
      price: 18,
      compareAtPrice: 21,
      image: 'images/bundles/brunch.jpg'
    },
    {
      id: 'date-night',
      title: 'Date Night Pack',
      description: 'Truffle pizza, steak & fries, and lemon tart — an at-home tasting menu.',
      recipeIds: ['truffle-pizza', 'steak-fries', 'lemon-tart'],
      price: 29,
      compareAtPrice: 36,
      image: 'images/bundles/date-night.jpg'
    }
  ],

  discountCodes: [
    { code: 'WELCOME10', type: 'percent', value: 10, active: true },
    { code: 'CREATOR5', type: 'fixed', value: 5, active: true }
  ],

  freeRecipeSignup: {
    headline: 'Get the free Rainbow Grain Bowl',
    blurb: 'Join the list and unlock the free recipe instantly in this demo (no real email is sent).',
    recipeId: 'rainbow-bowl'
  },

  demo: {
    watermarkText: 'PengSites DEMO',
    poweredBy: 'Powered by PengSites',
    resetLabel: 'Reset demo',
    platformName: 'PengSites',
    platformFeeLabel: 'PengSites share'
  },

  seedMeta: {
    visitorBaseline: 1842,
    samplePayouts: [
      {
        id: 'po-seed-1',
        periodStart: '2026-09-29',
        periodEnd: '2026-10-12',
        grossSales: 420,
        orderCount: 38,
        status: 'paid'
      },
      {
        id: 'po-seed-2',
        periodStart: '2026-10-13',
        periodEnd: '2026-10-26',
        grossSales: 512,
        orderCount: 45,
        status: 'paid'
      }
    ]
  }
};
