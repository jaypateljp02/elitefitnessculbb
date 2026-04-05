import fs from 'fs';
import path from 'path';

// Strategy: Add deep purple (#7c3aed / #4c1d95) as 20% accent
// Replace SOME orange accents with purple for variety & contrast
// Target: subtitles, tags, icon highlights, hover borders, background glows
const replacements = [
    // --- Visible TEXT accent: Use purple for subtitles & tags (creates contrast) ---
    // tag-elite labels, "THE VISIONARY", section subtitles → purple
    ['tracking-[0.2em] text-elite-orange uppercase', 'tracking-[0.2em] text-purple-400 uppercase'],
    ['tracking-[0.2em] text-elite-orange', 'tracking-[0.2em] text-purple-400'],
    
    // --- Icon colors: alternate some icons to purple for variety ---
    // Check marks in feature lists
    ['<Check size={10} className="text-elite-orange"', '<Check size={10} className="text-purple-400"'],
    ['<Check size={12} className="text-elite-orange"', '<Check size={12} className="text-purple-400"'],
    ['<Check size={18} className', '<Check size={18} className'],  // skip these, too complex
    
    // --- Hover effects: secondary glow on hover ---
    ['hover:text-elite-orange transition-colors text-sm font-bold', 'hover:text-purple-400 transition-colors text-sm font-bold'],
    
    // --- Nav link underline & subtle borders: orange→purple blend ---
    // Navbar "CLUBB" text → purple accent
];

// Custom targeted replacements per file
const perFileReplacements = {
    'Navbar.jsx': [
        // "CLUBB" text color → purple
        ["style={{ color: '#e96f49' }}>CLUBB", "style={{ color: '#7c3aed' }}>CLUBB"],
        // Nav underline gradient → orange to purple
        ["background: 'linear-gradient(90deg, #e96f49, #e96f49)'", "background: 'linear-gradient(90deg, #e96f49, #7c3aed)'"],
        // Nav badges → purple
        ["text-elite-orange bg-elite-orange/10 border border-elite-orange/30 shadow-[0_0_10px_rgba(233,111,73,0.3)]", "text-purple-400 bg-purple-500/10 border border-purple-500/30 shadow-[0_0_10px_rgba(124,58,237,0.3)]"],
        // Mobile CLUBB
        ["text-sm font-heading font-black text-[#e96f49] tracking-widest block mt-0.5", "text-sm font-heading font-black text-[#7c3aed] tracking-widest block mt-0.5"],
        // Mobile badge
        ["text-[#e96f49] bg-[#e96f49]/10 border border-[#e96f49]/30", "text-purple-400 bg-purple-500/10 border border-purple-500/30"],
        // Join Now icon
        ["text-[#e96f49] fill-[#e96f49]", "text-[#7c3aed] fill-[#7c3aed]"],
    ],
    'Footer.jsx': [
        // Footer link hover → purple instead of orange
        ["hover:text-elite-orange transition-all text-sm", "hover:text-purple-400 transition-all text-sm"],
    ],
    'Home.jsx': [
        // Facilities: first card tag → purple for contrast
        ["'text-elite-orange' : 'text-elite-orange'", "'text-purple-400' : 'text-elite-orange'"],
        // Franchise CTA tag → purple
        ["borderColor: 'rgba(233,111,73,0.3)', color: '#F472B6', background: 'rgba(233,111,73,0.1)'", "borderColor: 'rgba(124,58,237,0.3)', color: '#a78bfa', background: 'rgba(124,58,237,0.1)'"],
        // FranchiseCTA gradient button includes purple
        ["from-elite-orange via-purple-500 to-elite-orange", "from-elite-orange via-purple-500 to-purple-600"],
        ["from-elite-orange via-purple-500 to-amber-400", "from-elite-orange via-purple-500 to-purple-600"],
        // Final CTA button gradient
    ],
    'About.jsx': [
        // THE VISIONARY label → purple
        ["text-elite-orange uppercase mb-2 block\">THE VISIONARY", "text-purple-400 uppercase mb-2 block\">THE VISIONARY"],
        // Coach role text → purple
        ["text-elite-orange text-[10px] font-bold tracking-[0.2em] uppercase mb-2", "text-purple-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-2"],
        // Reason icons → purple
        ["<r.icon className=\"text-elite-orange\" size={24}", "<r.icon className=\"text-purple-400\" size={24}"],
    ],
    'Contact.jsx': [
        // "GET IN TOUCH" subtitle → purple
        ["text-elite-orange uppercase mb-4 block\">GET IN TOUCH", "text-purple-400 uppercase mb-4 block\">GET IN TOUCH"],
        // "CONTACT FORM" subtitle → purple
        ["text-elite-orange text-xs font-bold tracking-[0.2em] uppercase mb-2 block\">CONTACT FORM", "text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-2 block\">CONTACT FORM"],
        // Contact icons → purple
        ["<item.icon className=\"text-elite-orange\" size={20}", "<item.icon className=\"text-purple-400\" size={20}"],
    ],
    'Franchise.jsx': [
        // "FRANCHISE OPPORTUNITY" tag → purple
        ["text-elite-orange text-xs font-bold tracking-[0.2em]\">FRANCHISE OPPORTUNITY", "text-purple-400 text-xs font-bold tracking-[0.2em]\">FRANCHISE OPPORTUNITY"],
        // Investment model icon box → purple
        ["bg-elite-orange/10 border border-elite-orange/20 text-elite-orange shrink-0\"><Building", "bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0\"><Building"],
        // FOFO label → purple
        ["text-[11px] text-elite-orange font-bold tracking-widest uppercase\">Franchise Owned", "text-[11px] text-purple-400 font-bold tracking-widest uppercase\">Franchise Owned"],
        // Step numbers → purple
        ["text-elite-orange font-bold text-xs\">{step.num}", "text-purple-400 font-bold text-xs\">{step.num}"],
        // Step title hover → purple
        ["group-hover:text-elite-orange transition-colors\">{step.title}", "group-hover:text-purple-400 transition-colors\">{step.title}"],
        // Checkmark + profit labels → purple
        ["text-elite-orange mb-5", "text-purple-400 mb-5"],
        ["tracking-widest text-elite-orange mb-1\">Proj. Annual Profit", "tracking-widest text-purple-400 mb-1\">Proj. Annual Profit"],
        ["text-elite-orange/50\" size={28}", "text-purple-400/50\" size={28}"],
        // Checklist icons → purple
        ["<CheckCircle2 size={15} className=\"text-elite-orange shrink-0\"", "<CheckCircle2 size={15} className=\"text-purple-400 shrink-0\""],
        // Success checkmark → purple
        ["<CheckCircle2 size={56} className=\"mx-auto text-elite-orange", "<CheckCircle2 size={56} className=\"mx-auto text-purple-400"],
    ],
    'Services.jsx': [
        // Map pin icon → purple
        ["<MapPin size={12} className=\"text-elite-orange shrink-0\"", "<MapPin size={12} className=\"text-purple-400 shrink-0\""],
        // Service card icons → purple
        ["<IconEl size={26} className=\"text-elite-orange\"", "<IconEl size={26} className=\"text-purple-400\""],
        // Service features checks → purple
        ["<Check size={10} className=\"text-elite-orange\"", "<Check size={10} className=\"text-purple-400\""],
    ],
    'Membership.jsx': [
        // Premium column header → purple
        ["text-elite-orange uppercase border-b border-white/10 text-center relative glow-cyan\">Premium", "text-purple-400 uppercase border-b border-white/10 text-center relative\">Premium"],
        // Checkmarks in comparison → alternate purple
        ["'text-elite-orange' : 'text-gray-500'", "'text-purple-400' : 'text-gray-500'"],
        ["'text-elite-orange drop-shadow-[0_0_8px_rgba(233,111,73,0.8)]' : 'text-gray-400'", "'text-purple-400 drop-shadow-[0_0_8px_rgba(124,58,237,0.8)]' : 'text-gray-400'"],
    ],
    'Explore.jsx': [
        // Orbit icon in portal → purple
        ["<Orbit size={32} className=\"text-elite-orange animate-spin-slow\"", "<Orbit size={32} className=\"text-purple-400 animate-spin-slow\""],
        // Gallery icon circle → purple
        ["bg-elite-orange/20 backdrop-blur-md border border-elite-orange/30 flex items-center justify-center mb-4 text-elite-orange group-hover:bg-elite-orange group-hover:text-white", "bg-purple-500/20 backdrop-blur-md border border-purple-500/30 flex items-center justify-center mb-4 text-purple-400 group-hover:bg-purple-500 group-hover:text-white"],
        // "ENLARGE" tag → purple
        ["text-elite-orange uppercase border border-elite-orange/30 bg-elite-orange/10", "text-purple-400 uppercase border border-purple-500/30 bg-purple-500/10"],
    ],
    'VirtualTour.jsx': [
        // "ELITE" in header → purple
        ["className=\"text-elite-orange\">ELITE", "className=\"text-purple-400\">ELITE"],
        // "ELITE MODE" label → purple
        ["'text-elite-orange' : 'text-gray-500'", "'text-purple-400' : 'text-gray-500'"],
    ],
    'PricingCard.jsx': [
        // Pricing card check marks → purple
        ["<Check size={12} className=\"text-elite-orange\"", "<Check size={12} className=\"text-purple-400\""],
    ],
};

let totalChanges = 0;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    const basename = path.basename(filePath);
    
    // Apply per-file replacements
    if (perFileReplacements[basename]) {
        for (const [search, replace] of perFileReplacements[basename]) {
            if (content.includes(search)) {
                content = content.replaceAll(search, replace);
                modified = true;
                totalChanges++;
            }
        }
    }
    
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  ✓ ${basename}`);
    }
}

function processDirectory(dirPath) {
    for (const file of fs.readdirSync(dirPath)) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) processDirectory(fullPath);
        else if (fullPath.endsWith('.jsx')) processFile(fullPath);
    }
}

console.log('=== ADDING DEEP PURPLE (20%) ACCENTS ===\n');
processDirectory('src');
console.log(`\nDone! Made ${totalChanges} targeted purple accent replacements.`);
