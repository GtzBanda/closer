import { useState } from "react";
import "./App.css";

const logoPath = `${import.meta.env.BASE_URL}closer-logo.png`;

const resources = [
  {
    name: "El Pasoans Fighting Hunger Food Bank",
    category: "Food",
    zip: "79927",
    description:
      "Provides food assistance and resources for individuals and families in the El Paso area.",
    phone: "(915) 298-0353",
  },
  {
    name: "Project Vida",
    category: "Healthcare",
    zip: "79901",
    description:
      "Provides healthcare and community support services for people and families in El Paso.",
    phone: "(915) 533-7057",
  },
  {
    name: "Opportunity Center for the Homeless",
    category: "Housing",
    zip: "79901",
    description:
      "Provides shelter, housing assistance, and supportive services for people experiencing homelessness.",
    phone: "(915) 577-0069",
  },
  {
    name: "Center Against Sexual and Family Violence",
    category: "Other Resources",
    zip: "79902",
    description:
      "Provides support and resources for individuals and families affected by domestic violence.",
    phone: "(915) 593-7300",
  },
  {
    name: "El Paso County General Assistance",
    category: "Financial Assistance",
    zip: "79901",
    description:
      "Provides assistance and support programs for eligible El Paso County residents.",
    phone: "(915) 546-2137",
  },
  {
    name: "El Paso Clothing Bank",
    category: "Clothing",
    zip: "79915",
    description:
      "Provides clothing and basic necessities to individuals and families in need.",
    phone: "(915) 533-2121",
  },
];

const categories = [
  { name: "All Resources", icon: "✦" },
  { name: "Food", icon: "🍎" },
  { name: "Housing", icon: "🏠" },
  { name: "Healthcare", icon: "♥" },
  { name: "Clothing", icon: "👕" },
  { name: "Financial Assistance", icon: "💵" },
  { name: "Other Resources", icon: "🤝" },
];

function App() {
  const [searchZip, setSearchZip] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Resources");
  const [searchPerformed, setSearchPerformed] = useState(false);

  const filteredResources = resources.filter((resource) => {
    const matchesZip =
      !searchZip || resource.zip.includes(searchZip);

    const matchesCategory =
      selectedCategory === "All Resources" ||
      resource.category === selectedCategory;

    return matchesZip && matchesCategory;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchPerformed(true);
  };

  const handleCategory = (category) => {
    setSelectedCategory(category);
    setSearchPerformed(true);
  };

  const clearSearch = () => {
    setSearchZip("");
    setSelectedCategory("All Resources");
    setSearchPerformed(false);
  };

  return (
    <div className="app">

      {/* NAVIGATION */}
      <nav className="navbar">
        <div className="nav-inner">
          <a href="#" className="logo">
            <img src={logoPath} alt="Closer logo" />
            <span>Closer</span>
          </a>

          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#resources">Resources</a>
            <a href="#about">About</a>
            <a href="#help">Get Help</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-content">

          <p className="eyebrow">EL PASO RESOURCES</p>

          <h1>
            Find Local Help
            <br />
            <span>Closer</span> to You.
          </h1>

          <p className="hero-description">
            A simple way to find food, housing, healthcare, clothing,
            financial assistance, and other local resources in El Paso.
          </p>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Enter your ZIP code"
              value={searchZip}
              onChange={(e) => setSearchZip(e.target.value)}
              maxLength="5"
            />

            <button type="submit">Find Help</button>
          </form>

          <p className="search-note">
            Search by ZIP code to find resources near you.
          </p>

        </div>

        <div className="hero-logo">
          <img src={logoPath} alt="" />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories section" id="resources">
        <div className="section-inner">

          <p className="section-label">EXPLORE RESOURCES</p>

          <h2>How can we help?</h2>

          <div className="category-grid">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`category-card ${
                  selectedCategory === category.name ? "active" : ""
                }`}
                onClick={() => handleCategory(category.name)}
              >
                <div className="category-icon">
                  {category.icon}
                </div>

                <span>{category.name}</span>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* RESOURCE RESULTS */}
      <section className="results section">
        <div className="section-inner">

          <div className="results-heading">
            <div>
              <p className="section-label">LOCAL RESOURCES</p>

              <h2>
                {searchPerformed
                  ? `${filteredResources.length} Resources Available`
                  : "Resources Available"}
              </h2>
            </div>

            {searchPerformed && (
              <button className="clear-button" onClick={clearSearch}>
                Clear Search
              </button>
            )}
          </div>

          {filteredResources.length > 0 ? (
            <div className="resource-grid">
              {filteredResources.map((resource) => (
                <article className="resource-card" key={resource.name}>

                  <div className="resource-top">
                    <span className="resource-category">
                      {resource.category}
                    </span>

                    <span className="resource-zip">
                      {resource.zip}
                    </span>
                  </div>

                  <h3>{resource.name}</h3>

                  <p>{resource.description}</p>

                  <div className="resource-bottom">
                    <span>{resource.phone}</span>

                    <button>
                      View Details →
                    </button>
                  </div>

                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">⌕</div>

              <h3>No resources found</h3>

              <p>
                Try another ZIP code or choose a different resource category.
              </p>

              <button onClick={clearSearch}>
                Reset Search
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ABOUT */}
      <section className="about section" id="about">
        <div className="about-inner">

          <div className="about-text">
            <p className="section-label">WHY CLOSER</p>

            <h2>
              Finding help
              <br />
              shouldn't feel
              <br />
              complicated.
            </h2>

            <p>
              Closer brings local community resources together in one
              simple place, making it easier to find support when you
              need it.
            </p>
          </div>

          <div className="about-points">

            <div className="about-point">
              <strong>Simple</strong>
              <span>Easy to use</span>
            </div>

            <div className="about-point">
              <strong>Local</strong>
              <span>Focused on El Paso</span>
            </div>

            <div className="about-point">
              <strong>Accessible</strong>
              <span>Designed for everyone</span>
            </div>

          </div>

        </div>
      </section>

      {/* GET HELP */}
      <section className="help section" id="help">
        <div className="help-inner">

          <div>
            <p className="section-label">NEED SUPPORT?</p>

            <h2>Start by entering your ZIP code.</h2>

            <p>
              Closer helps connect you with local resources based on
              the area you're searching.
            </p>
          </div>

          <a href="#home" className="help-button">
            Find Local Help
          </a>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">

          <div className="footer-logo">
            <img src={logoPath} alt="Closer logo" />
            <span>Closer</span>
          </div>

          <p>
            Local resources. Real support. A stronger community.
          </p>

          <span>© 2026 Closer</span>

        </div>
      </footer>

    </div>
  );
}

export default App;