// L = label shown on each item. T=textual fact, H=historical context, I=critical interpretation, R=religious viewpoint
const STUDY=[
{id:'author',title:'About the Author',i:'👩‍🏫',items:[
{L:'H',h:'Life',t:`Born 26 August 1910 in Skopje as Anjezë Gonxhe Bojaxhiu. She joined the Sisters of Loreto and reached India in 1929. In 1950 she founded the Missionaries of Charity in Kolkata to serve the poor, sick and dying. She received the Nobel Peace Prize in 1979, died on 5 September 1997, and was canonised on 4 September 2016.`,bn:`১৯১০ সালে স্কপজেতে জন্ম। ১৯২৯ সালে ভারতে আসেন, ১৯৫০ সালে কলকাতায় মিশনারিজ অফ চ্যারিটি গড়েন। ১৯৭৯ সালে নোবেল শান্তি পুরস্কার পান, ১৯৯৭ সালে মারা যান এবং ২০১৬ সালে সন্ত ঘোষিত হন।`},
{L:'H',h:'Timeline',t:`1910 birth → 1929 arrives in India → 1950 Missionaries of Charity → 1979 Nobel Peace Prize → 1997 death → 2016 canonisation.`},
{L:'R',h:'Note',t:`Her sense of "calling" and sainthood are matters of religious belief; the dates above are historical facts. Some of her methods and views have also been debated by critics.`}]},
{id:'text',title:'About the Text',i:'📄',items:[
{L:'H',h:'What is a Nobel Lecture?',t:`A speech given by a laureate when receiving the Nobel Prize. Mother Teresa delivered this one in Oslo, Norway, in December 1979 (the text itself mentions Oslo and Norway).`,bn:`নোবেল পুরস্কার গ্রহণের সময় বিজয়ী যে ভাষণ দেন তাকেই নোবেল লেকচার বলে।`},
{L:'T',h:'Purpose and message',t:`She begins with prayer and thanks, then argues that peace begins in the home through love shown in small acts, and that loneliness and neglect are also poverty.`},
{L:'I',h:'Structure',t:`Prayer → Christ's love → old-age home → family and children → rescued dying people → small acts (the sugar boy, the Hindu and Muslim families) → thanks, smile, and a closing appeal.`}]},
{id:'hist',title:'Historical Background',i:'🕰️',items:[
{L:'H',h:'Kolkata and the poor',t:`Her Sisters worked among the destitute and dying of Kolkata; the lecture recalls people picked up from the streets.`},
{L:'R',h:'Religious context',t:`St Francis's prayer, Gospel and Scripture references are Christian. In the lecture they express her faith, not universally accepted facts.`},
{L:'R',h:'Family planning and abortion',t:`She presents abortion as the greatest destroyer of peace and promotes natural family planning. This is her moral viewpoint; views on these issues differ widely, and the figures she quotes are her own account.`}]},
{id:'crit',title:'Critical Analysis',i:'🔍',items:[
{L:'I',h:'Argument',t:`Peace is built from personal love, first at home. Global peace is the sum of small relationships.`,bn:`তাঁর যুক্তি: শান্তি শুরু হয় ঘর থেকে, ছোট ছোট ভালোবাসার কাজ থেকে।`},
{L:'I',h:'How she argues',t:`Anecdotes make ideas concrete; repetition ("until it hurts", "begins at home") builds emphasis; direct address ("you and I") involves listeners; plain, spoken style gives sincerity.`},
{L:'I',h:'Poverty',t:`She contrasts material hunger (rice) with emotional poverty (being unwanted), and finds the second harder to cure.`},
{L:'I',h:'Limits',t:`The speech is persuasive rather than analytical: it relies on faith and emotion, and offers few facts about social causes of poverty. Contested claims reflect her standpoint.`}]},
{id:'theme',title:'Themes',i:'❤️',items:[
{L:'T',h:'❤️ Love',t:`Love must "hurt", i.e. involve sacrifice (the smoker's gift, the sugar boy). Exam: central theme.`},
{L:'T',h:'🏠 Family',t:`The old-age home and neglected youth show peace failing at home.`},
{L:'T',h:'🌱 Dignity',t:`The rescued woman and man die loved and cared for.`},
{L:'T',h:'😊 Smile',t:`A smile is "the beginning of love"; the professors are told to smile at each other.`},
{L:'T',h:'🤝 Sharing',t:`The mother sharing rice with a neighbouring family shows love crossing religion.`}]},
{id:'dev',title:'Literary Devices',i:'✒️',items:[
{L:'I',h:'Repetition',t:`Definition: repeating words for emphasis. Example: "begins at home". Effect: makes the message memorable.`},
{L:'I',h:'Rhetorical question',t:`Question asked for effect. Example: "Are we there to receive them?" Effect: stirs conscience.`},
{L:'I',h:'Anecdote',t:`A short true-to-life story. Example: the old-age home. Effect: makes ideas real.`},
{L:'I',h:'Contrast',t:`Placing opposites together. Example: everything material, yet nobody smiling. Effect: highlights emotional poverty.`},
{L:'I',h:'Biblical allusion',t:`Reference to the Bible. Example: "You did it to me". Effect: gives moral authority.`},
{L:'I',h:'Direct address',t:`Speaking to the audience. Example: "I want you to find the poor here". Effect: personal appeal.`},
{L:'I',h:'Enumeration',t:`Listing items. Example: the hungry one, the naked one, the homeless one… Effect: shows Christ in every suffering person.`}]},
{id:'prayer',title:'Prayer of St Francis',i:'🙏',items:[
{L:'T',h:'Textbook text',t:`See Pages 90–91. Key idea: be an instrument of peace; bring love for hatred, pardon for offence, hope for despair; console, understand and love others rather than seek these for oneself.`,bn:`এই প্রার্থনার মূল কথা: ঘৃণার জায়গায় ভালোবাসা, দুঃখের জায়গায় আনন্দ আনা এবং নিজে সান্ত্বনা পাওয়ার চেয়ে অন্যকে সান্ত্বনা দেওয়া।`},
{L:'H',h:'Vocab',t:`offence = wrong done to someone; discord = disagreement; pardon = forgiveness.`}]}
];
const QA=[
{q:'What was the reaction of the rescued lady before her death?',m:2,a:`The woman, picked up from the street and cared for, smiled, held Mother Teresa's hand, said only "Thank you" and died.`,bn:`মহিলাটি হাসলেন, মাদারের হাত ধরে শুধু "ধন্যবাদ" বললেন এবং মারা গেলেন।`,k:'smile; thank you; grateful love'},
{q:'What did Mother intend to do with the prize money?',m:2,a:`She intended to make a home for many people who had no home, believing love begins at home.`,bn:`তিনি পুরস্কারের অর্থে গৃহহীন মানুষের জন্য ঘর তৈরি করতে চেয়েছিলেন।`,k:'home for the homeless'},
{q:'What did Mother Teresa observe in an old age home that she visited?',m:6,a:`Introduction: she visited a home where children had left their old parents. Main points: the home had beautiful things, yet everyone looked towards the door and nobody smiled. The Sister explained that they hoped a son or daughter would visit. Interpretation: Mother Teresa calls this poverty of love and neglect, and asks whether we are there for lonely members of our own family. Conclusion: material comfort cannot replace care.`,bn:`বৃদ্ধাশ্রমে সব সুবিধা ছিল, কিন্তু সবাই দরজার দিকে তাকিয়ে ছিলেন, কেউ হাসছিলেন না; কারণ তাঁরা সন্তানের আসার অপেক্ষায় ছিলেন। এটি ভালোবাসার দারিদ্র্য।`,k:'looking at door; no smile; forgotten; poverty of love'},
{q:'Which experience is Mother Teresa speaking of: "the most extraordinary experience with the Hindu family that had eight children"?',m:6,a:`Introduction: a gentleman told her a Hindu family with eight children had not eaten for long. Main points: she took rice; the mother divided it and went out, then explained, "They are hungry also", meaning a neighbouring Muslim family. Interpretation: sharing crosses religion and even the poor give. Mother Teresa did not bring more rice so the family could enjoy sharing. Conclusion: love begins at home and spreads to neighbours.`,bn:`আটটি সন্তানের হিন্দু পরিবারের মা চাল পেয়ে অর্ধেক প্রতিবেশী মুসলিম পরিবারকে দিয়ে এলেন কারণ তারাও ক্ষুধার্ত। এটি ভাগ করে নেওয়ার আনন্দ।`,k:'rice; shared; Muslim neighbours; joy of sharing'},
{q:'What is the "greatest destroyer of peace" according to Mother Teresa?',m:2,a:`She names abortion, which she calls a direct killing. This is her moral viewpoint, not a universally accepted fact.`,bn:`তাঁর মতে গর্ভপাত শান্তির সবচেয়ে বড় ধ্বংসকারী; এটি তাঁর ব্যক্তিগত নৈতিক মত।`,k:'viewpoint'},
{q:'Why did the little Hindu boy give up sugar?',m:2,a:`He heard Calcutta had little sugar, so he went without it for three days and brought his sugar to Mother Teresa for her children.`,bn:`চিনির অভাব শুনে ছেলেটি তিন দিন চিনি খায়নি এবং মাদারের শিশুদের জন্য দিয়েছিল।`,k:'sharing; love'},
{q:'What did the man in the drain say?',m:2,a:`He said he had lived like an animal in the street but would die like an angel, loved and cared for.`,bn:`সে বলেছিল সে পশুর মতো বাঁচলেও দেবদূতের মতো মরবে, ভালোবাসা ও যত্ন পেয়ে।`,k:'dignity; no blame'},
{q:'Why does Mother Teresa say "love begins at home"? (Broad)',m:6,a:`Introduction: this is her central idea. Main points: lonely parents, drug-addicted youth and neglected children show peace failing within families. Incidents: the old-age home, the hungry-neighbour sharing. Analysis: she believes small acts of love in the home grow into peace in society. Conclusion: charity and world peace both start with close relationships.`,bn:`পরিবারে ভালোবাসা না থাকলে সমাজে শান্তি আসে না; তাই ছোট ছোট ভালোবাসার কাজ ঘর থেকেই শুরু করতে হয়।`,k:'family; small acts; peace'}
];
