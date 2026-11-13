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
      intro: 'This is the weeknight pasta I make when I want something that tastes restaurant-level without a long list of ingredients. The sauce is just butter, garlic, lemon, and pasta water — emulsified until glossy. The key is moving fast once the garlic hits the pan so it stays sweet, not bitter.',
      categoryIds: ['dinner', 'quick'],
      price: 9,
      badges: ['Vegetarian'],
      nutrition: { calories: 420, protein: '14g', carbs: '52g', fat: '18g' },
      image: 'images/recipes/garlic-herb-pasta.jpg',
      servingsBase: 4,
      prepTime: '8 min',
      cookTime: '12 min',
      time: '20 min',
      difficulty: 'Easy',
      featured: true,
      equipment: ['Large pot', 'Wide skillet', 'Tongs', 'Microplane or zester'],
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
        {
          text: 'Bring a large pot of water to a rolling boil and season it with about 1 tablespoon kosher salt — it should taste lightly salty. Add 400 g spaghetti and cook until just al dente, usually 1 minute less than the package says. Before draining, ladle out 1 cup (240 ml) of the starchy pasta water and keep it nearby.',
          tip: 'Undercooking by a minute matters: the pasta finishes in the sauce and stays springy.'
        },
        {
          text: 'While the pasta cooks, melt 6 tbsp unsalted butter in a wide skillet over medium heat. When the foam subsides, add 5 cloves minced garlic and cook for 45–60 seconds, stirring constantly, until fragrant and just turning pale gold at the edges — not brown.',
          tip: 'If the garlic browns, pull the pan off heat and add a splash of pasta water immediately to stop the cooking.'
        },
        {
          text: 'Add the drained spaghetti straight to the skillet along with the zest of 1 lemon, 2 tbsp of the lemon juice, 2 tbsp chopped parsley, and 1/4 cup (60 ml) of the reserved pasta water. Toss vigorously with tongs for 30–45 seconds until every strand looks lightly coated and glossy.',
          tip: ''
        },
        {
          text: 'Sprinkle in 50 g grated parmesan a little at a time while tossing, adding another 2–4 tbsp pasta water as needed until the sauce looks creamy and clings to the pasta (not watery, not greasy). Taste and finish with 1/2 tsp salt and 1/4 tsp black pepper, or more lemon juice if you want it brighter. Serve immediately in warm bowls.',
          tip: 'If the sauce breaks and looks oily, add 1–2 tbsp more pasta water and toss hard off the heat to bring it back together.'
        }
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
      intro: 'This free bowl is built for meal prep: roast once, assemble all week. The tahini dressing should be pourable — thin it with cold water until it ribbons off a spoon. Use whatever veg you have; the method stays the same.',
      categoryIds: ['healthy', 'quick'],
      price: 0,
      badges: ['Vegan', 'Dairy Free', 'Gluten Free'],
      nutrition: { calories: 380, protein: '12g', carbs: '48g', fat: '16g' },
      image: 'images/recipes/rainbow-bowl.jpg',
      servingsBase: 2,
      prepTime: '10 min',
      cookTime: '20 min',
      time: '30 min',
      difficulty: 'Easy',
      featured: true,
      equipment: ['Sheet pan', 'Mixing bowl', 'Small whisk'],
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
        {
          text: 'Heat the oven to 425°F (220°C). On a sheet pan, toss 1 cubed sweet potato and 1 cup drained chickpeas with 1 tbsp olive oil, a pinch of salt, and black pepper. Spread in a single layer so nothing steams. Roast for 20 minutes, flipping once at the 12-minute mark, until the sweet potato is tender and the chickpeas are lightly crisp at the edges.',
          tip: 'Crowding the pan makes soggy veg — use two pans if you double the recipe.'
        },
        {
          text: 'In a small bowl, whisk 3 tbsp tahini with 1 tbsp lemon juice and a pinch of salt. Add cold water 1 tsp at a time (usually 2–4 tsp total) until the dressing is smooth and pourable, like heavy cream. Taste — it should be nutty and bright, not pasty.',
          tip: ''
        },
        {
          text: 'Divide 1 cup cooked quinoa and 2 cups mixed greens between two bowls. Top with the hot roasted sweet potato and chickpeas, then fan 1 sliced avocado over each bowl. Drizzle generously with the tahini dressing and finish with an extra squeeze of lemon if you like.',
          tip: 'For meal prep, keep dressing separate and add avocado just before eating.'
        }
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
      intro: 'Date-night pizza without delivery. The mushrooms need real browning — give them space in the pan so they sear instead of steaming. Truffle oil goes on after baking; heat dulls the aroma.',
      categoryIds: ['dinner', 'comfort'],
      price: 12,
      badges: ['Vegetarian'],
      nutrition: { calories: 540, protein: '22g', carbs: '58g', fat: '24g' },
      image: 'images/recipes/truffle-pizza.jpg',
      servingsBase: 2,
      prepTime: '20 min',
      cookTime: '25 min',
      time: '45 min',
      difficulty: 'Medium',
      featured: true,
      equipment: ['Cast-iron skillet or pizza stone', 'Rolling pin or hands', 'Oven'],
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
        {
          text: 'Put a pizza stone or overturned heavy sheet pan on the middle rack and heat the oven to 500°F (260°C) for at least 20 minutes. Meanwhile, tear or slice 200 g mixed mushrooms. Heat 1 tbsp of the olive oil in a skillet over medium-high, add the mushrooms in a single layer, and cook undisturbed for 2–3 minutes until deeply browned on one side. Stir in 2 cloves sliced garlic, a pinch of salt, and cook 1–2 minutes more until fragrant. Set aside.',
          tip: 'If mushrooms release a lot of liquid, keep cooking until it evaporates — wet toppings make a soggy crust.'
        },
        {
          text: 'On a lightly floured surface, stretch 250 g pizza dough into a roughly 10–12 inch round. Brush the surface with the remaining 1 tbsp olive oil. Tear 150 g fresh mozzarella over the dough, leaving a 1/2-inch border, then scatter the mushroom-garlic mixture evenly on top.',
          tip: ''
        },
        {
          text: 'Slide the pizza onto the hot stone or pan and bake for 8–12 minutes, until the crust is blistered and the cheese is bubbling with browned spots. Transfer to a board, drizzle with 1 tsp truffle oil, and scatter a handful of fresh thyme leaves. Rest 1 minute, slice, and serve.',
          tip: 'Start with 1 tsp truffle oil — it is strong. Add a few more drops at the table if you want more perfume.'
        }
      ],
      reviews: [
        { name: 'Elena R.', stars: 5, text: 'Date-night worthy. The truffle tip is perfect.', date: '2026-06-14' }
      ]
    },
    {
      id: 'chocolate-lava',
      title: 'Molten Chocolate Lava Cakes',
      shortDescription: 'Individual cakes with a gooey chocolate center — ready in under 30 minutes.',
      intro: 'These work when the edges are set and the centers still jiggle like pudding. Bake them on a sheet pan so you can pull all four at once. Serve within a minute of unmolding — the molten center firms as it cools.',
      categoryIds: ['desserts', 'quick'],
      price: 8,
      badges: ['Vegetarian'],
      nutrition: { calories: 390, protein: '6g', carbs: '36g', fat: '26g' },
      image: 'images/recipes/chocolate-lava.jpg',
      servingsBase: 4,
      prepTime: '12 min',
      cookTime: '12 min',
      time: '25 min',
      difficulty: 'Medium',
      featured: true,
      equipment: ['4 ramekins (6 oz)', 'Heatproof bowl', 'Whisk', 'Baking sheet'],
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
        {
          text: 'Heat the oven to 425°F (220°C). Generously butter four 6-oz ramekins, then dust with cocoa powder or flour, tapping out the excess so every surface is coated. Set the ramekins on a baking sheet.',
          tip: 'A thorough butter-and-dust coating is what lets the cakes release cleanly.'
        },
        {
          text: 'In a heatproof bowl over barely simmering water (or in short microwave bursts), melt 120 g dark chocolate with 120 g butter until smooth and glossy. Cool for 2–3 minutes so it is warm, not hot.',
          tip: ''
        },
        {
          text: 'In a separate bowl, whisk 2 eggs, 2 egg yolks, and 60 g sugar for about 1 minute until thick and pale. Fold in the chocolate-butter mixture, then sift in 40 g flour and a pinch of salt. Fold gently just until no dry streaks remain — do not overmix.',
          tip: 'The batter should look shiny and pourable, like warm pudding.'
        },
        {
          text: 'Divide the batter evenly among the ramekins (about 1/2 cup / 120 ml each). Bake for 10–12 minutes, until the edges are set and matte but the centers still jiggle when you gently shake the pan. Rest 1 minute, run a knife around each edge, invert onto plates, and serve immediately with a pinch of flaky salt or ice cream.',
          tip: 'At 10 minutes they are very molten; at 12 minutes the center is thicker but still soft. Start checking at 10.'
        }
      ],
      reviews: [
        { name: 'Priya S.', stars: 5, text: 'Worked first try. Guests thought I ordered dessert.', date: '2026-09-18' }
      ]
    },
    {
      id: 'green-goddess',
      title: 'Green Goddess Salad',
      shortDescription: 'Crunchy chopped salad with a creamy herb dressing.',
      intro: 'Chop everything small so every bite gets dressing. The yogurt-herb sauce should be thick enough to cling to cabbage but loose enough to drizzle — thin with a teaspoon of water or lemon if needed.',
      categoryIds: ['healthy', 'quick'],
      price: 7,
      badges: ['Vegetarian', 'Gluten Free'],
      nutrition: { calories: 280, protein: '8g', carbs: '18g', fat: '20g' },
      image: 'images/recipes/green-goddess.jpg',
      servingsBase: 4,
      prepTime: '15 min',
      cookTime: '0 min',
      time: '15 min',
      difficulty: 'Easy',
      featured: false,
      equipment: ['Blender or food processor', 'Large mixing bowl', 'Sharp knife'],
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
        {
          text: 'In a blender, combine 1/2 cup Greek yogurt, a big handful of basil and chives (about 1 packed cup leaves/herbs), the juice of 1 lemon (about 3 tbsp), 2 tbsp olive oil, 1/2 tsp salt, and a few grinds of pepper. Blend until completely smooth and pale green, 20–30 seconds. Taste and add more lemon or salt until it tastes bright.',
          tip: 'If the blender struggles, add 1 tbsp cold water to get it moving.'
        },
        {
          text: 'Chop 1 head romaine into bite-size pieces, dice 1 cup cucumber, and shred 1 cup cabbage. Add everything to a large bowl and pour on about three-quarters of the dressing. Toss thoroughly for a full 30 seconds so every piece is coated. Add more dressing if needed.',
          tip: ''
        },
        {
          text: 'Taste for salt and lemon, then serve immediately while the greens are crisp. Finish with extra chopped herbs on top if you have them.',
          tip: 'For make-ahead, store chopped veg and dressing separately and toss right before serving.'
        }
      ],
      reviews: [
        { name: 'Chris L.', stars: 4, text: 'Bright and crunchy. I add grilled chicken.', date: '2026-05-22' }
      ]
    },
    {
      id: 'avocado-toast',
      title: 'Chili-Lime Avocado Toast',
      shortDescription: 'The upgraded avocado toast with chili oil, lime, and soft egg.',
      intro: 'Good avocado toast is about contrast: deep toast, creamy avocado, sharp lime, and heat from chili oil. Soft eggs make it a full breakfast — jammy yolks beat fully hard-cooked here.',
      categoryIds: ['breakfast', 'quick'],
      price: 5,
      badges: ['Vegetarian'],
      nutrition: { calories: 320, protein: '12g', carbs: '28g', fat: '18g' },
      image: 'images/recipes/avocado-toast.jpg',
      servingsBase: 2,
      prepTime: '5 min',
      cookTime: '5 min',
      time: '10 min',
      difficulty: 'Easy',
      featured: false,
      equipment: ['Toaster or skillet', 'Small saucepan', 'Fork'],
      ingredients: [
        { amount: 2, unit: 'slices', name: 'sourdough', scalable: true },
        { amount: 1, unit: '', name: 'ripe avocado', scalable: true },
        { amount: 2, unit: '', name: 'eggs', scalable: true },
        { amount: 1, unit: 'tsp', name: 'chili oil', scalable: true },
        { amount: 0.5, unit: '', name: 'lime, juiced', scalable: true },
        { amount: 1, unit: 'pinch', name: 'flaky salt', scalable: false }
      ],
      steps: [
        {
          text: 'Toast 2 thick slices of sourdough until deep golden and crisp at the edges — about 2–3 minutes in a toaster or in a dry skillet over medium heat. Soft-boil or fry 2 eggs: for jammy soft-boiled, lower into boiling water for 7 minutes, then chill in cold water for 30 seconds and peel.',
          tip: 'Underdone toast turns soggy under avocado. Go darker than you think.'
        },
        {
          text: 'Halve 1 ripe avocado and scoop into a bowl. Add the juice of 1/2 lime (about 1 tbsp) and a pinch of flaky salt. Mash with a fork until creamy but still a little chunky — about 10–12 presses.',
          tip: ''
        },
        {
          text: 'Pile the avocado evenly onto the toast, about 1/2 avocado per slice. Top each with an egg, drizzle 1/2 tsp chili oil over each toast, and finish with another pinch of flaky salt. Eat immediately while the toast is still crunchy.',
          tip: 'No chili oil? Mix 1/2 tsp chili flakes into 1 tsp olive oil and spoon that over instead.'
        }
      ],
      reviews: [
        { name: 'Nora H.', stars: 5, text: 'Simple but the chili oil changes everything.', date: '2026-04-09' }
      ]
    },
    {
      id: 'fluffy-pancakes',
      title: 'Buttermilk Cloud Pancakes',
      shortDescription: 'Extra-fluffy weekend pancakes with vanilla and a crisp edge.',
      intro: 'Resting the batter is non-negotiable — it gives the baking powder time to wake up and the flour time to hydrate. Cook on medium, not high, so the insides steam through before the outsides scorch.',
      categoryIds: ['breakfast', 'comfort'],
      price: 8,
      badges: ['Vegetarian', 'Halal'],
      nutrition: { calories: 350, protein: '10g', carbs: '48g', fat: '12g' },
      image: 'images/recipes/fluffy-pancakes.jpg',
      servingsBase: 4,
      prepTime: '10 min',
      cookTime: '15 min',
      time: '25 min',
      difficulty: 'Easy',
      featured: true,
      equipment: ['Two mixing bowls', 'Whisk', 'Griddle or nonstick skillet', 'Spatula'],
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
        {
          text: 'In a large bowl, whisk together 2 cups flour, 2 tbsp sugar, 2 tsp baking powder, 1/2 tsp baking soda, and 1/2 tsp salt until evenly combined. In a second bowl, whisk 2 cups buttermilk, 2 eggs, 3 tbsp melted butter, and 1 tsp vanilla until smooth.',
          tip: ''
        },
        {
          text: 'Pour the wet ingredients into the dry and fold with a spatula just until combined — 12 to 15 folds. Lumps are good; overmixing makes tough pancakes. Let the batter rest for 5 minutes while you heat the griddle.',
          tip: 'If the batter looks too thick after resting, loosen with 1–2 tbsp buttermilk.'
        },
        {
          text: 'Heat a buttered griddle or nonstick skillet over medium heat. Scoop about 1/4 cup (60 ml) batter per pancake. Cook until bubbles form across the surface and the edges look set, 2–3 minutes. Flip once and cook 1–2 minutes more until the underside is deep golden. Serve hot with butter and maple syrup.',
          tip: 'Wipe and re-butter the pan between batches so every pancake gets a crisp edge.'
        }
      ],
      reviews: [
        { name: 'Dana W.', stars: 5, text: 'Tallest pancakes I have ever made at home.', date: '2026-03-30' }
      ]
    },
    {
      id: 'miso-salmon',
      title: 'Miso Glazed Salmon',
      shortDescription: 'Sticky-sweet miso salmon with sesame and scallions.',
      intro: 'White miso, honey, and soy make a glaze that caramelizes under high heat. Watch the last minutes — sugar in the glaze can go from glossy to burnt quickly. Serve over rice so nothing is wasted.',
      categoryIds: ['dinner', 'healthy', 'quick'],
      price: 11,
      badges: ['Dairy Free', 'Halal'],
      nutrition: { calories: 410, protein: '34g', carbs: '12g', fat: '24g' },
      image: 'images/recipes/miso-salmon.jpg',
      servingsBase: 2,
      prepTime: '8 min',
      cookTime: '12 min',
      time: '25 min',
      difficulty: 'Easy',
      featured: true,
      equipment: ['Small bowl', 'Baking sheet or broiler pan', 'Pastry brush'],
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
        {
          text: 'Heat the oven to 400°F (200°C), or set the broiler to high with a rack 6 inches from the element. In a small bowl, whisk 2 tbsp white miso, 1 tbsp honey, 1 tbsp soy sauce, and 1 tsp sesame oil until completely smooth with no miso lumps.',
          tip: 'If the miso is stiff, microwave the glaze for 10 seconds to loosen it.'
        },
        {
          text: 'Pat 2 salmon fillets dry and place them skin-side down on a lightly oiled foil-lined sheet. Brush a thick coat of glaze over the tops and sides (use about two-thirds of the glaze; save the rest). Roast for 10–12 minutes, or broil for 6–8 minutes, until the fish flakes easily and the glaze is sticky and caramelized in spots. Internal temperature should be about 125–130°F (52–54°C) for medium.',
          tip: ''
        },
        {
          text: 'Brush with the remaining glaze. Scatter 2 sliced scallions and 1 tsp sesame seeds over the top. Rest 2 minutes, then serve with rice or greens.',
          tip: 'For extra char, broil the glazed fish for the final 60–90 seconds — stay at the oven door.'
        }
      ],
      reviews: [
        { name: 'Omar F.', stars: 5, text: 'Better than takeout. On repeat in our house.', date: '2026-10-02' }
      ]
    },
    {
      id: 'tomato-soup',
      title: 'Roasted Tomato Soup',
      shortDescription: 'Deep roasted tomato soup finished with cream and basil.',
      intro: 'Roasting concentrates the tomatoes so the soup tastes slow-simmered without standing over a pot for hours. Blend until completely smooth, then finish with cream off the heat so it stays silky.',
      categoryIds: ['dinner', 'comfort'],
      price: 7,
      badges: ['Vegetarian', 'Gluten Free'],
      nutrition: { calories: 220, protein: '5g', carbs: '22g', fat: '12g' },
      image: 'images/recipes/tomato-soup.jpg',
      servingsBase: 4,
      prepTime: '10 min',
      cookTime: '40 min',
      time: '50 min',
      difficulty: 'Easy',
      featured: false,
      equipment: ['Sheet pan', 'Blender', 'Medium pot'],
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
        {
          text: 'Heat the oven to 425°F (220°C). Halve 1.2 kg ripe tomatoes and spread them on a sheet pan with 1 quartered onion and 4 garlic cloves (skins on is fine). Drizzle with 3 tbsp olive oil and 1 tsp salt. Roast for 35 minutes until the tomatoes collapse and caramelize at the edges.',
          tip: 'Underripe tomatoes need the full 35 minutes; very ripe ones may be ready at 30.'
        },
        {
          text: 'Squeeze the soft garlic from its skins into a blender. Add the roasted tomatoes, onion, and any pan juices, then pour in 2 cups vegetable stock. Blend until completely smooth, 45–60 seconds. Pour into a pot and simmer over medium-low for 10 minutes to marry the flavors.',
          tip: ''
        },
        {
          text: 'Stir in 1/2 cup cream and a handful of fresh basil (torn). Warm through for 1–2 minutes without boiling. Taste and adjust salt. Ladle into bowls and finish with a drizzle of olive oil or more cream.',
          tip: 'For a dairy-free version, swap the cream for 1/2 cup full-fat coconut milk.'
        }
      ],
      reviews: [
        { name: 'Hannah B.', stars: 5, text: 'Cozy and rich. Pair with grilled cheese.', date: '2026-01-15' }
      ]
    },
    {
      id: 'lemon-tart',
      title: 'Sunny Lemon Tart',
      shortDescription: 'Buttery crust, sharp lemon curd, and a dusting of sugar.',
      intro: 'A bakery-style tart at home. Blind-bake the crust until truly golden — pale pastry turns soggy under the curd. The filling should still wobble in the center when you pull it; it sets as it chills.',
      categoryIds: ['desserts'],
      price: 10,
      badges: ['Vegetarian', 'Halal'],
      nutrition: { calories: 360, protein: '5g', carbs: '42g', fat: '18g' },
      image: 'images/recipes/lemon-tart.jpg',
      servingsBase: 8,
      prepTime: '30 min',
      cookTime: '45 min',
      time: '90 min',
      difficulty: 'Advanced',
      featured: false,
      equipment: ['9-inch tart pan', 'Pie weights or dried beans', 'Whisk', 'Mixing bowls'],
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
        {
          text: 'For the crust, pulse or rub 200 g flour with 100 g cold cubed butter and a pinch of salt until sandy. Add 2–3 tbsp ice water just until the dough holds when pinched. Press into a 9-inch tart pan, chill 20 minutes, then blind-bake at 375°F (190°C) with parchment and weights for 15 minutes. Remove weights and bake 8–10 minutes more until golden. Cool slightly.',
          tip: 'If the sides slump, press them back up with a spoon while the crust is still hot.'
        },
        {
          text: 'Whisk 4 eggs with 150 g sugar until combined. Whisk in 120 ml lemon juice, the zest of 2 lemons, and 100 ml cream until smooth. Strain through a fine mesh sieve into a jug to catch any zest clumps or egg chalazae.',
          tip: ''
        },
        {
          text: 'Place the tart shell on a baking sheet. Pour in the filling nearly to the rim. Bake at 325°F (165°C) for 20–25 minutes, until the edges are set but the center still wobbles like jelly when nudged. Cool to room temperature, then chill at least 2 hours before dusting with sugar and slicing with a hot, clean knife.',
          tip: 'Overbaked filling turns scrambled and grainy — pull it while the center still moves.'
        }
      ],
      reviews: [
        { name: 'Grace Y.', stars: 5, text: 'Bakery quality. Worth every minute.', date: '2026-02-28' }
      ]
    },
    {
      id: 'steak-fries',
      title: 'Garlic Butter Steak & Fries',
      shortDescription: 'Pan-seared steak with garlic butter and crispy oven fries.',
      intro: 'Steakhouse energy at home: hot pan, undisturbed sear, and butter basting. The fries need a hot oven and space on the pan. Rest the steak before slicing so the juices stay in the meat.',
      categoryIds: ['dinner', 'comfort'],
      price: 14,
      badges: ['Halal', 'Dairy Free Option'],
      nutrition: { calories: 680, protein: '42g', carbs: '48g', fat: '34g' },
      image: 'images/recipes/steak-fries.jpg',
      servingsBase: 2,
      prepTime: '15 min',
      cookTime: '25 min',
      time: '40 min',
      difficulty: 'Medium',
      featured: true,
      equipment: ['Heavy skillet', 'Sheet pan', 'Tongs', 'Instant-read thermometer'],
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
        {
          text: 'Heat the oven to 425°F (220°C). Toss 500 g potato fries with 1 tbsp of the oil and 1/2 tsp of the salt. Spread on a sheet pan in a single layer and roast for 25–30 minutes, flipping once, until deeply golden and crisp.',
          tip: 'Soak cut fries in cold water for 10 minutes and dry well for extra crunch.'
        },
        {
          text: 'Pat 2 steaks very dry and season all over with the remaining 1/2 tsp salt and black pepper. Heat a heavy skillet over high until almost smoking, add the remaining 1 tbsp oil, then lay in the steaks. Sear undisturbed for 2–3 minutes per side for a deep crust. In the last 2 minutes, add 3 tbsp butter, 4 smashed garlic cloves, and 1 rosemary sprig; tilt the pan and baste continuously.',
          tip: 'For medium-rare, pull at 130°F (54°C); carryover heat will bring it up a few degrees.'
        },
        {
          text: 'Transfer steaks to a plate and rest 5 minutes. Spoon the garlic-rosemary butter over the top. Serve with the hot fries and any remaining pan butter.',
          tip: 'Dairy-free: baste with 2 tbsp more oil plus the garlic and rosemary instead of butter.'
        }
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
