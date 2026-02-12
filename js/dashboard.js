//Constants
const productCards = document.querySelectorAll(".product-card");
const paginationContainer = document.querySelector(".pagination");
const pageButtons = paginationContainer ? paginationContainer.querySelectorAll(".page-btn") : [];

const prevButton = pageButtons.length > 0 ? pageButtons[0] : null;
const nextButton = pageButtons.length > 0 ? pageButtons[pageButtons.length - 1] : null;

const numberButtons = [];

const ITEMS_PER_PAGE = 4;
const TOTAL_PAGES = Math.ceil(productCards.length / ITEMS_PER_PAGE);

let currentPage = 1;

//Event Trigger
if (paginationContainer && productCards.length > 0 && pageButtons.length >= 3) {

    buildNumberButtons();
    attachNumberButtonEvents();
    attachPrevNextEvents();
    renderPage(1);
}

//Funtions
/*  
 * DOCU: Collects only the number buttons from pagination.
 * Excludes the first "<" and last ">" buttons.
 * @returns {void}
 */
function buildNumberButtons() {

    // Loop through pagination buttons except first and last
    for (let i = 1; i < pageButtons.length - 1; i++) {
        numberButtons.push(pageButtons[i]);
    }
}

/*  
 * DOCU: Attaches click events to number buttons (1, 2, 3...).
 * @returns {void}
 */
function attachNumberButtonEvents() {

    for (let i = 0; i < numberButtons.length; i++) {

        const button = numberButtons[i];
        button.addEventListener("click", function () {

            const pageNumber = Number(button.textContent);
            renderPage(pageNumber);
        });
    }
}

/*  
 * DOCU: Attaches click events to previous "<" and next ">" buttons.
 * @returns {void}
 */
function attachPrevNextEvents() {

    if (prevButton) {
        prevButton.addEventListener("click", function () {
            renderPage(currentPage - 1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", function () {
            renderPage(currentPage + 1);
        });
    }
}

/*  
 * DOCU: Renders the requested page by hiding and showing product cards.
 * @param {number} page - The page number to render.
 * @returns {void}
 */
function renderPage(page) {

    if (!Number.isFinite(page)) {
        page = 1;
    }

    if (page < 1) {
        page = 1;
    }

    if (page > TOTAL_PAGES) {
        page = TOTAL_PAGES;
    }

    currentPage = page;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    for (let i = 0; i < productCards.length; i++) {

        const shouldShow = i >= startIndex && i < endIndex;

        if (shouldShow) {
            productCards[i].style.display = "";
        } else {
            productCards[i].style.display = "none";
        }
    }

    setActiveButton(currentPage);
    updateNavigationState();
}

/*  
 * DOCU: Updates which page button is marked as active.
 * @param {number} page - Current page number.
 * @returns {void}
 */
function setActiveButton(page) {

    for (let i = 0; i < numberButtons.length; i++) {
        numberButtons[i].classList.remove("active");
    }

    const buttonIndex = page - 1;

    if (numberButtons[buttonIndex]) {
        numberButtons[buttonIndex].classList.add("active");
    }
}

/*  
 * DOCU: Disables prev/next buttons when at first or last page.
 * @returns {void}
 */
function updateNavigationState() {

    if (!prevButton || !nextButton) {
        return;
    }

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === TOTAL_PAGES;
}
