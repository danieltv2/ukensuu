document.addEventListener("DOMContentLoaded", () => {
        const sortDropdown = document.getElementById("sort-options");
        const gridContainer = document.querySelector(".grid-container");
        const featuredLinks = document.querySelectorAll('.featured-link[href^="#"]');

          featuredLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default scroll behavior

      // Extract the ID of the targeted infobox from the href attribute
      const targetId = link.getAttribute("href").substring(1); // Remove '#' from href
      const box = document.getElementById(targetId); // Find the infobox by ID

      if (box) {
        // Get the button and content within the infobox
        const button = box.querySelector("button");
        const content = box.querySelector("section");

        // Expand the infobox
        box.setAttribute("aria-expanded", "true");
        button.setAttribute("aria-expanded", "true");
        content.setAttribute("aria-hidden", "false");

        // Scroll to the infobox
        box.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

        // Sorting function
        sortDropdown.addEventListener("change", () => {
          const sortBy = sortDropdown.value; // Either "name", "category", or "date"
          const items = Array.from(gridContainer.children);

          // Sort based on the selected criteria
          items.sort((a, b) => {
            const aValue = a.dataset[sortBy].toLowerCase(); // Lowercase for uniformity
            const bValue = b.dataset[sortBy].toLowerCase();

            if (sortBy === "date") {
              return new Date(aValue) - new Date(bValue); // Handle dates with JavaScript Date
            }

            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
          });

          // Append sorted items back to the grid
          items.forEach((item) => gridContainer.appendChild(item));
        });

        // Expand/collapse functionality for buttons
        const buttons = document.querySelectorAll(".info-box button");

        buttons.forEach((button) => {
          button.addEventListener("click", () => {
            const isExpanded = button.getAttribute("aria-expanded") === "true";
            const contentId = button.getAttribute("aria-controls");
            const content = document.getElementById(contentId);
            const parentBox = button.closest(".info-box");

            // Toggle the state
            button.setAttribute("aria-expanded", !isExpanded);
            content.setAttribute("aria-hidden", isExpanded);
            parentBox.setAttribute("aria-expanded", !isExpanded);
          });
        });

        // Add functionality to "Tilbake til toppen" links
        const backToTopLinks = document.querySelectorAll(".back-to-top");
        backToTopLinks.forEach((link) => {
          link.addEventListener("click", (event) => {
            // Prevent default anchor behavior
            event.preventDefault();

            // Get the parent info-box
            const infoBox = link.closest(".info-box");

            // Collapse the info-box
            const button = infoBox.querySelector("button");
            const content = infoBox.querySelector("section");
            button.setAttribute("aria-expanded", "false");
            content.setAttribute("aria-hidden", "true");
            infoBox.setAttribute("aria-expanded", "false");

            // Scroll to top
            document.getElementById("top-of-page").scrollIntoView();
          });
        });
      });