// Constants
const DEFAULT_PRODUCT_IMAGE_SRC = "assets/img/beta_logo.jpg";
const PAGE_SIZE = 10;

const productContainer = document.querySelector(".product-grid");
const productLength = document.querySelector(".count");
const paginationContainer = document.querySelector(".pagination");

/*  
 * DOCU: Renders product cards into the dashboard product grid container.
 * @param {Array<Object>} products - List of products to render.
 * @returns {void} - Does not return a value.
 * @throws {None} - No exceptions are thrown.
 *  
 * Last Updated: 2026-02-13  
 * Author: Kerzania  
 * Last Updated By: Kerzania  
 */
function renderProducts(products) {

    if (!productContainer) return;

    // Clear existing products first if there is (for safety)
    productContainer.innerHTML = "";

    products.forEach(function(product) {

        //Create anchor card
        const card = document.createElement("a");
        card.href = `product-view.html?id=${product.id}`;
        card.classList.add("product-card");

        //Create thumbnail container
	    const thumbDiv = document.createElement("div");
	    thumbDiv.classList.add("product-thumb");

	    const image = document.createElement("img");
	    image.src = product.image || DEFAULT_PRODUCT_IMAGE_SRC;
	    image.alt = product.name;
	    image.classList.add("product-image");

        thumbDiv.appendChild(image);

        //Product Info container
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("product-info");

        // Left side 
        const infoLeft = document.createElement("div");
        infoLeft.classList.add("info-details");

        const name = document.createElement("h3");
        name.classList.add("product-name");
        name.innerText = product.name;

	    const meta = document.createElement("p");
	    meta.classList.add("product-meta");
	    meta.innerText = `${product.stars} stars • ${product.ratings} Ratings`;

        infoLeft.appendChild(name);
        infoLeft.appendChild(meta);

        //Price
	    const price = document.createElement("p");
	    price.classList.add("product-price");
	    price.innerText = `$${Number(product.price).toFixed(2)}`;

        //Assemble info section
        infoDiv.appendChild(infoLeft);
        infoDiv.appendChild(price);

        //Assemble card
        card.appendChild(thumbDiv);
        card.appendChild(infoDiv);

        //Append to container
        productContainer.appendChild(card);
    });
}

/*  
* DOCU: Returns the full list of products from the shared PRODUCTS data source.
* This function acts as a single access point so other functions do not directly
* depend on the PRODUCTS variable everywhere.
*  
* @param {none} - This function does not accept any parameter.
* @returns {Array<Object>} - Returns the list of product objects.
* @throws {none} - This function does not explicitly throw errors.
*
* Last Updated: 2026-02-14  
* Author: Kerzania  
*/
function getProducts() {
    return PRODUCTS;
}

/*  
* DOCU: Switches the dashboard display to a specific page number.
* It calculates the total pages based on PAGE_SIZE, validates the requested page,
* slices the correct products for that page, updates the product count text,
* then re-renders both the products and pagination controls.
*  
* @param {number} page - The page number to display.
* @returns {void} - This function does not return a value.
* @throws {none} - This function does not explicitly throw errors.
*
* Last Updated: 2026-02-14  
* Author: Kerzania  
*/
function goToPage(page) {

    const products = getProducts();
    const totalPages = Math.ceil(products.length / PAGE_SIZE);

    //keep page within valid range
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    const startIndex = (page - 1) * PAGE_SIZE;
    const pageProducts = products.slice(startIndex, startIndex + PAGE_SIZE);

    if (productLength) {
        productLength.innerText = `(${products.length})`;
    }

    renderProducts(pageProducts);
    renderPagination(totalPages, page);
}


/*  
* DOCU: Builds and displays the pagination controls for the dashboard.
* It creates a previous button, a button for each page number, and a next button.
* It also handles disabling previous/next when the active page is at the boundary.
*  
* @param {number} totalPages - The total number of pages available.
* @param {number} activePage - The currently selected page number.
* @returns {void} - This function does not return a value.
* @throws {none} - This function does not explicitly throw errors.
*
* Last Updated: 2026-02-14  
* Author: Kerzania  
*/
function renderPagination(totalPages, activePage) {

    paginationContainer.innerHTML = "";

    // prev
    const prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.innerText = "<";
    prevBtn.classList.add("page-btn")
    prevBtn.disabled = activePage === 1;

    prevBtn.addEventListener("click", function () {
        goToPage(activePage - 1);
    });

    paginationContainer.appendChild(prevBtn);

    // page numbers
    for (let page = 1; page <= totalPages; page++) {

        const btn = document.createElement("button");
        btn.type = "button";
        btn.innerText = page;
        btn.classList.add("page-btn")

        if (page === activePage) {
            btn.classList.add("active");
        }

        btn.addEventListener("click", function () {
            goToPage(page);
        });

        paginationContainer.appendChild(btn);
    }

    // next
    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.innerText = ">";
    nextBtn.classList.add("page-btn")
    nextBtn.disabled = activePage === totalPages;

    nextBtn.addEventListener("click", function () {
        goToPage(activePage + 1);
    });

    paginationContainer.appendChild(nextBtn);
}

goToPage(1);

