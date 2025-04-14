import React, { useState } from 'react';
import "./Themes.css";
import dcTheme1 from '../../assets/themes/DCTheme1.png';
import dcTheme2 from '../../assets/themes/DCTheme2.png';
import dcTheme3 from '../../assets/themes/DCTheme3.png';
import dcTheme4 from '../../assets/themes/DCTheme4.png';
import dcTheme5 from '../../assets/themes/DCTheme5.png';
import dcTheme6 from '../../assets/themes/DCTheme6.png';
import { useNavigate } from "react-router-dom";

const themes = [
    {
        id: 1,
        name: "Minimalistic & Elegant",
        image: dcTheme1,
        primaryColors: ["White", "Black", "Gray"],
        accentColors: ["Silver", "Gold"],
        bestFor: "Corporate, Modern, or Professional Digital Cards",
        example: "A white background with black text and gold/silver accents for icons or borders. This provides a clean and sleek look.",
        backgroundColor: "White",
        textColor: "Black",
        accentColor: "Gold", // or Silver
    },
    {
        id: 2,
        name: "Vibrant & Playful",
        image: dcTheme2,
        primaryColors: ["Bright Blue", "Hot Pink", "Lime Green"],
        accentColors: ["Yellow", "Orange"],
        bestFor: "Creative professionals, Startups, or anyone in a fun, trendy industry",
        example: "A dark blue background with hot pink text and lime green accents for key elements. This combination is eye-catching and energetic.",
        backgroundColor: "Dark Blue",
        textColor: "Hot Pink",
        accentColor: "Lime Green",
    },
    {
        id: 3,
        name: "Soft & Professional",
        image: dcTheme3,
        primaryColors: ["Navy Blue", "White", "Light Gray"],
        accentColors: ["Pastel Peach", "Pastel Mint Green"],
        bestFor: "Corporate, Consulting, or Financial sectors",
        example: "A navy blue background with white text, light gray icons, and pastel-colored accents for a calming, sophisticated vibe.",
        backgroundColor: "Navy Blue",
        textColor: "White",
        accentColor: "Pastel Mint Green", // or Pastel Peach
    },
    {
        id: 4,
        name: "Nature-Inspired",
        image: dcTheme4,
        primaryColors: ["Forest Green", "Earth Brown", "Soft Beige"],
        accentColors: ["Golden Yellow", "Warm Red"],
        bestFor: "Eco-friendly businesses, wellness, or outdoor-oriented industries",
        example: "A forest green background with beige text and brown accents. Adding a golden yellow or red for a natural yet vibrant touch.",
        backgroundColor: "Forest Green",
        textColor: "Beige",
        accentColor: "Golden Yellow", // or Warm Red
    },
    {
        id: 5,
        name: "Tech & Modern",
        image: dcTheme5,
        primaryColors: ["Dark Charcoal", "Navy", "Neon Green"],
        accentColors: ["Electric Blue", "Silver"],
        bestFor: "Tech startups, Digital products, or Innovators",
        example: "A dark charcoal background with neon green accents and white text. This gives off a modern, futuristic feel.",
        backgroundColor: "Dark Charcoal",
        textColor: "White",
        accentColor: "Neon Green", // or Electric Blue
    },
    {
        id: 6,
        name: "Luxury & High-End",
        image: dcTheme6,
        primaryColors: ["Deep Burgundy", "Gold", "Cream"],
        accentColors: ["Black", "Dark Charcoal"],
        bestFor: "Luxury brands, high-end services, or fashion-related digital cards",
        example: "A deep burgundy background with gold text and accents, creating a luxurious, upscale feel.",
        backgroundColor: "Deep Burgundy",
        textColor: "Gold",
        accentColor: "Black", // or Dark Charcoal
    },
    // {
    //     name: "Monochromatic",
    //     primaryColors: ["Various shades of Blue"],
    //     accentColors: ["Lighter or darker shades of Blue"],
    //     bestFor: "Simplified, modern look suitable for various industries",
    //     example: "Light blue background with navy blue text and accents for a monochromatic, clean design.",
    //     backgroundColor: "Light Blue",
    //     textColor: "Navy Blue",
    //     accentColor: "Dark Blue", // or another shade of blue
    // },
    // {
    //     name: "Bold & Contrasting",
    //     primaryColors: ["Black", "White", "Red"],
    //     accentColors: ["White", "Red", "Yellow", "Turquoise"],
    //     bestFor: "Making a statement or creative industries",
    //     example: "A black background with bold red or yellow text and white accents for a striking contrast.",
    //     backgroundColor: "Black",
    //     textColor: "Red", // or Yellow/Turquoise
    //     accentColor: "White", // or same as text color
    // },
];


const Themes = () => {
    let navigate = useNavigate();
    // State to store the selected theme
    const [selectedTheme, setSelectedTheme] = useState(null);

    // Handle theme selection
    const handleSelect = (theme) => {
        setSelectedTheme(theme);
        navigate(`/theme/${theme.id}`);
    };

    return (
        <div className="container">
            <div className="container-2">
            <h2>Select Theme</h2>
                <div className="row theme-grid">
                    {themes.map((theme) => (
                        <div className="col-sm-4 theme-card" key={theme.id} onClick={() => handleSelect(theme)}>
                            <div className={`card ${selectedTheme?.id === theme.id ? 'selected' : ''}`}>
                                <img src={theme.image} className="card-img-top" alt={theme.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{theme.name}</h5>
                                    <p className="card-text">{theme.description}</p>
                                    {/* <button
                                    className="btn btn-primary"
                                    onClick={() => handleSelect(theme)}
                                >
                                    {selectedTheme?.id === theme.id ? "Selected" : "Select"}
                                </button> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedTheme && (
                <div className="selection-footer">
                    <p>Selected Theme: {selectedTheme.name}</p>
                    <button className="btn btn-success">Proceed with {selectedTheme.name}</button>
                </div>
            )}
        </div>
    );
}

export default Themes;
